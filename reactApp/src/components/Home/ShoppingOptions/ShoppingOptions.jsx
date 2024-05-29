import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import dog from '../../../assets/plushToys/peluchePerro.jpg';
import raccon from '../../../assets/plushToys/pelucheMapache.webp';
import rabbit from '../../../assets/plushToys/pelucheConejo.webp';
import cat from '../../../assets/plushToys/pelucheGato.jpg';
import bear from '../../../assets/plushToys/pelucheOso.jpg';
import notebook from '../../../assets/accessories/notebook.jpg';
import electricGuitar from '../../../assets/accessories/electricGuitar.jpg';
import TshitBall from '../../../assets/accessories/T-shirtBall.png';

const colors = [
    { name: 'rosa' },
    { name: 'amarillo' },
    { name: 'verde' },
  ];

function ShoppingOptions(){

    const [activeSection, setActiveSection] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedAccessory, setSelectedAccessory] = useState(null);
    const [plushName, setPlushName] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [error, setError] = useState('');
  
    const handleButtonClick = (section) => {
      setActiveSection(activeSection === section ? null : section);
    };
  
    const handleAnimalClick = (animal) => {
      setSelectedAnimal(animal);
    };
  
    const handleColorClick = (color) => {
      setSelectedColor(color);
    };
  
    const handleAccessoryClick = (accessory) => {
      setSelectedAccessory(accessory);
    };
  
    const handleName = (event)=>{
      setPlushName(event.target.value);
    }
    
    const handleCreateClick = ()=>{
      setShowSummary(true);
    }

      const createToyAndConfirm = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found')
          return;
        }
        const toyData = {
          name: plushName,
          animal: selectedAnimal,
          color: selectedColor,
          accessories: selectedAccessory,
        }
    
        try {
          const response = await fetch('http://localhost:8080/api/private/toys', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(toyData),
          });
          if (response.ok) {
            alert('Toy created correctly');
            setShowSummary(false);  //oculta el resumen
          } else {
            throw new error('Failed to create toy');
          }
        } catch (error) {
          setError('Filed to create toy');
        }
      }
    
      const handleCancel = () => {
        setShowSummary(false);
      }

    return(
        <>
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
                      <label htmlFor="plushName" className="form-label">Plush name (mandatory)</label>
                      <input type="text" className="form-control" id="plushName" placeholder="Pepe" value={plushName} onChange={handleName}/>
                    </div>
                  </form>
                  <button className="btn btn-success" onClick={handleCreateClick}>Add</button>
                </div>
                )}
              </div>
            </div>
          </div>

          {showSummary && (
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Your Selection</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCancel}></button>
                  </div>
                  <div className="modal-body">
                    <p><strong>Name:</strong> {plushName}</p>
                    <p><strong>Animal:</strong> {selectedAnimal}</p>
                    <p><strong>Color:</strong> {selectedColor}</p>
                    <p><strong>Accessories:</strong> {selectedAccessory}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="btn btn-success" onClick={createToyAndConfirm}>Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
    );
}

export default ShoppingOptions;