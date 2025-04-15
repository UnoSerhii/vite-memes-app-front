import { NavItem } from "./NavItem";

interface MobileMenuProps {
  navItems: { label: string; href: string }[];
  onClose: () => void;
}

export const MobileMenu = ({ navItems, onClose }: MobileMenuProps) => {
  return (
    <div className="sm:hidden px-4 pb-4">
      <div className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} onClick={onClose} />
        ))}
      </div>
    </div>
  );
};
