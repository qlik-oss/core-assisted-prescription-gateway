local jwt = getJWTIfLoggedIn()

if not jwt then
  ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

-- validate JWT?

ngx.req.set_header("Authorization", "Bearer " .. jwt)
--ngx.req.clear_header("Cookie")
