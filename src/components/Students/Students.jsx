import React, { useState } from 'react';

function Students({students}) {
  const [studentShow,setStudentShow] = useState('all');

  const filterStudentsShow = (event)=>{
    setStudentShow(event.target.value)
  }
  const filterStudents = (students,studentShow)=>{
    switch (studentShow){
      case 'all' :
        return students;
      case 'male' :
        return students.filter(student=>student.gender === 'male');
      case 'female':
        return students.filter(student=>student.gender=='female');
    }
  }
  const filteredStudents = filterStudents(students,studentShow);

  return (
    <div>
        <form>
          <label> 
            <input 
              type='radio'
              name='student'
              onChange={filterStudentsShow}
              value={'all'}
              checked={studentShow=='all'}
            />
            : All students 
          </label><br />
          <label >
            <input 
              type='radio'
              name='student'
              onChange={filterStudentsShow}
              value={'male'}
            />
            : Male 
          </label><br />
          <label > 
            <input 
              type='radio'
              name='student'
              onChange={filterStudentsShow}
              value={'female'}
            />
            : Female 
          </label>
        </form>
        <ul>
          {
            filteredStudents.map(student=>
            <li key={student.id }>{ student.name }</li>
            )
          }
        </ul>
      </div>
  )
}

export default Students;