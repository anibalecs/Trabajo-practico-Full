import { useState, useEffect } from 'react';
import dog from '../../assets/plushToys/peluchePerro.jpg';
import racoon from '../../assets/plushToys/pelucheMapache.webp';
import rabbit from '../../assets/plushToys/pelucheConejo.webp';
import cat from '../../assets/plushToys/pelucheGato.jpg';
import bear from '../../assets/plushToys/pelucheOso.jpg';

function Ranking(){
  const [ranking, setRanking] = useState([]);
  const [error, setError] = useState('');

  const imageMap = {
    perro: dog,
    mapache: racoon,
    conejo: rabbit,
    gato: cat,
    oso: bear
  };

  useEffect(() =>{
    const fetchRanking = async ()=>{
      try{
        const response = await fetch('http://localhost:8080/api/ranking/toys');
        if(response.ok){
          const data = await response.json();
          setRanking(data);
        }else{
          throw new Error('Failed to fetch ranking data');
        }
      }catch(error){
        setError(error.message);
      }
    };
    fetchRanking();
  }, []);

    return (
        <>
          <section className="my-5">
            <h2 className="text-center">Best Sellers</h2>
            {error && <div className='alert alert-danger'>{error}</div>}
            <div className="row">
              {ranking.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <div className="card mb-4 h-100">
                    <div className="image-container">
                      <img src={imageMap[product._id]} className="card-img-top ranking-image" alt={product._id}/>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product._id}</h5>
                      <p className="card-text">Number of orders: {product.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
    );
}

export default Ranking;