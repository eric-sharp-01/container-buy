import React from 'react';

function ColorfulStatus(props){
    const { value } = props;
    let colorClass = "";
    let caseValue = value.toLowerCase();
    switch(caseValue){
        case "waiting confirm":
            colorClass = "customer-green";
            break;
        case "confirmed":
            colorClass = "customer-blue";
            break;
        case "cancelled by staff":
            colorClass = "customer-red";
            break;
        case "cancelled by me":
            colorClass = "customer-red";
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

export default ColorfulStatus;