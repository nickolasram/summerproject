import React from "react";
import Resourcecard from "./resourcecard";
import {Link} from "react-router-dom";
import { useState } from 'react';

const Classcard = props => {
    const resources = props.resources;
    const [expanded, setexpanded] = useState(false);
    const [completed, setComplete] = useState(props.completed);
    const toggle =()=> {
      if (expanded){
        return setexpanded(false)
      }
      setexpanded(true)
    }
    const toggleC =()=> {
      if (completed){
        return setComplete(false)
      }
      setComplete(true);
    }
    const addRemove=e=>{
      e.preventDefault();
      let url = 'http://localhost:5001/update/';
      if (completed){
        url += "remove"
      } else {
        url += "add"
      }
      url += '?username='+props.studentName+'&className='+props.title;
      toggleC();
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: ''
      })
      .then((response) => response.json())
    }
    return(
        <div className={props.type} id={props.title}>
            <h2  className={completed ? "compClass" : "IncClass"}><Link to={"/class/"+props.title}> {props.title} </Link></h2>
            <p><i>description: {props.desc}</i></p>
            {props.prereq === 'none' ? (
                <p><i>no prerequisites</i></p>
            ) : (
                <p className="link"><strong>prerequisite:</strong> <Link to={"/class/"+props.prereq}> {props.prereq} </Link></p>
            )}
            <p className="resources" onClick={toggle}>
              <strong>Useful resources to prepare {expanded===true ? '-' : '+'}</strong>
              </p>
            <ul className={expanded===true ? 'expanded' : 'collapsed'}>
                  {resources.map((resources, index) => (
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
            <section className="completion"> 
                    <p>
                      {completed ? "Completed" : "Incomplete"}
                    </p>
                    <button onClick={addRemove}>{ completed ? "Mark Incomplete" : "Mark Complete" }</button>
            </section>
        </div>
    );
};
export default Classcard;