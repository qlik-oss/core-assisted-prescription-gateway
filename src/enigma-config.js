import qixSchema from 'enigma.js/schemas/12.20.0.json';

const ERR_ABORTED = 15;
const backendAdress = process.env.NODE_ENV === 'production' ? `${process.env.BACKEND}/app/doc/739db838-dd28-4078-8715-ee9cfcc06c29` : 'localhost:9176';

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
