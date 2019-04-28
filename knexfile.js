module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/drums'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-drums'
  }
};
