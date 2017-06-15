import qixSchema from 'enigma.js/schemas/qix/3.2/schema.json';

const config = {
  schema: qixSchema,
  session: {
    suspendOnClose: true,
    secure: location.protocol === 'https:',
    route: '/doc/doc/drugcases',
  },
};

module.exports = config;
