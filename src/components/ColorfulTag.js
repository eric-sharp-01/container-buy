import React from 'react';

function ColorfulTag(props){
    const { value } = props;
    let colorClass = "";
    let caseValue = value.toLowerCase();
    switch(caseValue){
        case "initial":
            colorClass = "customer-yellow";
            break;
        case "in progress":
            colorClass = "customer-green";
            break;
        case "final":
            colorClass = "customer-blue";
            break;
        default:
            colorClass = "normal";
            break;
    }
    return (
        <div className={colorClass}>
            {value}
        </div>
    );
}

export default ColorfulTag;