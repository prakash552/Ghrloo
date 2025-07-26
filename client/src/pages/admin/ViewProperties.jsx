import { useProperties } from '../../context/PropertyContext';
import '../../style/ViewProperty.css';

export default function ViewProperties({ onEdit }) {
  const { properties, remove } = useProperties();

  return (
    <div className="properties-table">
      <h2>All Properties</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>City</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.city}</td>
              <td>₹{p.price}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(p.id)}>Edit</button>
                <button className="delete-btn" onClick={() => remove(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {properties.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', color: '#aaa' }}>
                No properties found. Add one!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
