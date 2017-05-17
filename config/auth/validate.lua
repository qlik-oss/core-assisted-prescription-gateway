local COOKIE_NAME = os.getenv("SESSION_COOKIE_NAME")

-- retrieves a ref to a redis connection
local function getdb()
  ngx.log(ngx.DEBUG, "auth: Creating redis connection")
  local redis = require "resty.redis"
  local red = redis:new()

  red:set_timeout(1000)

  -- redis hostname here:
  local ok, err = red:connect("redis", 6379)
  if not ok then
    return
  end

  return red
end

-- retrieves the jwt belonging to a session id
local function idToJWT(id)
  if not id then
    ngx.log(ngx.DEBUG, "auth: No cookie ID found")
    -- we require a session id to operate
    return
  end

  local red = getdb()

  if not red then
    ngx.log(ngx.DEBUG, "auth: Failed redis connection")
    -- we cannot continue without a redis connection
    return
  end

  local jwt, err = red:get(id)

  if not jwt or jwt == ngx.null then
    ngx.log(ngx.DEBUG, "auth: No JWT found")
    -- there was no jwt stored under that session id
    return
  end

  -- put redis connection into connection pool for reuse
  -- 100 max clients, 10 seconds max idle
  local ok, err = red:set_keepalive(10000, 100)
  if not ok then
    ngx.log(ngx.DEBUG, "auth: Failed to keep-alive redis connection")
    return
  end

  return jwt
end

local jwt

if not COOKIE_NAME then
  ngx.log(ngx.WARN, "No SESSION_COOKIE_NAME environment variable found")
else
  jwt = idToJWT(ngx.var["cookie_" .. COOKIE_NAME])
end

if not jwt then
  ngx.header["Content-Type"] = "text/html";
  ngx.status = ngx.HTTP_UNAUTHORIZED
  ngx.say("You do not have permission to view this resource.")
  ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

-- validate JWT?

ngx.req.set_header("Authorization", "Bearer " .. jwt)
--ngx.req.clear_header("Cookie")
