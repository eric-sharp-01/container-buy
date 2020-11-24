import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

function DeleteButton(props){
    const { row } = props;
    const handleClick = function(){
        //process data
        props.deleteItem(row);
    };

    return (
        <Button onClick={handleClick} style={{color: "#1dad64"}}>
            Delete
        </Button>
    );
}

let mapStateToProps = state => ({});
let mapDispatchToProps = {
    deleteItem: (row) => { return {type: "DELETE_ITEM", payload: row}; }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);