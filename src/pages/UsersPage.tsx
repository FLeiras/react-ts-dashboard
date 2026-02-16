import { useState } from 'react';

import { useUsers } from '../hooks/useUsers';
import SearchBar from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import HighlightText from '../components/HighlightText';
import { uperFirstLetter } from '../utils/uperFirstLetter';
import { useTranslation } from '../hooks/useTranslation';

export default function UsersPage() {
  const { data: users, isLoading, isError } = useUsers();
  const { t } = useTranslation();

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
    return <p>{t.users.loading}</p>;
  }

  if (isError) {
    return <p>{t.users.error}</p>;
  }

  return (
    <div className="space-y-6">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder={t.users.searchPlaceholder}
      />
      <h1 className="text-2xl font-semibold">{t.users.title}</h1>
      {filteredUsers?.length === 0 ? (
        <p className="text-zinc-500 mt-6">No se encontraron usuarios</p>
      ) : (
        <table className="w-full border rounded-lg">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="p-3 text-left">{t.table.name}</th>
              <th className="p-3 text-left">{t.table.email}</th>
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
