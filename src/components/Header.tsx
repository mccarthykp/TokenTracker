import React from 'react';

const Header: React.FunctionComponent = () => {
  return (
    <header className='flex flex-col py-5 px-10 bg-zinc-950 dark:bg-slate-950 items-center text-left select-none'>
        <h1 className='text-2xl md:text-4xl text-slate-200 min-w-[355px]'>
          <a href='https://mccarthykp.github.io/TokenTracker/'>Crypto Market Tracker</a>
        </h1>
      <p className='py-2 text-xs md:text-base text-slate-400 min-w-[355px]'>Top 25 most valuable tokens based on market capitalization.</p>
    </header>
  );
};

export default Header;
