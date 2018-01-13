const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')
const app = express()
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
const db = new sqlite3.Database("./Chinook_Sqlite_AutoIncrementPKs.sqlite");
// const stmt = db.prepare(`INSERT INTO Artist (ArtistId, Name) VALUES (?, ?)`);

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000)

var http = require('http');
var options = {method: 'HEAD', port: 3000, path: '/'};
var req = http.request(options, function(res) {
    console.log(JSON.stringify(res.headers));
  }
);
req.end();


db.each(`SELECT * FROM artist LEFT OUTER JOIN album using (ArtistId)`, (err, row) => {
  if (err) throw err;
  console.log(row);
});

db.close();

app.get('/', (req, res) => {
  res.render('home')
})


app.post('/album', (req, res) => {
  console.log('ArtistId: ' + res.body.artistid);
  console.log('Title: ' + res.body.title);
  res.send('home')
})

app.post('/artist', (req, res) => {
  console.log('ArtistId: ' + res.body.artistid);
  console.log('Name: ' + res.body.name);
  res.send('home')
})

app.use((req, res) => {
  res.status(400);
  res.render('404');
});

app.listen(3000, () => {
  console.log('server running')
})
