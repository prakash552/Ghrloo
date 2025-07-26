import { useEffect, useState } from 'react';
import { useProperties } from '../../context/PropertyContext';
import '../../style/EditProperty.css';

export default function EditProperty({ id, onDone }) {
  const { getById, update } = useProperties();
  const [form, setForm] = useState(null);
  const [images, setImages] = useState([]); // For multiple local images

  useEffect(() => {
    const numericId = Number(id);
    const prop = getById(numericId);
    if (prop) {
      setForm({ ...prop });
      setImages(prop.images || []);
    } else {
      setForm(null);
    }
  }, [id]);

  if (form === null) return <p>Property not found</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'priceNumber' ? Number(value) : value
    }));
  };

  // Handle multiple file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(form.id, {
      ...form,
      images, // store array of images
      price:
        form.price || `₹${(form.priceNumber || 0).toLocaleString('en-IN')}`
    });
    alert('Property Updated!');
    onDone && onDone();
  };

  return (
    <div className="add-edit-wrapper">
      <h2>Edit Property (ID: {form.id})</h2>
      <form className="add-edit-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title || ''}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location || ''}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={form.city || ''}
          onChange={handleChange}
          required
        />

        <div className="row">
          <input
            name="price"
            placeholder="Price (string)"
            value={form.price || ''}
            onChange={handleChange}
          />
          <input
            name="priceNumber"
            type="number"
            placeholder="Price Number"
            value={form.priceNumber || 0}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <select name="category" value={form.category || ''} onChange={handleChange} required>
            <option value="">Category</option>
            <option value="flat">Flat</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="room">Room</option>
            <option value="commercial">Commercial</option>
          </select>

          <select name="bhk" value={form.bhk || ''} onChange={handleChange}>
            <option value="">BHK (optional)</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
          </select>

          <select name="status" value={form.status || 'ready'} onChange={handleChange}>
            <option value="ready">Ready</option>
            <option value="under-construction">Under Construction</option>
          </select>
        </div>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="image-preview">
            {images.map((img, i) => (
              <img key={i} src={img.url} alt={img.name} />
            ))}
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
