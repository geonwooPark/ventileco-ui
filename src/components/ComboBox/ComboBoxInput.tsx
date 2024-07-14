import { useMemo } from 'react'
import { useComboBoxContext } from './ComboBoxMain'

interface ComboBoxInputProps {
  className?: string
  placeholder: string
}

function ComboBoxInput({ className, placeholder }: ComboBoxInputProps) {
  const { id, focusedItem, inputRef, keyword, onTextChange } =
    useComboBoxContext()

  const comboBoxInputStyle = useMemo(
    () => ({ width: '100%', outline: 'none' }),
    [],
  )

  return (
    <input
      ref={inputRef}
      role="combobox"
      aria-autocomplete="list"
      aria-activedescendant={
        focusedItem ? `${id}-combobox-option-${focusedItem}` : undefined
      }
      value={keyword}
      onChange={onTextChange}
      placeholder={placeholder}
      className={className}
      style={comboBoxInputStyle}
    />
  )
}

export default ComboBoxInput
