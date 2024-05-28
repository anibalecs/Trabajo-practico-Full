import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/osoLogo2.png';

function EditProfile(){
    const [formData, setFormData] = useState({name: '', lastname: '', email: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() =>{
        const fetchUserProfile = async ()=>{
            if (token) {
              const response = await fetch('http://localhost:8080/api/private/myUser', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              })
              if(response.ok){
                const data = await response.json();
                setFormData(data);
              }else{
                throw new error('Failed to fetch user data');
              }
            }else{
              console.error('No token found in localStorage');
              setError('No token found, please login again');
            }
          };
    fetchUserProfile();
    }, []);
    
    const handleChange = (e) => {  //actualiza el estado del formulario a medida que user escribe
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleSubmit = async(e) => {    
        e.preventDefault();  
        //maneja envio de formulario y logica actualizacion de perfil
        try{
            const response = await fetch('http://localhost:8080/api/private/users', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if(!response.ok){
                throw new Error('Edit profile failed');
            }
            navigate('/dashboard');

        }catch(error){
            console.log(error);
            setError('Edit profile failed');
        }
    };

    return(
        <>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Edit Profile</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <img src={ logo } alt="logo" width="70px"/>
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="name" name="name" placeholder={formData.name} onChange={handleChange}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">Last name</label>
                                            <input type="text" className="form-control" id="lastName" name="lastName" placeholder={formData.lastname} onChange={handleChange}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" placeholder={formData.email} onChange={handleChange}/>
                                        </div>
                                        {/* <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password to confirm" value={formData.password} onChange={handleChange} required/>
                                        </div> */}
                                        <button type="submit" className="btn btn-success w-100">Update Profile</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    );
}

export default EditProfile;