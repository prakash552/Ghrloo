import { useState, useEffect } from "react";
import "../style/FilterSidebar.css";

const defaultLocalFilters = (applied) => ({
  minPrice: applied.minPrice ?? 0,
  maxPrice: applied.maxPrice ?? 20000000,
  bhk: applied.bhk ?? [],
  category: applied.category ?? "",
  cities: applied.cities ?? [],
  status: applied.status ?? [],
  sortBy: applied.sortBy ?? "",
});

const BHK_OPTIONS = [1, 2, 3, 4];
const CATEGORY_OPTIONS = ["", "flat", "house", "room", "apartment", "plot", "villa", "other"];
const CITY_OPTIONS = ["Noida", "Greater Noida", "Delhi", "Gurugram", "Ghaziabad", "Faridabad"];
const STATUS_OPTIONS = ["ready", "under-construction"];

export default function FilterSidebar({ appliedFilters, onApply, onReset }) {
  const [localFilters, setLocalFilters] = useState(defaultLocalFilters(appliedFilters));
  const [price, setPrice] = useState([
    appliedFilters.minPrice ?? 0,
    appliedFilters.maxPrice ?? 20000000,
  ]);

  useEffect(() => {
    setLocalFilters(defaultLocalFilters(appliedFilters));
    setPrice([appliedFilters.minPrice ?? 0, appliedFilters.maxPrice ?? 20000000]);
  }, [appliedFilters]);

  const handleCheckbox = (listName, value) => {
    setLocalFilters((prev) => {
      const exists = prev[listName].includes(value);
      return {
        ...prev,
        [listName]: exists ? prev[listName].filter((v) => v !== value) : [...prev[listName], value],
      };
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApply = () => {
    onApply({ ...localFilters, minPrice: price[0], maxPrice: price[1] });
    scrollToTop();
  };

  const handleReset = () => {
    const cleared = defaultLocalFilters({});
    setLocalFilters(cleared);
    setPrice([0, 20000000]);
    onReset();
    scrollToTop();
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      {/* Price Slider */}
      <div className="filter-block">
        <h4>Price (₹)</h4>
        <div className="price-slider">
          <input
            type="range"
            min="0"
            max="20000000"
            step="50000"
            value={price[0]}
            onChange={(e) => setPrice([Number(e.target.value), price[1]])}
          />
          <input
            type="range"
            min="0"
            max="20000000"
            step="50000"
            value={price[1]}
            onChange={(e) => setPrice([price[0], Number(e.target.value)])}
          />
          <div className="price-values">
            <span>₹{price[0].toLocaleString()}</span> - <span>₹{price[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="filter-block">
        <h4>Category</h4>
        <select
          value={localFilters.category}
          onChange={(e) => setLocalFilters((f) => ({ ...f, category: e.target.value }))}
        >
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* BHK */}
      <div className="filter-block">
        <h4>BHK</h4>
        {BHK_OPTIONS.map((b) => (
          <label key={b} className="checkbox">
            <input
              type="checkbox"
              checked={localFilters.bhk.includes(b)}
              onChange={() => handleCheckbox("bhk", b)}
            />
            {b} BHK
          </label>
        ))}
      </div>

      {/* Place */}
      <div className="filter-block">
        <h4>Place (NCR)</h4>
        {CITY_OPTIONS.map((city) => (
          <label key={city} className="checkbox">
            <input
              type="checkbox"
              checked={localFilters.cities.includes(city)}
              onChange={() => handleCheckbox("cities", city)}
            />
            {city}
          </label>
        ))}
      </div>

      {/* Status */}
      <div className="filter-block">
        <h4>Status</h4>
        {STATUS_OPTIONS.map((st) => (
          <label key={st} className="checkbox">
            <input
              type="checkbox"
              checked={localFilters.status.includes(st)}
              onChange={() => handleCheckbox("status", st)}
            />
            {st === "ready" ? "Ready to Move" : "Under Construction"}
          </label>
        ))}
      </div>

      {/* Sort */}
      <div className="filter-block">
        <h4>Sort By</h4>
        <select
          value={localFilters.sortBy}
          onChange={(e) => setLocalFilters((f) => ({ ...f, sortBy: e.target.value }))}
        >
          <option value="">Default</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="priceHighLow">Price: High → Low</option>
        </select>
      </div>

      <div className="filter-actions">
        <button type="button" className="apply-btn" onClick={handleApply}>
          Apply
        </button>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </aside>
  );
}
