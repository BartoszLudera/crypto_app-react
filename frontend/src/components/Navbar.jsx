import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../context/ThemeToggle';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logoImg from '../assets/logo.png';
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { coinActions } from '../store/coin-slice';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = useSelector((state) => state.coin.isLogged);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(coinActions.toogleIsLogged());
        }
    }, []);

    const handleNav = () => {
        setNav(!nav);
    };

    const logoutHandler = () => {
        localStorage.removeItem('token');
        dispatch(coinActions.toogleIsLogout());
    };

    return (
        <div className='rounded-div flex items-center justify-between h-20 font-bold mb-4'>
            <Link to='/' className='flex flex-row items-center'>
                <img src={logoImg} className='h-16' alt='Logo' />
                <h1 className='text-2xl'>Cryptoapp</h1>
            </Link>
            <div className='hidden md:block md:ml-auto'>
                <ThemeToggle />
            </div>

            <div className='hidden md:block'>
                {isLogged ? (
                    <button onClick={logoutHandler} className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl'>
                        Log out
                    </button>
                ) : (
                    <>
                        <Link
                            to='/signup'
                            className='bg-transparent text-accent px-5 py-2 ml-2 rounded-2xl shadow-lg hover:bg-button hover:text-primary hover:shadow-2xl'
                        >
                            Sign Up
                        </Link>
                        <Link to='/signin' className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl'>
                            Log in
                        </Link>
                    </>
                )}
            </div>

            {/* Menu Icon */}
            <div onClick={handleNav} className='block md:hidden cursor-pointer z-10'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/* Mobile Menu */}
            <div
                className={
                    nav
                        ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10'
                        : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'
                }
            >
                <ul className='w-full p-4'>
                    <li onClick={handleNav} className='border-b py-6'>
                        <Link to='/'>Home</Link>
                    </li>
                    {isLogged && (
                        <li onClick={handleNav} className='border-b py-6'>
                            <Link to='/account'>Account</Link>
                        </li>
                    )}
                    <li className=' py-6'>
                        <ThemeToggle />
                    </li>
                </ul>
                <div className='flex flex-col w-full p-4'>
                    {!isLogged ? (
                        <>
                        <Link onClick={handleNav} to='/signup'>
                                <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>
                                    Sign Up
                                </button>
                            </Link>
                            <Link to='/signin'>
                                <button
                                    onClick={handleNav}
                                    className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'
                                >
                                    Log in
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={logoutHandler}
                                className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'
                            >
                                Log out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
