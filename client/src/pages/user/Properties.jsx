import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../../context/PropertyContext';  // ✅ live data
import PropertyCard from '../../components/PropertyCard';
import FilterSidebar from '../../components/FilterSidebar';
import '../../style/Properties.css';

const initialFilters = {
  minPrice: 0,
  maxPrice: 20000000,
  bhk: [],
  category: '',
  cities: [],
  status: [],
  sortBy: '',
  searchText: ''
};

export default function Properties() {
  const { properties } = useProperties();  // ✅ live properties
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [searchParams] = useSearchParams();

  // Set search query from URL
  useEffect(() => {
    const query = searchParams.get('search') || '';
    setAppliedFilters((prev) => ({ ...prev, searchText: query }));
    window.scrollTo({ top: 0, behavior: 'smooth' }); // ✅ scroll to top
  }, [searchParams]);

  // Apply filters
  const filtered = useMemo(() => {
    const {
      minPrice = 0,
      maxPrice = 20000000,
      bhk = [],
      category = '',
      cities = [],
      status = [],
      sortBy = '',
      searchText = ''
    } = appliedFilters || {};

    let list = [...properties];

    // Search filter
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter((p) => {
        const hay = [
          p.title,
          p.location,
          p.city,
          p.category,
          p.bhk ? `${p.bhk}` : ''
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      });
    }

    // Price filter
    list = list.filter(
      (p) =>
        (p.priceNumber ?? 0) >= minPrice &&
        (p.priceNumber ?? 0) <= maxPrice
    );

    // BHK filter
    if (bhk.length) list = list.filter((p) => bhk.includes(p.bhk));

    // Category filter
    if (category) list = list.filter((p) => p.category === category);

    // City filter
    if (cities.length) list = list.filter((p) => cities.includes(p.city));

    // Status filter
    if (status.length) list = list.filter((p) => status.includes(p.status));

    // Sorting
    if (sortBy === 'priceLowHigh') {
      list.sort((a, b) => (a.priceNumber ?? 0) - (b.priceNumber ?? 0));
    } else if (sortBy === 'priceHighLow') {
      list.sort((a, b) => (b.priceNumber ?? 0) - (a.priceNumber ?? 0));
    }

    return list;
  }, [appliedFilters, properties]);

  // Stats
  const stats = useMemo(() => {
    const total = properties.length;
    const countBy = (cat) => properties.filter((p) => p.category === cat).length;
    return {
      total,
      flats: countBy('flat'),
      houses: countBy('house'),
      rooms: countBy('room'),
      apartments: countBy('apartment'),
      others:
        total - (countBy('flat') + countBy('house') + countBy('room') + countBy('apartment')),
    };
  }, [properties]);

  const handleApplyFilters = (values) => {
    setAppliedFilters({ ...appliedFilters, ...values });
    window.scrollTo({ top: 0, behavior: 'smooth' });  // ✅ scroll after filter
  };

  const handleResetFilters = () => {
    setAppliedFilters(initialFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });  // ✅ scroll after reset
  };

  return (
    <div className="properties-page">
      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stat-box"><span className="num">{stats.total}</span><span className="label">Total</span></div>
        <div className="stat-box"><span className="num">{stats.flats}</span><span className="label">Flats</span></div>
        <div className="stat-box"><span className="num">{stats.houses}</span><span className="label">Houses</span></div>
        <div className="stat-box"><span className="num">{stats.rooms}</span><span className="label">Rooms</span></div>
        <div className="stat-box"><span className="num">{stats.apartments}</span><span className="label">Apartments</span></div>
        <div className="stat-box"><span className="num">{stats.others}</span><span className="label">Others</span></div>
      </section>

      <div className="content-wrapper">
        {/* Left Filters */}
        <FilterSidebar
          appliedFilters={appliedFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        {/* Right Results */}
        <div className="results-area">
          <h2>
            Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}{' '}
            {appliedFilters.searchText && (
              <span className="search-term">for "{appliedFilters.searchText}"</span>
            )}
          </h2>
          <div className="property-grid">
            {filtered.length === 0 ? (
              <p className="no-results">No properties found with current filters.</p>
            ) : (
              filtered.map((p) => <PropertyCard key={p.id} property={p} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

