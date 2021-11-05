export const routes ={
    login:'/login',
    signin:'/signin',
    home:'/',
    products:'/Products',
    sales:{
        orderSales:'/Sales',
        Sales:'/Sales/Data',
    },
    users:'/Users',
    vendors:'/Vendors'

}
const BaseURl='http://localhost:3001/'
const ProductionURL='https://backend-misiontic-ciclo3.herokuapp.com/'
export const apiUser={
    users:`${ProductionURL}api/users`,
    userID:`${ProductionURL}api/users`,
    createUser:`${ProductionURL}api/users/create`,
    editUser:`${ProductionURL}api/users/edit`,
    deleteUser:`${ProductionURL}api/users/delete`,
}

export const apiVendor={
    vendors:`${ProductionURL}api/vendors`,
    vendorID:`${ProductionURL}api/vendors`,
    createVendor:`${ProductionURL}api/vendors/create`,
    editVendors:`${ProductionURL}api/vendors/edit`,
    deleteVendors:`${ProductionURL}api/vendors/delete`,
}

export const apiProduct={
    products:`${ProductionURL}api/products`,
    productID:`${ProductionURL}api/products`,
    createProduct:`${ProductionURL}api/products/create`,
    editProduct:`${ProductionURL}api/products/edit`,
    deleteProduct:`${ProductionURL}api/products/delete`,
    enableProduct:`${ProductionURL}api/products/all/enable`,
}

export const apiSales={
    sales:`${ProductionURL}api/invoices/`,
    saleID:`${ProductionURL}api/invoices`,
    createSale:`${ProductionURL}api/invoices/create`,
    editSale:`${ProductionURL}api/invoices/edit`,
    deleteSale:`${ProductionURL}api/invoices/delete`,
}

export const apiOrderDetails={
    orderID:`${ProductionURL}api/order`,
    createOrder:`${ProductionURL}api/order/create`,
    editOrder:`${ProductionURL}api/order/edit`,
    deleteOrder:`${ProductionURL}api/order/delete`,
}