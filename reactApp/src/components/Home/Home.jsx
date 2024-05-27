import { Link } from 'react-router-dom';
import Ranking from '../Ranking/Ranking';
function Home() {
  return(
    <>
      <div className="container mt-5">
        <header className="jumbotron text-center">
          <h1 className="display-4">Welcome to The stuffed animal workshop</h1>
          <p className="lead">Your best option for the cutest and most tender customizable stuffed animals!</p>
          <hr className="my-4" />
          <p>Explore our wide range of products and find your new favorite plush friend today.</p>
          <Link className="btn btn-success" to="/login" role='button'>Shop Now</Link>
        </header>
        <Ranking/>
        <section className="my-5">
          <h2 className="text-center">Customer Testimonials</h2>
          <div className="row">
            <div className="col-md-4">
              <blockquote className="blockquote">
                <footer className="blockquote-footer">Excellent stuffed animals, of the best quality! My kids love them! <br/>Juan Perez.</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="blockquote">
                <footer className="blockquote-footer">High quality and super cute. Highly recommended!  <br/>Ana Fernandez.</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="blockquote">
                <footer className="blockquote-footer">Great customer service and fast shipping. <br/>Mary Johnson.</footer>
              </blockquote>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
