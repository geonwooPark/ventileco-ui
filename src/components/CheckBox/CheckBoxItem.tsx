import React, { useContext } from 'react'
import { CheckBoxContext } from './CheckBoxGroup'

interface CheckBoxItemProps {
  children: (props: { isSelected: boolean }) => React.ReactNode
  value: string | number
  register?: any
}

function CheckBoxItem({ children, value, register }: CheckBoxItemProps) {
  const { activeItems, onClick } = useContext(CheckBoxContext)
  const isSelected = activeItems.has(value)

  return (
    <label role="checkbox">
      <input
        type="checkbox"
        value={value}
        onClick={() => onClick(value)}
        style={{ display: 'none' }}
        {...register}
      />
      {children({ isSelected })}
    </label>
  )
}

export default CheckBoxItem
