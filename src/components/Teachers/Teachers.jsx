import React, { useState } from 'react';

function Teachers({teachers,setTeachers}) {

  const [teachersShow,setTeachersShow] = useState('all');

  const handleTeacherList = (event)=>{
    setTeachersShow(event.target.value);
  }
  
  let filterTeachers = (teachers,teachersShow)=>{

    switch (teachersShow){
      case 'all' :
        return teachers;
      case 'prof':
        return teachers.filter(teacher => teacher.roll ==='Professor');
      case 'asst' :
        return teachers.filter(teacher=>teacher.roll === 'Assistant Professor')
    }
  }

const filteredTeachers = filterTeachers(teachers,teachersShow);
  
  return (
    <div>
        <h2>Teachers List</h2>
        <form>
          <label>
            <input 
              type='radio'
              name='teacher'
              value={'all'}
              onChange={handleTeacherList}
              checked ={teachersShow=='all'}
            /> 
            : All teachers 
          </label> <br />
          <label >
            <input 
              type='radio'
              name='teacher'
              value={'prof'}
              onChange={handleTeacherList}
            />
             : Professors 
          </label><br />
          <label >
            <input 
              type='radio'
              name='teacher'
              value={'asst'}
              onChange={handleTeacherList}
            />
           : Assistant Professors 
          </label>
        </form>
        <hr />
        <ul>
          {
            filteredTeachers.map(filteredTeacher=>
              <li key={filteredTeacher.id}>{ filteredTeacher.name }</li>
            )
          }
        </ul>
      </div>
  )
}

export default Teachers;