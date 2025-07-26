import { Link } from 'react-router-dom';
import '../style/PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="property-card-link">
      <div className="property-card">
        <img src={property.image} alt={property.title} />
        <div className="property-info">
          <h3>{property.title}</h3>
          <p>{property.location}</p>
          <span className="price">₹{property.price}</span>
          <button className="view-btn">View Details</button>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
