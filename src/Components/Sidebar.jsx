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
                        <NavLink className="nav-link" to="/radiomenu">
                            <span className="menu-icon">
                                <i className="mdi mdi-radio" />
                            </span>
                            <span className="menu-title">Radio Menu</span>
                        </NavLink>
                    </li>
                    <li className="nav-item menu-items">
                        <NavLink className="nav-link" to="/messagemenu">
                            <span className="menu-icon">
                                <i className="mdi mdi-message-text" />
                            </span>
                            <span className="menu-title">Messaging Menu</span>
                        </NavLink>
                    </li>
                    <li className="nav-item menu-items">
                        <NavLink className="nav-link" to="digitalmenu">
                            <span className="menu-icon">
                                <i className="mdi mdi-panorama" />
                            </span>
                            <span className="menu-title">Digital Ads Menu</span>
                        </NavLink>
                    </li>
                    <li className="nav-item menu-items">
                        <NavLink className="nav-link" to="appsmenu">
                            <span className="menu-icon">
                                <i className="mdi mdi-apps" />
                            </span>
                            <span className="menu-title">Apps Menu</span>
                        </NavLink>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Job Vacancy</span>
                    </li>
                    <li className="nav-item menu-items">
                        <NavLink className="nav-link" to="careermenu">
                            <span className="menu-icon">
                                <i className="mdi mdi-briefcase" />
                            </span>
                            <span className="menu-title">Career Menu</span>
                        </NavLink>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Contact</span>
                    </li>
                    <li className="nav-item menu-items">
                        <NavLink className="nav-link" to="careermenu">
                            <span className="menu-icon">
                                <i className="mdi mdi-wechat" />
                            </span>
                            <span className="menu-title">Contact Menu</span>
                        </NavLink>
                    </li>
                </ul>
            </sidebar>
        </>
    )
}

export default Sidebar