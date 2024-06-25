import React from 'react';

const Header: React.FunctionComponent = () => {
  return (
    <header className='bg-slate-800 py-2 px-4 md:text-center select-none'>
      <h1 className='text-2xl md:text-4xl text-slate-200'>Crypto Market Tracker</h1>
      <p className='py-2 text-xs md:text-base text-slate-400'>Top 25 most valuable tokens based on market capitalization.</p>
    </header>
  );
};

export default Header;
