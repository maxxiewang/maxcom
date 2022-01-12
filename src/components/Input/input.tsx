import React, { ReactElement, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
type InputSize = 'lg' | 'sm'
/* 
  InputHTMLAttributes<HTMLElement>
  需要支持所有原生的HTML属性
  size与原生的重复了，使用TS内置的高级属性Omit
*/
interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  className?: string
  disabled?: boolean
  size?: InputSize
  icon?: IconProp
  prepend?: string | ReactElement
  append?: string | ReactElement
}

const Input: React.FC<InputProps> = (props) => {
  // 1、取出各种属性
  const {
    className,
    disabled,
    size,
    style,
    icon,
    prepend,
    append,
    ...restProps
  } = props
  // 2、根据属性计算不同的className
  const classes = classNames('viking-input-wrapper', className, {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })
  // 3、根据属性是否添加特定的节点
  return (
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}

export default Input
