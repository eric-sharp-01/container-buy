import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Home from 'views/Home';
import HistoryOrders from 'views/HistoryOrders';
import ContainerOrder from 'views/ContainerOrder';
import Account from 'views/Account';
import Navbar from 'components/Navbar';
import Cover from 'components/Cover';
import Box from '@material-ui/core/Box';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import * as thunks from 'thunks';

function Customer(props) {
    const [cookies, , removeCookie] = useCookies(['token', 'expires_in']);
    const { setProducts, setAccount, openDialog, history } = props;
    const [ready, setReady] = useState(false);

    useEffect(() => {
      let token = cookies.token;
      axios.defaults.headers.common = { 
          Authorization: `Bearer ${token}` 
      }
      let setAccountAsync = async () => {
        try {
          await setAccount();
          setReady(true);
        } catch {
          openDialog("Your credentials are incorrect")
          setReady(true);
          history.push('/login')
        }
      }
      setAccountAsync();

    }, [setAccount, setProducts, openDialog, history, removeCookie, cookies.token]);

    if(!ready){
        return <Cover />;
    }else{
        return <React.Fragment>
            <Navbar />
            <Box>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/history-orders" component={HistoryOrders} />
                    <Route exact path="/history-orders/:id" component={ContainerOrder} />
                    <Route exact path="/account" component={Account} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </Box>
        </React.Fragment>;
    }
}

let mapDispatchToProps = {
    setAccount: thunks.setAccount,
    setProducts: (data) => ({type: "SET_PRODUCTS", payload: data}),
    openDialog: (data) => ({type: "OPEN_DIALOG", payload: data})
}

export default connect(null, mapDispatchToProps)(Customer);