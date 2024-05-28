import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';


function Profile(){

    const [activeSection, setActiveSection] = useState(null);
    const [userProfile, setUserProfile] = useState({name: '', lastname: '', email:''});
    const [error, setError] = useState('');
  
    const handleButtonClick = (section) => {
      setActiveSection(activeSection === section ? null : section);
    };
   
  useEffect(() =>{
    const fetchUserProfile = async ()=>{
      const token = localStorage.getItem('token');
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
          setUserProfile(data);
        }else{
          throw new error('Failed to fetch user data');
        }
      }else{
        console.error('No token found in localStorage');
        setError('No token found, please login again');
      }
    }
    if(activeSection === 'profile'){
      fetchUserProfile();
    }
  }, [activeSection]);


    return(
        <>
            <div className="col-md-4 mb-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <FaUser size={40} className="text-success mb-3" />
              <h4 className="card-title">Profile</h4>
              <p className="card-text">View and edit your personal information.</p>
              <button onClick={() => handleButtonClick('profile')} className="btn btn-success">
                {activeSection === 'profile' ? 'Hide' : 'Go to Profile'}
              </button>
              {activeSection === 'profile' && (
                <div className="mt-3">
                  <div className="text-start">
                    <p><strong>Name: </strong>{userProfile.name}</p>
                    <p><strong>Last name: </strong>{userProfile.lastname}</p>
                    <p><strong>Email: </strong>{userProfile.email}</p> 
                  </div>
                  <Link className="btn btn-success mt-3 me-2" to="/editProfile" role="button">Edit Profile</Link>
                  <Link className="btn btn-danger mt-3" to="/DeleteUser" role="button">Delete user</Link>
                </div>
              )}
            </div>
          </div>
        </div>
        </>
    );
}

export default Profile;