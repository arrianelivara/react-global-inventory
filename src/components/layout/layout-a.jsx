import React from 'react'
import {main_menus} from "./nav-entries.jsx";
import { NavLink } from 'react-router-dom';
import { Navigation } from 'components';

const LayoutA = ({ component }) => {
    const menuList = main_menus;
    return (<React.Fragment>
        <Navigation isLoggedIn={true} />
        <div className="flex h-full">
            <div className="h-full w-64 bg-white border-r shadow-lg shadow-gray-300">
                {menuList.map((menu) => {
                    const {  path: to, key } = menu;
                    return <div key={key} className="w-full">
                            {to !== undefined ? <NavLink
                                to={`${to}`}
                                exact
                                className={({ isActive }) => isActive ? "bg-blue-opaque text-blue text-sm block font-semibold border-l-4 border-blue w-full px-md py-sm" : "text-sm text-blue block font-semibold w-full px-md py-sm"}
                            >{menu.name}
                            </NavLink> : <div className="text-sm text-blue px-md py-sm font-semibold">{menu.name}</div>}
                            {menu.children?.map(({ name, path, key }) => {
                                return <div key={key} className="w-full hover:bg-blue-opaque">
                                    <NavLink
                                        to={`${path}`}
                                        exact
                                        className={({ isActive }) => isActive ? "bg-blue-opaque font-semibold text-blue border-l-4 border-blue w-full py-sm pl-xl block" : "text-blue-light block pl-xl w-full px-md py-sm"}
                                    >
                                            {name}
                                    </NavLink>
                                </div>
                            })}
                            </div>
                })}
            </div>
            <div className="bg-slate-50 w-full pb-24 px-xl pt-xl flex flex-col overflow-auto">
                <div className="mb-md">{component}</div>
                <div className="text-center mt-auto text-xs text-gray">
                    Copyright © 2022 Global Equipment Material Handlers Inc. All rights reserved.
                </div>
            </div>
        </div>
    </React.Fragment>);
}
 
export default LayoutA;