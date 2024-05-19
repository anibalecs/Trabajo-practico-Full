import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import teamImage from '../../assets/osoLogo2.png';

function AboutUs() {
  return (
    <div className="container mt-5">
        <h2 className="text-center mb-4">About Us</h2>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card mb-4">
                    <div className="card-body">
                    <p>Our aspiration at The stuffed animal workshop, is to provide cute and adorable plushies of the highest quality to our customers. We want you to be able to get the best customizable plush friend, which is why we are committed to excellence and strive to exceed expectations in everything we do.</p>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <h4>Our Team</h4>
                        <img src={teamImage} width="50px" alt="Our Team" className="img-fluid mb-3" />
                        <p>Our family or work team is made up of dedicated professionals passionate about their work and our goals. With a wide range of skills, abilities and experience, we collaborate as a team to achieve our goals and bring a smile to our clients.</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4>Company information</h4>
                        <p>If you would like more information about our services, please do not hesitate to contact us.</p>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <FaEnvelope className="me-2 text-success" /> <strong>Email:</strong> ThetuffedAnimalWorkshop.ar@gmail.com
                            </li>
                            <li className="mb-2">
                                <FaPhone className="me-2 text-success" /> <strong>Phone:</strong> +54 11 1651-456
                            </li>
                            <li>
                                <FaMapMarkerAlt className="me-2 text-success" /> <strong>Address:</strong> 1525  Av.Pueyrredon, CABA, ARGENTINA
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AboutUs; 




              
            

