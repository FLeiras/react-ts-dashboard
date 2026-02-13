import { NavLink } from 'react-router-dom';
import { Package, Users, Settings } from 'lucide-react';

type Props = {
  collapsed: boolean;
};

const baseLink =
  'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors';

export default function Sidebar({ collapsed }: Props) {
  return (
    <aside
      className={`
        border-r border-zinc-200 dark:border-zinc-700
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      <nav className="p-4 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseLink} ${
              isActive
                ? 'bg-zinc-200 dark:bg-zinc-700 font-medium'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`
          }
        >
          <Package size={18} />
          {!collapsed && <span>Productos</span>}
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${baseLink} ${
              isActive
                ? 'bg-zinc-200 dark:bg-zinc-700 font-medium'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`
          }
        >
          <Users size={18} />
          {!collapsed && <span>Usuarios</span>}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${baseLink} ${
              isActive
                ? 'bg-zinc-200 dark:bg-zinc-700 font-medium'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`
          }
        >
          <Settings size={18} />
          {!collapsed && <span>Configuración</span>}
        </NavLink>
      </nav>
    </aside>
  );
}
