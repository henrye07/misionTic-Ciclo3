import React, {useState,useRef} from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { editSale,deleteSale } from '../redux/middleware/salesMiddleware';
import { Controller, useForm } from 'react-hook-form'
import { InputNumber } from 'primereact/inputnumber';
import { useDispatch } from 'react-redux';
import { Toolbar } from 'primereact/toolbar';
import { useHistory } from 'react-router-dom';
import { routes } from '../routes';


export default function TableSales(props){
    const Columns = [
        { field: "id", header: "Codigo Factura" },
        { field: "name_customer", header: "Nombre del Cliente" },
        { field: "id_customer", header: "Identificacion del Cliente" },
        { field: "vendorID", header: "vendedor" },
        { field: "state", header: "Estado" },
        { field: "total", header: "Precio Total" },
        { field: "createdAt", header: "Fecha de Compra" },
    ]

    const ColumnsExpand=[
        { field: "id", header: "Codigo Ref." },
        { field: "product_name", header: "Producto" },
        { field: "description", header: "Descripcion" },
        { field: "price", header: "Precio por Unidad" },
        { field: "quantity", header: "Cantidad Solicitada" }
    ]
    const states = [
        { label: 'En Proceso', value: 0 },
        { label: 'Cancelada', value: 1 },
        { label: 'Entregada', value: 2 }
    ];
    
    const refToast = useRef(null);    
    const history=useHistory()
    const {Data}=props
    const Vendors = Data.map(sale=>{return {label:sale.Vendedor.name,value:sale.Vendedor.id}});
    const dispatch =useDispatch()
    const [sales, setSales] = useState({});
    const [saleUpdateDialog, setSaleUpdateDialog] = useState(false);
    const [deleteSaleDialog, setDeleteSaleDialog] = useState(false);
    const [expandedRows, setExpandedRows] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('')
    const dt = useRef(null)

    
    const vendorBodyTemplate = (rowData) => {
        return <span >{rowData.Vendedor.name}</span> 
    }
    const quantityBodyTemplate=(rowData)=>{
        return <span>{rowData.SaleDetails.quantity}</span>
    }
    const onRowExpand = (event) => {
        refToast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
    }
    const onRowCollapse = (event) => {
        refToast.current.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
    }
    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Orders for Products</h5>
                <DataTable value={data.items} responsiveLayout="scroll">
                    <Column field={ColumnsExpand[0].field} header={ColumnsExpand[0].header} sortable></Column>
                    <Column field={ColumnsExpand[1].field} header={ColumnsExpand[1].header} sortable></Column>
                    <Column field={ColumnsExpand[2].field} header={ColumnsExpand[2].header} sortable></Column>
                    <Column field={ColumnsExpand[3].field} header={ColumnsExpand[3].header} sortable></Column>
                    <Column header={ColumnsExpand[4].header} body={quantityBodyTemplate} sortable></Column>
                </DataTable>
            </div>
        );
    }
    const statusBodyTemplate = (rowData) => {
        switch (rowData.state) {
            case states[0].value:
                return <span style={{backgroundColor:'yellow',color:'black'}} >En Proceso</span>
            case states[1].value:
                return <span style={{backgroundColor:'orange',color:'white'}} >Cancelada</span>
            case states[2].value:
                return <span style={{backgroundColor:'green',color:'white'}} >Entregada</span>
            default:
                return <span style={{backgroundColor:'yellow',color:'black'}} >En Proceso</span>
        } 
    }
    const priceBodyTemplate=(rowData)=>{
        return <span>$ {rowData.total}</span>
        
    }
    const header=(
        <div className="p-d-flex p-jc-between p-ai-center">
                <h3 className="p-m-0">Lista de Ventas</h3>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar en la Tabla" />
                </span>
            </div>
        )
    const hideUpdateDialog = () => {
        setSaleUpdateDialog(false);
    }
    const updateSale = (productData) => {
        setSales(productData);
        setSaleUpdateDialog(true);
    }
    const confirmDeleteProduct = (productData) => {
        setSales(productData);
        setDeleteSaleDialog(true);
    }
    
    const hideDeleteProductDialog = () => {
        setDeleteSaleDialog(false);
    }
    const destroyProduct =async () => {
        await dispatch(deleteSale(sales.id))
        setDeleteSaleDialog(false);
        setSales({})
        refToast.current.show({ severity: 'warn', summary: 'Successful', detail: 'Producto Eliminado de la lista', life: 5000 });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() =>updateSale(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)}/>
            </>
        );
    }

    const onSubmitUpdate = async datos => {
        await dispatch(editSale(sales.id,datos))
        setSaleUpdateDialog(false);
        setSales({})
        refToast.current.show({ severity: 'success', summary: 'Successful', detail: 'Venta Actualizada', life: 3000 });
    }

    const FormularioUpdate=()=>{
        console.log(sales)
        const { handleSubmit, formState: { errors }, control } = useForm()
        const getFormErrorMessage = (name) => {
            return errors[name] && <small className="p-error">{errors[name].message}</small>
        };
        return(
                <>
                   <h2 className="p-text-center">Actualizar Datos de Compra</h2>
                    <div className="p-d-flex p-jc-center p-justify-center">
                        <form onSubmit={handleSubmit(onSubmitUpdate)} className="p-fluid" style={{marginTop:'2rem'}}>
                            <div className="p-field" style={{marginBottom:'1.5rem'}}>
                                <label htmlFor="name_customer" className={classNames({ 'p-error': errors.name_customer })}>Nombre del Cliente</label>
                                <Controller name="name_customer" control={control} rules={{ required: 'Nombre es requerido' }} defaultValue={sales.name_customer} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} value={field.value}  className={classNames({ 'p-invalid': fieldState.invalid })}/>
                                )} />
                                {getFormErrorMessage('name_customer')}
                            </div>
                            <div className="p-field" style={{marginBottom:'1.5rem'}}>
                                <label htmlFor="id_customer" className={classNames({ 'p-error': errors.id_customer })}>Identificacion del Cliente</label>
                                <Controller name="id_customer" control={control}  rules={{ required: 'Identificacion es requerida' }} defaultValue={sales.id_customer} render={({ field, fieldState }) => (
                                    <InputNumber inputId={field.name} {...field} value={field.value} onChange={e=>field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} integeronly/>
                                )} />
                                {getFormErrorMessage('id_customer')}
                            </div>
                            <div className="p-field" style={{marginBottom:'1.5rem'}}>
                                <label htmlFor="vendorID" className={classNames({ 'p-error': errors.vendorID })}>Vendedor</label>
                                <Controller name="vendorID" control={control} defaultValue={sales.vendorID} render={({ field }) => (
                                    <Dropdown inputId={field.name} {...field} options={Vendors} />
                                )} />
                                {getFormErrorMessage('vendorID')}
                            </div>
                            <div className="p-field" style={{marginBottom:'1.5rem'}}>
                                <label htmlFor="state" className={classNames({ 'p-error': errors.state })}>Estado</label>
                                <Controller name="state" control={control} defaultValue={sales.state} render={({ field }) => (
                                        <Dropdown inputId={field.name} {...field} options={states} />
                                    )} />
                            </div>
                            <Button type="submit" label="Actualizar Factura" className="p-mt-2" />
                        </form>
                    </div>
                </>
        )
    }
    const ToolbarTemplate=()=>{
        return(
            <>
                <Button label="Nueva Venta" icon="pi pi-wallet" className="p-button-success p-mr-2" onClick={()=>{
                     history.push(routes.sales.orderSales) 
                }} />
            </>
        )
}
    return (
        <div className="datatable-templating-demo">
            <Toast ref={refToast} />
            <div className="card ">
                <Toolbar className="p-mb-4" left={ToolbarTemplate} />
                <DataTable 
                    ref={dt}
                    value={Data}
                    header={header}
                    className="p-datatable-sm "
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} sales"
                    showGridlines
                    sortMode="multiple"
                    removableSort
                    scrollable
                    scrollHeight="300px"
                    emptyMessage="No se encontraron resultados" 
                    expandedRows={expandedRows} 
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowExpand} 
                    onRowCollapse={onRowCollapse} 
                    responsiveLayout="scroll"
                    rowExpansionTemplate={rowExpansionTemplate} 
                    dataKey="id"
                >
                    <Column expander style={{ width: '3em' }} />
                    <Column field={Columns[0].field} header={Columns[0].header} sortable/>
                    <Column field={Columns[1].field} header={Columns[1].header} sortable/>
                    <Column field={Columns[2].field} header={Columns[2].header} sortable/>
                    <Column field={Columns[3].field} header={Columns[3].header} body={vendorBodyTemplate} sortable/>
                    <Column field={Columns[4].field} header={Columns[4].header} body={statusBodyTemplate} sortable/>
                    <Column field={Columns[5].field} header={Columns[5].header} body={priceBodyTemplate} sortable/>
                    <Column field={Columns[6].field} header={Columns[6].header} sortable/>
                    <Column body={actionBodyTemplate} />
                </DataTable>
            </div>
            <Dialog visible={saleUpdateDialog} modal className="p-fluid" onHide={hideUpdateDialog}>
                <div className="p-d-flex p-jc-center">
                    <div style={{minWidth:'450px'}}>
                        <FormularioUpdate />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deleteSaleDialog} style={{ width: '450px' }} header="Confirmar" modal onHide={hideDeleteProductDialog}>
                <div className="confirmation-content" style={{ marginBottom:'1.5rem'}}>
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {sales && <span >Estas seguro de que deseas eliminar la<br/><b>Factura N-{sales.id}</b>?</span>}
                </div>
                <Button label="Eliminar Producto" className="p-button-danger p-mr-2" onClick={destroyProduct} />
            </Dialog>
        </div>
        
    )
}
