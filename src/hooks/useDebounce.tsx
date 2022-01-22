import { useState, useEffect } from 'react'

function useDebounce(value: any, delay = 2000) {
  const [debounceVal, setDebounceVal] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      console.log('执行useDebounce')
      setDebounceVal(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debounceVal
}

export default useDebounce
