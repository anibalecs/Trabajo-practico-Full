import { useState, /*useEffect*/ } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBoxOpen } from 'react-icons/fa';
import Ranking from '../Ranking/Ranking';
import dog from '../../assets/plushToys/peluchePerro.jpg';
import raccon from '../../assets/plushToys/pelucheMapache.webp';
import rabbit from '../../assets/plushToys/pelucheConejo.webp';
import cat from '../../assets/plushToys/pelucheGato.jpg';
import bear from '../../assets/plushToys/pelucheOso.jpg';
import notebook from '../../assets/accessories/notebook.jpg';
import electricGuitar from '../../assets/accessories/electricGuitar.jpg';
import TshitBall from '../../assets/accessories/T-shirtBall.png';
import './Dashboard.css';
/* import { response } from 'express'; */

const colors = [
  { id: 1, name: 'Pink' },
  { id: 2, name: 'Yellow' },
  { id: 3, name: 'Green' },
];

function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  // const [userProfile, setUserProfile] = useState({name: '', lastName: '', email:''});
  // const [error, setError] = useState('');

  const handleButtonClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleAnimalClick = (animalId) => {
    setSelectedAnimal(animalId);
  };

  const handleColorClick = (colorId) => {
    setSelectedColor(colorId);
  };

  /* useEffect(() =>{
    const fetchUserProfile = async ()=>{
      const token = localStorage.getItem('token');
      if (token) {
        fetch('localhost:8080/api/private/myUser', {
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
  }, [activeSection]);  */

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">The stuffed animal workshop</h1>
      {/* {error && <div className='alert alert-danger'>{error}</div>} */}
      <Ranking />
      <div className="row">
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
                    {/* <p><strong>Name:</strong>{userProfile.name}</p>
                    <p><strong>Last name:</strong>{userProfile.lastName}</p>
                    <p><strong>Email:</strong>{userProfile.email}</p> */}
                  </div>
                  <Link className="btn btn-success mt-3" to="/editProfile" role="button">Edit Profile</Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <FaShoppingCart size={40} className="text-success mb-3" />
              <h4 className="card-title">Shopping Options</h4>
              <p className="card-text">Explore the purchasing options available to you.</p>
              <button onClick={() => handleButtonClick('shopping')} className="btn btn-success">
                {activeSection === 'shopping' ? 'Hide' : 'Explore Options'}
              </button>
              {activeSection === 'shopping' && (
                <div className="mt-3">
                  <h5>Plush animals</h5>
                  <section className="my-5">
                    <div className="row">
                      {[{ id: 1, img: dog, name: 'Dog' }, { id: 2, img: raccon, name: 'Raccoon' }, { id: 3, img: rabbit, name: 'Rabbit' }, { id: 4, img: cat, name: 'Cat' }, { id: 5, img: bear, name: 'Bear' }].map((animal) => (
                        <div className="col-12" key={animal.id}>
                          <div className={`card mb-4 ${selectedAnimal === animal.id ? 'border-success' : ''}`}>
                            <img src={animal.img} className="card-img-top product-image" alt={animal.name} />
                            <div className="card-body">
                              <h5 className="card-title">{animal.name}</h5>
                              <p className="card-text">Description of {animal.name}.</p>
                              <button onClick={() => handleAnimalClick(animal.id)} className="btn btn-success">Select</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <h5>Color</h5>
                  <section>
                  <ul className="list-unstyled d-flex flex-column align-items-start">
                    {colors.map((color) => (
                      <li key={color.id} className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          name="color"
                          checked={selectedColor === color.id}
                          onChange={() => handleColorClick(color.id)}
                          className="me-2"
                        />
                        {color.name}
                      </li>
                    ))}
                  </ul>
                  </section>

                  <h5>Accessories</h5>
                  <section className="my-5">
                    {[{ id: 1, img: TshitBall, name: 'T-shirt and soccer ball' }, { id: 2, img: electricGuitar, name: 'Electric guitar' }, { id: 3, img: notebook, name: 'Notebook' }, { id: 4, name: 'Without accessories' }].map((accessory) => (
                      <div className="col-12" key={accessory.id}>
                        <div className={`card mb-4 ${selectedColor === accessory.id ? 'border-success' : ''}`}>
                          {accessory.img && <img src={accessory.img} className="card-img-top product-image" alt={accessory.name} />}
                          <div className="card-body">
                            <h5 className="card-title">{accessory.name}</h5>
                            <button onClick={() => handleColorClick(accessory.id)} className="btn btn-success">Select</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>

                  <button className="btn btn-success">Add</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <FaBoxOpen size={40} className="text-success mb-3" />
              <h4 className="card-title">Your Products</h4>
              <p className="card-text">View your added products.</p>
              <button onClick={() => handleButtonClick('products')} className="btn btn-success">
                {activeSection === 'products' ? 'Hide' : 'View Products'}
              </button>
              {activeSection === 'products' && (
                <div className="mt-3">
                  <p>aqui que traiga los productos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;