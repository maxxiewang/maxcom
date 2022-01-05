import React from 'react'
import { render } from '@testing-library/react'
import MxButton from './button'

// test('Button test', () => {
//   const wrapper = render(<MxButton>TestBu</MxButton>)
//   const element = wrapper.queryByText('TestBu')
//   expect(element).toBeTruthy()
//   expect(element).toBeInTheDocument() // 比Truthy好点
// })

// 先把case作一个分类

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<MxButton>TestBu</MxButton>)
    const element = wrapper.getByText('TestBu')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })
  it('based on different props', () => {})
  it('link', () => {})
  it('test disabled button', () => {})
})
