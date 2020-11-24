import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import * as thunks from 'thunks';

function Account(props){
    const { setAccount } = props;

    useEffect(() => {
      setAccount();
    }, [setAccount])



    return <Container className="account" maxWidth="lg">
        <Box className="header">
            <ErrorOutlineIcon />
            <span>If you have any questions about the following information or need to modify, please contact our customer service staff.</span>
        </Box>
        <Box className="profile">
            <div className="profile-title">Profile</div>
            <Paper className="information">
                <Box display="flex" paddingLeft="10%" marginTop="15px">
                    <div className="info-title">Customer Name</div>
                    <div className="info-content">{props.name}</div>
                </Box>
                <Box display="flex" paddingLeft="10%" marginTop="15px">
                    <div className="info-title">Default Address</div>
                    <div className="info-content">{props.address}</div>
                </Box>
                <Box display="flex" paddingLeft="10%" marginTop="15px">
                    <div className="info-title">Email</div>
                    <div className="info-content">{props.email}</div>
                </Box>
                <Box display="flex" paddingLeft="10%" marginTop="15px">
                    <div className="info-title">Phone</div>
                    <div className="info-content">{props.phone}</div>
                </Box>
                <Box display="flex" paddingLeft="10%" marginTop="15px">
                    <div className="info-title">Currency</div>
                    <div className="info-content">{props.currency}</div>
                </Box>
            </Paper>
        </Box>
    </Container>
}

let mapStateToProps = state => {
    return state.account;
}

let mapDispatchToProps = {
    setAccount: thunks.setAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);