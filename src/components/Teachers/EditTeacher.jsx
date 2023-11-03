import axios from 'axios';
import React, {  useState } from 'react';

function EditTeacher({teachers,fetchData}) {

  const [selectedId,setSelectedId] =useState('');
  const [teacherName,setTeacherName] = useState('');
  const [teacherRoll,setTeacherRoll] = useState('');

  const updateTeacherDetails = async (event) => {
    event.preventDefault();
    if(selectedId){
      let objectToUpdate = {
        id:selectedId,
        name:teacherName,
        roll:teacherRoll
      } 
      const response = await axios.put(`http://localhost:3000/teachers/${selectedId}`,objectToUpdate)
      fetchData()
      setSelectedId('');
      setTeacherName('');
      setTeacherRoll('');
      window.alert('selected teacher details hasbeen updated Successfully');
      const btnToHide = document.getElementById('hideBtn')
      const btnToShow = document.getElementById('showBtn'); 
      btnToHide.removeAttribute('style')
      btnToShow.setAttribute('style','display:none');
    }
  }
  
  const fetchTeacherDetails =  (event)=>{
      event.preventDefault();
      if (selectedId){
        const teacherDetails = teachers.filter(teacher=>teacher.id==selectedId);
        setTeacherName(teacherDetails[0].name);
        setTeacherRoll(teacherDetails[0].roll); 
        const btnToHide = document.getElementById('hideBtn')
        const btnToShow = document.getElementById('showBtn'); 
        btnToHide.setAttribute('style','display:none')
        btnToShow.removeAttribute('style');
      }else {
        window.alert('Please Select a Teacher Id to Edit/update')
      }
  }
  const style ={
    display :'none'
  }
  return (
        <div>
      <h2>Edit/ Update Teacher Details</h2>
      <form onSubmit={fetchTeacherDetails}>
        <label>
          Select an Id to Update :
          <select 
            onChange={(e)=>setSelectedId(e.target.value)}
          >
            <option>--select an id--</option>
            {
              teachers.map(teacher=><option key={teacher.id}>{ teacher.id }</option>)
            }
          </select>
          </label><br /><br />
          <div id='detailsShown'>
              <button type='submit'  id='hideBtn'>Show Details</button>
          </div>
      </form>
      <form onSubmit={updateTeacherDetails}>
      <div id='showBtn' style={ style }>
             <label>
                Teacher Name : 
              <input 
                value={teacherName}
                onChange={(e)=>setTeacherName(e.target.value)}
              />
              </label><br /><br />
              <label>
                Teacher Roll :
                <input
                value={teacherRoll}
                onChange={(e)=>setTeacherRoll(e.target.value)} 
                />
              </label><br /><br />
              <button type='submit'>Update</button>
              
            </div>
      </form>
    </div>
    
    
  )
}

export default EditTeacher;