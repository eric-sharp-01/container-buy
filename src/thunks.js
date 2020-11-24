import axios from 'axios';

export const setAccount = function() {
    return (dispatch) => {
        axios.get("/api/account-data").then(res => {
            let data = res.data;
            dispatch({type: "SET_ACCOUNT", payload: data})
        });
    }
}

export const searchProducts = function(queryString) {
  let url = `/api/container/products?${queryString}`;
  return (dispatch) => {
    axios.get(url).then(res => {
      let products = res.data.data;
      dispatch({type: 'SET_PRODUCTS', payload: products})
      dispatch({type: 'SET_PRODUCT_TOTAL_COUNT', payload: res.data.meta.total})
    }).catch(err => {
      dispatch({type: 'SET_PRODUCTS', payload: []})
      dispatch({type: 'SET_PRODUCT_TOTAL_COUNT', payload: 0})
    });
  }
}

export const searchOrders = function() {
  return (dispatch) => {
    axios.get("/api/container/orders").then((res) => {
      let data = res.data.map((item, i) => ({...item, index: i + 1}));
      dispatch({type: 'SET_ORDERS', payload: data})
  }).catch(err => {
      dispatch({type: 'SET_ORDERS', payload: []})
  });
  }
}