import axios from 'axios';
import React, { useState } from 'react';

function CreateTeacher({fetchData}) {
  const [teacherName,setteacherName] = useState('');
  const [teacherRoll,setTeacherRoll] = useState('');

  const postTeacherDetails = async (event) => {
    event.preventDefault();
    if (teacherRoll == 'Professor' || teacherRoll == 'Assistant Professor'){
      let newTeacherObj = {
        name : teacherName,
        roll :teacherRoll
      }
      const response = await axios.post('http://localhost:3000/teachers/',newTeacherObj);
      fetchData();
      
      setTeacherRoll('');
      setteacherName('');
      window.alert('New Teacher Details has been Added Successfully');
    }else {
      window.alert ('Please Enter Teacher Roll as., "Professor" (or) "Assistant Professor"');
    }
  }

  return (
    <div>
      <h1>Add a New Teacher</h1>
      <form onSubmit={ postTeacherDetails }>
        <label>
          Teacher Name : &nbsp;
          <input 
            placeholder='enter teacher name here...'
            onChange={(e)=>setteacherName(e.target.value)}
            value={teacherName}
            required
          />
        </label><br /><br />
        <label>
          Teacher Roll &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; 
          <input 
            placeholder='enter teacher roll here...'
            onChange={(e)=>setTeacherRoll(e.target.value)}
            value={teacherRoll}
            required
          />
        </label><br /><br />
        <button type='submit'>Add Teacher</button>
      </form>
    </div>
  )
}

export default CreateTeacher;