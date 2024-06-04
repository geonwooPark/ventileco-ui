import { PropsWithChildren, useContext } from 'react'
import { ComboBoxContext } from './ComboBox'
import { hoveredStyle, selectedStyle } from '../../constants'

interface ComboBoxItemProps {
  item: {
    value: string
    label: string
    disabled?: boolean
  }
}

function ComboBoxItem({
  children,
  item,
}: PropsWithChildren<ComboBoxItemProps>) {
  const { value, onSelect, onKeyboardSelect } = useContext(ComboBoxContext)

  return (
    <li
      role="listitem"
      tabIndex={0}
      data-value={item.value}
      data-label={item.label}
      data-disabled={item.disabled}
      className={`${value === item.value && selectedStyle} ${item.disabled ? 'text-gray-300' : hoveredStyle} outline-none`}
      onKeyDown={onKeyboardSelect}
      onClick={() =>
        onSelect({
          value: item.value,
          label: item.label,
          disabled: item.disabled,
        })
      }
    >
      {children}
    </li>
  )
}

export default ComboBoxItem
