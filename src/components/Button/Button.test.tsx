import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import MxButton, { ButtonProps, ButtonSize, ButtonType } from './button'

// test('Button test', () => {
//   const wrapper = render(<MxButton>TestBu</MxButton>)
//   const element = wrapper.queryByText('TestBu')
//   expect(element).toBeTruthy()
//   expect(element).toBeInTheDocument() // 比Truthy好点
// })
const defaultProps = {
  //! 这个onClick名是必须的，传个别的不行
  onClick: jest.fn(),
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'KGB',
}

// 先把case作一个分类

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<MxButton {...defaultProps}>TestBu</MxButton>)
    const element = wrapper.getByText('TestBu')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('based on different props', () => {
    const wrapper = render(<MxButton {...testProps}>TestBu</MxButton>)
    const element = wrapper.getByText('TestBu')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary KGB btn-lg')
  })
  it('测试是否是a link', () => {
    // const wrapper = render()
  })
  it('test disabled button', () => {})
})
