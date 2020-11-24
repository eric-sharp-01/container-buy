import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from 'components/Table';
import ErrorIcon from '@material-ui/icons/Error';
import getConfigs, { getProperties } from 'configs/containerOrderConfigs';
import Cover from 'components/Cover';
import ColorfulStatus from 'components/ColorfulStatus';
import axios from 'axios';

function ContainerOrder(props) {
    const id = props.match.params.id;
    const [properties, setProperties] = useState(null);
    const [table, setTable] = useState([]);
    useEffect(() => {
        axios.get('/api/container/orders/' + id).then(res => {
            let data = res.data['data'];
            let details = res.data['data'].details.map((item, i) => {
                return {
                    ...item,
                    index: i + 1
                };
            });
            delete data.details;
            setProperties(data);
            setTable(details);
        })
    }, [id]);

    const sendCancelOrder = () => {
        axios.delete(`/api/container/orders/${id}`).then(res => {
            props.openDialog({dialogContent: "The has been deleted successfully"});
            props.history.push('/history-orders');
        }).catch(err => {
            props.openDialog({dialogContent: "Failed to delete"});
            props.history.push('/history-orders');
        })
    }

    const cancelOrder = () => {
        let dialogHeader = <Box display="flex" alignItems="center" fontSize={15}>
            <ErrorIcon style={{color: '#d95a22', paddingRight: 10}} />
            <span>Confirm to cancel this order?</span>
        </Box>;
        let process = {
            dialogContent: "",
            dialogHeader,
            dialogCallbackFunc: sendCancelOrder,
        };
        props.openDialog(process);
    }
    
    let cancelAvailable = properties && properties.status === 'Waiting Confirm';
    let cancelButton = cancelAvailable ? <Button variant="contained" color="default" disabled={!cancelAvailable} className="cancel-button" onClick={cancelOrder}>
        Cancel
    </Button> : null;
    let status = properties ? <div className="status-heading"><ColorfulStatus value={properties.status} /></div> : null;
    return !properties ? <Cover /> : (
        <Container maxWidth={false} className="container-order">
            <Box className="header" padding="15px 0" display="flex" justifyContent="space-between" alignItems="center">
                <div className="container-order-title">
                    <div>Container Pre-Order Detail</div> 
                    {status}
                </div>
                <div className="container-order-buttons">
                    {cancelButton}
                    <Button variant="contained" color="primary" onClick={() => window.close()}>
                        Back
                    </Button>
                </div>
            </Box>
            <Box padding="15px" bgcolor="white" marginTop="15px" border="1px solid #D8D8D8" borderRadius="10px">
                <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className="property-item">
                            <Box className="item-title">Reference</Box> 
                            <Box className="item-value grey-value">{properties.refNumber}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className="property-item">
                            <Box className="item-title">Tag</Box> 
                            <Box className="item-value grey-value">{properties.tag}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className="property-item">
                            <Box className="item-title">Date</Box> 
                            <Box className="item-value grey-value">{properties.date}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className="property-item">
                            <Box className="item-title">Phone</Box> 
                            <Box className="item-value grey-value">{properties.phone}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <Box className="property-item">
                            <Box className="item-title">Address</Box> 
                            <Box className="item-value grey-value" color="#919191">{properties.address}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Box className="property-item">
                            <Box className="item-title">Note</Box> 
                            <Box className="item-value grey-value" color="#919191">{properties.note}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Box className="property-item">
                            <Box className="item-title">Comments</Box> 
                            <Box className="item-value grey-value">{properties.comments}</Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box padding="15px" bgcolor="white" marginTop="15px" border="1px solid #D8D8D8" borderRadius="10px">
                <Grid container spacing={2}>
                    {
                        getProperties(properties.currency, Number(properties.currencyRate)).map((item, i) => {
                            let value = properties[item.field];
                            return (
                                <Grid item key={i} xs={6} sm={4}>
                                    <Box display="flex" className="property-item">
                                        <Box className="item-title">{item.name}</Box>
                                        <Box className="item-value">{item.getter(value)}</Box>
                                    </Box>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Box>
            <Box padding="15px" bgcolor="white" marginTop="15px" border="1px solid #D8D8D8" borderRadius="10px">
                <Table configs={getConfigs(properties.currency)} data={table} paging={false} />
            </Box>
        </Container>
    );
}

let mapStateToProps = state => {
    return { ...state.containerOrder, rate: state.account.rate };
};

let mapDispatchToProps = {
    openDialog: (data) => ({type: "OPEN_DIALOG", payload: data}),
    closeDialog: (value = null) => ({type: "CLOSE_DIALOG", payload: value}),
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerOrder);