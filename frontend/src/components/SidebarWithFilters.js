import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import SidebarFilters from './SidebarFilters';

import logo from '../assets/logo2.svg';

export default function Sidebar({
  filters,
  onApply,
  onFilter,
  onClear,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sidebar">
      <div className="navbar-content">
        <h1 className="logo">
          <img src={logo} alt="AdotAqui" />
        </h1>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* desktop */}
      <SidebarFilters
        className="desktop-menu"
        filters={filters}
        onApply={onApply}
        onFilter={onFilter}
        onClear={onClear}
      />

      {/* mobile */}
      {menuOpen && (
        <SidebarFilters
          className="mobile-menu"
          filters={filters}
          onApply={onApply}
          onFilter={(f) => {
            onFilter(f);
            setMenuOpen(false);
          }}
          onClear={() => {
            onClear();
            setMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}
