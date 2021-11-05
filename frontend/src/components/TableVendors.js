import React, {useState,useRef} from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { addVendor,editVendor,deleteVendor } from '../redux/middleware/vendorMiddleware';
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';


export default function TableVendors(props){
    const Columns = [
        { field: "id", header: "Codigo de Vendedor" },
        { field: "name", header: "Vendedor" },
    ]

    const refToast = useRef(null);    
    const {Data}=props
    const dispatch =useDispatch()
    const [vendor, setVendor] = useState({});    
    const [vendorDialog, setVendorDialog] = useState(false);
    const [vendorUpdateDialog, setVendorUpdateDialog] = useState(false);
    const [deleteVendorDialog, setDeleteVendorDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('')
    const dt = useRef(null)
    
    const header=(
        <div className="p-d-flex p-jc-between p-ai-center">
            <h3 className="p-m-0">Lista de Vendedores</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar en la Tabla" />
            </span>
        </div>
        )

    const hideDialog = () => {
        setVendorDialog(false);
    }
    const hideUpdateDialog = () => {
        setVendorUpdateDialog(false);
    }
    const updateVendor = (vendorData) => {
        setVendor(vendorData);
        setVendorUpdateDialog(true);
    }
    const confirmDeleteVendor = (vendorData) => {
        setVendor(vendorData);
        setDeleteVendorDialog(true);
    }
    
    const hideDeleteVendorDialog = () => {
        setDeleteVendorDialog(false);
    }
    const destroyVendor =async () => {
        await dispatch(deleteVendor(vendor.id))
        setDeleteVendorDialog(false);
        setVendor({})
        refToast.current.show({ severity: 'warn', summary: 'Successful', detail: 'Vendedor Eliminado', life: 5000 });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() =>updateVendor(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteVendor(rowData)}/>
            </>
        );
    }
    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="Nuevo Vendedor" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={()=>{
                    setVendor({})
                    setVendorDialog(true)
                }} />
            </>
        )
    }

    const onSubmit = async datos => {
            await dispatch(addVendor(datos))
            setVendorDialog(false);
            setVendor({})
            refToast.current.show({ severity: 'success', summary: 'Successful', detail: 'Vendedor Creado', life: 3000 });
    }
    const onSubmitUpdate = async datos => {
        await dispatch(editVendor(vendor.id,datos))
        setVendorUpdateDialog(false);
        setVendor({})
        refToast.current.show({ severity: 'success', summary: 'Successful', detail: 'Vendedor Actualizado', life: 3000 });
    }

    const FormularioNew=()=>{
        const { handleSubmit, formState: { errors }, control } = useForm()
        const getFormErrorMessage = (name) => {
            return errors[name] && <small className="p-error">{errors[name].message}</small>
        };
        return(
                <>
                    <h2 className="p-text-center">Nuevo Vendedor</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid" style={{marginTop:'2rem'}}>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Nombre del Vendedor</label>
                            <Controller name="name" control={control} defaultValue={''} rules={{ required: 'Nombre es requerido' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} value={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            {getFormErrorMessage('name')}
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
                    <h2 className="p-text-center">Editar Vendedor </h2>
                    <form onSubmit={handleSubmit(onSubmitUpdate)} className="p-fluid" style={{marginTop:'2rem'}}>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Nombre del Vendedor</label>
                            <Controller name="name" control={control} defaultValue={vendor.name} rules={{ required: 'Nombre es requerido' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} value={field.value}  className={classNames({ 'p-invalid': fieldState.invalid })}/>
                            )} />
                            {getFormErrorMessage('name')}
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
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    showGridlines
                    sortMode="multiple"
                    removableSort
                    scrollable
                    scrollHeight="300px"
                    emptyMessage="No se encontraron resultados"
                >
                    <Column field={Columns[0].field} header={Columns[0].header} sortable/>
                    <Column field={Columns[1].field} header={Columns[1].header} sortable/>
                    <Column body={actionBodyTemplate} />
                </DataTable>
            </div>
            <Dialog visible={vendorDialog} modal className="p-fluid" onHide={hideDialog}>
                <div className="p-d-flex p-jc-center">
                    <div style={{minWidth:'450px'}}>
                        <FormularioNew />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={vendorUpdateDialog} modal className="p-fluid" onHide={hideUpdateDialog}>
                <div className="p-d-flex p-jc-center">
                    <div style={{minWidth:'450px'}}>
                        <FormularioUpdate />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deleteVendorDialog} style={{ width: '450px' }} header="Confirmar" modal onHide={hideDeleteVendorDialog}>
                <div className="confirmation-content" style={{ marginBottom:'1.5rem'}}>
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {vendor && <span >Estas seguro de que deseas eliminar <br/><b>{vendor.name}</b>?</span>}
                </div>
                <Button label="Eliminar Vendedor" className="p-button-danger p-mr-2" onClick={destroyVendor} />
            </Dialog>
        </div>
        
    )
}