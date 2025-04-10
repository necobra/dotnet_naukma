import React, { useState } from 'react';

function User({ user, editUser, deleteUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ firstName: user.firstName, lastName: user.lastName, emailAddress: user.emailAddress, birthDate: user.birthDate });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        editUser(user.id, editedUser);
        setIsEditing(false);
        setEditedUser({ firstName: user.firstName, lastName: user.lastName, emailAddress: user.emailAddress, birthDate: user.birthDate });
    };

    return (
        <tr className="user border-b hover:bg-gray-100 ">
            <td className="px-4 py-2">
                {isEditing ? (
                    <input
                        type="text"
                        name="firstName"
                        value={editedUser.firstName}
                        onChange={handleChange}
                        className="border rounded px-2 py-0 w-20"
                    />
                ) : (
                    user.firstName
                )}
            </td>
            <td className="px-4 py-2">
                {isEditing ? (
                    <input
                        type="text"
                        name="lastName"
                        value={editedUser.lastName}
                        onChange={handleChange}
                        className="border rounded px-2 py-0 w-20"
                    />
                ) : (
                    user.lastName
                )}
            </td>
            <td className="px-4 py-2">
                {isEditing ? (
                    <input
                        type="email"
                        name="emailAddress"
                        value={editedUser.emailAddress}
                        onChange={handleChange}
                        className="border rounded px-2 py-0 w-50"
                    />
                ) : (
                    user.emailAddress
                )}
            </td>
            <td className="px-4 py-2">
                {isEditing ? (
                    <input
                        type="date"
                        name="birthDate"
                        value={editedUser.birthDate}
                        placeholder={user.birthDate}
                        onChange={handleChange}
                        className="border rounded px-2 py-0 w-35"
                    />
                ) : (
                    user.birthDate.substring(0, 10)
                )}
            </td>
            <td className="px-4 py-2">{user.isAdult ? "Yes" : "No"}</td>
            <td className="px-4 py-2">{user.isBirthday ? "Yes" : "No"}</td>
            <td className="px-4 py-2">{user.sunSign}</td>
            <td className="px-4 py-2">{user.chineseSign}</td>
            <td className="px-4 py-0 space-x-2 w-65">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default User;