/* eslint import/prefer-default-export: ["off"] */
export const configJson = {
  development: {
    connectionString: 'postgresql://postgres:123456@localhost:5432/ridemyway',
  },
  test: {
    connectionString: 'postgresql://postgres:123456@localhost:5432/ridemyway_test',
  },
  production: {
    connectionString: 'DATABASE_URL',
  },
};
