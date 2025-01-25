import { ForwardedRef, PropsWithChildren, forwardRef, useMemo } from 'react'
import { _createContext } from '../../utils/_createContext'
import { useCalendar } from './hooks/useCalendar'
import CalendarDate from './CalendarDate'
import CalendarDayOfTheWeek from './CalendarDayOfTheWeek'
import CalendarNextMonth from './CalendarNextMonth'
import CalendarNextYear from './CalendarNextYear'
import CalendarPrevMonth from './CalendarPrevMonth'
import CalendarPrevYear from './CalendarPrevYear'
import CalendarSelectedMonth from './CalendarSelectedMonth'

interface CalendarMainProps {
  selectedDate?: string
  onDateChange?: (date: string) => void
  monthFormat?: string
  className?: string
}

type CalendarState = {
  selectedMonth: string
  days: Date[]
  onPrevMonthClick: () => void
  onNextMonthClick: () => void
  onPrevYearClick: () => void
  onNextYearClick: () => void
}

export const [useCalendarContext, CalendarProvider] =
  _createContext<CalendarState>()

function CalendarMain(
  {
    children,
    monthFormat = 'MM YYYY',
    className,
  }: PropsWithChildren<CalendarMainProps>,
  forwardRef: ForwardedRef<HTMLDivElement>,
) {
  const {
    selectedMonth,
    days,
    onPrevMonthClick,
    onNextMonthClick,
    onPrevYearClick,
    onNextYearClick,
  } = useCalendar(monthFormat)

  const providerValue = useMemo(
    () => ({
      selectedMonth,
      days,
      onPrevMonthClick,
      onNextMonthClick,
      onPrevYearClick,
      onNextYearClick,
    }),
    [selectedMonth, days],
  )

  return (
    <CalendarProvider value={providerValue}>
      <div ref={forwardRef} className={className}>
        {children}
      </div>
    </CalendarProvider>
  )
}

const Calendar = Object.assign(forwardRef(CalendarMain), {
  Date: CalendarDate,
  DayOfTheWeek: CalendarDayOfTheWeek,
  NextMonth: CalendarNextMonth,
  NextYear: CalendarNextYear,
  PrevMonth: CalendarPrevMonth,
  PrevYear: CalendarPrevYear,
  SelectedMonth: CalendarSelectedMonth,
})

export default Calendar
