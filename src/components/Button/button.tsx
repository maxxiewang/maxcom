import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
}

// 拿到所有的原生的Button属性
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>
//! 利用交叉类型将多种类型叠加到一起，包含了所有类型的特性，而不是 | 联合类型
// 给a链接使用的属性
type AnchorButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>
//! 利用TS的Partial特性，把里面的属性都变成可选的。在mixins中，有一些是Button必传的，但不是a标签不是必传的
export type ButtonProps = Partial<NativeButtonProps | AnchorButtonProps>

const MxButton: React.FC<ButtonProps> = (props) => {
  //! 利用... 把剩余的属性都取出来
  const { btnType, disabled, size, children, className, href, ...restProps } =
    props
  //* 根据不同的size和type添加不同的className C4-8 btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      //! disabled动态控制原生的disabled
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}
//! 添加一个默认的props
MxButton.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}
export default MxButton
