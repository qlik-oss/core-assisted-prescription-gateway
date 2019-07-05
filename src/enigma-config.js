import qixSchema from 'enigma.js/schemas/12.20.0.json';

const ERR_ABORTED = 15;

const enigmaConfig = {
  schema: qixSchema,
  url: `${window.location.protocol.replace('http', 'ws')}${process.env.BACKEND_ADDRESS}`,
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
