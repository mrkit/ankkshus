// Tests need a dedicated database. Refuse to run against anything that is not clearly a test database,
// because the test setup drops and recreates tables.
const url = process.env.TEST_DATABASE_URL;
if (!url) {
  throw new Error(
    'Set TEST_DATABASE_URL to a dedicated test database, e.g. postgres://localhost/ankkshus_test',
  );
}
const dbName = new URL(url).pathname.replace(/^\//, '');
if (!/test/.test(dbName)) {
  throw new Error(
    `Refusing to run tests against "${dbName}": the name must contain "test"`,
  );
}
process.env.DATABASE_URL = url;
process.env.JWT_SECRET = 'test-secret';
