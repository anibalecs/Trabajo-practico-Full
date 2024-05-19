import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function Contact() {
  return (
    <div className="container mt-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card mb-4">
                    <div className="card-body text-center">
                    <h4>Follow Us on Social Media</h4>
                    <div className="d-flex justify-content-center my-3">
                        <a className="text-primary mx-3">
                        <FaFacebook size={40} />
                        </a>
                        <a className="text-info mx-3">
                        <FaTwitter size={40} />
                        </a>
                        <a className="text-danger mx-3">
                        <FaInstagram size={40} />
                        </a>
                    </div>
                    <p className="lead">@ThetuffedAnimalWorkshop.ar</p>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body text-center">
                    <h4>Contact Us on WhatsApp</h4>           {/*En cada icono corresponderia el enlace para viajar a las respectivas cuentas de redes sociales.*/}
                    <p className="lead">+54 11 7564-5585</p>
                    <a className="btn btn-success">
                        <FaWhatsapp size={20} className="me-2" /> Chat with Us
                    </a>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                    <h4>Email Us</h4>
                    <p className="lead">ThetuffedAnimalWorkshop.ar@gmail.com</p>
                    <a className="btn btn-success">
                        Send an Email
                    </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Contact;

