import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ErrorIcon from '@material-ui/icons/Error';

function DeleteButton(props){
    const { row } = props;

    const deleteItem = () => {
        let dialogHeader = <Box display="flex" alignItems="center" fontSize={15}>
            <ErrorIcon style={{color: '#d95a22', paddingRight: 10}} />
            <span>Confirm to Delete This Line?</span>
        </Box>;
        let data = {
            dialogHeader,
            dialogContent: "This container will be refreshed",
            dialogCallbackFunc: () => props.deleteItem(row)
        }
        props.openDialog(data);
    }

    return (
        <Button onClick={deleteItem} className="customer-green">
            Delete
        </Button>
    );
}

let mapDispatchToProps = {
    deleteItem: (row) => { return {type: "DELETE_ITEM", payload: row}; },
    openDialog: (data) => ({type: "OPEN_DIALOG", payload: data})
};

export default connect(null, mapDispatchToProps)(DeleteButton);