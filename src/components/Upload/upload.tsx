import React, { ChangeEvent, useRef, useState } from 'react'
import axios from 'axios'
import MxButton, { ButtonType } from '../Button/button'
import UploadList from './uploadList'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
  headers?: { [key: string]: any } //! 注意这个KV对象写法
  name?: string
  data?: { [key: string]: any } //用于用户添加更多的信息
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
}

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}
const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    onProgress,
    onError,
    onSuccess,
    beforeUpload,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  //!
  /* 
    这个函数涉及React关于setState的函数比较，10-7课时
    如果返回的是同一个对象的时候，setState更新就会失败。添加辅助方法来更新列表中的一项
  */
  const updateFileList = (
    updateFile: UploadFile, //要更新哪一个file
    updateObj: Partial<UploadFile> //更新哪一些值，代表可以更新UploadFile任何一项都可以
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  // FileList是一个Array like object类型，先转成数组进行操作
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        //* beforeUpload的一些处理，先看result是一个promise还是布尔值
        console.log('通过beforeUpload得到的result', result)
        if (result && result instanceof Promise) {
          console.log('result是一个promise', result)
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
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    //! 注意这种好用的写法，要采取回调的形式
    setFileList((prevList) => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(file.name, file)
    if (data) {
      //! 这个循环插入的是个啥？？？？
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }

    //! AXIOS官方提供的onProgress事件, withCredentials
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e) => {
          // 通过这个e来计算那些百分比
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          // 上传成功就是100%，所以在没上传完的时候，执行onProcess这个函数
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            // setFileList((prevList) => {
            //   //! 是直接返回一个更新后的数组，而不是修改原来的某一项再返回
            //   return prevList
            // })
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
      .then((res) => {
        updateFileList(_file, { status: 'success', response: res.data })
        if (onSuccess) {
          onSuccess(res.data, file)
        }
        if (onChange) {
          console.log('执行了onChage')
          onChange(file)
        }
      })
      .catch((err) => {
        console.error(err)
        updateFileList(_file, { status: 'error', error: err })
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
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      //! 通过filter实现一个删除效果
      return prevList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
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
  console.log('fileList', fileList)
  return (
    <div className="viking-upload-component" onClick={handleClick}>
      <MxButton btnType={ButtonType.Primary}>上传文件</MxButton>
      <input
        type="file"
        className="viking-file-input"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
}

export default Upload
