import React from "react";
import Resourcecard from "./resourcecard";
import {Link} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

const Classcard = props => {
    const resources = props.resources;
    const [expanded, setexpanded] = useState(false);
    const toggle =()=> {
      if (expanded){
        return setexpanded(false)
      }
      setexpanded(true)
    }
    return(
        <div className={props.type} id={props.title}>
            <h2 className="link"><Link to={"/class/"+props.title}> {props.title} </Link></h2>
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
        </div>
    );
};

export default Classcard;