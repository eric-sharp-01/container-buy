import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ErrorIcon from '@material-ui/icons/Error';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import axios from 'axios';

let useStyles = makeStyles(() => {
    return {
        paper: {
            width: "240px"
        }
    }
});

const paths = {
    home: "/",
    orderHistory: "/history-orders",
    account: "/account",
};

const Navbar = (props) => {
    const [, , removeCookie] = useCookies(["token"]);
    const getPath = (pathname) => {
        let path = props.history.location.pathname;
        return path === pathname ? "link active" : "link";
    }

    const jump = (path) => {
        props.history.push(path);
    }

    const [anchor, setAnchor] = useState(false);

    const toggleDrawer = () => {
        setAnchor(!anchor);
    }

    const logoutProcess = () => {
        props.setProducts([]);
        removeCookie("token");
        removeCookie("expiryTime");
        axios.defaults.headers.common = {};
        props.history.push("/login");
    }

    const logout = () => {
        let dialogHeader = <Box display="flex" alignItems="center" fontSize={15}>
            <ErrorIcon style={{color: '#d95a22', paddingRight: 10}} />
            <span>Confirm to logout?</span>
        </Box>;
        let process = {
            dialogContent: "Thanks for using this system",
            dialogHeader,
            dialogCallbackFunc: logoutProcess,
        };
        props.openDialog(process);
    }
    let name = props.name;
    let classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static" className="navbar">
                <Toolbar>
                    <Box className="heading">
                        ONYX TYRES AND AUTOPARTS
                    </Box>
                    <Box display="flex" height={64} flex="1">
                        <Link to={paths.home} className={getPath(paths.home)}>Load Container</Link>
                        <Link to={paths.orderHistory} className={getPath(paths.orderHistory)}>Order History</Link>
                        <Link to={paths.account} className={getPath(paths.account)}>Account</Link>
                    </Box>
                    <Box className="account-area" display="flex" alignItems="center" height={64}>
                        <Button color="inherit">{name}</Button>
                        <div className="divider"></div>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <AppBar position="static" className="phone-navbar">
                <Toolbar>
                    <Box className="heading">
                        <IconButton onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box className="account-area" display="flex" alignItems="center" height={64}>
                        <Button color="inherit">{name}</Button>
                        <div className="divider"></div>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor={"left"} 
                classes={classes}
                open={anchor}
                onClose={toggleDrawer}
            >
                <div className="phone-navbar">
                    <IconButton onClick={toggleDrawer}>
                        {anchor ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={() => jump(paths.home)}>
                        <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                        <ListItemText primary="Load Container" />
                    </ListItem>
                    <ListItem button onClick={() => jump(paths.orderHistory)}>
                        <ListItemIcon><HistoryIcon /></ListItemIcon>
                        <ListItemText primary="Order History" />
                    </ListItem>
                    <ListItem button onClick={() => jump(paths.account)}>
                        <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    );
}

let mapStateToProps = state => ({
    name: state.account.name
});

let mapDispatchToProps = {
    openDialog: (data) => ({type: "OPEN_DIALOG", payload: data}),
    setConfirmFunction: (func) => ({type: "SET_CONFIRM_FUNCTION", payload: func}),
    setDialogHeader: (message) => ({type: "SET_DIALOG_HEADER", payload: message}),
    setProducts: (data) => ({type: "SET_PRODUCTS", payload: data})
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));