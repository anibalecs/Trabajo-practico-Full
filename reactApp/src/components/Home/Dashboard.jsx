import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { /* FaUser,*/ FaShoppingCart, FaBoxOpen } from 'react-icons/fa';
import Ranking from '../Ranking/Ranking';
import Profile from '../Profile/Profile';
import dog from '../../assets/plushToys/peluchePerro.jpg';
import raccon from '../../assets/plushToys/pelucheMapache.webp';
import rabbit from '../../assets/plushToys/pelucheConejo.webp';
import cat from '../../assets/plushToys/pelucheGato.jpg';
import bear from '../../assets/plushToys/pelucheOso.jpg';
import notebook from '../../assets/accessories/notebook.jpg';
import electricGuitar from '../../assets/accessories/electricGuitar.jpg';
import TshitBall from '../../assets/accessories/T-shirtBall.png';
import './Dashboard.css';

const imageMap = {
  perro: dog,
  mapache: raccon,
  conejo: rabbit,
  gato: cat,
  oso: bear
};

const colors = [
  { name: 'rosa' },
  { name: 'amarillo' },
  { name: 'verde' },
];

function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [plushName, setPlushName] = useState(null);
  //const [userProfile, setUserProfile] = useState({name: '', lastname: '', email:''});
  const [userToys, setUserToys] = useState([]);
  const [error, setError] = useState('');

  const handleButtonClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleAnimalClick = (animalId) => {
    setSelectedAnimal(animalId);
  };

  const handleColorClick = (colorId) => {
    setSelectedColor(colorId);
  };

  const handleAccessoryClick = (accessoryId) => {
    setSelectedAccessory(accessoryId);
  };

  const handleName = (event)=>{
    setPlushName(event.target.value);
  }

  const createToy =  async ()=>{
    const token = localStorage.getItem('token');
    if(!token){
      setError('Token not found')
      return;
    }
    const toyData = {
      name: plushName,
      animal: selectedAnimal,
      color: selectedColor,
      accessories: selectedAccessory,
    }

    try{
      const response = await fetch('http://localhost:8080/api/private/toys', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toyData),
      });
      if(response.ok){
       alert('Toy created correctly'); 
      }else{
        setError('Failed to create toy');
      }
    }catch(error){
      setError('Filed to create toy');
    }
  };

  const deleteToy = async (toyId)=>{
    const token = localStorage.getItem('token');
    if(!token){
      setError('Token not found');
      return;
    }
    try{
      const response = await fetch(`http://localhost:8080/api/private/toys/${toyId}`,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if(response.ok){
        setUserToys(userToys.filter(toy => toy.id !== toyId));
      }else{
        setError('Failed to delete toy');
      }
    }catch(error){
      setError('Faled to delete toy');
    }
  };


  

  useEffect(() =>{
    const fetchUserToys = async ()=>{
      const token = localStorage.getItem('token');
      if(token){
        const response = await fetch('http://localhost:8080/api/private/allUsr/toys', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if(response.ok){
          const data = await response.json();
          setUserToys(data);
        }else{
          throw new Error('Failed to fetch user toys');
        }
      }else{
        setError('No token found, please login again');
      }
    };
    if(activeSection === 'products'){
      fetchUserToys();
    } 
  }, [activeSection]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">The stuffed animal workshop</h1>
      {error && <div className='alert alert-danger'>{error}</div>}
      <Ranking />
      <div className="row">
        

        <Profile />


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
                      {[{ img: dog, name: 'perro' }, { img: raccon, name: 'mapache' }, { img: rabbit, name: 'conejo' }, { img: cat, name: 'gato' }, { img: bear, name: 'oso' }].map((animal) => (
                        <div className="col-12" key={animal.name}>
                          <div className={`card mb-4 ${selectedAnimal === animal.name ? 'border-success' : ''}`}>
                            <img src={animal.img} className="card-img-top product-image" alt={animal.name} />
                            <div className="card-body">
                              <h5 className="card-title">{animal.name}</h5>
                              <p className="card-text">Description of {animal.name}.</p>
                              <button onClick={() => handleAnimalClick(animal.name)} className="btn btn-success">Select</button>
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
                      <li key={color.name} className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          name="color"
                          checked={selectedColor === color.name}
                          onChange={() => handleColorClick(color.name)}
                          className="me-2"
                        />
                        {color.name}
                      </li>
                    ))}
                  </ul>
                  </section>

                  <h5>Accessories</h5>
                  <section className="my-5">
                    {[{ id: 1, img: TshitBall, name: 'camiseta y pelota de futbol' }, { id: 2, img: electricGuitar, name: 'guitarra electrica' }, { id: 3, img: notebook, name: 'notebook' }, { id: 4, name: 'sin accesorios' }].map((accessory) => (
                      <div className="col-12" key={accessory.name}>
                        <div className={`card mb-4 ${selectedAccessory === accessory.name ? 'border-success' : ''}`}>
                          {accessory.img && <img src={accessory.img} className="card-img-top product-image" alt={accessory.name} />}
                          <div className="card-body">
                            <h5 className="card-title">{accessory.name}</h5>
                            <button onClick={() => handleAccessoryClick(accessory.name)} className="btn btn-success">Select</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>
                  <form onSubmit={(e)=> e.preventDefault()}>
                    <div className="mb-3">
                      <label htmlFor="plushName" className="form-label">Plush name</label>
                      <input type="text" className="form-control" id="plushName" placeholder="Pepe" value={plushName} onChange={handleName}/>
                    </div>
                  </form>
                  <button className="btn btn-success" onClick={createToy}>Add</button>
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

                  <ul className="list-group">
                    {userToys.map((toy) => (
                      <li key={toy.id} className="list-group-item">
                        <img src={imageMap[toy.animal]} className="card-img-top product-image" alt={toy.animal}/>
                        <p>Name: {toy.name}</p>
                        <p>Animal: {toy.animal}</p>
                        <p>Color: {toy.color}</p>
                        <p>Accessories: {toy.accessories}</p>
                        <button className="btn btn-success mt-3" role="button">buy product</button> {/*No hace nada, pero corresponderia proceder con el proceso de compra*/}
                        <button onClick={()=> deleteToy(toy.id)} className="btn btn-danger mt-3" role="button">Delete product</button>
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-success mt-3" role="button">buy products</button>  {/*No hace nada, pero corresponderia proceder con el proceso de compra*/}
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