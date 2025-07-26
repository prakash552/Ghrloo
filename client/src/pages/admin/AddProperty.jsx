import { useState } from 'react';
import { useProperties } from '../../context/PropertyContext';
import '../../style/EditProperty.css';

export default function AddProperty({ onDone }) {
  const { add } = useProperties();
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    priceNumber: 0,
    category: '',
    bhk: '',
    city: '',
    status: 'ready',
    images: [] // array of images
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'priceNumber') v = Number(value);
    setForm((f) => ({ ...f, [name]: v }));
  };

  // Handle multiple images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // max 3 images
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setForm((f) => ({ ...f, images: fileURLs }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add({
      ...form,
      price: form.price || `₹${form.priceNumber.toLocaleString('en-IN')}`
    });
    alert('Property Added!');
    onDone && onDone();
  };

  return (
    <div className="add-edit-wrapper">
      <h2>Add Property</h2>
      <form className="add-edit-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />

        <div className="row">
          <input name="price" placeholder="Price (string e.g. 45,00,000)" value={form.price} onChange={handleChange} />
          <input name="priceNumber" type="number" placeholder="Price Number" value={form.priceNumber} onChange={handleChange} required />
        </div>

        <div className="row">
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Category</option>
            <option value="flat">Flat</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="room">Room</option>
            <option value="commercial">Commercial</option>
          </select>

          <select name="bhk" value={form.bhk} onChange={handleChange}>
            <option value="">BHK (optional)</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
          </select>

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="ready">Ready</option>
            <option value="under-construction">Under Construction</option>
          </select>
        </div>

        {/* Multiple Images Upload */}
        <label>Upload Property Images (max 3)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {/* Preview images */}
        <div className="image-preview">
          {form.images.map((img, index) => (
            <img key={index} src={img} alt="preview" />
          ))}
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
