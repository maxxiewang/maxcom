import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './menuItem'
import MxIcon from '../../components/Icon/icon'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext)
  //! as string[]
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false
  const [menuOpen, setOpen] = useState(isOpend)

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvents =
    context.mode === 'vertical' ? { onClick: handleClick } : {}
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', className, {
      'menu-opened': menuOpen,
    })
    // 一样用React官方那个渲染children
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.log('Warning: Menu has a child which is not a MenuItem')
      }
    })
    return <ul className={subMenuClasses}>{childrenComponent}</ul>
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" onClick={handleClick} {...clickEvents}>
        {title}
        <MxIcon
          icon="angle-down"
          className="arrow-icon"
          theme="danger"
        ></MxIcon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
