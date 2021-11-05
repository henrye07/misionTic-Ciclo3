import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productReducer";
import { orderReducer } from "./reducers/orderReducer";
import { usersReducer } from "./reducers/usersReducer";
import { vendorsReducer } from "./reducers/vendorsReducer";
import {salesReducer} from './reducers/salesReducer'

const reducers=combineReducers({
    users:usersReducer,
    vendors:vendorsReducer,
    products:productReducer,
    orderSale:orderReducer,
    sales:salesReducer
})

export const store= createStore(reducers,applyMiddleware(thunk))