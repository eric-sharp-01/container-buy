import React from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Box from '@material-ui/core/Box';
import { ClickAwayListener } from '@material-ui/core';

export default function ProductPopper(props){
    const [open, setOpen] = React.useState(false);
    let button = React.useRef(null);
    const { row } = props;
    return (
        <React.Fragment>
            <Button variant="text" onClick={() => setOpen(!open)} ref={button} style={{color: "#1dad64"}}>Check</Button>
            <Popper open={open} anchorEl={button.current}>
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <div className="popper-style">
                        <Box display='flex' padding="5px" fontSize="15px" color="#323232" justifyContent="space-between">
                            <div>Brand</div><div>{row.brand}</div>
                        </Box>
                        <Box display='flex' padding="5px" fontSize="15px" color="#323232" justifyContent="space-between">
                            <div>Position</div><div>{row.position}</div>
                        </Box>
                        <Box display='flex' padding="5px" fontSize="15px" color="#323232" justifyContent="space-between">
                            <div>Tag</div><div>{row.tag}</div>
                        </Box>
                        <Box display='flex' padding="5px" fontSize="15px" color="#323232" justifyContent="space-between">
                            <div>Pattern</div><div>{row.pattern}</div>
                        </Box>
                        <div className="popper-arrow"></div>
                    </div>
                </ClickAwayListener>
            </Popper>
        </React.Fragment>
    );
}