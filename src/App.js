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
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Dashboard from './Screens/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
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
            <Sidebar />

            <div className="container-fluid page-body-wrapper">

              {/* navbar */}
              <Route
                render={props => (
                  <Navbar {...props} data={state} setData={setState} />
                )}
              />

              <div className="main-panel">
                <div className="content-wrapper">

                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>

                </div>

                {/* footer */}
                <Footer />

              </div>
            </div>
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
