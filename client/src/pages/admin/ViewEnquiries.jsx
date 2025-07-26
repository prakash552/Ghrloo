import { useState, useEffect } from 'react';
import '../../style/ViewEnquiries.css';

export default function ViewEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('enquiries')) || [];
    setEnquiries(stored);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      const updated = enquiries.filter((enq) => enq.id !== id);
      setEnquiries(updated);
      localStorage.setItem('enquiries', JSON.stringify(updated));
    }
  };

  return (
    <div className="enquiries-wrapper">
      <h2>Customer Enquiries</h2>
      {enquiries.length === 0 ? (
        <p className="no-enquiries">No enquiries found.</p>
      ) : (
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq, index) => (
              <tr key={enq.id}>
                <td>{index + 1}</td>
                <td>{enq.name}</td>
                <td>{enq.email}</td>
                <td>{enq.phone}</td>
                <td>{enq.message}</td>
                <td>{new Date(enq.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(enq.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
