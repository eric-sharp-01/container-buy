import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function PromptDialog(props){

    const handleClose = () => {
        props.closeDialog();
    }

    const handleConfirm = () => {
        props.dialogCallbackFunc();
        props.closeDialog();
    }

    const confirm = props.dialogCallbackFunc ? <Button onClick={handleConfirm} color="primary">
        Sure
    </Button> : null;
    return (
        <Dialog
            open={props.openDialog}
            onClose={handleClose}
            fullWidth={true}
        >
            <DialogTitle>{props.dialogHeader || "ALERT"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {props.dialogContent}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {props.dialogCallbackFunc ? "Cancel" : "OK"}
                </Button>
                {confirm}
            </DialogActions>
        </Dialog>
    );
}

let mapStateToProps = (state) => ({
    openDialog: state.main.openDialog,
    dialogHeader: state.main.dialogHeader,
    dialogContent: state.main.dialogContent,
    dialogCallbackFunc: state.main.dialogCallbackFunc
});

let mapDispatchToProps = {
    closeDialog: (value = null) => ({type: "CLOSE_DIALOG", payload: value})
}

export default connect(mapStateToProps, mapDispatchToProps)(PromptDialog);