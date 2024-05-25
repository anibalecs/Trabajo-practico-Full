import { useState } from 'react';
import logo from '../../assets/osoLogo2.png';

function EditProfile(){
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
      });
    
      const handleChange = (e) => {  //actualiza el estado del formulario a medida que usr escribe
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {    //maneja envio de formulario y logica actualizacion de perfil
        e.preventDefault();  
        console.log('Profile updated:', formData);
      };

    return(
        <>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Edit Profile</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <img src={ logo } alt="logo" width="70px"/>
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">Last name</label>
                                            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password to confirm" value={formData.password} onChange={handleChange} required/>
                                        </div>
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