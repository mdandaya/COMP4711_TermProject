const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'ec2-23-22-156-110.compute-1.amazonaws.com',
    user: 'hceigsjprcvgqh',  
    database: 'dbjr6ju1135sb7',  
    password: 'e92da4353d4ee7c91de8d35e7279c3048b4bc1bab6bbc5dc854a2e0a12f4d933',
    port: 5432,
    ssl: true
});  

module.exports = pool;