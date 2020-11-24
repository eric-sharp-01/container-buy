import React from 'react';

function BlueBoldText(props){
    const { value } = props;

    return (
        <div className="customer-blue"><strong>{value}</strong></div>
    );
}


export default BlueBoldText;