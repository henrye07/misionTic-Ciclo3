import React from 'react'
import { Switch } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import {Order} from './pages/Order'
import { Users } from './pages/Users'
import {Products} from './pages/Products'
import { Vendors } from './pages/Vendors'
import {Sales} from './pages/Sales'
import { routes } from './routes'
import'./styles/main.css'

export default function Dashboard() {
    const Header=({title})=>{
        return <span className="text" >{title}</span>
    }
    return (
        <>
            <div className="sidebar active">
                <Sidebar />
            </div>
            <div className="content">
                <div className="header">
                    <Switch>
                        <PrivateRoute exact path={routes.home} component={()=><Header title="Home" />} />
                        <PrivateRoute exact path={routes.products} component={()=><Header title="Products"/>} />
                        <PrivateRoute exact path={routes.sales.orderSales} component={()=><Header title="Sales" />}/>
                        <PrivateRoute exact path={routes.sales.Sales} component={()=><Header title="Sales" />}/>
                        <PrivateRoute exact path={routes.users} component={()=><Header title="Users" />}/>
                        <PrivateRoute exact path={routes.vendors} component={()=><Header title="Vendors" />}/>
                    </Switch>
                </div>
                <div className="main" style={{ overflowY:'scroll',overflowX:'auto'}}>
                    <Switch>
                            <PrivateRoute exact path={routes.home} component={Home} />
                            <PrivateRoute exact path={routes.products} component={Products} />
                            <PrivateRoute exact path={routes.sales.orderSales} component={Order}/>
                            <PrivateRoute exact path={routes.sales.Sales} component={Sales}/>
                            <PrivateRoute exact path={routes.users} component={Users}/>
                            <PrivateRoute exact path={routes.vendors} component={Vendors}/>
                    </Switch>
                </div>
            </div>
        </>
    )
}
