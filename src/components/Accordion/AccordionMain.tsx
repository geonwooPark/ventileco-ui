import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react'
import AccordionContent from './AccordionContent'
import AccordionTrigger from './AccordionTrigger'
import AccordionItem from './AccordionItem'
import { _createContext } from '../../utils/_createContext'

interface AccordionProps {
  className?: string
}

type AccordionContextState = {
  id: string
  activeItems: Set<number>
  onClick: (selectedTab: number) => void
  onFocus: (selectedTab: number) => void
  onBlur: (selectedTab: number) => void
}

export const [useAccordionContext, AccordionProvider] =
  _createContext<AccordionContextState>()

function AccordionMain(
  { children, className }: PropsWithChildren<AccordionProps>,
  forwardRef: ForwardedRef<HTMLDivElement>,
) {
  const id = useId()

  const [activeItems, setActiveItems] = useState<Set<number>>(new Set())

  const onClick = useCallback((selectedItem: number) => {
    setActiveItems((prev) => {
      const newItem = new Set(prev)
      if (prev.has(selectedItem)) {
        newItem.delete(selectedItem)
      } else {
        newItem.add(selectedItem)
      }

      return newItem
    })
  }, [])

  const onFocus = useCallback((selectedItem: number) => {
    setActiveItems((prev) => {
      const newItem = new Set(prev)
      if (!prev.has(selectedItem)) {
        newItem.add(selectedItem)
      }

      return newItem
    })
  }, [])

  const onBlur = useCallback((selectedItem: number) => {
    setActiveItems((prev) => {
      const newItem = new Set(prev)
      if (prev.has(selectedItem)) {
        newItem.delete(selectedItem)
      }
      return newItem
    })
  }, [])

  const providerValue = useMemo(
    () => ({ id, activeItems, onClick, onFocus, onBlur }),
    [id, activeItems],
  )

  return (
    <AccordionProvider value={providerValue}>
      <div role="tablist" ref={forwardRef} className={className}>
        {children}
      </div>
    </AccordionProvider>
  )
}

const Accordion = Object.assign(forwardRef(AccordionMain), {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})

export default Accordion
