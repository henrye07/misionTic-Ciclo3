import React, {useState,useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { useDispatch,useSelector } from 'react-redux';
import { InputNumber } from 'primereact/inputnumber';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import {Dropdown} from 'primereact/dropdown';
import {addOrder,addSale,deleteItem,addProductInfo, resetSale } from '../redux/middleware/orderMiddleware'
import { Dialog } from 'primereact/dialog';

export default function TableOrderProducts(props){
    const Products = [
        { field: "id", header: "Codigo Ref" },
        { field: "product_name", header: "Producto" },
        { field: "price", header: "Precio" },
        { field: "quantity", header: "Cantidad Disponible" }
    ]
    const Vendors = props.Vendors.map(vendedor=>{return {label:vendedor.name,value:vendedor.id}});

    const refToast = useRef(null);    
    const {Data}=props
    const {items,productsInfo}= useSelector(state=>state.orderSale) 
    const [products, setProducts] = useState(Data)
    const dispatch =useDispatch()
    const [item, setItem] = useState({});
    const [itemDialog, setItemDialog] = useState(false);
    const [saleOrderDialog, setSaleOrderDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('')
    const dt = useRef(null)

    const header=(
        <div className="p-d-flex p-jc-between p-ai-center">
            <h3 className="p-m-0">Lista de Productos</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar en la Tabla" />
            </span>
        </div>)
    const hideDialog = () => {
        setItemDialog(false);
    }    
    const hideSaleOrderDialog = () => {
        setSaleOrderDialog(false);
    }
    const ToolbarTemplate=()=>{
            return(
                <>
                    <Button label="Finalizar Compra" icon="pi pi-wallet" className="p-button-success p-mr-2" onClick={()=>{
                         setSaleOrderDialog(true) 
                    }} />
                </>
            )
    }
    const addItem = (productData) => {
        setItem(productData);
        setItemDialog(true);
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-plus-circle" className="p-button-rounded p-button-success p-mr-2" onClick={() =>addItem(rowData)} />
            </>
        );
    }
    
    const onSubmitItem = async datos => {
        console.log(datos)
        const {quantity, productID}=datos
        await dispatch(addOrder(datos))
        await dispatch(addProductInfo({name:item.product_name,id:productID,quantity}))
        setProducts(products.filter(producto=>producto.id!==datos.productID))
        setItem({})
        setItemDialog(false);
        refToast.current.show({ severity: 'success', summary: 'Successful', detail: 'Producto Agregado', life: 3000 });
    }
    const FormularioAddItem=()=>{
        const { handleSubmit, formState: { errors }, control } = useForm()
        const getFormErrorMessage = (name) => {
            return errors[name] && <small className="p-error">{errors[name].message}</small>
        };
        const title=`Agregar ${item.product_name} al Carrito`
        return(
                <>
                    <h2 className="p-text-center">{title}</h2>
                        <form onSubmit={handleSubmit(onSubmitItem)} className="p-fluid" style={{marginTop:'2rem'}}>
                            <div  className="p-field" style={{display:'none'}}>
                                <label htmlFor="productID" >ID PRODUCT</label>
                                <Controller name="productID" control={control}  defaultValue={item.id} render={({ field, fieldState }) => (
                                    <InputNumber  inputId={field.name} {...field} />
                                )} />
                            </div>
                            <div  className="p-field" style={{marginBottom:'1.5rem'}}>
                                <label htmlFor="quantity" className={classNames({ 'p-error': errors.quantity })}>Cantidad</label>
                                <Controller name="quantity" control={control}  rules={{ required: 'Cantidad es requerida' }} render={({ field, fieldState }) => (
                                    <InputNumber  inputId={field.name} {...field} value={field.value} onChange={e=>field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} integeronly
                                    showButtons buttonLayout="horizontal" step={1}
                                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                                    min={1} max={item.quantity}
                                    />
                                )} />
                                {getFormErrorMessage('quantity')}
                            </div>
                        <Button type="submit" label="Agregar" className="p-mt-2 p-button-success" />
                    </form>
                </>
        )
    }
    const onSubmitSale = async datos => {
        const invoice={datos,items}
        await dispatch(addSale(invoice))
        await dispatch(resetSale())
        setSaleOrderDialog(false);
        setItem({})
        refToast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    }
    const deleteItemSale= async (id)=>{
        await dispatch(deleteItem(id))
    }
    const FormularioSale=()=>{
        const { handleSubmit, formState: { errors }, control } = useForm()
        const getFormErrorMessage = (name) => {
            return errors[name] && <small className="p-error">{errors[name].message}</small>
        };
        return(
                <>
                    <h2 className="p-text-center">Completar Compra</h2>
                    <div className="p-d-flex p-jc-center p-justify-center">
                        <form onSubmit={handleSubmit(onSubmitSale)} className="p-fluid" style={{marginTop:'2rem'}}>
                            <div className="p-field" style={{marginBottom:'1.5rem'}}>
                                <label htmlFor="name_customer" className={classNames({ 'p-error': errors.name_customer })}>Nombre del Cliente</label>
                                <Controller name="name_customer" control={control} rules={{ required: 'Nombre es requerido' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} value={field.value}  className={classNames({ 'p-invalid': fieldState.invalid })}/>
                                )} />
                                {getFormErrorMessage('name_customer')}
                            </div>
                            <div className="p-field" style={{marginBottom:'1.5rem'}}>
                                <label htmlFor="id_customer" className={classNames({ 'p-error': errors.id_customer })}>Identificacion del Cliente</label>
                                <Controller name="id_customer" control={control}  rules={{ required: 'Identificacion es requerida' }} render={({ field, fieldState }) => (
                                    <InputNumber inputId={field.name} {...field} value={field.value} onChange={e=>field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} integeronly/>
                                )} />
                                {getFormErrorMessage('id_customer')}
                            </div>
                            <div className="p-field" style={{marginBottom:'1.5rem'}}>
                                <label htmlFor="vendorID" className={classNames({ 'p-error': errors.vendorID })}>Vendedor</label>
                                <Controller name="vendorID" rules={{ required: 'Vendedor es requerido' }} control={control} render={({ field }) => (
                                    <Dropdown inputId={field.name} {...field} options={Vendors} />
                                )} />
                                {getFormErrorMessage('vendorID')}
                            </div>
                            <div>
                                <h3 style={{marginBottom:'1rem'}}>Detalles de la compra</h3>
                                {productsInfo.map(product=>(
                                            <div key={product.id} className="p-formgroup-inline">
                                                <div className="p-field">
                                                    <InputText value={product.name}  disabled/>
                                                </div>
                                                <div className="p-field">
                                                    <InputNumber id="quantity" value={product.quantity} disabled/>
                                                </div>
                                                <div className="p-field">
                                                    <Button type="button" className="pi pi-trash p-button-danger p-button-rounded p-mr-2" 
                                                        onClick={()=>deleteItemSale(product.id)}
                                                    />
                                                </div>
                                            </div>
                                ))}
                            </div>
                            <Button type="submit" label="Crear Factura" className="p-mt-2" />
                        </form>
                </div>
                </>
        )
    }
    return (
        <div className="datatable-templating-demo">
            <Toast ref={refToast} />
            <div className="card">
                <Toolbar className="p-mb-4" left={ToolbarTemplate} />
                <DataTable 
                    ref={dt}
                    value={products}
                    header={header}
                    className="p-datatable-sm"
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    showGridlines
                    sortMode="multiple"
                    removableSort
                    scrollable
                    scrollHeight="300px"
                    emptyMessage="No hay productos disponibles"
                >
                    <Column field={Products[0].field} header={Products[0].header} sortable/>
                    <Column field={Products[1].field} header={Products[1].header} />
                    <Column field={Products[2].field} header={Products[2].header} sortable />
                    <Column field={Products[3].field} header={Products[3].header} sortable />
                    <Column header="Agregar Producto" body={actionBodyTemplate} />
                </DataTable>
            </div>
            <Dialog visible={itemDialog} modal className="p-fluid" onHide={hideDialog}>
                <div className="p-d-flex p-jc-center">
                    <div style={{minWidth:'450px'}}>
                        <FormularioAddItem />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={saleOrderDialog} modal className="p-fluid" onHide={hideSaleOrderDialog}>
                <div className="p-d-flex p-jc-center">
                    <div style={{minWidth:'450px'}}>
                        <FormularioSale />
                    </div>
                </div>
            </Dialog>
        </div>
        
    )
}