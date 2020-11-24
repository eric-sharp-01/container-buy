import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';

function AddButton(props){
    const { row } = props;
    const [qty, setQty] = useState(1);
    const handleChange = (e) => {
        let v = Number(e.target.value);
        if(v <= row.orderQtyAvail && v > 0){
            setQty(v);
        }
    }

    const handleClick = function(){
        let found = props.cart.find(item => item.brand !== row.brand);
        if(found){
            let data = {
                dialogContent: "The brand group of the current product is different from others"
            }
            props.openDialog(data);
        }else{
            props.addToCart({ ...row, qty });
        }
    };

    return (
        <Box display="flex" paddingRight="5px" paddingY="4px">
            <Input value={qty} style={{marginRight: 5}} className="text-align-center" inputProps={{ 'aria-label': 'qty' }} type="number" onChange={handleChange} />
            <Button variant="contained" disabled={!row.orderQtyAvail} color="primary" onClick={handleClick}>
                Add
            </Button>
        </Box>
    );
}

let mapStateToProps = state => {
    return {
        cart: state.product.cart
    }
}

let mapDispatchToProps = {
    addToCart: (row) => { return {type: "ADD_TO_CART", payload: row}; },
    openDialog: (data) => ({type: 'OPEN_DIALOG', payload: data})
};

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);