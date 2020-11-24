import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { accountReducer, productReducer, mainReducer, historyOrdersReducer, containerOrderReducer }  from './reducers';

let reducers = {
  main: mainReducer,
  account: accountReducer,
  product: productReducer,
  historyOrders: historyOrdersReducer,
  containerOrder: containerOrderReducer
};

const combinedReducers = combineReducers(reducers)

let store = createStore(combinedReducers, applyMiddleware(thunk));
export default store;