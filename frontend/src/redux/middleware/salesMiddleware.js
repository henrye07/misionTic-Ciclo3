import { showSales,saleUpdate,saleDelete,saleError } from "../actions/salesActions";
import{salesLoadService,saleEditService,saleDeleteService} from '../../services/sales'

export const loadSales=()=> async(dispatch)=>{
    const sales=await salesLoadService()
    if(sales.error){
        return dispatch(saleError(sales.error));
    }
    return dispatch(showSales(sales))
}

export const editSale=(id,content)=>{ 
    return async(dispatch)=>{
        const sale=await saleEditService(id,content)
        if(sale.error){
            return dispatch(saleError(sale.error));
        }
        return dispatch(saleUpdate(id,content))
}}

export const deleteSale=(id)=>{
    return async(dispatch)=>{
        const sale=await saleDeleteService(id)
        if(sale.error){
            return dispatch(saleError(sale.error));
        }
        return dispatch(saleDelete(id))
}}