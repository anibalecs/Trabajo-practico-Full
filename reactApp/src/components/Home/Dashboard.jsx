import Ranking from '../Ranking/Ranking';
import Profile from './Profile/Profile';
import UserProducts from './UserProducts/UserProducts';
import ShoppingOptions from './ShoppingOptions/ShoppingOptions';
import './Dashboard.css';
 
function Dashboard() {

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">The stuffed animal workshop</h1>
      <Ranking />
      <div className="row">
        <Profile />
        <ShoppingOptions />
        <UserProducts />
      </div>
    </div>
  );
}

export default Dashboard;