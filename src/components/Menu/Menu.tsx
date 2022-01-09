import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

//! 利用字符串字面量
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (index: string) => void
export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '1' })
const MxMenu: React.FC<MenuProps> = (props) => {
  //! 注意这个children
  const {
    defaultIndex,
    className,
    children,
    mode,
    style,
    onSelect,
    defaultOpenSubMenus,
  } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  const classes = classNames('mxmenu', className, {
    // 不同的mode，不同的className
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal',
  })
  const renderChildren = () => {
    //! 这个利用React.Children.map属性处理childrend太绝了
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // console.log('index', index)
        return React.cloneElement(childElement, { index: index.toString() })
        // return childElement
      } else {
        console.log('Warning: Menu has a child which is not a MenuItem')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
        {/* {children} */}
      </MenuContext.Provider>
    </ul>
  )
}

MxMenu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}
export default MxMenu
