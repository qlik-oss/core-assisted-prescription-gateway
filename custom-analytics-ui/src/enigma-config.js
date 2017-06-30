import qixSchema from 'enigma.js/schemas/qix/3.2/schema.json';

const config = {
  schema: qixSchema,
  session: {
    suspendOnClose: true,
    secure: location.protocol === 'https:',
    route: '/doc/doc/drugcases',
  },
  responseInterceptors: [
    {
      onRejected(data, error) {
        const api = data.handle ? this.apis.getApi(data.handle) : undefined;
        if (api && error.code === 15) {
          return this.send(data);
        }
        return Promise.reject(error);
      },
    },
  ],
};

module.exports = config;
