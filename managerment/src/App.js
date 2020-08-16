import React from 'react';
import './App.css';
import Customer from './components/Customer';

const customers =[{
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
}]
function App() {
  return (
      <div>
        {customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          )
        })}
      </div>
    
  );
}

export default App;
