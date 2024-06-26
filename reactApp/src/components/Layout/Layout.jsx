import logo from '../../assets/osoLogo.png';
import { Outlet, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Layout() {
  const location = useLocation();
  const showLoginButton = location.pathname !== "/dashboard"  //quita el boton login cuando esta en dashboard
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" >
            <img src={ logo } alt="logo" width="35px"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/aboutUs">About us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
            {!isAuthenticated && showLoginButton && (
              <form className="d-flex" role="button">
              <Link className="btn btn-outline-success" type="button"  to="/login">Log in</Link>
            </form>
            )}
          </div>
        </div>
      </nav>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default Layout;
