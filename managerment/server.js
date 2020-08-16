var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => 
{
    res.send([
        {
            'id':1,
            'image':'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '921222',
            'gender': '남자',
            'job': '대학생'
          },
          {
            'id':2,
            'image':'https://placeimg.com/64/64/2',
            'name': '송병호',
            'birthday': '921121',
            'gender': '남자',
            'job': '디자이너'
          },
          {
            'id':3,
            'image':'https://placeimg.com/64/64/3',
            'name': '전기범',
            'birthday': '920312',
            'gender': '남자',
            'job': '사람'
          }
    ]);
})

app.listen(port, () => console.log('Listening on port'));