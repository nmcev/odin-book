import React from 'react'
import { IconProps } from '../../../types'
import { useLocation } from "react-router-dom";

export const NotificationIcon: React.FC<IconProps> = ({ h = 26, w = 26 }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = pathname === '/notifications'

  return (
    <svg aria-label="Notifications" role="img" viewBox="0 0 26 26" className="x1lliihq xffa9am x2lah0s x1jwls1v x1n2onr6 x17fnjtu x3egl4o" style={{ fill: "transparent", height: h, width: w }} ><title>Notifications</title><path className={isActive ? "dark:stroke-red-500 dark:fill-red-500" : "dark:stroke-white dark:fill-transparent"} d="M2.5 9.85683C2.5 14.224 6.22178 18.5299 12.0332 22.2032C12.3554 22.397 12.7401 22.5909 13 22.5909C13.2703 22.5909 13.655 22.397 13.9668 22.2032C19.7782 18.5299 23.5 14.224 23.5 9.85683C23.5 6.11212 20.8698 3.5 17.4599 3.5C15.4847 3.5 13.9356 4.39792 13 5.74479C12.0851 4.40812 10.5257 3.5 8.5401 3.5C5.14059 3.5 2.5 6.11212 2.5 9.85683Z" stroke={isActive ? 'red' : 'rgb(144, 144,144)'} fill = {isActive ? 'red' : ''} strokeWidth="2.5"></path></svg>
  )
}
