import React, { useState }  from 'react'
import lightLogo from '/threads-logo-black.svg'
import darkLogo from '/threads-logo-white.svg'
import { Link } from 'react-router-dom'
import { HomeIcon } from '../assets/icons/Navbar/HomeIcon'
import { SearchIcon } from '../assets/icons/Navbar/SearchIcon'
import { PostIcon } from '../assets/icons/Navbar/PostIcon'
import { NotificationIcon } from '../assets/icons/Navbar/NotificationIcon'
import { ProfileIcon } from '../assets/icons/Navbar/ProfileIcon'
import clsx from 'clsx'
import { NavItemProps } from '../types'

export const Header: React.FC = () => {
    return (
      <header className='flex justify-between px-36 py-2'>
        
          {/* logo section */}
        <div className=' rounded-lg px-8 py-4 grid items-center'>
        <Link to={'/'} className='logo-hover' >
        <img 
        src={lightLogo} 
        className='block dark:hidden' 
        width={28} 
        height={28} 
        alt="Threads Logo Light" 
            />
      </Link>

      <Link to={'/'} className='logo-hover' >
      <img 
        src={darkLogo} 
        className='hidden dark:block' 
        width={28} 
        height={28} 
        alt="Threads Logo Dark" 
            />
        </Link>
            </div>


          <nav className='flex'>

            <NavItem to='/'>
                  <HomeIcon />
            </NavItem>


              <NavItem to='/search'>
              <SearchIcon />

            </NavItem>

              <NavItem to='create-post'>
                 <PostIcon />
              </NavItem>
                  
               
            <NavItem to='/notifications'>
                <NotificationIcon />
            </NavItem>
            
            
            <NavItem to='/profile'>
                <ProfileIcon />
            </NavItem>

          </nav>

          {/* login button */}
          <div className='rounded-lg px-8 py-4 grid items-center'>
             <button className='bg-black text-white rounded-lg px-4 py-[7px] font-semibold font-sans text-sm'>
                  <Link to={'/login'}>
                     Log in
                  </Link>
            </button>
          </div>
    </header>
  )
}


const NavItem: React.FC<NavItemProps> = ({ children, to }) => {
    const [isBouncing, setIsBouncing] = useState(false);

    const handleClick = () => {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 200);
    };

    
    return (
        <Link to={to}
            className={clsx('hover:bg-gray-100 rounded-lg px-8 py-5 grid items-center cursor-pointer', {
            'bounce': isBouncing,
      })}
      onClick={handleClick}>
        {children}
     </Link>
    )
}
