import React from 'react'
import { IconProps } from '../../../types'


export const RepostIcon: React.FC<IconProps> = ({ h = 20, w = 20, reposted }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" className={`${  !reposted &&'dark:stroke-neutral-50 stroke-black'}`} fill="none" stroke={reposted ? '#008000' : '#000000'} strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4" /><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" /><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" /></svg>
  )
}
