import React, { Suspense, useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';
import { useSelector } from 'react-redux';

export default function Home() {
    const {userInlet}= useSelector(state=>state.users)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('Nuevo Usuario')
    const [status, setState] = useState(<span style={{color:'orange'}}>Pendiente</span>)
    const [titleSub, setTitle] = useState('Nuevo Usuario')
    useEffect(() => {
        const loadUserData=async()=>{
            await setName(userInlet.name)
            await setEmail(userInlet.email)
            await setTitle(`${userInlet.name} / ${userInlet.email}`)
            await setRole(userInlet.role===0?'Nuevo Usuario':(userInlet.role===1?'Vendedor':'Administrador'))
            await setState(userInlet.state===0?<span style={{color:'orange'}}>Pendiente</span>:(userInlet.state===1?<span style={{color:'green'}}>Autorizado</span>:<span style={{color:'red'}}>No Autorizado</span>))
            
        }
        if(userInlet){
            loadUserData()
        }
    }, [userInlet])
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div className="p-fluid">
                <div className="p-d-flex p-jc-center">
                    <Card title="Bienvenido" subTitle={titleSub} style={{marginBottom:'1.5rem'}}>
                        {role==='Nuevo Usuario'?
                            <div className="p-card-content">
                                <p><b>Actualmente nos encontramos verificando tu cuenta</b></p>
                            </div>
                        :
                            <div className="p-card-content">
                                <p>Ya estas <b>Verificado!!!</b> puedes acceder a los modulos disponibles en el Menu</p>
                            </div>
                        }
                    </Card>
                </div>
                <div className="p-d-flex p-jc-center">
                    <Fieldset legend="Estado">
                            {role==='Nuevo Usuario'?
                            <><p>Estimado Usuario por el momento sus credenciales son: </p> <br/></>:
                            <><p>Estimado <b>{name}</b> sus credenciales son:</p> <br/></>
                            }
                        
                            
                        <div className="p-grid p-dir-col">
                            {role==='Nuevo Usuario'?
                            <>
                            <div className="p-col"><b>Role: </b>{role}</div>
                            <div className="p-col"><b>Estado: </b> {status}</div>
                            </>
                            :
                            <>
                            <div className="p-col"><b>Nombre:</b> {name}</div>
                            <div className="p-col"><b>Email:</b> {email}</div>
                            <div className="p-col"><b>Role:</b> {role}</div>
                            <div className="p-col"><b>Estado:</b> {status}</div>
                            </>
                            }
                        </div>
                    </Fieldset>
                </div>
            </div>
        </Suspense>
    )
}
