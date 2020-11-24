import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import 'date-fns'; //@date-io/date-fns@1.x date-fns
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import axios from 'axios';
import Table from 'components/Table';
import getConfigs from 'configs/historyOrdersConfigs';
import * as thunks from 'thunks';

function HistoryOrders(props) {
    const { orders, searchOrders } = props;
    const [tag, setTag] = useState("");
    const [status, setStatus] = useState("");
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [reference, setReference] = React.useState("");

    const reset = () => {
        setTag("");
        setStatus("");
        setReference("");
        setSelectedDate(null);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleReferenceChange = (e) => {
        let value = e.currentTarget.value;
        setReference(value);
    }

    const search = () => {
        axios.get("/api/container/orders").then((res) => {
          let data = res.data;
          searchOrders(data);
        }).catch(err => {
          searchOrders([]);
        });
    }
    
    useEffect(() => {
      searchOrders();
    }, [searchOrders]);

    let tagElements = tags.map(item => 
    (
        <Button 
            key={item}
            color={tag === item ? "primary" : "default"} 
            variant="outlined" 
            onClick={() => setTag(item)}
        >
            {item[0].toUpperCase() + item.substr(1).toLowerCase()}
        </Button>
    ));

    let statusElements = statuses.map(item => 
    (
        <Button 
            key={item}
            color={status === item ? "primary" : "default"} 
            variant="outlined" 
            onClick={() => setStatus(item)}
        >
            {item[0].toUpperCase() + item.substr(1).toLowerCase()}
        </Button>
    ));

    return (
        <Container maxWidth={false} className="history-orders">
            <Box className="top-filter" display="flex" flexDirection="column" alignItems="flex-start">
                <Box display="flex" justifyContent="center" alignItems="center" paddingTop="15px">
                    <div className="title">Date</div>
                    <div className="customized-date-picker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                inputVariant="outlined"
                                margin="none"
                                variant="outlined"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" paddingTop="15px">
                    <div className="title">Reference</div>
                    <InputBase placeholder="" className="input-box" value={reference} onChange={handleReferenceChange} inputProps={{ 'aria-label': 'reference' }} />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" paddingTop="15px">
                    <div className="title">Tag</div>
                    {tagElements}
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" paddingTop="15px">
                    <div className="title">Status</div>
                    {statusElements}
                </Box>
                <Box display="flex" justifyContent="flex-start" alignItems="center" paddingLeft="155px" paddingTop="15px" paddingBottom="15px">
                    <Button variant="contained" color="primary" onClick={search}>
                        <SearchIcon />
                        <span>Search</span>
                    </Button>
                    <Button variant="outlined" color="primary" onClick={reset}>Reset</Button>
                </Box>
            </Box>
            <Box className="bottom-list">
                <Table data={orders} configs={getConfigs()} paging={false}/>
            </Box>
        </Container>
    );
}

let mapStateToProps = state => {
    return state.historyOrders;
};


let mapDispatchToProps = {
  searchOrders: thunks.searchOrders
}

let tags = ["All", "Initial", "In Progress", "Final"];
let statuses = ["All", "Waiting Confirm", "Confirmed", "Cancelled By Staff", "Cancelled By Me"];

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrders);