import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../routes'
import { FaPersonBooth } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import {  BsPersonCheck } from 'react-icons/bs'
import { GiTwirlCenter, GiMilkCarton } from 'react-icons/gi'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import useAuth from '../hook/useAuth'

export default function Sidebar() {
    const auth = useAuth()
    const {userInlet}=useSelector(state=>state.users)
    const [userRole, setUserRole] = useState(0);
    const [userState, setUserState] = useState(0);
    useEffect(() => {
        const loadRoleUser=async()=>{
            await setUserRole(userInlet.role)
            await setUserState(userInlet.state)
        }
        loadRoleUser()
    }, [userInlet])
    const Navbar = () => {
        return (
            <>
                <li className="list">
                    <NavLink exact to={routes.home} activeClassName="active-link">
                        <AiOutlineHome className="icon" />
                        <span className="links_name" >Home</span>
                    </NavLink>
                    <ul className="sub-menu blank">
                        <li><NavLink to={routes.home} className="links_name" activeClassName="active-link">Home</NavLink></li>
                    </ul>
                </li>
                {userRole===1 && userState===2?
                    <li >
                        <div className="iocn-link">
                            <NavLink to={routes.sales.Sales} activeClassName="active-link">
                                <RiShoppingCart2Line className="icon" />
                                <span className="links_name">Sales</span>
                            </NavLink>
                        </div>
                        <ul className="sub-menu">
                            <li><span className="links_name">Sales</span></li>
                            <li><NavLink exact to={routes.sales.orderSales} activeClassName="active-sub-link">Create Sales</NavLink></li>
                            <li><NavLink exact to={routes.sales.Sales} activeClassName="active-sub-link">Sales</NavLink></li>
                        </ul>
                    </li>:
                    null
                }
                {userRole===2 &&
                    <>
                    <li className="list">
                        <NavLink exact to={routes.products} activeClassName="active-link">
                            <GiMilkCarton className="icon" />
                            <span className="links_name" >Products</span>
                        </NavLink>
                        <ul className="sub-menu blank">
                            <li><NavLink to={routes.products} className="links_name" activeClassName="active-link">Products</NavLink></li>
                        </ul>
                    </li>
                    <li >
                        <div className="iocn-link">
                            <NavLink to={routes.sales.Sales} activeClassName="active-link">
                                <RiShoppingCart2Line className="icon" />
                                <span className="links_name">Sales</span>
                            </NavLink>
                        </div>
                        <ul className="sub-menu">
                            <li><span className="links_name">Sales</span></li>
                            <li><NavLink exact to={routes.sales.orderSales} activeClassName="active-sub-link">Create Sales</NavLink></li>
                            <li><NavLink exact to={routes.sales.Sales} activeClassName="active-sub-link">Sales</NavLink></li>
                        </ul>
                    </li>
                    <li className="list">
                        <NavLink exact to={routes.users} activeClassName="active-link">
                            <BsPersonCheck className="icon" />
                            <span className="links_name" >Users</span>
                        </NavLink>
                        <ul className="sub-menu blank">
                            <li><NavLink to={routes.users} className="links_name" activeClassName="active-link">Users</NavLink></li>
                        </ul>
                    </li>
                    <li className="list">
                        <NavLink exact to={routes.vendors} activeClassName="active-link">
                            <FaPersonBooth className="icon" />
                            <span className="links_name" >Vendors</span>
                        </NavLink>
                        <ul className="sub-menu blank">
                            <li><NavLink to={routes.vendors} className="links_name" activeClassName="active-link">Vendors</NavLink></li>
                        </ul>
                    </li>
                    </>
                }
            </>


        )
    }
    return (
        <>
            <div className="logo_details">
                <GiTwirlCenter className="icon" />
                <span className="logo_name">Food Factory</span>
            </div>
            <ul className="nav_list">
                <Navbar />
                <li style={{ padding: 0 }}>
                    <div className="profile-details">
                        <button className="profile-content" onClick={() => auth.logOut()}>
                            <BiLogOut className="icon" id="log_out" />
                        </button>
                    </div>
                </li>
            </ul>
        </>
    )
}
