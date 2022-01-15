import React, { ReactElement, useState, ChangeEvent } from 'react'
import Input, { InputProps } from '../Input/input'

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
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  // console.log(suggestions)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    console.log('value>>', value)
    setInputValue(value)
    if (value) {
      const results = fetchSuggestions(value)
      if (results instanceof Promise) {
        results.then((data) => {
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
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
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="viking-auto-complete">
      <Input
        style={{ marginTop: '25px', width: '300px' }}
        value={inputValue}
        placeholder="AutoComplete"
        {...restProps}
        onChange={handleChange}
      />
      {/* () && () 这种形式的代码特别多 */}
      {setSuggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete
