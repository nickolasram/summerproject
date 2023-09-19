import { useState } from 'react';
import { useEffect } from 'react';
import Classcard from '../components/classcard';

const url = 'http://localhost:5001/?classTitle=';
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const body = await response.json();
    return body.classes;
  } catch (error) {
    alert(error);
  }
};

let Classlist = () => {
    const [classes, setclasses] = useState('');
    useEffect(() => {
        let arValue = fetchData();
        arValue.then(function(result){
          setclasses(result);
          console.log(result);
        })
    }, []);
    return (
        <div id="wrapper">
          <h1>Course Map:</h1>
            <div>
                {classes === '' ? (
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
                      />
                    </section>
                  ))}
                </div>
                )}
            </div>
        </div>
    );
  }
  
export default Classlist;