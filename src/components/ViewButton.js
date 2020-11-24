import React from 'react';
import Button from '@material-ui/core/Button';

function ViewButton(props){
    const { value } = props;
    const handleClick = function(){
        window.open(`/history-orders/${value}`);
    };

    return <Button onClick={handleClick} style={{margin: 4}} className="customer-green" variant="contained">View</Button>;
}

export default ViewButton;