import { productError, productCreate,showProducts,productDelete,productUpdate, showProductsEnable } from "../actions/productsActions";
import{productsLoadService,productEditService,productAddService,productDeleteService, productsEnable} from '../../services/product'

export const loadProducts=()=> async(dispatch)=>{
    const products=await productsLoadService()
    if(products.error){
        return dispatch(productError(products.error));
    }
    return dispatch(showProducts(products))
}

export const addProduct=(content)=>{
    return async(dispatch)=>{
        const product=await productAddService(content)
        console.log(product)
        if(product.error){
            return dispatch(productError(product.error));
        }
        return dispatch(productCreate(product.product))
}}

export const editProduct=(id,content)=>{ 
    return async(dispatch)=>{
        const product=await productEditService(id,content)
        if(product.error){
            return dispatch(productError(product.error));
        }
        return dispatch(productUpdate(id,content))
}}

export const deleteProduct=(id)=>{
    return async(dispatch)=>{
        const product=await productDeleteService(id)
        if(product.error){
            return dispatch(productError(product.error));
        }
        return dispatch(productDelete(id))
}}

export const enableProducts=()=>{
    return async(dispatch)=>{
        const products = await productsEnable()
        if(products.error){
            return dispatch(productError(products.error))
        }
        return dispatch(showProductsEnable(products))
    }
}