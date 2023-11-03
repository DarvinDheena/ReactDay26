import axios from 'axios';
import React, { useState } from 'react';

function CreateStudent({fetchData}) {

  const [studentname,setStudentName] = useState('');
  const [studentgender,setStudentGender] = useState('');

  const postStudentDetails = async (event) => {
    event.preventDefault();
    if (studentgender == 'male' || studentgender == 'female'){
      let newStudentObj = {
        name : studentname,
        gender :studentgender
      }
      const response = await axios.post('http://localhost:3000/students/',newStudentObj);
      fetchData();
      
      setStudentGender('');
      setStudentName('');
      window.alert('New Student Details has been Added Successfully');
    }else {
      window.alert ('Please Enter Student gender as., "male" (or) "female"');
    }
  }

  return (
    <div>
      <h1>Add a New Student</h1>
      <form onSubmit={ postStudentDetails }>
        <label>
          Student Name : &nbsp;
          <input 
            placeholder='enter student name here...'
            onChange={(e)=>setStudentName(e.target.value)}
            value={studentname}
            required
          />
        </label><br /><br />
        <label>
          Student Gender &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; 
          <input 
            placeholder='enter Student gender here...'
            onChange={(e)=>setStudentGender(e.target.value)}
            value={studentgender}
            required
          />
        </label><br /><br />
        <button type='submit'>Add Student</button>
      </form>
    </div>
    
  )
}

export default CreateStudent;