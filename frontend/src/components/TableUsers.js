import React, {useState,useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { editUser,deleteUser } from '../redux/middleware/userMiddleware';
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';

export default function TableUsers(props){
    const Columns = [
        { field: "id", header: "Codigo de Usuario" },
        { field: "email", header: "Email" },
        { field: "name", header: "Nombre" },
        { field: "role", header: "Role" },
        { field: "state", header: "Estado" },
        { field: "createdAt", header: "Fecha de Creacion" },
    ]
    const roles = [
        { label: 'Nuevo Usuario', value: 0 },
        { label: 'Vendedor', value: 1 },
        { label: 'Administrador', value: 2 }
    ];
    const states = [
        { label: 'Pendiente', value: 0 },
        { label: 'Autorizado', value: 1 },
        { label: 'No Autorizado', value: 2 }
    ];
    const refToast = useRef(null);    
    const {Data}=props
    const dispatch =useDispatch()
    const [user, setUser] = useState({});    
    const [userUpdateDialog, setUserUpdateDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('')
    const dt = useRef(null)

    const header=(
            <div className="p-d-flex p-jc-between p-ai-center">
                <h3 className="p-m-0">Lista de Usuarios</h3>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar en la Tabla" />
                </span>
            </div>
            )

    const statusBodyTemplate = (rowData) => {
        switch (rowData.state) {
            case states[0].value:
                return <span style={{backgroundColor:'yellow',color:'black'}} >Pendiente</span>
            case states[1].value:
                return <span style={{backgroundColor:'green',color:'white'}} >Autorizado</span>
            case states[2].value:
                return <span style={{backgroundColor:'red',color:'white'}} >No Autorizado</span>
            default:
                return <span style={{backgroundColor:'yellow',color:'black'}} >Pendiente</span>
        } 
    }

    const roleBodyTemplate = (rowData) => {
        switch (rowData.role) {
            case roles[0].value:
                return <span style={{backgroundColor:'red',color:'white'}} >Nuevo Usuario</span>
            case roles[1].value:
                return <span style={{backgroundColor:'yellow',color:'black'}} >Vendedor</span>
            case roles[2].value:
                return <span style={{backgroundColor:'green',color:'white'}} >Administrador</span>
            default:
                return <span style={{backgroundColor:'red',color:'white'}} >Nuevo Usuario</span>
        } 
    }

    const hideUpdateDialog = () => {
        setUserUpdateDialog(false);
    }
    const updateUser = (vendorData) => {
        setUser(vendorData);
        setUserUpdateDialog(true);
    }
    const confirmDeleteUser = (vendorData) => {
        setUser(vendorData);
        setDeleteUserDialog(true);
    }
    
    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }
    const destroyUser =async () => {
        await dispatch(deleteUser(user.id))
        setDeleteUserDialog(false);
        setUser({})
        refToast.current.show({ severity: 'warn', summary: 'Successful', detail: 'Usuario Eliminado', life: 5000 });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() =>updateUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteUser(rowData)}/>
            </>
        );
    }
    const onSubmitUpdate = async datos => {
        console.log(user,datos)
        await dispatch(editUser(user.id,datos))
        setUserUpdateDialog(false);
        setUser({})
        refToast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Actualizado', life: 3000 });
    }

    const FormularioUpdate=()=>{
        const { handleSubmit, formState: { errors }, control } = useForm()
        const getFormErrorMessage = (name) => {
            return errors[name] && <small className="p-error">{errors[name].message}</small>
        };
        return(
                <>
                    <h2 className="p-text-center">Editar Usuario </h2>
                    <form onSubmit={handleSubmit(onSubmitUpdate)} className="p-fluid" style={{marginTop:'2rem'}}>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="email" className={classNames({ 'p-error': errors.email })}>Email del Usuario</label>
                            <Controller name="email" control={control} defaultValue={user.email} rules={{ required: 'Email es requerido' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} keyfilter="email" {...field} value={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>name</label>
                            <Controller name="name" control={control} defaultValue={user.name} rules={{ required: 'Nombre es requerido' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} keyfilter="email" {...field} value={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="role" className={classNames({ 'p-error': errors.role })}>Rol</label>
                            <Controller name="role" control={control} defaultValue={user.role} render={({ field }) => (
                                <Dropdown inputId={field.name} {...field} options={roles} />
                            )} />
                        </div>
                        <div className="p-field" style={{marginBottom:'1.5rem'}}>
                            <label htmlFor="state" className={classNames({ 'p-error': errors.state })}>Estado</label>
                            <Controller name="state" control={control} defaultValue={user.state} render={({ field }) => (
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
                <DataTable 
                    ref={dt}
                    value={Data}
                    header={header}
                    className="p-datatable-sm "
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    showGridlines
                    sortMode="multiple"
                    removableSort
                    scrollable
                    scrollHeight="300px"
                    emptyMessage="No se encontraron resultados"
                >
                    <Column field={Columns[0].field} header={Columns[0].header} sortable/>
                    <Column field={Columns[1].field} header={Columns[1].header} sortable/>
                    <Column field={Columns[2].field} header={Columns[2].header} className="p-text-nowrap p-text-truncate" style={{width: '10rem'}}/>
                    <Column field={Columns[3].field} header={Columns[3].header} body={roleBodyTemplate} sortable/>
                    <Column field={Columns[4].field} header={Columns[4].header} body={statusBodyTemplate} sortable/>
                    <Column field={Columns[5].field} header={Columns[5].header} sortable/>
                    <Column body={actionBodyTemplate} />
                </DataTable>
            </div>
            <Dialog visible={userUpdateDialog} modal className="p-fluid" onHide={hideUpdateDialog}>
                <div className="p-d-flex p-jc-center">
                    <div style={{minWidth:'450px'}}>
                        <FormularioUpdate />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirmar" modal onHide={hideDeleteUserDialog}>
                <div className="confirmation-content" style={{ marginBottom:'1.5rem'}}>
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {user && <span >Estas seguro de que deseas eliminar <br/><b>{user.email}</b>?</span>}
                </div>
                <Button label="Eliminar Usuario" className="p-button-danger p-mr-2" onClick={destroyUser} />
            </Dialog>
        </div>
        
    )
}