import axios from 'axios';
import React, { useState } from 'react';

function DeleteTeacher({teachers,fetchData}) {

  const [selectedId,setSelectedId] = useState(''); 
  const [teacherName,setTeacherName] = useState('');
  const [teacherRoll,setTeacherRoll] = useState('');

  const fetchTeacherDetails =  (event)=>{
    event.preventDefault();
    if (selectedId){
      const teacherDetails = teachers.filter(teacher=>teacher.id==selectedId);
      setTeacherName(teacherDetails[0].name);
      setTeacherRoll(teacherDetails[0].roll); 
      const btnToHide = document.getElementById('hideBtn');
      const btnToShow = document.getElementById('showBtn'); 
      btnToHide.setAttribute('style','display:none')
      btnToShow.removeAttribute('style');
    }else{
      window.alert('Please Select an Id to Delete')
    }
  }
  const deleteTeacher = async (e)=>{
    e.preventDefault();
    const response = await axios.delete(`http://localhost:3000/teachers/${selectedId}`)
    fetchData();
    const btnToShow = document.getElementById('hideBtn');
    const btnToHide = document.getElementById('showBtn');
    btnToShow.removeAttribute('style');
    btnToHide.setAttribute('style','display:none');
    window.alert('Selected Teacher Details Deleted Successfully...')
  }
const style ={
  display :'none'
}
  return (
    <div>
      <h1>Delete Teacher Details</h1>
      <form onSubmit={fetchTeacherDetails}>
        <label>
          Select an Id to Delete :
          <select onChange={(e)=>setSelectedId(e.target.value)}>
            <option>select an id</option>
            {
              teachers.map(teacher=><option key={teacher.id}>{ teacher.id }</option>)
            }
          </select>
        </label><br /><br />
        <button type='submit' id='hideBtn'>Get Details</button>
      </form>
      <form onSubmit={deleteTeacher}>
        <div id='showBtn' style={ style }>
          <label>Teacher Name : { teacherName }</label><br /><br />
          <label>Teacher Roll : { teacherRoll }</label><br /><br />
          <button type='submit'>Delete</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteTeacher;