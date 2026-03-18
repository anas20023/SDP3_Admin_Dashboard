import React, { useState } from 'react';
import { Search } from 'lucide-react';

const DataTable = ({ columns, data, onSearch, isLoading, actions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full pl-10 bg-white"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-50" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="table table-md">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-gray-600 font-bold uppercase text-xs">{col.label}</th>
              ))}
              {actions && <th className="text-gray-600 font-bold uppercase text-xs text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((col) => (
                    <td key={col.key}><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                  ))}
                  {actions && <td><div className="h-4 bg-gray-100 rounded w-16 ml-auto"></div></td>}
                </tr>
              ))
            ) : data?.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-8 text-gray-400">
                  No records found
                </td>
              </tr>
            ) : (
              data?.map((row, index) => (
                <tr key={row.id || index} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="text-gray-700">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="text-right">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
