import React, {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ToolTipTrigger from './ToolTipTrigger'
import ToolTipContent from './ToolTipContent'
import { ToolTipDirection } from '../../types'
import { _createContext } from '../../utils/_createContext'

export interface ToolTipProps {
  /** 툴팁이 생성되는 방향을 결정합니다. */
  direction: ToolTipDirection
  /** 툴팁이 나타나기까지의 타임을 조절합니다. */
  enterDelay?: number
  /** 툴팁이 사라지기까지의 타임을 조절합니다. */
  leaveDelay?: number
  /** 툴팁의 사용 여부를 결정합니다. */
  disabled?: boolean
  /** 	툴팁과 컨텐츠 사이의 간격을 조절합니다. */
  gap?: number
}

type ToolTipContextState = {
  isOpen: boolean
  disabled?: boolean
  direction: ToolTipDirection
  triggerRef: React.RefObject<HTMLDivElement> | null
  tooltipRef: React.RefObject<HTMLDivElement> | null
  leaveTimer: React.MutableRefObject<number | NodeJS.Timeout | undefined>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const [useToolTipContext, ToolTipProvider] =
  _createContext<ToolTipContextState>()

function ToolTipMain(
  {
    children,
    direction,
    enterDelay,
    leaveDelay,
    disabled,
    gap = 16,
  }: PropsWithChildren<ToolTipProps>,
  forwardRef: ForwardedRef<HTMLDivElement>,
) {
  const [isOpen, setIsOpen] = useState(false)

  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const enterTimer = useRef<number | NodeJS.Timeout | undefined>(undefined)
  const leaveTimer = useRef<number | NodeJS.Timeout | undefined>(undefined)

  const onMouseOver = () => {
    clearTimeout(leaveTimer.current)

    if (enterDelay) {
      enterTimer.current = setTimeout(() => setIsOpen(true), enterDelay)
    } else {
      setIsOpen(true)
    }
  }

  const onMouseOut = () => {
    clearTimeout(enterTimer.current)

    if (leaveDelay) {
      leaveTimer.current = setTimeout(() => setIsOpen(false), leaveDelay)
    } else {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    if (disabled) return

    const triggerNode = triggerRef.current as HTMLElement
    const tooltipNode = tooltipRef.current as HTMLElement
    const contentNode = tooltipNode.childNodes[0].childNodes[0] as HTMLElement
    const triangleNode = tooltipNode.childNodes[1] as HTMLElement

    const { left, right, top, bottom, width, height } =
      triggerNode.getBoundingClientRect()
    const { width: tooltipWidth, height: tooltipHeight } =
      tooltipNode.getBoundingClientRect()
    const position: Record<string, Record<string, string>> = {
      topLeft: {
        left: `${left}px`,
        top: `${top - tooltipHeight - gap}px`,
      },
      top: {
        left: `${left + width / 2 - tooltipWidth / 2}px`,
        top: `${top - tooltipHeight - gap}px`,
      },
      topRight: {
        left: `${right - tooltipWidth}px`,
        top: `${top - tooltipHeight - gap}px`,
      },
      bottomLeft: {
        left: `${left}px`,
        top: `${bottom + gap}px`,
      },
      bottom: {
        left: `${left + width / 2 - tooltipWidth / 2}px`,
        top: `${bottom + gap}px`,
      },
      bottomRight: {
        left: `${right - tooltipWidth}px`,
        top: `${bottom + gap}px`,
      },
      leftTop: {
        left: `${left - tooltipWidth - gap}px`,
        top: `${top}px`,
      },
      left: {
        left: `${left - tooltipWidth - gap}px`,
        top: `${top + height / 2 - tooltipHeight / 2}px`,
      },
      leftBottom: {
        left: `${left - tooltipWidth - gap}px`,
        top: `${bottom - tooltipHeight}px`,
      },
      rightTop: {
        left: `${right + gap}px`,
        top: `${top}px`,
      },
      right: {
        left: `${right + gap}px`,
        top: `${top + height / 2 - tooltipHeight / 2}px`,
      },
      rightBottom: {
        left: `${right + gap}px`,
        top: `${bottom - tooltipHeight}px`,
      },
    }

    const contentBackgroundColor =
      contentNode instanceof HTMLElement
        ? window.getComputedStyle(contentNode).backgroundColor
        : ''

    Object.assign(tooltipNode.style, position[direction])
    Object.assign(triangleNode.style, {
      backgroundColor: contentBackgroundColor,
    })
  }, [isOpen])

  const providerValue = useMemo(
    () => ({
      isOpen,
      disabled,
      direction,
      tooltipRef,
      triggerRef,
      leaveTimer,
      setIsOpen,
    }),
    [isOpen, disabled, direction, tooltipRef, triggerRef, leaveTimer],
  )

  return (
    <ToolTipProvider value={providerValue}>
      <div
        ref={forwardRef}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onFocus={onMouseOver}
        onBlur={onMouseOut}
      >
        {children}
      </div>
    </ToolTipProvider>
  )
}

const ToolTip = Object.assign(forwardRef(ToolTipMain), {
  Trigger: ToolTipTrigger,
  Content: ToolTipContent,
})

export default ToolTip
