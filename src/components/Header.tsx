import React from 'react';

const Header: React.FunctionComponent = () => {
  return (
    <div className='my-5 text-center select-none'>
      <h1 className='text-4xl md:text-2xl text-slate-200'>Crypto Market Tracker</h1>
      <p className='pt-5 text-base md:text-sm text-slate-400'>Top 25 most valuable tokens based on market capitalization.</p>
    </div>
  );
};

export default Header;