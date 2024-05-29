import { useState, useEffect } from 'react';
import { FaBoxOpen } from 'react-icons/fa';
import dog from '../../../assets/plushToys/peluchePerro.jpg';
import racoon from '../../../assets/plushToys/pelucheMapache.webp';
import rabbit from '../../../assets/plushToys/pelucheConejo.webp';
import cat from '../../../assets/plushToys/pelucheGato.jpg';
import bear from '../../../assets/plushToys/pelucheOso.jpg';

const imageMap = {
    perro: dog,
    mapache: racoon,
    conejo: rabbit,
    gato: cat,
    oso: bear
  };

function UserProducts(){
    const [activeSection, setActiveSection] = useState(null);
    const [userToys, setUserToys] = useState([]);
    const [error, setError] = useState('');

    const handleButtonClick = (section) => {
        setActiveSection(activeSection === section ? null : section);
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


    return(
        <>
            <div className="col-md-4 mb-4">
                <div className="card mb-4">
                    {error && <div className='alert alert-danger'>{error}</div>}
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
        </>
    );
}

export default UserProducts;