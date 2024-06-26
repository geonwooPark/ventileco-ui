import { PropsWithChildren, useMemo } from 'react'
import { useSelectBoxContext } from './SelectBoxMain'

function SelectBoxTrigger({ children }: PropsWithChildren) {
  const { id, isOpen, triggerRef, setIsOpen, onKeyboardTrigger } =
    useSelectBoxContext()

  const selectBoxTriggerStyle = useMemo(
    () => ({ width: '100%' }) as React.CSSProperties,
    [],
  )

  return (
    <button
      ref={triggerRef}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls={`${id}-select-list`}
      onKeyDown={onKeyboardTrigger}
      onClick={() => setIsOpen((prev) => !prev)}
      style={selectBoxTriggerStyle}
    >
      {children}
    </button>
  )
}

export default SelectBoxTrigger
