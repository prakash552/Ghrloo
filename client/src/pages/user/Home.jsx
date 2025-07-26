import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../../components/PropertyCard';
import { useProperties } from '../../context/PropertyContext';  // ✅ use context
import '../../style/Home.css';

const Home = () => {
  const { properties } = useProperties();  // ✅ get live properties
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // ✅ prevent page reload
    if (searchText.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchText)}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="overlay">
          <div className="hero-content">
            <h1>Find Your Perfect Property</h1>
            <p>Plots, Flats, and Apartments at your fingertips</p>

            {/* ✅ Converted to form for Enter key */}
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search by location or property type..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </section>

      {/* Best Properties Section */}
      <section className="best-properties">
        <h2>Best Deals for You</h2>
        <div className="property-grid">
          {properties.length === 0 ? (
            <p className="no-results">No properties available.</p>
          ) : (
            properties.slice(0, 6).map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
