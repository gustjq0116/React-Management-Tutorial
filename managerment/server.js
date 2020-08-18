const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

conn.connect();

const multer = require('multer');
const upload = multer({dest: './upload'});

app.use('/image', express.static('./upload'));

app.delete('/api/customers/:id', (req, res) => 
{
    let params=req.params.id;
    conn.query(
        "UPDATE customer SET isdeleted=1 WHERE id=?", params, 
        (err, rows, fields) => 
        {
            res.send(rows);
        }
    )
   // res.send("123aaaaaaaaaaaaaaaaaaaa");
})

app.post('/api/customers', upload.single('image'), (req, res) => 
{
    let sql = 'INSERT INTO customer VALUES (null, ?, null, ?, ?, ?, ?, now(), 0)';
    
    let image='';
    if(image) image = req.file.filename;
    //req.file ?  image = '/image/' + req.file.filename : ''
   // console.log(image);
    let name =req.body.name;
    let birthday =req.body.birthday;
    let gender =req.body.gender;
    let job =req.body.job;
    let params = [name, image, birthday, gender, job];
    conn.query(
        sql, params, 
        (err, rows, fields) => 
        {
            res.send(rows);
           // console.log(err);
        }
    )
    
})


app.get('/api/customers', (req, res) => 
{
    conn.query(
        "SELECT * FROM customer WHERE isdeleted=0",
        (err, rows, fields) => 
        {
            console.log("get");
            res.send(rows);
        }
    )
    
})

app.listen(port, () => console.log('Listening on port'));