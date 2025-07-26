import { useState, useEffect } from 'react';
import '../style/FilterSidebar.css';

const defaultLocalFilters = (applied) => ({
  minPrice: applied.minPrice ?? 0,
  maxPrice: applied.maxPrice ?? 20000000,
  bhk: applied.bhk ?? [],
  category: applied.category ?? '',  // dropdown ke liye single value
  cities: applied.cities ?? [],
  status: applied.status ?? [],
  sortBy: applied.sortBy ?? '',
});

const BHK_OPTIONS = [1, 2, 3, 4];
const CATEGORY_OPTIONS = ["", "flat", "house", "room", "apartment", "plot", "villa", "other"];
const CITY_OPTIONS = ["Noida", "Greater Noida", "Delhi", "Gurugram", "Ghaziabad", "Faridabad"];
const STATUS_OPTIONS = ["ready", "under-construction"];

export default function FilterSidebar({ appliedFilters, onApply, onReset }) {
  const [localFilters, setLocalFilters] = useState(defaultLocalFilters(appliedFilters));

  useEffect(() => {
    setLocalFilters(defaultLocalFilters(appliedFilters));
  }, [appliedFilters]);

  const handleCheckbox = (listName, value) => {
    setLocalFilters(prev => {
      const exists = prev[listName].includes(value);
      return {
        ...prev,
        [listName]: exists ? prev[listName].filter(v => v !== value) : [...prev[listName], value]
      };
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleApply = () => {
    onApply(localFilters);
    scrollToTop();
  };

  const handleReset = () => {
    const cleared = defaultLocalFilters({});
    setLocalFilters(cleared);
    onReset();
    scrollToTop();
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      {/* Price */}
      <div className="filter-block">
        <h4>Price (₹)</h4>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.minPrice}
            onChange={e => setLocalFilters(f => ({ ...f, minPrice: Number(e.target.value) }))}
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.maxPrice}
            onChange={e => setLocalFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
          />
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="filter-block">
        <h4>Category</h4>
        <select
          value={localFilters.category}
          onChange={(e) => setLocalFilters(f => ({ ...f, category: e.target.value }))}
        >
          {CATEGORY_OPTIONS.map(cat => (
            <option key={cat} value={cat}>
              {cat === "" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* BHK */}
      <div className="filter-block">
        <h4>BHK</h4>
        {BHK_OPTIONS.map(b => (
          <label key={b} className="checkbox">
            <input
              type="checkbox"
              checked={localFilters.bhk.includes(b)}
              onChange={() => handleCheckbox('bhk', b)}
            />
            {b} BHK
          </label>
        ))}
      </div>

      {/* Place */}
      <div className="filter-block">
        <h4>Place (NCR)</h4>
        {CITY_OPTIONS.map(city => (
          <label key={city} className="checkbox">
            <input
              type="checkbox"
              checked={localFilters.cities.includes(city)}
              onChange={() => handleCheckbox('cities', city)}
            />
            {city}
          </label>
        ))}
      </div>

      {/* Status */}
      <div className="filter-block">
        <h4>Status</h4>
        {STATUS_OPTIONS.map(st => (
          <label key={st} className="checkbox">
            <input
              type="checkbox"
              checked={localFilters.status.includes(st)}
              onChange={() => handleCheckbox('status', st)}
            />
            {st === 'ready' ? 'Ready to Move' : 'Under Construction'}
          </label>
        ))}
      </div>

      {/* Sort */}
      <div className="filter-block">
        <h4>Sort By</h4>
        <select
          value={localFilters.sortBy}
          onChange={(e) => setLocalFilters(f => ({ ...f, sortBy: e.target.value }))}
        >
          <option value="">Default</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="priceHighLow">Price: High → Low</option>
        </select>
      </div>

      <div className="filter-actions">
        <button type="button" className="apply-btn" onClick={handleApply}>Apply</button>
        <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
      </div>
    </aside>
  );
}
