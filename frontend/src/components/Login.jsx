import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const username = data.username
                localStorage.setItem('token', token);
                localStorage.setItem('username',username);
                setError('');
                window.location.href = '/'; // Redirect to the main path
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (err) {
            setError('An error occurred while logging in.');
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
                    <h2 className="text-center mb-4 text-3xl">Log in</h2>
                    <form onSubmit={handleLogin}>
                        <label className="block mb-4">
                            Login:
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 rounded border" required />
                        </label>
                        <label className="block mb-4">
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded border" required />
                        </label>
                        {error && <div style={{ color: 'red' }} className="mb-4">{error}</div>}
                        <button type="submit" className="w-full bg-button hover:bg-button text-btnText hover:border-secondary font-bold py-2 px-4 rounded">
                            Log in
                        </button>
                    </form>
                </div>
            </div>
            <Link to={'/signup'} className="flex flex-row align-center justify-center mb-4">
                <IoIosLogIn size={24} />
                <p className="underline ml-2 text-md">Don't have account? Let's create one!</p>
            </Link>
        </div>
    );
};

export default Login;
