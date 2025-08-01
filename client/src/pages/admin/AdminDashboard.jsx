import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/AdminDashboard.css';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useProperties } from '../../context/PropertyContext';
import AddProperty from '../../pages/admin/AddProperty';
import EditProperty from '../../pages/admin/EditProperty';
import ViewProperties from '../../pages/admin/ViewProperties';
import ViewEnquiries from '../../pages/admin/ViewEnquiries';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const { properties } = useProperties();

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (!loggedIn) navigate('/admin');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  const openEdit = (id) => {
    setEditId(id);
    setActiveTab('edit');
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active={activeTab} onChange={setActiveTab} onLogout={handleLogout} />

      <main className="admin-main animate">
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <h1>Welcome Admin 👋</h1>

            {/* Stats Section */}
            <div className="stats-section">
              <div className="stat-card"><h2>{properties.length}</h2><p>Total Properties</p></div>
              <div className="stat-card"><h2>3</h2><p>Enquiries</p></div>
              <div className="stat-card"><h2>2</h2><p>Pending</p></div>
            </div>

            {/* Recent Properties */}
            <div className="recent-section">
              <h3>Recent Properties</h3>
              {properties.slice(0, 5).length > 0 ? (
                <ul className="recent-list">
                  {properties.slice(0, 5).map((p) => (
                    <li key={p.id}>
                      <span className="title">{p.title}</span>
                      <span className="city">{p.city}</span>
                      <span className="price">₹{p.price}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No properties found. Add one!</p>
              )}
            </div>

            {/* Quick Links */}
            <div className="quick-links">
              <button onClick={() => setActiveTab('add')}>+ Add New Property</button>
              <button onClick={() => setActiveTab('properties')}>View All Properties</button>
              <button onClick={() => setActiveTab('enquiries')}>Check Enquiries</button>
            </div>
          </div>
        )}

        {activeTab === 'add' && <AddProperty onDone={() => setActiveTab('properties')} />}
        {activeTab === 'properties' && <ViewProperties onEdit={openEdit} />}
        {activeTab === 'edit' && editId != null && <EditProperty id={editId} onDone={() => setActiveTab('properties')} />}
        {activeTab === 'enquiries' && <ViewEnquiries />}
        {activeTab === 'settings' && <p style={{ color: '#fff' , padding: '20px' , display:'flex', justifyContent :'center', alignItems: 'center'}}>Settings coming soon...</p>}
      </main>
    </div>
  );
}
