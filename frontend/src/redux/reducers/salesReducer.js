export const types={
    deleteSale:'delete sale',
    updateSale:'edit sale',
    showSales:'show sales',
    showErrors:'Error'
}
const initialState={
    sales:[],
    errorMessage:null
}

export const salesReducer = (state=initialState,{type,payload}) => {
    switch (type) {
        case types.showSales:
            return {...state,sales:payload}
        case types.updateSale:
            const saleID=state.sales.find(sale=>sale.id===payload.id)
            for (const key in payload.sale) {
                saleID[key]=payload.sale[key]
            }
            return {...state,sales:state.sales.map(sale=>
                sale.id===saleID.id
                ?saleID
                :sale
            )}
        case types.deleteSale:
            return {...state,sales:state.sales.filter(sale=>sale.id!==payload)}
        case types.showErrors:
            return {...state,errorMessage:payload}
        default:
            return state;
    }
}

