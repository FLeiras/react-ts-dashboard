import { useState } from 'react';

import { useUsers } from '../hooks/useUsers';
import SearchBar from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import HighlightText from '../components/HighlightText';
import { uperFirstLetter } from '../utils/uperFirstLetter';

export default function UsersPage() {
  const { data: users, isLoading, isError } = useUsers();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const filteredUsers = users?.filter((user) => {
    const fullName =
      `${user.name.firstname} ${user.name.lastname}`.toLowerCase();

    return (
      fullName.includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  });

  if (isLoading) {
    return <p className="text-zinc-500">Cargando usuarios…</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error al cargar usuarios</p>;
  }

  return (
    <div className="space-y-6">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar usuario..."
      />
      <h1 className="text-2xl font-semibold">Usuarios</h1>
      {filteredUsers?.length === 0 ? (
        <p className="text-zinc-500 mt-6">No se encontraron usuarios</p>
      ) : (
        <table className="w-full border rounded-lg">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3 font-medium">
                  <HighlightText
                    text={`${uperFirstLetter(user.name.firstname)} ${uperFirstLetter(user.name.lastname)}`}
                    highlight={debouncedSearch}
                  />
                </td>

                <td className="p-3 text-sm text-zinc-500">
                  <HighlightText
                    text={user.email}
                    highlight={debouncedSearch}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
