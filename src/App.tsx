import React from 'react'
import MxButton, { ButtonType, ButtonSize } from './components/Button/button'
import MxMenu from './components/Menu/Menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App">
      <MxMenu>
        <MenuItem>cool link</MenuItem>
        <MenuItem>cool link2</MenuItem>
        <MenuItem>cool link3</MenuItem>
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
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
