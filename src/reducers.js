export const productReducer = (state = initialProductState, { type, payload }) => {
    let cart = [];
    let products = [];
    switch(type){
        case 'SET_CONTAINER_SIZE':
            return {
                ...state,
                containerSize: payload
            };
        case 'SET_ITEM_QUANTITY':
            cart = state.cart.map(item => {
                return item.id === payload.id 
                ? {
                    ...item,
                    qty: payload.qty
                } : item
            });
            return {
                ...state,
                cart
            };
        case 'ADD_TO_CART':
            let found = state.cart.find(i => i.id === payload.id);
            
            if(found){
                cart = state.cart.map(i => {
                    return i.id === payload.id ? {...i, qty: i.qty + payload.qty} : i;
                })
            }else{
                cart = [...state.cart, payload];
            }

            return {
                ...state,
                cart
            };
        case 'DELETE_ITEM':
            cart = state.cart.filter(i => i.id !== payload.id);
            return {
                ...state,
                cart
            };
        case 'SET_PRODUCTS':
            products = payload.map(item => {
                let p = {
                    ...item,
                    productName: item.name,
                    fromFob: item.usdFob,
                    infos: item.pattern,
                    add: null,
                };
                return p;
            });
            return {
                ...state,
                products
            };
        case 'UPDATE_CART_AFTER_PURCHASE':
            return {
                ...state,
                cart: payload
            }
        case 'SET_PRODUCT_TOTAL_COUNT':
            return {
                ...state,
                productTotalCount: payload
            }
        default:
            return state;
    }
}

export const historyOrdersReducer = (state = initialHistoryOrdersState, { type, payload }) => {
    switch(type){
        case 'SET_ORDERS':
            return {
                ...state,
                orders: payload
            }
        default:
            return state;
    }
}

export const accountReducer = (state = initialAccountState, { type, payload }) => {
    switch(type){
        case 'SET_ACCOUNT':
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}

export const containerOrderReducer = (state = initialContainerOrderState, {type, payload}) => {
    switch(type){
        case "SET_CONTAINER_ORDER":
            return state;
        default:
            return state;
    }
}

export const mainReducer = (state = initialMainState, action) => {
    switch(action.type){
        case 'CLOSE_DIALOG':
            return {
                ...state,
                openDialog: false
            };
        case 'OPEN_DIALOG':
            return {
                ...state,
                openDialog: true,
                dialogContent: action.payload.dialogContent,
                dialogHeader: action.payload.dialogHeader || null,
                dialogCallbackFunc: action.payload.dialogCallbackFunc || null,
            };
        default:
            return state;
    }
}

let initialAccountState = {
    name: "",
    id: 0,
    email: "",
    address: "",
    phone: "",
    currency: "",
    currencyTable: null,
    internationalFreight20: 0,
    internationalFreight40: 0,
    localFreight20: 0, 
    localFreight40: 0,
    clearanceCost20: 0,
    clearanceCost40: 0,
    gstRate: 0.1
}

let initialProductState = {
    containerSize: 40,
    cart: [],
    products: [],
    productTotalCount: 0
}

let initialHistoryOrdersState = {
    orders: [
    ]
}

let initialContainerOrderState = {
    gstRate: `10%`,
    containerSize: 20,
    internatinalFreight: 1000,
    totalVolume: 0,
    clearanceCost: 0,
    gst: `10%`,
    localFreight: 1200,
    tyresSubtotal: 234,
    feeGSTSummary: 1000,
    deposit30: 300,
    remaining70: 700,
    totalPrice: 10000,
    items: getContainerOrderItems()

}

let initialMainState = {
    openDialog: false,
    dialogHeader: null,
    dialogContent: "",
    dialogCallbackFunc: null
}


function getContainerOrderItems() {
    let p = [];
    for(let i = 0; i < 102; i++){
        p.push({
            index: i + 1,
            "id": 1,
            "reference": `ABDC-${i * 2 + 120}-SD-DAD`,
            "tag": "Initial",
            "status": "Waiting Confirm",
            "date": "2020-6-15",
            "qty": 1200,
            "amount": 1299,
            "deposit30": 1299,
            "remain70": 1299,
            "currency": 6.9,
            "conSize": 40,
        });
    }
    return p;
}
