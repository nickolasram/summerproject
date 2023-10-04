import { useState } from 'react';
import { useEffect } from 'react';
import Resourcecard from '../components/resourcecard';
import {Link} from "react-router-dom";
import Authenticated from '../components/Authentication';

let url = 'http://localhost:5001/?classTitle=';
const fetchData = async (title) => {
    url += title
    const student = JSON.parse(localStorage.getItem('token')).user;
    const studentString = '&username='+student;
    url += studentString;
  try {
    const response = await fetch(url);
    const body = await response.json();
    return body.classes;
  } catch (error) {
    alert(error);
  }
};

let SingleClass =props=> {
    const [course, setcourse] = useState('');
    const [resources, setresources] = useState('');
    useEffect(() => {
        let arValue = fetchData(props.title);
        arValue.then(function(result){
            setcourse(result[0]);
            setresources(result[0].resources);
        })
    }, []);
    if(!Authenticated()) {
        window.history.pushState({}, "Classlist", "/Classlist");
        window.location.reload();
      }
    return (
        <div id="wrapper">
            <div>
                {course === '' ? (
                    <h1>Loading...</h1>
                ) : (
                <div className="class">
                    <p><Link to={"/"}> back to full list </Link></p>
                    <h1>{course.title}</h1>
                    <p><em>{course.desc}</em></p>
                    <p className="link"><strong>prerequisite:</strong> <Link to={"/class/"+course.prereq}> {course.prereq} </Link></p>
                    <p><strong>Useful resources to prepare:</strong></p>
                    <ul>
                        {resources?.map((resources, index) => (
                            <li>
                                <Resourcecard 
                                title={resources.title} 
                                desc={resources.desc}
                                link={resources.link}
                                type={resources.type}
                                subject={props.title}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                )}
            </div>
        </div>
    );
  }
  
export default SingleClass;