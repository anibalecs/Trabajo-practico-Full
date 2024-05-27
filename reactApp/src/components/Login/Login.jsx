import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/osoLogo2.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();      //evita que se envie de fomra convencional el formulario, evita que la pag se recargue.
    try{
      const response = await fetch('http://localhost:8080/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if(response.ok){
        const token = await response.json();
        localStorage.setItem('token', token);  //guarda token en el localStorage
        navigate('/dashboard');
      }else{
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch(error){
      console.log('Error:', error);
      setError('Login failed');
    }
  };

  return (
    <>
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ width: '300px' }}>
        <div className="text-center mb-4">
          <img src={ logo } alt="logo" width="70px"/>
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="example@gmail.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="*********" value={password} onChange={(e)=> setPassword(e.target.value)}/>
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