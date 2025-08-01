import { useState } from 'react';
import '../../style/AdminSidebar.css';
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminSidebar({ active, onChange, onLogout }) {
  const [isOpen, setIsOpen] = useState(true); // true = open, false = collapsed

  const items = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'add', label: 'Add Property' },
    { key: 'properties', label: 'View Properties' },
    { key: 'enquiries', label: 'View Enquiries' },
    { key: 'settings', label: 'Settings' },
  ];

  const handleItemClick = (key) => {
    onChange(key);

    // Agar screen mobile hai to click ke baad close kar do
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      {/* Header */}
      <div className="sidebar-header">
        <h2 className="logo">{isOpen ? "Admin Panel" : "AP"}</h2>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Items */}
      <ul>
        {items.map((it) => (
          <li
            key={it.key}
            className={active === it.key ? 'active' : ''}
            onClick={() => handleItemClick(it.key)}
          >
            {it.label}
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}

