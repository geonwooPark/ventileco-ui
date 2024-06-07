import React, {
  KeyboardEventHandler,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import ComboBoxTitle from './ComboBoxTitle'
import ComboBoxTrigger from './ComboBoxTrigger'
import ComboBoxInput from './ComboBoxInput'
import ComboBoxItem from './ComboBoxItem'
import ComboBoxClearButton from './ComboBoxClearButton'
import ComboBoxList from './ComboBoxList'
import { Option, OptionList } from '../../types'
import { escapeRegExp } from '../../utils/escapeRegExp'

export type ComboBoxProps = {
  value: string | undefined
  setValue: (value: string | undefined) => void
  list: OptionList
}

type ComboBoxContextState = {
  id: string
  value: string | undefined
  list: OptionList
  isOpen: boolean
  keyword: string
  triggerRef: React.RefObject<HTMLDivElement> | null
  listRef: React.RefObject<HTMLUListElement> | null
  inputRef: React.RefObject<HTMLInputElement> | null
  focusedItem: string | undefined
  optionList: OptionList
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTrigger: () => void
  onClear: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSelect: ({
    value,
    label,
    disabled,
  }: {
    value: string
    label: string
    disabled?: boolean
  }) => void
  onKeyboardTrigger: KeyboardEventHandler<HTMLDivElement>
}

export const ComboBoxContext = createContext<ComboBoxContextState>({
  id: '',
  value: '',
  list: [],
  isOpen: false,
  keyword: '',
  triggerRef: null,
  listRef: null,
  inputRef: null,
  focusedItem: undefined,
  optionList: [],
  onTextChange: () => null,
  onClear: () => null,
  onTrigger: () => null,
  onSelect: () => null,
  onKeyboardTrigger: () => null,
})

function ComboBox({ children, ...props }: PropsWithChildren<ComboBoxProps>) {
  const { value, setValue, list } = props
  const id = useId()

  const [isOpen, setIsOpen] = useState(false)
  const [keyword, setKeyword] = useState<string>('')
  const [focusedItem, setFocusedItem] = useState<string>()
  const [optionList, setOptionList] = useState(list)

  const containerRef = useRef<HTMLFieldSetElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const focusedIndex = useMemo(
    () => optionList.findIndex((r) => r.value === focusedItem),
    [optionList, focusedItem],
  )

  const onTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  const onTrigger = useCallback(() => {
    setIsOpen((prev) => {
      if (!inputRef?.current) return false

      if (prev) {
        inputRef.current.blur()
        return false
      } else {
        inputRef.current.focus()
        return true
      }
    })
  }, [])

  const onClear = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation()

      setIsOpen(false)
      setValue(undefined)
      setKeyword('')
      setFocusedItem(undefined)
    },
    [setValue],
  )

  const onSelect = useCallback(
    ({ value, label, disabled }: Option) => {
      if (disabled) return

      setIsOpen(false)
      setValue(value)
      setKeyword(label)
      setFocusedItem(value)
    },
    [setValue],
  )

  const onKeyboardTrigger: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.nativeEvent.isComposing) return

      if (e.key !== 'Tab') {
        setIsOpen(true)
      }

      const nodesList = listRef?.current?.childNodes
      if (nodesList) {
        const element = nodesList[focusedIndex] as HTMLElement

        if (e.key === 'Enter') {
          e.preventDefault()
          onSelect({
            value: element.dataset.value as string,
            label: element.dataset.label as string,
          })
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault()

          if (!element.nextSibling) return

          let nextChildNode = element.nextSibling as HTMLElement | null
          while (nextChildNode && nextChildNode.dataset.disabled === 'true') {
            nextChildNode = nextChildNode.nextSibling as HTMLElement | null
          }
          if (nextChildNode) {
            setFocusedItem(nextChildNode.dataset.value)
          }
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault()

          if (!element.previousSibling) return

          let prevChildNode = element.previousSibling as HTMLElement | null
          while (prevChildNode && prevChildNode.dataset.disabled === 'true') {
            prevChildNode = prevChildNode.previousSibling as HTMLElement | null
          }
          if (prevChildNode) {
            setFocusedItem(prevChildNode.dataset.value)
          }
        }
      }
    },
    [focusedIndex, onSelect],
  )

  useEffect(() => {
    if (!isOpen) return

    setOptionList(list)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    if (!listRef.current) return
    const nodesList = listRef.current.childNodes

    for (let i = 0; i < list?.length; i++) {
      let node: ChildNode
      if (focusedIndex === -1) {
        node = nodesList[i]
      } else {
        node = nodesList[focusedIndex]
      }

      if (node instanceof HTMLElement) {
        if (node.dataset.disabled !== 'true') {
          setFocusedItem(node.dataset.value)
          break
        }
      }
    }
  }, [isOpen, focusedIndex, optionList])

  useEffect(() => {
    if (!isOpen) return
    if (focusedIndex === -1) return

    const childNode = listRef?.current?.childNodes[focusedIndex] as HTMLElement
    if (childNode instanceof HTMLElement) {
      childNode.scrollIntoView({ block: 'nearest' })
    }
  }, [isOpen, focusedIndex])

  useEffect(() => {
    if (!isOpen) return

    const onOutsideClick = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return
      setKeyword(value || '')
      setIsOpen(false)
    }

    document.addEventListener('click', onOutsideClick)
    return () => document.removeEventListener('click', onOutsideClick)
  }, [isOpen, value])

  useEffect(() => {
    const escapedKeyword = escapeRegExp(keyword)
    const regex = new RegExp(escapedKeyword, 'i')
    const getFilteredData = () => {
      const filteredData = list.filter((item) => regex.test(item.label))
      setOptionList(filteredData)
    }
    getFilteredData()
  }, [keyword])

  const providerValue = useMemo(
    () => ({
      id,
      value,
      list,
      isOpen,
      keyword,
      triggerRef,
      listRef,
      inputRef,
      focusedItem,
      optionList,
      onTextChange,
      onTrigger,
      onClear,
      onSelect,
      onKeyboardTrigger,
    }),
    [
      id,
      value,
      list,
      isOpen,
      keyword,
      triggerRef,
      listRef,
      inputRef,
      focusedItem,
      optionList,
      onTextChange,
      onTrigger,
      onClear,
      onSelect,
      onKeyboardTrigger,
    ],
  )

  const comboBoxStyle = useMemo(
    () => ({ position: 'relative' }) as React.CSSProperties,
    [],
  )

  return (
    <ComboBoxContext.Provider value={providerValue}>
      <fieldset ref={containerRef} style={comboBoxStyle}>
        {children}
      </fieldset>
    </ComboBoxContext.Provider>
  )
}

ComboBox.Title = ComboBoxTitle
ComboBox.Trigger = ComboBoxTrigger
ComboBox.Input = ComboBoxInput
ComboBox.ClearButton = ComboBoxClearButton
ComboBox.List = ComboBoxList
ComboBox.Item = ComboBoxItem

export default ComboBox
