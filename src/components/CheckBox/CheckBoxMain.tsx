import {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useId,
  useMemo,
} from 'react'
import CheckBoxList from './CheckBoxList'
import CheckBoxItem from './CheckBoxItem'
import { _createContext } from '../../utils/_createContext'

interface CheckBoxMainProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  value: any[]
  onChange: (value: any) => void
}

type CheckBoxContextState = {
  id: string
  value: any[]
  onClick: (selectedItem: any) => void
}

export const [useCheckBoxContext, CheckBoxProvider] =
  _createContext<CheckBoxContextState>()

const CheckBoxMain = forwardRef<HTMLDivElement, CheckBoxMainProps>(
  function CheckBoxMain({ children, value, onChange, ...otherProps }, ref) {
    const id = useId()

    const onClick = useCallback(
      (selectedItem: any) => {
        if (value.includes(selectedItem)) {
          const updatedValue = value.filter((r) => r !== selectedItem)
          onChange(updatedValue)
        } else {
          onChange([...value, selectedItem])
        }
      },
      [value],
    )

    const providerValue = useMemo(() => ({ id, value, onClick }), [id, value])

    return (
      <CheckBoxProvider value={providerValue}>
        <div role="group" ref={ref} {...otherProps}>
          {children}
        </div>
      </CheckBoxProvider>
    )
  },
)

const CheckBox = Object.assign(CheckBoxMain, {
  List: CheckBoxList,
  Item: CheckBoxItem,
})

export default CheckBox
