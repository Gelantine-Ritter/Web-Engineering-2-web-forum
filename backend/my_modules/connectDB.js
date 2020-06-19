const mongoose = require('mongoose')
const config = require('config')


let _db;

//connect to database
function init_db(callback) {
    if (_db) {
        return callback(null, _db)
    }
    mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, connected)


    function connected(err, db) {
        if (err) {
            return callback(err)
        }
        console.log("DB initialized - connected to: " + process.env.URL_DB)
        _db = db;
        return callback(null, _db)
    }
}


function get_db() {
    assert.ok(_db, "--- DB not initialized----");
    return _db;
}

module.exports = {
    init_db,
    get_db
}