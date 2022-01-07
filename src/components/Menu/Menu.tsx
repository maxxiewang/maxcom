import React, { useState, createContext } from 'react'
import classNames from 'classnames'

//! 利用字符串字面量
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (index: number) => void
export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
}

interface IMenuContext {
  index: number
  onSelect?: SelectCallback
}
export const MenuContext = createContext<IMenuContext>({ index: 0 })
const MxMenu: React.FC<MenuProps> = (props) => {
  //! 注意这个children
  const { defaultIndex, className, children, mode, style, onSelect } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    // onSelect:
  }
  const classes = classNames('mxmenu', className, {
    // 不同的mode，不同的className
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal',
  })
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  )
}

MxMenu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}
export default MxMenu
