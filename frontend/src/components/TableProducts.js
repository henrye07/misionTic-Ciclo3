import React, {useState,useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { addProduct,editProduct,deleteProduct } from '../redux/middleware/productsMiddleware';
import { Controller, useForm } from 'react-hook-form'
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { useDispatch } from 'react-redux';


export default function TableProducts(props){
    const Columns = [
        { field: "id", header: "Codigo Ref" },
        { field: "product_name", header: "Producto" },
        { field: "description", header: "Descripcion" },
        { field: "price", header: "Precio" },
        { field: "state", header: "Estado" },
        { field: "quantity", header: "Cantidad" }
    ]
    const states = [
        { label: 'Disponible', value: true },
        { label: 'No Disponible', value: false }
    ];
    const refToast = useRef(null);    
    const {Data}=props
    const dispatch =useDispatch()
    const [product, setProduct] = useState({});    
    const [productDialog, setProductDialog] = useState(false);
    const [productUpdateDialog, setProductUpdateDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [globalFilter, setGlobalFilter] = useState('')
    const [selectedElement, setSelectedElement] = useState(null);
    const dt = useRef(null)
    

    const statusBodyTemplate = (rowData) => {
        return rowData.state?<span style={{backgroundColor:'green',color:'white'}} >Disponible</span>:<span style={{backgroundColor:'red',color:'white'}} >No Disponible</span>
    }
        
    const header=(
        <div className="p-d-flex p-jc-between p-ai-center">
            <h3 className="p-m-0">Lista de Productos</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar en la Tabla" />
            </span>
        </div>)

    const onCustomPage1 = (event) => {
        setFirst1(event.first);
        setRows1(event.rows);
    }
    const template1 = {
            layout: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
            'PrevPageLink': (options) => {
                return (
                    <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                        <span className="p-p-3">Anterior</span>
                        <Ripple />
                    </button>
                )
            },
            'NextPageLink': (options) => {
                return (
                    <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                        <span className="p-p-3">Siguiente</span>
                        <Ripple />
                    </button>
                )
            },
            'PageLinks': (options) => {
                if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                    const className = classNames(options.className, { 'p-disabled': true });
    
                    return <span className={className} style={{ userSelect: 'none' }}>...</span>;
                }
    
                return (
                    <button type="button" className={options.className} onClick={options.onClick}>
                        {options.page + 1}
                        <Ripple />
                    </button>
                )
            },
            'RowsPerPageDropdown': (options) => {
                const dropdownOptions = [
                    { label: 10, value: 10 },
                    { label: 20, value: 20 },
                    { label: 50, value: 50 },
                    { label: 100, value: 100 },
                    { label: 200, value: 200 },
                    { label: 'All', value: options.totalRecords }
                ];
    
                return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />;
            },
            'CurrentPageReport': (options) => {
                return (
                    <span style={{ userSelect: 'none',textAlign: 'center' }}>
                       Mostrando {options.first} a {options.last} de {options.totalRecords}
                    </span>
                )
            }
        };
    
    const hideDialog = () => {
        setProductDialog(false);
    }
    const hideUpdateDialog = () => {
        setProductUpdateDialog(false);
    }
    const updateProduct = (productData) => {
        setProduct(productData);
        setProductUpdateDialog(true);
    }
    const confirmDeleteProduct = (productData) => {
        setProduct(productData);
        setDeleteProductDialog(true);
    }
    
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }
    const destroyProduct =async () => {
        await dispatch(deleteProduct(product.id))
        setDeleteProductDialog(false);
        setProduct({})
        refToast.current.show({ severity: 'warn', summary: 'Successful', detail: 'Product Deleted', life: 5000 });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() =>updateProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)}/>
            </>
        );
    }
    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="New Product" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={()=>{
                    setProduct({})
                    setProductDialog(true)
                }} />
            </>
        )
    }

    const onSubmit = async datos => {
            await dispatch(addProduct(datos))
            setProductDialog(false);
            setProduct({})
            refToast.current.show({ severity: 'success', summary: 'Successful', detail: 'Producto Creado', life: 3000 });
    }
    const onSubmitUpdate = async datos => {
        await dispatch(editProduct(product.id,datos))
        setProductUpdateDialog(false);
        setProduct({})
        refToast.current.show({ severity: 'success', summary: 'Successful', detail: 'Producto Actualizado', life: 3000 });
    }

    const FormularioNew=()=>{
        const { handleSubmit, formState: { errors }, control } = useForm()
        const getFormErrorMessage = (name) => {
            return errors[name] && <small className="p-error">{errors[name].message}</small>
        };
        return(
                <>
                    <h2 className="p-text-center">Nuevo Producto</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid" style={{marginTop:'2rem'}}>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="product_name" className={classNames({ 'p-error': errors.product_name })}>Producto</label>
                            <Controller name="product_name" control={control} defaultValue={''} rules={{ required: 'Nombre es requerido' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} value={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            {getFormErrorMessage('product_name')}
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="description" className={classNames({ 'p-error': errors.description })}>Descripcion del Producto</label>
                            <Controller name="description" control={control} defaultValue={''} render={({field}) => (
                                <InputTextarea id={field.name} {...field} rows={3} autoResize />
                            )} />
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="price" className={classNames({ 'p-error': errors.price })}>Precio</label>
                            <Controller name="price" control={control} rules={{ required: 'Precio es requerido' }} render={({ field, fieldState }) => (
                                <InputNumber inputId={field.name} id={field.name} {...field} value={field.value} onChange={(e) => field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} mode="currency" currency="COP" locale="es-CO"/>
                            )} />
                            {getFormErrorMessage('price')}
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="quantity" className={classNames({ 'p-error': errors.quantity })}>Cantidad</label>
                            <Controller name="quantity" control={control} rules={{ required: 'Cantidad es requerida' }} render={({ field, fieldState }) => (
                                <InputNumber inputId={field.name} {...field} value={field.value} onChange={(e) => field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })}/>
                            )} />
                            {getFormErrorMessage('quantity')}
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="state" className={classNames({ 'p-error': errors.state })}>Estado</label>
                            <Controller name="state" control={control} render={({ field }) => (
                                <Dropdown inputId={field.name} {...field} options={states} />
                            )} />
                        </div>
                        <Button type="submit" label="Crear" className="p-mt-2" />
                    </form>
                </>
        )
    }
    const FormularioUpdate=()=>{
        const { handleSubmit, formState: { errors }, control } = useForm()
        const getFormErrorMessage = (name) => {
            return errors[name] && <small className="p-error">{errors[name].message}</small>
        };
        return(
                <>
                    <h2 className="p-text-center">Editar Producto </h2>
                    <form onSubmit={handleSubmit(onSubmitUpdate)} className="p-fluid" style={{marginTop:'2rem'}}>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="product_name" className={classNames({ 'p-error': errors.product_name })}>Producto</label>
                            <Controller name="product_name" control={control} defaultValue={product.product_name} rules={{ required: 'Nombre es requerido' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} value={field.value}  className={classNames({ 'p-invalid': fieldState.invalid })}/>
                            )} />
                            {getFormErrorMessage('product_name')}
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="description" className={classNames({ 'p-error': errors.description })}>Descripcion del Producto</label>
                            <Controller name="description" control={control} defaultValue={product.description} render={({field}) => (
                                <InputTextarea id={field.name} {...field} value={field.value} rows={3} autoResize />
                            )} />
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="price" className={classNames({ 'p-error': errors.price })}>Precio</label>
                            <Controller name="price" control={control} defaultValue={product.price} rules={{ required: 'Precio es requerido' }} render={({ field, fieldState }) => (
                                <InputNumber inputId={field.name} {...field} value={field.value} onChange={e=>field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} mode="currency" currency="COP" locale="es-CO"/>
                            )} />
                            {getFormErrorMessage('price')}
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="quantity" className={classNames({ 'p-error': errors.quantity })}>Cantidad</label>
                            <Controller name="quantity" control={control} defaultValue={product.quantity} rules={{ required: 'Cantidad es requerida' }} render={({ field, fieldState }) => (
                                <InputNumber inputId={field.name} {...field} value={field.value} onChange={e=>field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })}/>
                            )} />
                            {getFormErrorMessage('quantity')}
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="state" className={classNames({ 'p-error': errors.state })}>Estado</label>
                            <Controller name="state" control={control} defaultValue={product.state} render={({ field }) => (
                                <Dropdown inputId={field.name} {...field} options={states} />
                            )} />
                        </div>
                        <Button type="submit" label="Actualizar" className="p-mt-2" />
                    </form>
                </>
        )
    }
    return (
        <div className="datatable-templating-demo">
            <Toast ref={refToast} />
            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} />
                <DataTable 
                    ref={dt}
                    value={Data}
                    header={header}
                    className="p-datatable-sm "
                    paginator 
                    paginatorTemplate={template1} 
                    first={first1} 
                    rows={rows1} 
                    onPage={onCustomPage1}
                    reorderableColumns
                    showGridlines
                    stripedRows 
                    sortMode="multiple"
                    removableSort
                    scrollable
                    scrollHeight="300px"
                    globalFilter={globalFilter}
                    emptyMessage="No se encontraron resultados"
                    selectionMode="multiple" 
                    metaKeySelection={false} 
                    selection={selectedElement} 
                    onSelectionChange={e => setSelectedElement(e.value)}
                >
                    <Column field={Columns[0].field} header={Columns[0].header} sortable/>
                    <Column field={Columns[1].field} header={Columns[1].header} sortable/>
                    <Column field={Columns[2].field} header={Columns[2].header} sortable/>
                    <Column field={Columns[3].field} header={Columns[3].header} sortable/>
                    <Column field={Columns[4].field} header={Columns[4].header} body={statusBodyTemplate}/>
                    <Column field={Columns[5].field} header={Columns[5].header} sortable/>
                    <Column body={actionBodyTemplate} />
                </DataTable>
            </div>
            <Dialog visible={productDialog} modal className="p-fluid" onHide={hideDialog}>
                <div className="p-d-flex p-jc-center">
                    <div style={{minWidth:'450px'}}>
                        <FormularioNew />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={productUpdateDialog} modal className="p-fluid" onHide={hideUpdateDialog}>
                <div className="p-d-flex p-jc-center">
                    <div style={{minWidth:'450px'}}>
                        <FormularioUpdate />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal onHide={hideDeleteProductDialog}>
                <div className="confirmation-content" style={{ marginBottom:'1.5rem'}}>
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span >Estas seguro de que deseas eliminar <br/><b>{product.product_name}</b>?</span>}
                </div>
                <Button label="Eliminar Producto" className="p-button-danger p-mr-2" onClick={destroyProduct} />
            </Dialog>
        </div>
        
    )
}