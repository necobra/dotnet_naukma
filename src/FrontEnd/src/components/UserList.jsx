import React, { useState, useEffect } from 'react';
import User from './User';

function UserList({ users, deleteUser, editUser, fetchFilteredUsers }) {
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchSunSign, setSearchSunSign] = useState('');
    const [searchChineseSign, setSearchChineseSign] = useState('');
    const [filterIsAdult, setFilterIsAdult] = useState('any');
    const [filterIsBirthday, setFilterIsBirthday] = useState('any');

    const [birthdateRange, setBirthdateRange] = useState({ start: '', end: '' });

    useEffect(() => {
        filterUsers();
    }, [sortField, sortDirection]);

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filterUsers = () => {
        fetchFilteredUsers(searchTerm, birthdateRange, searchEmail, searchSunSign, searchChineseSign, filterIsAdult, filterIsBirthday, sortField, sortDirection)
    };

    return (
        <div className="user-list mx-auto px-4 py-6">
            <div
                className="filters grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded shadow">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Search by email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Search by sun sign"
                    value={searchSunSign}
                    onChange={(e) => setSearchSunSign(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Search by chinese sign"
                    value={searchChineseSign}
                    onChange={(e) => setSearchChineseSign(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Birthdate Range:</label>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={birthdateRange.start}
                            onChange={(e) => setBirthdateRange({...birthdateRange, start: e.target.value})}
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                        <input
                            type="date"
                            value={birthdateRange.end}
                            onChange={(e) => setBirthdateRange({...birthdateRange, end: e.target.value})}
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Adult:</label>
                    <select
                        value={filterIsAdult}
                        onChange={(e) => setFilterIsAdult(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="any">Any</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Birthday:</label>
                    <select
                        value={filterIsBirthday}
                        onChange={(e) => setFilterIsBirthday(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="any">Any</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div className="flex items-end">
                    <button
                        onClick={() => filterUsers()}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            <table className="min-w-full bg-white border border-gray-200 rounded shadow overflow-hidden w-400">
                <thead className="bg-gray-100">
                <tr>
                    {["First Name", "Last Name", "Email Address", "Birthdate", "Is Adult", "Is Birthday", "Sun Sign", "Chinese Sign", "Actions"].map((header, index) => (
                        <th
                            key={index}
                            className="text-left px-4 py-2 text-sm font-semibold text-gray-700 cursor-pointer"
                            onClick={() => {
                                const field = header
                                    .replace(/\s/, '')
                                    .replace(/^./, (char) => char.toLowerCase());
                                if (field !== 'actions') handleSort(field);
                            }}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <User
                        key={user.id}
                        user={user}
                        editUser={editUser}
                        deleteUser={deleteUser}
                    />
                ))}
                </tbody>
            </table>
        </div>

    );
}

export default UserList;