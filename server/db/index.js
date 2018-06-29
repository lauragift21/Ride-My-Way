import { Pool } from 'pg';

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

// connect pg
db.connect().then(() => {
  console.log('connection successful');
}).catch((err) => {
  console.log(err);
});

// connect db
db.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, location VARCHAR(100), password VARCHAR(255) NOT NULL, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL DEFAULT NOW());CREATE TABLE IF NOT EXISTS rides(id SERIAL PRIMARY KEY, location VARCHAR(255) NOT NULL, destination VARCHAR(255) NOT NULL, seats int NOT NULL, departure date NOT NULL, userID int, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY(userID) REFERENCES users(id));CREATE TABLE IF NOT EXISTS requestRide(id SERIAL PRIMARY KEY, userID int, rideID int, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY(userID) REFERENCES users(id), FOREIGN KEY(rideID) REFERENCES rides(id));').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
export default db;
