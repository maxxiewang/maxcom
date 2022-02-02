import React, { useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // 一个容器，图标还要具体导
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import MxButton, { ButtonType, ButtonSize } from './components/Button/button'
import MxMenu from './components/Menu/Menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import MxIcon from './components/Icon/icon'
import Input from './components/Input/input'
import Upload, { UploadFile } from './components/Upload/upload'
import axios from 'axios'
import AutoComplete, {
  DataSourceType,
} from './components/AutoComplete/autoComplete'
library.add(fas)

interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}
const defaultFileList: UploadFile[] = [
  {
    uid: '123',
    size: 1234,
    name: 'hello.md',
    status: 'uploading',
    percent: 30,
  },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
]

const players = ['lbj', 'AD']

const playersWithNums = [
  { value: 'lbj', number: 6 },
  { value: 'AD', number: 23 },
]

const checkFileSize = (file: File) => {
  // 判断是否大于50k
  if (Math.round(file.size / 1024) > 5000000) {
    alert('文件太大！')
    return false
  }
  return true
}

function App() {
  const handleFectch = (query: string) => {
    // return playersWithNums.filter((player) => player.value.includes(query))
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }))
      })
  }
  const getSelectVal = (item: string) => {
    console.log('选择了:', item)
  }
  const renderOption = (item: DataSourceType) => {
    //! 利用类型断言解决了这个问题
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <h5>Name:{itemWithGithub.value}</h5>
        <p>{itemWithGithub.url}</p>
      </>
    )
  }

  const beforUploadTest = (file: File) => {
    // console.log('beforeUpload拿到的fileSize', file)
    if (checkFileSize(file)) {
      return filePromise(file)
    }
    return false
  }

  const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', { type: file.type })
    return Promise.resolve(newFile)
  }
  //* axios，Input组件
  const [title, useTitle] = useState('')
  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
  //     // console.log('axios>>>', res.data)
  //   })
  // })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadFiles = files[0]
      const formData = new FormData()
      formData.append(uploadFiles.name, uploadFiles)
      axios
        .post('https://jsonplaceholder.typicode.com/posts', formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('post上传文件>>>', res.data)
        })
    }
  }
  return (
    <div className="App">
      <MxMenu
        defaultIndex={'0'}
        mode="horizontal"
        onSelect={(index) => {
          console.log('点击了', index)
        }}
        defaultOpenSubMenus={['3']}
      >
        <MenuItem>cool link0</MenuItem>
        <MenuItem disabled>cool link1</MenuItem>
        <MenuItem>cool link2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
          <MenuItem>dropdown3</MenuItem>
        </SubMenu>
      </MxMenu>
      <MxButton autoFocus btnType={ButtonType.Default}>
        Default Button
      </MxButton>
      <MxButton disabled>Default disabled</MxButton>
      <MxButton btnType={ButtonType.Danger} size={ButtonSize.Large}>
        Dan+lar
      </MxButton>
      <MxButton btnType={ButtonType.Primary} size={ButtonSize.Small}>
        Primary Small
      </MxButton>
      <MxButton btnType={ButtonType.Link} href={'www.baidu.com'}>
        Link
      </MxButton>
      <MxButton
        disabled={true}
        btnType={ButtonType.Link}
        href={'www.baidu.com'}
      >
        DisLink
      </MxButton>
      {/* Icon组件封装展示 */}
      <MxIcon icon="arrow-down" size="lg" theme="danger"></MxIcon>
      <br />

      <AutoComplete
        fetchSuggestions={handleFectch}
        onSelect={getSelectVal}
        renderOption={renderOption}
      />
      {/* upload组件 */}
      {/* <div>
        <input type="file" name="myFile" onChange={handleChange} />
      </div> */}
      <div style={{ width: '300px' }}>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforUploadTest}
          defaultFileList={defaultFileList}
        />
      </div>

      {/* Input组件封装展示*/}
      <Input
        style={{ marginTop: '25px', width: '300px' }}
        placeholder="input with icon"
        icon="search"
      />
      <Input style={{ width: '300px' }} disabled />
      <Input style={{ width: '300px' }} defaultValue="large size" size="lg" />
      <Input style={{ width: '300px' }} placeholder="small size" size="sm" />
      <br />
    </div>
  )
}

export default App
