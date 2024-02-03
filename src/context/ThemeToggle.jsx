import React, { useContext } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className='p-2'>
      <label className='flex items-center cursor-pointer'>
        <input
          type='checkbox'
          className='hidden'
          checked={theme === 'dark'}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-700'}`}>
          <div className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'} transition-transform duration-300`}></div>
        </div>
        {theme === 'dark' ? (
          <HiSun className='text-primary text-2xl ml-2' />
        ) : (
          <HiMoon className='text-primary text-2xl ml-2' />
        )}
      </label>
    </div>
  );
};

export default ThemeToggle;
