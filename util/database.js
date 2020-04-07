const Pool = require('pg').Pool;

const pool = new Pool({
  database: 'dbjr6ju1135sb7',
  host: 'ec2-23-22-156-110.compute-1.amazonaws.com',
  user: 'hceigsjprcvgqh',
  password: 'e92da4353d4ee7c91de8d35e7279c3048b4bc1bab6bbc5dc854a2e0a12f4d933',
  port: 5432,
  ssl: true
})

pool.on('connect', () => {
    console.log('connected to the Database');
});

module.exports = pool;