export const types={
    addNewSale:'add New sales',
    addNewItems:'add new items',
    addNewProducts:'add new Product',
    deleteItem:'delete sale',
    resetSale:'Reset Sale',
    showErrors:'Error'
}
const initialState={
    salesInfo:[],
    productsInfo:[],
    items:[],
    errorMessage:null
}
export const orderReducer = (state=initialState,{type,payload}) => {
    switch (type) {
        case types.addNewSale:
            return {...state, saleInfo:[payload]}
        case types.addNewItems:
            return {...state,items:[...state.items,payload]}
        case types.addNewProducts:
            return {...state,productsInfo:[...state.productsInfo,payload]}
        case types.deleteItem:
            return {...state,
                    items:state.items.filter(product=>product.productID!==payload),
                    productsInfo:state.productsInfo.filter(product=>product.id!==payload)
                }
        case type.resetSale:
            return {...state,
                productsInfo:[],
                items:[],
                errorMessage:null}
        case types.showErrors:
            return {...state,errorMessage:payload}
        default:
            return state;
    }
}