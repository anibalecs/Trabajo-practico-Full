import { useState } from 'react';
import { FaUser, FaShoppingCart, FaBoxOpen } from 'react-icons/fa';
import Ranking from '../Ranking/Ranking';

function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);

  const handleButtonClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">The stuffed animal workshop</h1>
      <Ranking/>
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
                  <p>Here is the information about your profile...</p>
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
              <p className="card-text">Browse and manage your shopping options.</p>
              <button onClick={() => handleButtonClick('shopping')} className="btn btn-success">
                {activeSection === 'shopping' ? 'Hide' : 'Explore Options'}
              </button>
              {activeSection === 'shopping' && (
                <div className="mt-3">
                  <p>Here are the shopping options available to you...</p>
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
              <p className="card-text">View the products you have added.</p>
              <button onClick={() => handleButtonClick('products')} className="btn btn-success">
                {activeSection === 'products' ? 'Hide' : 'View Products'}
              </button>
              {activeSection === 'products' && (
                <div className="mt-3">
                  <p>Here are the products you have added...</p>
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


