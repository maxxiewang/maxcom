import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react'
import MxMenu, { MenuProps } from './Menu'
import MenuItem from './menuItem'

// 设计测试属性
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: ' 0',
  mode: 'vertical',
}
// 用来渲染不同属性的组件
const generateMenu = (props: MenuProps) => {
  return (
    <MxMenu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>cool link2</MenuItem>
      <MenuItem>xyz</MenuItem>
    </MxMenu>
  )
}
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
/* 
  react-test-libiary的理念是，测试案例越贴近使用者的使用方法，测试的结果就会更好，API一般都是能过渲染
  元素的内容来取得的节点，而不是通过class和id
*/
describe('test Menu and MenuItem component', () => {
  // 在每个case之前都会跑
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  // 1 提供默认属性后，是否会正常显示class与行为
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('mxmenu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  // 2 点击后是否会正确地切到item上面去，同时测试回调是否会正确触发
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(3)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  // 3 切换坚向模式是否正确渲染
  it('shoud render vertical mode when mode is set to vertical', () => {})
})

describe('test Menu and MenuItem component in vertical mode', () => {
  // beforeEach(() => {
  // cleanup()
  // wrapper = render(generateMenu(testProps))
  // wrapper2 = render(generateMenu(testVerProps))
  // wrapper2.container.append(createStyleFile())
  // })
  // it('should render vertical mode when mode is set to vertical', () => {
  //   const menuElement = wrapper2.getByTestId('test-menu')
  //   expect(menuElement).toHaveClass('menu-vertical')
  // })
  // it('should show dropdown items when click on subMenu for vertical mode', () => {
  //   const dropDownItem = wrapper2.queryByText('drop1')
  //   expect(dropDownItem).not.toBeVisible()
  //   fireEvent.click(wrapper2.getByText('dropdown'))
  //   expect(dropDownItem).toBeVisible()
  // })
  // it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
  //   expect(wrapper2.queryByText('opened1')).toBeVisible()
  // })
})
