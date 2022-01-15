import React, { useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // 一个容器，图标还要具体导
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import MxButton, { ButtonType, ButtonSize } from './components/Button/button'
import MxMenu from './components/Menu/Menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import MxIcon from './components/Icon/icon'
import Input from './components/Input/input'
import AutoComplete, {
  DataSourceType,
} from './components/AutoComplete/autoComplete'
library.add(fas)

const players = [
  'lbj',
  'AD',
  'Curry',
  'KD',
  'Harden',
  'Morant',
  'Luka',
  'nick young',
  'middlelton',
  'lilard',
]

const playersWithNums = [
  { value: 'lbj', number: 6 },
  { value: 'AD', number: 23 },
  { value: 'Curry', number: 3 },
  { value: 'kd', number: 35 },
  { value: 'Harden', number: 13 },
  { value: 'Luka', number: 77 },
  { value: 'lilard', number: 11 },
]

function App() {
  const handleFectch = (query: string) => {
    return playersWithNums.filter((player) => player.value.includes(query))
  }
  const getSelectVal = (item: string) => {
    console.log('选择了:', item)
  }
  const renderOption = (item: DataSourceType) => {
    return (
      <h5>
        Name:{item.value}, Num:{item.number}
      </h5>
    )
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
