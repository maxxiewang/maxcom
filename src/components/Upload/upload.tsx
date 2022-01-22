import React, { ChangeEvent, useRef } from 'react'
import axios from 'axios'
import MxButton, { ButtonType } from '../Button/button'

export interface UploadProps {
  action: string
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
}

const Upload: React.FC<UploadProps> = (props) => {
  const { action, onProgress, onError, onSuccess, beforeUpload, onChange } =
    props
  const fileInput = useRef<HTMLInputElement>(null)
  // FileList是一个Array like object类型，先转成数组进行操作
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        //* beforeUpload的一些处理，先看result是一个promise还是布尔值
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  // 抽取post上传方法
  const post = (file: File) => {
    const formData = new FormData()
    formData.append(file.name, file)
    //! AXIOS官方提供的onProgress事件
    axios
      .post(action, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          // 通过这个e来计算那些百分比
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            console.log('percentage', percentage)
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
      .then((res) => {
        console.log('upoad组件post请求执行成功 >>>', res)
        if (onSuccess) {
          onSuccess(res.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        console.error(err)
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFiles(files)
    // 过程结束后进行清空操作
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  return (
    <div className="viking-upload-component">
      <MxButton btnType={ButtonType.Primary} onClick={handleClick}>
        上传文件
      </MxButton>
      <input
        type="file"
        className="viking-file-input"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default Upload
