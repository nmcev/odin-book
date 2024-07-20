import React, { useContext, useState, useEffect }  from 'react'
import lightLogo from '/threads-logo-black.svg'
import darkLogo from '/threads-logo-white.svg'
import { Link, useNavigate } from 'react-router-dom'
import { HomeIcon } from '../assets/icons/Navbar/HomeIcon'
import { SearchIcon } from '../assets/icons/Navbar/SearchIcon'
import { PostIcon } from '../assets/icons/Navbar/PostIcon'
import { NotificationIcon } from '../assets/icons/Navbar/NotificationIcon'
import { ProfileIcon } from '../assets/icons/Navbar/ProfileIcon'
import clsx from 'clsx'
import { NavItemProps } from '../types'
import { AuthContext } from '../contexts/AuthContext'

export const Header: React.FC = () => {
  const authContext = useContext(AuthContext)
  return (
      <header className='flex w-full gap-72 justify-center py-2 fixed backdrop:blur-xl top-0 bg-[rgba(255,255,255,0.85)] dark:backdrop:opacity-50 dark:bg-[#10101094]'>
        
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
      {!authContext?.isLoggedIn ? (
        <div className='rounded-lg px-8 py-4 grid items-center'>
          <button className='bg-black text-white rounded-lg px-4 py-[7px] font-semibold font-sans text-sm'>
            <Link to={'/login'}>
              Log in
            </Link>
          </button>
        </div>

      ) : (
        <div className='rounded-lg px-8 py-4 grid items-center'>
        <button onClick={authContext.logout} className='bg-red-500 text-white rounded-lg px-4 py-[7px] font-semibold font-sans text-sm'>
            Log out
        </button>
      </div>

      )
        
      }
    </header>
  )
}


const NavItem: React.FC<NavItemProps> = ({ children, to }) => {
    const [isBouncing, setIsBouncing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

    const handleClick = () => 
    {
      
      if (!authContext?.isLoggedIn && to !== '/' && to !== '/search') {
        setShowDialog(true);
          return;
      }
      
      setIsBouncing(true);
      setTimeout(() => {
        setIsBouncing(false)
        navigate(to)
      }, 200);
    };
  
  const closeDialog = () => {
    setShowDialog(false)
  }
    
  return (
      <>
        <div 
            className={clsx('hover:bg-gray-100 rounded-lg px-8 py-5 grid items-center cursor-pointer', {
            'bounce': isBouncing,
      })}
      
      onClick={handleClick}>
        {children}
      </div>
      {showDialog && (
        <Dialog message="You need to log in to access this page." onClose={closeDialog} />
      )}
      </>
    )
}


const Dialog: React.FC<{ message: string, onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEscapeClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [onClose]);


  return (
    <div className='fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50'>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 transition-colors"
          onKeyDown={close}
        >
          Close
        </button>
      </div>
    </div>
  )
  
}