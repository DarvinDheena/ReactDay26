import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Teachers from './components/Teachers/Teachers';
import CreateTeacher from './components/Teachers/CreateTeacher';
import EditTeacher  from './components/Teachers/EditTeacher';
import DeleteTeacher from './components/Teachers/DeleteTeacher';
import Students from './components/Students/Students';
import CreateStudent from './components/Students/CreateStudent';
import EditStudent from './components/Students/EditStudent';
import DeleteStudent from './components/Students/DeleteStudent';
import '../src/App.css'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';


const styles = {
  listHeader : {
    textAlign:"center"
  }
}

function App() {
  const [teachers,setTeachers] = useState([]);
  const [students,setStudents] = useState([]);

  const fetchData =async ()=>{
    try {
      const responseTeacher = await axios.get('http://localhost:3000/teachers')
      setTeachers(responseTeacher.data);
      const responseStudent = await axios.get('http://localhost:3000/students')
      setStudents(responseStudent.data);
    }catch (error){
      console.log('error',error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[]);


  return (
    <Router>
        <div className='grid-container'>
        <div className='grid-item-1'>
          <h1>Student & Teacher Management</h1>
        </div>
        <div className='grid-item-2'>
          <h3 style={styles.listHeader}>Teachers : </h3>
          <div>
              <Link to='/'></Link>
              <Link to='/teachers' className='link'>Show Teachers</Link>
              <Link to='/teachers/create' className='link'>Add New Teacher</Link>
              <Link to='/teachers/edit' className='link'>Edit Teacher Details</Link>
              <Link to='/teachers/delete' className='link'>Delete Teacher</Link>
          </div>
          <h3 style={styles.listHeader}>Students : </h3>
          <div>
              <Link to="students" className='link'>Show Students</Link>
              <Link to='/students/create' className='link'>Add New Student</Link>
              <Link to='/students/edit' className='link'>Edit Student Details</Link>
              <Link to='/students/delete' className='link'>Delete Student</Link>
          </div>
        </div>
        <div className='grid-item-3'>
          <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/teachers' element={ <Teachers teachers={ teachers } /> }></Route>
            <Route path='/teachers/create' element={<CreateTeacher fetchData={ fetchData }/>}></Route>
            <Route path='/teachers/edit' element={<EditTeacher teachers={ teachers } fetchData={ fetchData }/>}></Route>
            <Route path='/teachers/delete' element={<DeleteTeacher teachers={ teachers } fetchData={ fetchData }/>}></Route>
            
            <Route path='/students' element={ <Students students={ students }/> }></Route>
            <Route path='/students/create' element={<CreateStudent fetchData={ fetchData }/>}></Route>
            <Route path='/students/edit' element={<EditStudent students={ students } fetchData={ fetchData }/>}></Route>
            <Route path='/students/delete' element={<DeleteStudent students={ students } fetchData={ fetchData } />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
    
  )
}

export default App;