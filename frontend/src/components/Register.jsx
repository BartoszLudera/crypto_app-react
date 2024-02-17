import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            setMessage('Użytkownik zarejestrowany pomyślnie.');
        } else {
            const errorText = await response.text();
            setMessage(`Błąd podczas rejestracji: ${errorText}`);
        }
    };

    return (
        <div className='rounded-div'>
            <Link to={'/'} className="flex flex-row align-center mb-4">
                <IoIosArrowBack size={24} />
                <p className="underline ml-2 text-md">Back to all coin</p>
            </Link>
            <div className="flex justify-center hidden:rounded-div p-10">
                <div className="w-full max-w-xs">
                    <h2 className="text-center mb-4 text-3xl">Create new account</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-4">
                            User name:
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 rounded border" required />
                        </label>
                        <label className="block mb-4">
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded border" required />
                        </label>
                        <button type="submit" className="w-full bg-button hover:bg-button text-btnText hover:border-secondary font-bold py-2 px-4 rounded">
                            Create account
                        </button>
                    </form>
                    {message && <p className="mt-4">{message}</p>}
                </div>
            </div>
            <Link to={'/signin'} className="flex flex-row align-center justify-center mb-4">
                <IoIosLogIn size={24} />
                <p className="underline ml-2 text-md">Have account? Let's log in!</p>
            </Link>
        </div>
    );
}

export default Register;
