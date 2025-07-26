import '../../style/AdminSidebar.css';

export default function AdminSidebar({ active, onChange, onLogout }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'add', label: 'Add Property' },
    { key: 'properties', label: 'View Properties' },
    { key: 'enquiries', label: 'View Enquiries' },
    { key: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="admin-sidebar">
      <h2 className="logo">Admin Panel</h2>
      <ul>
        {items.map((it) => (
          <li
            key={it.key}
            className={active === it.key ? 'active' : ''}
            onClick={() => onChange(it.key)}
          >
            {it.label}
          </li>
        ))}
      </ul>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}
