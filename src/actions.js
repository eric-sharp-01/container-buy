export const setContainerSize = (size) => ({type: "SET_CONTAINER_SIZE", payload: size});
export const openDialog = (data) => ({type: "OPEN_DIALOG", payload: data});
export const closeDialog = (value = null) => ({type: "CLOSE_DIALOG", payload: value});
export const updateCartAfterPurchase = (payload) => ({type: "UPDATE_CART_AFTER_PURCHASE", payload});