import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <div className="container-scroller">

            {/* sidebar */}
            <Sidebar />

            <div className="container-fluid page-body-wrapper">

              {/* navbar */}
              <Navbar />

              <div className="main-panel">
                <div className="content-wrapper">



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
