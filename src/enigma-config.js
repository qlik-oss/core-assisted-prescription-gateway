import qixSchema from 'enigma.js/schemas/12.20.0.json';

const ERR_ABORTED = 15;
const backendAdress = process.env.NODE_ENV === 'production' ? `${process.env.BACKEND}/app/doc/fc649d13-84ea-4174-8c96-67208f069587` : 'localhost:9176';

const enigmaConfig = {
  schema: qixSchema,
  url: `${window.location.protocol.replace('http', 'ws')}${backendAdress}`,
  suspendOnClose: true,
  interceptors: [
    {
      onRejected(session, request, error) {
        if (error.code === ERR_ABORTED) {
          return request.retry();
        }
        return Promise.reject(error);
      },
    },
  ],
};

export default enigmaConfig;
