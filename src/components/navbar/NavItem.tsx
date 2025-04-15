import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export const NavItem = ({ href, label, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`text-gray-700 hover:text-blue-600 transition ${
        isActive ? "font-bold" : ""
      }`}
    >
      {label}
    </Link>
  );
};
