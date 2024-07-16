import React from 'react'
import { IconProps } from '../../../types'
import { useLocation } from "react-router-dom";

export const PostIcon: React.FC<IconProps> = ({ h = 26, w = 26 }) => {
  
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = pathname === '/create-post'

  return (
    <svg aria-label="Create" role="img" viewBox="0 0 26 26" className="x xffa9am x2lah0s x1jwls1v x1n2onr6 x17fnjtu x3egl4o" style={{ fill: "transparent", height: h, width: w }}><title>Create</title><path d="M22.75 13L22.75 13.15C22.75 16.5103 22.75 18.1905 22.096 19.4739C21.5208 20.6029 20.6029 21.5208 19.4739 22.096C18.1905 22.75 16.5103 22.75 13.15 22.75L12.85 22.75C9.48969 22.75 7.80953 22.75 6.52606 22.096C5.39708 21.5208 4.4792 20.6029 3.90396 19.4739C3.25 18.1905 3.25 16.5103 3.25 13.15L3.25 12.85C3.25 9.48968 3.25 7.80953 3.90396 6.52606C4.4792 5.39708 5.39708 4.4792 6.52606 3.90396C7.80953 3.25 9.48968 3.25 12.85 3.25L13 3.25"
    stroke={isActive ? 'black' : 'rgb(144, 144, 144)'}
      strokeLinecap="round" strokeWidth="2.5"></path><path d="M21.75 4.25L13.75 12.25"
      stroke={isActive ? 'black' : 'rgb(144, 144, 144)'}
      strokeLinecap="round" strokeWidth="2.5"></path></svg>
  )
}
