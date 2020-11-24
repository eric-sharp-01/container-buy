import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';

let useStyles = makeStyles(theme => ({
    root: {
        marginBottom: 15
    }
}));

function Auth(props){
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [, setCookie, ] = useCookies(["token", "expiryTime"]);
    const [disabled, setDisabled] = useState(false); 
    const handleClick = () => {
        setDisabled(true);
        let payload = {
            username: form.email,
            password: form.password
        }
        axios.post('/api/auth', payload).then(({ data }) => {
            axios.defaults.headers.common = { 
                Authorization: `${data.tokenType} ${data.token}` 
            }
            setCookie("token", data.token);
            props.history.push("/");
        }).catch(() => {
            setDisabled(true);
            props.openDialog({dialogContent: "Your credentials are incorrect"});
            props.history.push("/");
            setCookie("token", "test1234");
        })
    }

    const handleInput = (e) => {
        let field = e.target.getAttribute("name");
        let value = e.currentTarget.value;
        setForm({
            ...form,
            [field]: value
        })
    }
    let classes = useStyles();
    return <Container className="auth" maxWidth={false}>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <Box className="left">
                    <div className="container-buy-logo"></div>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box className="right">
                    <h2>Sign In</h2>
                    <div className="note">Sign in with your account email and password</div>
                    <TextField label="Email" classes={classes} disabled={disabled || props.disabledSubmit} className="input-box" value={form.email} name="email" onChange={handleInput} variant="outlined" />
                    <TextField label="Password" type="password" classes={classes} disabled={disabled || props.disabledSubmit} className="input-box" value={form.password} name="password" onChange={handleInput} variant="outlined" />
                    <Button variant="contained" onClick={handleClick} disabled={disabled || props.disabledSubmit} className="sign-in" color="primary" size="large">
                        {(disabled || props.disabledSubmit) ? "Loading..." : "Submit"}
                    </Button>
                    <div className="forget-password">
                        <span>Or</span>
                        <span>Forget/Change password?</span>
                    </div>
                </Box>
            </Grid>
        </Grid>
    </Container>
}

let mapDispatchToProps = {
    openDialog: (data) => ({type: "OPEN_DIALOG", payload: data})
}

export default connect(null, mapDispatchToProps)(Auth);