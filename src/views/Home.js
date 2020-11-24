import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorIcon from '@material-ui/icons/Error';
import Tabs from 'components/Tabs';
import ImagePopper from 'components/ImagePopper';
import Table from 'components/Table';
import getProductListConfigs from 'configs/productListConfigs';
import getCartConfigs from 'configs/cartConfigs';
import getCartPreviewConfigs from 'configs/cartPreviewConfigs';
import { emptyCart } from 'configs/cartConfigs';
import axios from 'axios';
import qs from 'query-string';
import * as thunks from 'thunks';
import * as actions from 'actions';

function Home(props) {
    const [brandGroup, setBrandGroup] = useState(null);
    const [brandGroups, setBrandGroups] = useState([]);
    const [specification, setSpecification] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [steer, setSteer] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [drive, setDrive] = useState(null);
    const [position, setPosition] = useState(null);
    const [positionPattern, setPositionPattern] = useState(null);
    const [currentSearchTabIndex, setCurrentSearchTabIndex] = useState(0);

    const reset = () => {
        setBrandGroup(null);
        setSpecification("");
        setCategory("");
    }

    const {
        containerSize, cart, 
        products, searchProducts, setAccount,
        currency, updateCartAfterPurchase, openDialog, gstRate, currencyRate,
        address, phone, productTotalCount
    } = props;

    const internationalFreight = props[`internationalFreight${containerSize}`];
    const localFreight = props[`localFreight${containerSize}`];
    const clearanceCost = props[`clearanceCost${containerSize}`];

    const fixedTo = (n) => {
        return Number(n).toFixed(2);
    }
    const from = "USD";

    const search = (event) => {
        let searchQuery = {
            category: category ? [category] : [],
            brand_group: brandGroup ? [brandGroup.groupName] : [],
            quick_spec: specification
        };
        switch (currentSearchTabIndex) {
            case 0: // 0: TBR
                searchQuery = {
                    ...searchQuery,
                    steer: steer ? steer.pattern : "",
                    trailer: trailer ? trailer.pattern : "",
                    drive: drive ? drive.pattern : "",
                    position: position ? position.pattern : ""
                };
                break;
            case 1: // 1 PCR
                searchQuery = {
                    ...searchQuery,
                    pattern: positionPattern ? positionPattern.pattern : ""
                };
                break;
            default:
                break;
        }
        let queryString = qs.stringify(searchQuery);
        searchProducts(queryString);
    }

    useEffect(() => {
      axios.get("/api/container/brandgroups").then(({ data }) => {
          setBrandGroups(data);
      }).catch(err => {
          setBrandGroups([]);
      }).finally(res => {

      });

      axios.get("/api/container/categories").then(res => {
          let payload = res.data;
          setCategories(payload);
      }).catch(err => {
          setCategories([]);
      });
    }, [setBrandGroups, setCategories]);

    const handleSpecificationChange = (e) => {
        let v = e.target.value;
        setSpecification(v);
    };

    const handleContainerSizeChange = (e) => {
        let size = Number(e.target.value);
        let dialogHeader = <Box display="flex" alignItems="center" fontSize={15}>
            <ErrorIcon style={{color: '#d95a22', paddingRight: 10}} />
            <span>Confirm to Switch Size?</span>
        </Box>;
        let data = {
            dialogHeader,
            dialogContent: "The WHOLE container will refreshed",
            dialogCallbackFunc: () => props.setContainerSize(size)
        }
        props.openDialog(data);
    };

    const [stepName, setStepName] = useState('Step 1')
    const handleCartPreviewBack = () => {
        if(stepName === 'Step 2'){
            setStepName('Step 1');
        }else{
            setOpenCartPreview(false);
        }
    };

    const handleCartPreviewNext = () => {
        if(stepName === 'Step 1'){
            setStepName('Step 2');
        }
    };

    const [openCartPreview, setOpenCartPreview] = useState(false);

    const handleCartPreviewClose = () => {
        setOpenCartPreview(false);
    }
    const handleCartPreviewOpen = () => {
        setOpenCartPreview(true);
    }
    const placeOrder = () => {
        if(!cart || cart.length === 0){
            openDialog({dialogContent: emptyCart});
            return;
        }
        handleCartPreviewOpen();
    }

    const sendOrder = () => {
        ///TODO: remove this test object
        let t = {
            uuid: (new Date()).getTime(),
            address,
            phone,
            note,
            containerSize
        };
        t.lines = cart.map((item, i) => {
            return {
                ...item,
                quantity: item.qty,
                productId: item.id,
                seq: i + 1
            }
        });
        handleCartPreviewClose();
        axios.post('/api/container/orders', t).then(res => {
            openDialog({dialogContent: "The order has been placed!"});
            updateCartAfterPurchase([]);
            setTimeout(() => {
                props.history.push('/history-orders');
            }, 500);
        }).catch(err => {
            console.log(err);
        })
    }

    const clearAll = () => {
        let dialogHeader = <Box display="flex" alignItems="center" fontSize={15}>
            <ErrorIcon style={{color: '#d95a22', paddingRight: 10}} />
            <span>Confirm to Clear All?</span>
        </Box>;
        let data = {
            dialogHeader,
            dialogContent: "The container will be emptied",
            dialogCallbackFunc: () => updateCartAfterPurchase([])
        }
        openDialog(data);
    }

    const brandGroupElements = brandGroups.map((item, index) => 
        (
            <Button 
                key={index}
                color={(brandGroup && item.groupName === brandGroup.groupName) ? "primary" : "default"} 
                variant="outlined" 
                onClick={() => setBrandGroup(item)}
            >
                {item.groupName}
            </Button>
        ));
    const brandGroupBox = brandGroups.length ? <Box className="query-box">
        <div className="title">Brand Group</div>
        <Box className="query-items">{brandGroupElements}</Box>
    </Box> : null;
    const categoryElements = categories.map(item => 
        (
            <Button 
                key={item}
                color={item === category ? "primary" : "default"} 
                variant="outlined" 
                onClick={() => setCategory(item)}
            >
                {item}
            </Button>
        ));
    const categoryBox = categories.length ? <Box className="query-box">
        <div className="title">Category</div>
        <Box className="query-items">{categoryElements}</Box>
    </Box> : null;
    
    // values in common
    const rate = currencyRate;
    const to = currency;
    const getCartGst = () => {
        return cart.reduce((previous, item, index) => {
            return previous + item.qty * Number(item.usdFOB) * gstRate;
        }, 0);
    }
    const getCartQty = () => {
        return cart.reduce((previous, item, index) => {
            return previous + item.qty;
        }, 0);
    }

    const feesAndGstSummary = internationalFreight + localFreight + clearanceCost + getCartGst();
    const tyresSubtotal = cart.reduce(function(pre, current, index) {
        return pre + current.qty * current.usdFOB;
    }, 0);
    const totalQuantity = getCartQty();
    const totalPrice = tyresSubtotal + feesAndGstSummary;
    const [note, setNote] = useState('');
    const [revealedItems, setRevealedItems] = useState([]);

    const toggleClickItem = (e) => {
        let i = Number(e.target.getAttribute('data-id'));
        if(revealedItems.includes(i)){
            let newItems = revealedItems.filter(item => item !== i);
            setRevealedItems(newItems);
        }else{
            setRevealedItems([...revealedItems, i]);
        }
    }

    const getRightTopList1 = (hasCover = true, full = true) => <List component="nav" aria-label="" className="list">
        <ListItem button className={full ? "list-item" : "d-none"} >
            <Box display="flex" width="100%">
                <Box fontSize="15px" className="list-item-label">International Freight</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{from}&nbsp;{'$' + internationalFreight}</div>
                    <div>{to}&nbsp;{'$' + fixedTo(internationalFreight * rate)}</div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={1} className={revealedItems.includes(1) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
        <ListItem button className={full ? "list-item" : "d-none"}>
            <Box display="flex" width="100%">
                <Box flex={1} fontSize="15px" className="list-item-label">Local Freight</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{from}&nbsp;{'$' + localFreight}</div>
                    <div>{to}&nbsp;{'$' + fixedTo(localFreight * rate)}</div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={2} className={revealedItems.includes(2) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
        <ListItem button className={full ? "list-item" : "d-none"}>
            <Box display="flex" width="100%">
                <Box flex={1} fontSize="15px" className="list-item-label">Clearance Cost</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{from}&nbsp;{'$' + clearanceCost}</div>
                    <div>{to}&nbsp;{'$' + fixedTo(clearanceCost * rate)}</div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={3} className={revealedItems.includes(3) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
        <ListItem button className="list-item">
            <Box display="flex" width="100%">
                <Box flex={1} fontSize="15px" className="list-item-label">GST</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{from}&nbsp;{'$' + fixedTo(getCartGst())}</div>
                    <div>{to}&nbsp;{'$' + fixedTo(getCartGst() * rate)}</div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={4} className={revealedItems.includes(4) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
        <ListItem button className={full ? "list-item" : "d-none"}>
            <Box display="flex" width="100%">
                <Box flex={1} fontSize="15px" className="list-item-label">Fees &amp; GST Summary</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{from}&nbsp;{'$' + feesAndGstSummary}</div>
                    <div>{to}&nbsp;{'$' + fixedTo(feesAndGstSummary * rate)}</div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={5} className={revealedItems.includes(5) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
    </List>;
    const getRightTopList2 = (hasCover = true, full = true) => <List component="nav" aria-label="" className="list">
        <ListItem button className="list-item style-1">
            <Box display="flex" width="100%">
                <Box flex={1} fontSize="15px" className="list-item-label">Total Quantity</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{totalQuantity}</div>
                    <div style={{width: 0}}></div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={6} className={revealedItems.includes(6) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
        <ListItem button className="list-item style-1">
            <Box display="flex" width="100%">
                <Box flex={1} fontSize="15px" className="list-item-label">Tyres Subtotal</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{from}&nbsp;{'$' + tyresSubtotal}</div>
                    <div>{to}&nbsp;{'$' + fixedTo(tyresSubtotal * rate)}</div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={7} className={revealedItems.includes(7) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
        <ListItem button className={full ? "list-item style-1" : "d-none"}>
            <Box display="flex" width="100%">
                <Box flex={1} fontSize="15px" className="list-item-label">Total Price</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{from}&nbsp;{'$' + totalPrice}</div>
                    <div>{to}&nbsp;{'$' + fixedTo(totalPrice * rate)}</div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={8} className={revealedItems.includes(8) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
        <ListItem button className={full ? "list-item style-2" : "d-none"}>
            <Box display="flex" width="100%">
                <Box flex={1} fontSize="15px" className="list-item-label">30% Deposit</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{from}&nbsp;{'$' + fixedTo(totalPrice * 0.3)}</div>
                    <div>{to}&nbsp;{'$' + fixedTo(totalPrice * 0.3 * rate)}</div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={9} className={revealedItems.includes(9) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
        <ListItem button className={full ? "list-item style-2" : "d-none"}>
            <Box display="flex" width="100%">
                <Box flex={1} fontSize="15px" className="list-item-label">70% Remaining</Box>
                <Box flex={1} display="flex" fontSize="15px" className="values">
                    <div>{from}&nbsp;{'$' + fixedTo(totalPrice * 0.7)}</div>
                    <div>{to}&nbsp;{'$' + fixedTo(totalPrice * 0.7 * rate)}</div>
                    {hasCover ? <div onClick={toggleClickItem} data-id={10} className={revealedItems.includes(10) ? "click-cover removed" : "click-cover"}>Click</div> : null}
                </Box>
            </Box>
        </ListItem>
    </List>;

    const cartTab1 = <Table data={cart} configs={getCartPreviewConfigs(from, to, containerSize, rate, feesAndGstSummary, totalQuantity)} />
    const cartTab2 = <Box width={"50%"}>
        {getRightTopList1(false, true)}
        {getRightTopList2(false, true)}
    </Box>;

    let cartTabs = [cartTab1, cartTab2];
    let cartTabTitles = ['Details', 'Summary'];
    const orderPreview = stepName === 'Step 1' 
    ? <Box padding="10px">
        <Tabs tabs={cartTabs} tabTitles={cartTabTitles} />
    </Box>
    : <Box display='flex' flexDirection='column' maxWidth={"400px"} width={"100%"} margin="auto" paddingTop="20px">
        <TextField label="Note" value={note} onChange={(e) => setNote(e.target.value)} variant="outlined" />
        <div style={{height: 10, width: '100%'}} />
        <TextField label="Address" value={address} onChange={(e) => setAccount({address: e.target.value})} variant="outlined" />
        <div style={{height: 10, width: '100%'}} />
        <TextField label="Phone" value={phone} onChange={(e) => setAccount({phone: e.target.value})} variant="outlined" />
    </Box>;

    let cartSummary = null;
    if(cart && cart.length > 0){
        const totalVolume = cart.reduce((prev, item, index) => {
            let conRate = 0;
            switch(containerSize){
                case 20:
                    conRate = item.vol20;
                    break;
                case 40:
                    conRate = item.vol40;
                    break;
                default:
                    break;
            }
            let volume = (item.qty * conRate);
            return prev + volume;
        }, 0);
        const totalUsd = cart.reduce((prev, item, index) => {
            return prev + (item.qty * item.usdFOB);
        }, 0);
    
        const totalTo = totalUsd * rate;
    
        let totalVolumeColor = totalVolume >= 96.5 ? '#ec424d' : 'inherit';
        cartSummary = <Box className="cart-summary">
            <div>Volume Total: <span style={{color: totalVolumeColor}}>{totalVolume.toFixed(2) + "%"}</span></div>
            <div>USD Total: {totalUsd.toFixed(2)}</div>
            <div>{to} Total: {totalTo.toFixed(2)}</div>
        </Box>;
    }

    const brands = brandGroup? brandGroup.brands : [];
    const [brand, setBrand] = useState(null);
    const brandId = brand ? brand.id : 0;
    let brandElements = 
    <Box className="query-box">
        <div className="title">Brand</div>
        <Box className="query-items">
        {
            brands.map((item, index) => {
                return <Button 
                    color={item.id === brandId ? "primary" : "default"}
                    variant="outlined" 
                    onClick={() => setBrand(item)}
                    key={index}
                >
                    {item.name}
                </Button>
            })
        }
        </Box>
    </Box>

    const steers = brand ? brand.patterns["Steer"] : [];
    let steerElements = 
    <Box className="query-box">
        <div className="title">Steer</div>
        <Box className="query-items">
        {
            steers.map((item, index) => {
                let steerButtonColor = (steer && item.pattern === steer.pattern) ? "primary" : "default";
                return  <ImagePopper item={item} name={item.pattern} key={index} buttonColor={steerButtonColor} handleClick={setSteer} />
            })
        }
        </Box>
    </Box>

    const drives = brand ? brand.patterns["Drive"] : [];
    let driveElements = 
    <Box className="query-box">
        <div className="title">Drive</div>
        <Box className="query-items">
        {
            drives.map((item, index) => {
                let driveButtonColor = (drive && item.pattern === drive.pattern) ? "primary" : "default";
                return  <ImagePopper item={item} name={item.pattern} key={index} buttonColor={driveButtonColor} handleClick={setDrive} />
            })
        }
        </Box>
    </Box>

    const trailers = brand ? brand.patterns["Trailer"] : [];
    let trailerElements = 
    <Box className="query-box">
        <div className="title">Trailer</div>
        <Box className="query-items">
        {
            trailers.map((item, index) => {
                let trailerButtonColor = (trailer && item.pattern === trailer.pattern) ? "primary" : "default";
                return  <ImagePopper item={item} name={item.pattern} key={index} buttonColor={trailerButtonColor} handleClick={setTrailer} />
            })
        }
        </Box>
    </Box>

    const positions = brand ? brand.patterns["All position"] : [];
    let positionElements = 
    <Box className="query-box">
        <div className="title">All Positions</div>
        <Box className="query-items">
        {
            positions.map((item, index) => {
                let positionButtonColor = (position && item.pattern === position.pattern) ? "primary" : "default";
                return  <ImagePopper item={item} name={item.pattern} key={index} buttonColor={positionButtonColor} handleClick={setPosition} />
            })
        }
        </Box>
    </Box>;

    let allPositionElements = 
    <Box className="query-box">
        <div className="title">patterns</div>
        <Box className="query-items">
        {
            positions.map((item, index) => {
                let positionButtonColor = (positionPattern && item.pattern === positionPattern.pattern) ? "primary" : "default";
                return  <ImagePopper item={item} name={item.pattern} key={index} buttonColor={positionButtonColor} handleClick={setPositionPattern} />
            })
        }
        </Box>
    </Box>;

    const [openSearchBar, setOpenSearchBar] = useState(true);
    const collapseButton = openSearchBar 
    ? <ExpandLessIcon />
    : <ExpandMoreIcon />;

    const brandDetailsForSearchTab1 = brandGroup ? <React.Fragment>
        {brandElements}
        {brand ? steerElements : null}
        {brand ? driveElements : null}
        {brand ? trailerElements : null}
        {brand ? positionElements : null}
    </React.Fragment> : null;

    const brandDetailsForSearchTab2 = brandGroup ? <React.Fragment>
        {brandElements}
        {brand ? allPositionElements : null}
    </React.Fragment> : null;

    let searchTab1 = <React.Fragment>
        <Box className="query-box">
            <div className="title">Quick Specification</div>
            <InputBase placeholder="" className="input-box" value={specification} onChange={handleSpecificationChange} inputProps={{ 'aria-label': 'query' }} />
        </Box>
        {brandGroupBox}
        {brandDetailsForSearchTab1}
        {categoryBox}
        <Box className="button-box">
            <Button variant="contained" color="primary" onClick={search}>
                <SearchIcon />
                <span>Search</span>
            </Button>
            <Button variant="outlined" color="primary" onClick={reset}>Reset</Button>
        </Box>
    </React.Fragment>;

    let searchTab2 = <React.Fragment>
    <Box className="query-box">
        <div className="title">Quick Specification</div>
        <InputBase placeholder="" className="input-box" value={specification} onChange={handleSpecificationChange} inputProps={{ 'aria-label': 'query' }} />
    </Box>
    {brandGroupBox}
    {brandDetailsForSearchTab2}
    {categoryBox}
    <Box className="button-box">
        <Button variant="contained" color="primary" onClick={search}>
            <SearchIcon />
            <span>Search</span>
        </Button>
        <Button variant="outlined" color="primary" onClick={reset}>Reset</Button>
    </Box>
    </React.Fragment>;

    let searchTabs = [searchTab1, searchTab2];
    let searchTabTitles = ['By TBR', 'By PCR'];

    return <Container maxWidth={false} className="home">
        <Box display="flex" className="left" flexDirection="column">
            <Box className={openSearchBar ? 'left-top-box' : 'left-top-box collapse'}>
                <Box className="collapse-button" onClick={() => setOpenSearchBar(!openSearchBar)}>{collapseButton}</Box>
                <Tabs tabs={searchTabs} tabTitles={searchTabTitles} tabIndexChange={setCurrentSearchTabIndex} currentTabIndex={currentSearchTabIndex}/>
            </Box>
            <Box className="left-middle-box">
                <ErrorOutlineIcon />
                <span>Products from different Brand Group or exceeding available quantity can't be added into one container.</span>
            </Box>
            <Box className="left-bottom-box" overflow="hidden auto">
                {!products || products.length === 0 ? <div className="static-no-result-message">Search To Start</div> : null}
                <Table data={products} configs={getProductListConfigs()} total={productTotalCount} update={search}/>
            </Box>
        </Box>
        <Box display="flex" className="right">
            <Box className="right-top-box">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Box display="flex"> 
                            <Box flex={1} height={48} className="cart-setting-header">Current Rate ({from}:{to}): {rate}</Box>
                            <Box flex={1} height={48} className="cart-setting-header">
                                <span>Container Size:</span>
                                <RadioGroup className="radio-group" aria-label="container-size" name="container-size" value={containerSize} onChange={handleContainerSizeChange}>
                                    <FormControlLabel value={40} control={<Radio />} label="40'GP" />
                                    <FormControlLabel value={20} control={<Radio />} label="20'GP" />
                                </RadioGroup>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {getRightTopList1(true, false)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {getRightTopList2(true, false)}
                    </Grid>
                </Grid>
            </Box>
            <Box className="right-middle-box">
                <Box className="left-section">
                    <Box>
                        <Button variant="text" onClick={placeOrder}>Place Order <ChevronRightIcon onClick={placeOrder}/></Button>
                    </Box>
                </Box>
                <Box className="right-section">
                    <Button size="small" onClick={clearAll}>Clear All</Button>
                </Box>
            </Box>
            <Box className="right-bottom-box" overflow="hidden auto" position="relative">
                {!cart || cart.length === 0 ? <div className="static-no-result-message">No Items</div> : null}
                <Table data={cart} configs={getCartConfigs(from, to, containerSize, rate, feesAndGstSummary, totalQuantity)} paging={false}/>
                {cartSummary}
            </Box>
        </Box>
        <Dialog onClose={handleCartPreviewClose} aria-labelledby="simple-dialog-title" open={openCartPreview} maxWidth={'lg'} fullWidth={true}>
            <DialogTitle style={{background: "#CCCCCC", color: "#404040", fontSize: "14px"}}>{stepName}</DialogTitle>
            {orderPreview}
            <DialogActions>
                <Button onClick={handleCartPreviewBack} color="primary">
                    Back
                </Button>
                <Button onClick={stepName === 'Step 2' ?  sendOrder : handleCartPreviewNext} color="primary" autoFocus>
                    {stepName === 'Step 2' ? 'Submit' : 'Next'}
                </Button>
            </DialogActions>
        </Dialog>
    </Container>;
};

let mapStateToProps = state => {
    return {
        ...state.product,
        ...state.account
    }
};

let mapDispatchToProps = {
    setContainerSize: actions.setContainerSize,
    openDialog: actions.openDialog,
    closeDialog: actions.closeDialog,
    searchProducts: thunks.searchProducts,
    updateCartAfterPurchase: actions.updateCartAfterPurchase,
    setAccount: thunks.setAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);