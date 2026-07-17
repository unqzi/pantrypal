import { NavLink } from "react-router-dom";

const icons = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  ),
  inventory: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8" />
      <path d="M23 3H1v5h22V3z" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  ),
  shopping: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  recipes: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 2 5 5 5 9c0 3 2 5.5 5 6.5V20h4v-4.5c3-1 5-3.5 5-6.5 0-4-3-7-7-7z" />
      <line x1="12" y1="2" x2="12" y2="6" />
    </svg>
  ),
};

function Navbar() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        {icons.home}
        <span>Home</span>
      </NavLink>
      <NavLink to="/inventory" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        {icons.inventory}
        <span>Inventory</span>
      </NavLink>
      <NavLink to="/shopping" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        {icons.shopping}
        <span>Shopping</span>
      </NavLink>
      <NavLink to="/recipes" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        {icons.recipes}
        <span>Recipes</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
