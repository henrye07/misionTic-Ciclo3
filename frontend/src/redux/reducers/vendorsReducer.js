export const types={
    addNewVendor:'add New vendor',
    deleteVendor:'delete Vendor',
    updateVendor:'edit Vendor',
    showVendors:'show Vendors',
    showErrors:'Error'
}
const initialState={
    vendors:[],
    errorMessage:null
}

export const vendorsReducer = (state=initialState,{type,payload}) => {
    switch (type) {
        case types.showVendors:
            return {...state,vendors:payload}
        case types.addNewVendor:
            return {...state,vendors:[...state.vendors,payload]}
        case types.updateVendor:
            const vendorID=state.vendors.find(vendor=>vendor.id===payload.id)
            for (const key in payload.vendor) {
                vendorID[key]=payload.vendor[key]
            }
            return {...state,vendors:state.vendors.map(vendor=>
                vendor.id===vendorID.id
                ?vendorID
                :vendor
            )}
        case types.deleteVendor:
            return {...state,vendors:state.vendors.filter(vendor=>vendor.id!==payload)}
        case types.showErrors:
            return {...state,errorMessage:payload}
        default:
            return state;
    }
}

