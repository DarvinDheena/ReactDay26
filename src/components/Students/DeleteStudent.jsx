import axios from 'axios';
import React, { useState } from 'react';

function DeleteStudent({students,fetchData}) {
  const [selectedId,setSelectedId] =useState('');
  const [studentName,setStudentName] = useState('');
  const [studentGender,setStudentGender] = useState('');

  const fetchStudentDetails =  (event)=>{
    event.preventDefault();
    if (selectedId){
      const studentDetails = students.filter(student=>student.id==selectedId);
      setStudentName(studentDetails[0].name);
      setStudentGender(studentDetails[0].gender); 
      const btnToHide = document.getElementById('hideBtn')
      const btnToShow = document.getElementById('showBtn'); 
      btnToHide.setAttribute('style','display:none')
      btnToShow.removeAttribute('style');
    }else {
      window.alert('Please Select a Student Id to Delete')
    }
}
  const deleteStudent = async (e)=>{
    e.preventDefault();
    const response = await axios.delete(`http://localhost:3000/students/${selectedId}`)
    fetchData();
    const btnToShow = document.getElementById('hideBtn');
    const btnToHide = document.getElementById('showBtn');
    btnToShow.removeAttribute('style');
    btnToHide.setAttribute('style','display:none');
    window.alert('Selected Student Details Deleted Successfully...')
  }
const style ={
  display :'none'
}
  return (
    <div>
      <h1>Delete Student Details</h1>
      <form onSubmit={fetchStudentDetails}>
        <label>
          Select an Id to Delete :
          <select onChange={(e)=>setSelectedId(e.target.value)}>
            <option>select an id</option>
            {
              students.map(student=><option key={student.id}>{ student.id }</option>)
            }
          </select>
        </label><br /><br />
        <button type='submit' id='hideBtn'>Get Details</button>
      </form>
      <form onSubmit={deleteStudent}>
        <div id='showBtn' style={ style }>
          <label>Student Name : { studentName }</label><br /><br />
          <label>Student Gender : { studentGender }</label><br /><br />
          <button type='submit'>Delete</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteStudent;