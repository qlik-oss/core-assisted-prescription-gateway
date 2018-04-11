import qixSchema from 'enigma.js/schemas/12.20.0.json';

const ERR_ABORTED = 15;

const config = {
  schema: qixSchema,
  url: `${location.origin.replace(/^http/, 'ws')}/doc/doc/drugcases`,
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

module.exports = config;
