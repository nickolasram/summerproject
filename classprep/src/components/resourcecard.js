import React from "react";

const Resourcecard = props => {
    return(
        <div className="resourceCard">
            <a href={props.link}>{props.title}</a>
            <p><i>{props.desc} on {props.subject}</i></p>
        </div>
    );
};

export default Resourcecard;