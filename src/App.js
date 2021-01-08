import './App.css';
import React,
{
  useState
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Screens/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import CareerMenu from './Screens/CareerMenu';
import ProfileMenu from './Screens/ProfileMenu';
import ContactMenu from './Screens/ContactMenu';
import AppsMenu from './Screens/AppsMenu';
import RadioMenu from './Screens/RadioMenu';
import '@sweetalert2/theme-dark';

function App() {
  const [state, setState] = useState({
    loggedIn: false,
    user: {}
  })

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Login {...props} data={state} setData={setState} />
            )}
          />

          <Route path="/register">
            <Register />
          </Route>

          <div className="container-scroller">

            {/* sidebar */}
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                <a className="sidebar-brand brand-logo" href="dashboard">
                  <img src="assets/images/logox1.png" style={{ height: "40px", marginLeft: "40px" }} alt="logo" />
                </a>
                <a className="sidebar-brand brand-logo-mini" href="dashboard">
                  <img src="assets/images/logo-mini.svg" alt="logo" />
                </a>
              </div>
              <ul className="nav">
                <li className="nav-item profile">
                  <div className="profile-desc">
                    <div className="profile-pic">
                      <div className="count-indicator">
                        <img className="img-xs rounded-circle " src={localStorage.getItem('gambaruser')} alt="profile-img" />
                        <span className="count bg-success" />
                      </div>
                      <div className="profile-name">
                        <h5 className="mb-0 font-weight-normal">{localStorage.getItem('username')}</h5>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item nav-category">
                  <span className="nav-link">Navigation</span>
                </li>
                <li className="nav-item menu-items">
                  <a className="nav-link" href="dashboard">
                    <span className="menu-icon">
                      <i className="mdi mdi-speedometer" />
                    </span>
                    <span className="menu-title">Dashboard</span>
                  </a>
                </li>
                <li className="nav-item nav-category">
                  <span className="nav-link">Other Menu</span>
                </li>
                <li className="nav-item menu-items">
                  <a className="nav-link" href="radiomenu">
                    <span className="menu-icon">
                      <i className="mdi mdi-radio" />
                    </span>
                    <span className="menu-title">Radio Menu</span>
                  </a>
                </li>
                <li className="nav-item menu-items">
                  <a className="nav-link" href="messagemenu">
                    <span className="menu-icon">
                      <i className="mdi mdi-message-text" />
                    </span>
                    <span className="menu-title">Messaging Menu</span>
                  </a>
                </li>
                <li className="nav-item menu-items">
                  <a className="nav-link" href="appsmenu">
                    <span className="menu-icon">
                      <i className="mdi mdi-apps" />
                    </span>
                    <span className="menu-title">Product Menu</span>
                  </a>
                </li>
                <li className="nav-item nav-category">
                  <span className="nav-link">Job Vacancy</span>
                </li>
                <li className="nav-item menu-items">
                  <a className="nav-link" href="careermenu">
                    <span className="menu-icon">
                      <i className="mdi mdi-briefcase" />
                    </span>
                    <span className="menu-title">Career Menu</span>
                  </a>
                </li>
                <li className="nav-item nav-category">
                  <span className="nav-link">Contact</span>
                </li>
                <li className="nav-item menu-items">
                  <a className="nav-link" href="contactmenu">
                    <span className="menu-icon">
                      <i className="mdi mdi-wechat" />
                    </span>
                    <span className="menu-title">Contact Menu</span>
                  </a>
                </li>
              </ul>
            </nav>

            <div className="container-fluid page-body-wrapper">

              {/* navbar */}
              <Route
                render={props => (
                  <Navbar {...props} data={state} setData={setState} />
                )}
              />

              <div className="main-panel">
                <div className="content-wrapper">

                  {/* Dashboard */}
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>

                  {/* Career Menu */}
                  <Route path="/careermenu">
                    <CareerMenu />
                  </Route>

                  {/* Profile Menu */}
                  <Route
                    path="/profilemenu"
                    render={props => (
                      <ProfileMenu {...props} data={state} setData={setState} />
                    )}
                  />

                  {/* Contact */}
                  <Route path="/contactmenu">
                    <ContactMenu />
                  </Route>

                  {/* Apps */}
                  <Route path="/appsmenu">
                    <AppsMenu />
                  </Route>

                  {/* Radio Menu */}
                  <Route path="/radiomenu">
                    <RadioMenu />
                  </Route>

                </div>

                {/* footer */}
                <footer className="footer">
                  <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                      Copyright © xnetwork.id {(new Date().getFullYear())}
                    </span>
                  </div>
                </footer>

              </div>
            </div>
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
