import React, { useState } from 'react'
import classNames from 'classnames'

interface Iprops {
  onFile: (files: FileList) => void
}
/*
 * 相当于外层的一个Wrapper，把想要的组件包裹在其中，内部实现了一些事件的处理
 * div上的一些接口是实现的html拖放API，具体参见https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
 */
const Dragger: React.FC<Iprops> = (props) => {
  const { onFile, children } = props
  //* 创建dragOver 与 dragLeave
  const [dragOver, setDrageOver] = useState(false)
  const klass = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver,
  })
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrageOver(false)
    onFile(e.dataTransfer.files)
  }
  //! 这里这个e的类型没有处理好 DragEvent<HTMLElement>并不支持
  const handleDrag = (e: React.DragEvent<HTMLDivElement>, over: boolean) => {
    e.preventDefault()
    setDrageOver(over)
  }

  return (
    <div
      className={klass}
      onDragOver={(e) => {
        console.log('触发了onDragOver。。。。')
        handleDrag(e, true)
      }}
      onDragLeave={(e) => {
        console.log('onDragLeave')
        handleDrag(e, false)
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
