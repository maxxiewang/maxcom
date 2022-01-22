import React, {
  ReactElement,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import MxIcon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObj {
  value: string
  number: number
}
//! 返回的是一个交叉类型
export type DataSourceType<T = {}> = T & DataSourceObj

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  //! 返回联合类型的Promise
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: string) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { value, fetchSuggestions, renderOption, onSelect, ...restProps } =
    props
  const [inputValue, setInputValue] = useState(value as string)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const debounceValue = useDebounce(inputValue, 2000)
  //! 注意使用HTMLDivElement
  const componentRef = useRef<HTMLDivElement>(null)
  //* clickOutside hook
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debounceValue) {
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        // console.log('useEffect')
        setLoading(true)
        results.then((data) => {
          setSuggestions(data)
          setLoading(false)
        })
      } else {
        setSuggestions(results)
        setLoading(false)
      }
    } else {
      setSuggestions([])
    }
  }, [debounceValue])
  // console.log(suggestions)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    // if (value) {
    //   const results = fetchSuggestions(value)
    //   if (results instanceof Promise) {
    //     console.log('触发了Promise')
    //     setLoading(true)
    //     results.then((data) => {
    //       setSuggestions(data)
    //       setLoading(false)
    //     })
    //   } else {
    //     setSuggestions(results)
    //     setLoading(false)
    //   }
    // } else {
    //   setSuggestions([])
    // }
  }
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1 //最后那一项
    }
    setHighlightIndex(index)
  }
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // 回车
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38: // 向上
        highlight(highlightIndex - 1)
        break
      case 40: // 向下
        console.log('down....')
        highlight(highlightIndex + 1)
        break
      case 27: // ESC
        break
      default:
        break
    }
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item.value)
    }
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul className="viking-suggestion-list">
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex,
          })
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        style={{ marginTop: '25px', width: '300px' }}
        value={inputValue}
        placeholder="AutoComplete"
        {...restProps}
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
      {/* 异步loading图 */}
      {loading && (
        <ul>
          <MxIcon icon="spinner" spin></MxIcon>
        </ul>
      )}
      {/* () && () 这种形式的代码特别多 */}
      {setSuggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete
