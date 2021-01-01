/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <>
            <sidebar className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    <NavLink className="sidebar-brand brand-logo" to="/dashboard">
                        <img src="assets/images/logox.svg" style={{ height: "60px" }} alt="logo" />
                    </NavLink>
                    <NavLink className="sidebar-brand brand-logo-mini" to="/dashboard">
                        <img src="assets/images/logo-mini.svg" alt="logo" />
                    </NavLink>
                </div>
                <ul className="nav">
                    <li className="nav-item profile">
                        <div className="profile-desc">
                            <div className="profile-pic">
                                <div className="count-indicator">
                                    <img className="img-xs rounded-circle " src="assets/images/faces/face15.jpg" alt="profile-img" />
                                    <span className="count bg-success" />
                                </div>
                                <div className="profile-name">
                                    <h5 className="mb-0 font-weight-normal">Admin</h5>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Navigation</span>
                    </li>
                    <li className="nav-item menu-items">
                        <NavLink className="nav-link" to="/dashboard">
                            <span className="menu-icon">
                                <i className="mdi mdi-speedometer" />
                            </span>
                            <span className="menu-title">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Home Menu</span>
                    </li>
                    <li className="nav-item menu-items">
                        <NavLink className="nav-link" to="/itemsmenu">
                            <span className="menu-icon">
                                <i className="mdi mdi-dropbox" />
                            </span>
                            <span className="menu-title">Items Menu</span>
                        </NavLink>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Other Menu</span>
                    </li>
                    <li className="nav-item menu-items">
                        <NavLink className="nav-link" to="/itemsmenu">
                            <span className="menu-icon">
                                <i className="mdi mdi-dropbox" />
                            </span>
                            <span className="menu-title">Radio Menu</span>
                        </NavLink>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/forms/basic_elements.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-playlist-play" />
                            </span>
                            <span className="menu-title">Form Elements</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/tables/basic-table.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-table-large" />
                            </span>
                            <span className="menu-title">Tables</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/charts/chartjs.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-chart-bar" />
                            </span>
                            <span className="menu-title">Charts</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/icons/mdi.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-contacts" />
                            </span>
                            <span className="menu-title">Icons</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                            <span className="menu-icon">
                                <i className="mdi mdi-security" />
                            </span>
                            <span className="menu-title">User Pages</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="http://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-file-document-box" />
                            </span>
                            <span className="menu-title">Documentation</span>
                        </a>
                    </li>
                </ul>
            </sidebar>
        </>
    )
}

export default Sidebar