const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the database.')
})

function runQuery(query, callback) {
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message)
    }
    callback(rows)
  })
}

module.exports.runQuery = runQuery;
