import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/osoLogo2.png';

function DeleteUser() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (token){
            try {
                const response = await fetch('http://localhost:8080/api/private/users', {
                    method: 'DELETE',
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                });
                if (response.ok){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                throw new Error('Failed to delete user');
                }
            }catch(error){
                setError('Failed to delete user');
                console.error(error);
            }
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

  return (
    <>
        <div className="container mt-5">
        <h2 className="text-center mb-4">Delete Account</h2>
        {error && <div className='alert alert-danger'>{error}</div>}
        <img src={ logo } alt="logo" width="70px"/>
        <div className="card">
        <div className="card-body">
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="d-flex justify-content-between">
            <button onClick={handleDelete} className="btn btn-success">Delete Account</button>
            <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
            </div>
        </div>
        </div>
    </div>
  </>  
  );
}

export default DeleteUser;
