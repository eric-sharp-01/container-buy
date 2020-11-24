import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';

function NumberInput(props){
    const { row } = props;
    const handleChange = function(e){
        //process data
        let regex = /^[0-9]+$/g;
        if(regex.test(e.target.value) && Number(e.target.value) > 0 && Number(e.target.value) <= row.orderQtyAvail){
            let rowUpdated = { ...row, qty: Number(e.target.value) };
            props.setItemQuantity(rowUpdated);
        }
    };

    return (
        <Input className="text-align-center" onChange={handleChange} value={row.qty}></Input>
    );
}

let mapDispatchToProps = {
    setItemQuantity: (row) => { return {type: "SET_ITEM_QUANTITY", payload: row}; }
};

export default connect(null, mapDispatchToProps)(NumberInput);