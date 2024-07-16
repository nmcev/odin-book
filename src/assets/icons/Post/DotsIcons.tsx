import React from 'react'
import { IconProps } from "../../../types";
import { RxDotsHorizontal } from "react-icons/rx";

export const DotsIcons:React.FC<IconProps> = ({h = 16, w = 16}) => {
    return (
        <RxDotsHorizontal style={{
            width: w,
            height: h
      }}/>
  )
}
