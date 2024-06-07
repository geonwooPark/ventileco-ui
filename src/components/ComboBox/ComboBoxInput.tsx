import { useContext, useMemo } from 'react'
import { ComboBoxContext } from './ComboBox'

interface ComboBoxInputProps {
  placeholder: string
}

function ComboBoxInput({ placeholder }: ComboBoxInputProps) {
  const { id, isOpen, focusedItem, inputRef, keyword, onTextChange } =
    useContext(ComboBoxContext)

  const comboBoxInputStyle = useMemo(
    () => ({ width: '100%', outline: 'none' }),
    [],
  )

  return (
    <input
      ref={inputRef}
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-activedescendant={
        focusedItem ? `${id}-combobox-option-${focusedItem}` : undefined
      }
      aria-controls={`${id}-combobox-list`}
      value={keyword}
      onChange={onTextChange}
      placeholder={placeholder}
      style={comboBoxInputStyle}
    />
  )
}

export default ComboBoxInput
