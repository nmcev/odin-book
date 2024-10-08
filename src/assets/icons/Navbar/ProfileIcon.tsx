import React from 'react'
import { IconProps } from '../../../types'
import { useLocation } from 'react-router-dom'
export const ProfileIcon:React.FC<IconProps> = ({h = 26, w = 26}) => {

  const location = useLocation();
  const pathname = location.pathname;
  const isActive = pathname === '/profile'
  return (
    <svg aria-label="Profile" role="img" viewBox="0 0 26 26" className='x' style={{ fill: "transparent", height: h, width: w }}><title>Profile</title><circle className={isActive ? "dark:stroke-white dark:fill-white" : "dark:stroke-white dark:fill-transparent"} cx="13" cy="7.25" r="4"
    stroke={isActive ? 'black' : 'rgb(144, 144, 144)'}
      strokeWidth="2.5"></circle><path className={isActive ? "dark:stroke-white dark:fill-white" : "dark:stroke-white dark:fill-transparent"} d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z"
      stroke={isActive ? 'black' : 'rgb(144, 144, 144)'}
      strokeWidth="2.5"></path></svg>)
}
