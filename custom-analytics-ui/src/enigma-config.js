import qixSchema from 'enigma.js/schemas/qix/3.2/schema.json';

const config = {
  schema: qixSchema,
  session: {
    secure: false,
    route: '/doc/doc/drugcases.qvf',
  },
};

module.exports = config;
