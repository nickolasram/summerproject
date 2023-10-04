import { useState } from 'react';
import { useEffect } from 'react';
import Classcard from '../components/classcard';
import {Link} from "react-router-dom";
import Authenticated from '../components/Authentication';

let url = 'http://localhost:5001/?classTitle=';
const student = JSON.parse(localStorage.getItem('token'))?.user;
const studentString = '&username='+student;
url = url + studentString;
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const body = await response.json();
    return {allClasses: body.classes,
            completedClasses: body.completed};
  } catch (error) {
    alert(error);
  }
};
let Classlist = () => {
    const [classes, setclasses] = useState('');
    const [complete, setComplete] = useState('');
    const notLoaded=()=>{
      return classes === '' || complete ==='';
    }
    if(!Authenticated()) {
      window.history.pushState({}, "", "/");
      window.location.reload();
    }
    const checkForClass=(givenClass, classArray)=>{
      return classArray.includes(givenClass);
    }
    useEffect(() => {
      const asyncFn = async () => { 
        try {
          const response = await fetch(url);
          const body = await response.json();
          setclasses(body.classes);
          setComplete(body.completed);
          return {allClasses: body.classes,
                  completedClasses: body.completed};
        } catch (error) {
          alert(error);
        }
       };
      asyncFn();
    }, []);
    return (
        <div id="wrapper">
          <h1>Course Map:</h1>
            <div>
                {notLoaded() ? (
                    <h1>Loading...</h1>
                ) : (
                  <div id="classlist">
                  {classes.map((classes, index) => (
                    <section>
                      <Classcard
                      type={classes.type}  
                      title={classes.title} 
                      desc={classes.desc}
                      prereq={classes.prereq}
                      resources ={classes.resources}
                      completed={checkForClass(classes.title,complete)}
                      studentName={student}
                      />
                    </section>
                  ))}
                </div>
                )}
            </div>
            <button onClick={()=>{
              localStorage.removeItem("token");
              window.history.pushState({}, "", "/");
              window.location.reload();
            }}>Logout</button>
        </div>
    );
  }
  
export default Classlist;