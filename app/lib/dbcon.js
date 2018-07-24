const {Client} = require('pg');
const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'test_db',
    password: 'admin',
    port: 5432,
});
client.connect()
    .then(()=> {
        console.log("Postgress Database is connected");
    })
module.exports={
    query: (text, params, callback) =>{
        return client.query(text, params, callback)
    }
}    