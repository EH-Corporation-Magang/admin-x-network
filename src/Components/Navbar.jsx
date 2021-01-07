/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Swal from 'sweetalert2/src/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content';

function Navbar(props) {
    const MySwal = withReactContent(Swal);
    const logout = async () => {
        MySwal.fire({
            title: 'currently logged out of account...',
            didOpen: () => {
                MySwal.showLoading()
            },
        })
        try {
            const getLogout = await fetch(`http://localhost:8000/logout`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const logout = await getLogout.json()
            console.log(logout)
            if (logout.success) {
                localStorage.removeItem('token')
                props.history.push('/')
                MySwal.close()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // const clear = () => {
    //     window.localStorage.clear();
    // }

    return (
        <>
            <nav className="navbar p-0 fixed-top d-flex flex-row">
                <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown">
                            <a className="nav-link" id="profileDropdown" href="#" data-toggle="dropdown">
                                <div className="navbar-profile">
                                    <img className="img-xs rounded-circle" src={localStorage.getItem('gambaruser')} alt="profile-img" />
                                    <p className="mb-0 d-none d-sm-block navbar-profile-name">{localStorage.getItem('username')}</p>
                                    <i className="mdi mdi-menu-down d-none d-sm-block" />
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                                <h6 className="p-3 mb-0">Profile</h6>
                                <div className="dropdown-divider" />
                                <a href="profilemenu" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-account-circle text-warning" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Profile</p>
                                    </div>
                                </a>
                                <button onClick={logout} className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-logout text-danger" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Log out</p>
                                    </div>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="mdi mdi-format-line-spacing" />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar