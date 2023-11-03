import axios from 'axios';
import React, { useState } from 'react';

function EditStudent({students,fetchData}) {

  const [selectedId,setSelectedId] =useState('');
  const [studentName,setStudentName] = useState('');
  const [studentGender,setStudentGender] = useState('');

  const updateStudentDetails = async (event) => {
    event.preventDefault();
    if(selectedId){
      let objectToUpdate = {
        id:selectedId,
        name:studentName,
        gender:studentGender
      } 
      const response = await axios.put(`http://localhost:3000/students/${selectedId}`,objectToUpdate)
      fetchData()
      setSelectedId('');
      setStudentName('');
      setStudentGender('');
      window.alert('selected student details hasbeen updated Successfully');
      const btnToHide = document.getElementById('hideBtn')
      const btnToShow = document.getElementById('showBtn'); 
      btnToHide.removeAttribute('style')
      btnToShow.setAttribute('style','display:none');
    }
  }
  
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
        window.alert('Please Select a Student Id to Edit/update')
      }
  }
  const style ={
    display :'none'
  }

  return (
    <div>
      <h2>Edit/ Update Student Details</h2>
      <form onSubmit={fetchStudentDetails}>
        <label>
          Select an Id to Update :
          <select 
            onChange={(e)=>setSelectedId(e.target.value)}
          >
            <option>--select an id--</option>
            {
              students.map(student=><option key={student.id}>{ student.id }</option>)
            }
          </select>
          </label><br /><br />
          <div id='detailsShown'>
              <button type='submit'  id='hideBtn'>Show Details</button>

          </div>
      </form>
      <form onSubmit={updateStudentDetails}>
      <div id='showBtn' style={ style }>
             <label>
                Student Name : 
              <input 
                value={studentName}
                onChange={(e)=>setStudentName(e.target.value)}
              />
              </label><br /><br />
              <label>
                Student Gender :
                <input
                value={studentGender}
                onChange={(e)=>setStudentGender(e.target.value)} 
                />
              </label><br /><br />
              <button type='submit'>Update</button>
              
            </div>
      </form>
    </div>
  )
}

export default EditStudent;