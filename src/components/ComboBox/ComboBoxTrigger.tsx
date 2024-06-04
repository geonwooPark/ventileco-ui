import { PropsWithChildren, useContext } from 'react'
import { ComboBoxContext } from './ComboBox'

function ComboBoxTrigger({ children }: PropsWithChildren) {
  const { onTrigger, onKeyboardTrigger } = useContext(ComboBoxContext)

  return (
    <div
      role="combobox"
      onClick={onTrigger}
      onKeyDown={onKeyboardTrigger}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      {children}
    </div>
  )
}

export default ComboBoxTrigger
