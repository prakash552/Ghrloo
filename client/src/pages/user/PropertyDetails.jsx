import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useProperties } from '../../context/PropertyContext'; // <-- Context import
import '../../style/PropertyDetails.css';
import ContactDealerModal from '../../components/ContactDealerModal';

const PropertyDetails = () => {
  const { id } = useParams();
  const { properties } = useProperties(); // <-- Updated to use context
  const property = properties.find((p) => p.id === parseInt(id));

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(property?.images?.[0] || property?.image);

  if (!property) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: '4rem', color: '#555' }}>
        Property Not Found
      </h2>
    );
  }

  return (
    <div className="property-details-container">
      <div className="property-image-container">
        <img
          className="property-main-image"
          src={selectedImage}
          alt={property.title}
        />
        {property.images && property.images.length > 1 && (
          <div className="thumbnail-gallery">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={selectedImage === img ? 'active' : ''}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="property-content-container">
        <h1>{property.title}</h1>
        <p className="location">{property.location}</p>
        <p className="price">₹{property.price}</p>

        {/* Rating */}
        <div className="rating-section">
          <p>Rate this property:</p>
          <div className="stars">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <span
                  key={index}
                  className={`star ${currentRating <= (hover || rating) ? 'filled' : ''}`}
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                >
                  ★
                </span>
              );
            })}
          </div>
          {rating > 0 && <p className="rating-text">You rated: {rating} / 5</p>}
        </div>

        <p className="description">
          {property.description ||
            `This luxurious property is located in ${property.location}. It offers modern interiors, great connectivity, and premium amenities.`}
        </p>

        <div className="key-features">
          <div className="feature-item"><strong>Category:</strong> {property.category}</div>
          {property.bhk && <div className="feature-item"><strong>BHK:</strong> {property.bhk}</div>}
          <div className="feature-item"><strong>Status:</strong> {property.status || 'Ready to Move'}</div>
          <div className="feature-item"><strong>City:</strong> {property.city}</div>
        </div>

        <button className="contact-btn" onClick={() => setIsModalOpen(true)}>
          Contact Dealer
        </button>
      </div>

      <ContactDealerModal
        propertyTitle={property.title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PropertyDetails;
