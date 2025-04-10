import React, { useState, useEffect } from 'react';

function AddUserForm({ addUser }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && birthdate.trim() !== '');
    }, [firstName, lastName, email, birthdate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthdate: birthdate
        };

        setFirstName('');
        setLastName('');
        setEmail('');
        setBirthdate('');

        addUser(newUser);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-end gap-4 bg-white p-4 rounded shadow m-4"
        >
            <h1 className="text-center mb-auto mt-auto">Add user</h1>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-40"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-40"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-52"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Birthdate</label>
                <input
                    type="date"
                    name="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-44"
                />
            </div>

            <button
                type="submit"
                disabled={!isFormValid}
                className={`h-10 px-6 rounded text-white transition ${
                    isFormValid
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                }`}
            >
                Proceed
            </button>
        </form>

    );
}

export default AddUserForm;