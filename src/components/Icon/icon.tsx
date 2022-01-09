import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome' // 一个容器，图标还要具体导

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

export interface iconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}
/* 
  通过theme控制className
*/
const MxIcon: React.FC<iconProps> = (props) => {
  // 取出用户自定义的className
  const { className, theme, ...restProps } = props

  const classes = classNames('viking-icon', className, {
    [`icon-${theme}`]: theme,
  })
  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default MxIcon
