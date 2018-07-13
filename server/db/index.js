import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let poolConfig;
// check for development env
if (process.env.NODE_ENV === 'development') {
  poolConfig = new Pool({
    connectionString: process.env.DEVELOPMENT,
  });
  // check for test env
} else if (process.env.NODE_ENV === 'test') {
  poolConfig = new Pool({
    connectionString: process.env.TEST,
  });
} else {
  poolConfig = new Pool({
    connectionString: process.env.PRODUCTION,
  });
}
const db = poolConfig;

// connect pg
db.connect((err) => {
  if (err) {
    console.log(err);
  }

  // connect db
  db.query(`
  DO $$
  BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'request_status') THEN
          CREATE TYPE request_status AS ENUM
          (
            'pending',
            'accepted',
            'rejected'
          );
      END IF;
  END$$;`);
  db.query(
    `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, location VARCHAR(100) NOT NULL, password VARCHAR NOT NULL, created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW());
     CREATE TABLE IF NOT EXISTS rides(id SERIAL PRIMARY KEY, location VARCHAR(255) NOT NULL, destination VARCHAR(255) NOT NULL, seats int NOT NULL, departure date NOT NULL, userid int NOT NULL, created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), FOREIGN KEY(userID) REFERENCES users(id));
     CREATE TABLE IF NOT EXISTS requests(id SERIAL PRIMARY KEY, userid int NOT NULL, rideid int NOT NULL, status request_status DEFAULT('pending'), created_at TIMESTAMP WITH TIME ZONE NOT NULL, updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), FOREIGN KEY(userID) REFERENCES users(id), FOREIGN KEY(rideID) REFERENCES rides(id));`,
    () => { },
  );

  return console.log('Connection successful');
});

export default db;
