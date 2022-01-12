import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // 一个容器，图标还要具体导
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import MxButton, { ButtonType, ButtonSize } from './components/Button/button'
import MxMenu from './components/Menu/Menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import MxIcon from './components/Icon/icon'
import Input from './components/Input/input'
library.add(fas)

function App() {
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
