import { useState } from "react";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import { MobileMenu } from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Table", href: "/" },
    { label: "List", href: "/list" }
  ];

  return (
    <nav className="bg-white border-b shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo />
          <div className="hidden sm:flex gap-6">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && <MobileMenu navItems={navItems} onClose={() => setIsOpen(false)} />}
    </nav>
  );
}
