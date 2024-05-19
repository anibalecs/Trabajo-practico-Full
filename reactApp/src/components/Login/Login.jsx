import logo from '../../assets/osoLogo2.png';

function Login() {
  return (
    <>
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ width: '300px' }}>
        <div className="text-center mb-4">
          <img src={ logo } alt="logo" width="70px"/>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="example@gmail.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="*********" />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">Login</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;

