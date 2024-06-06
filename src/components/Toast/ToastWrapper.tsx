import { PropsWithChildren, useContext, useMemo } from 'react'
import { ToastContext } from './ToastProvider'

interface ToastUIProps {
  id: number
}

function ToastWrapper({ children, id }: PropsWithChildren<ToastUIProps>) {
  const { removeToast } = useContext(ToastContext)

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      removeToast(id)
    }
  }

  const toastWrapperStyle = useMemo(() => ({ cursor: 'pointer' }), [])

  return (
    <div
      role="alert"
      tabIndex={0}
      aria-atomic="true"
      onClick={() => removeToast(id)}
      onKeyDown={onKeyDown}
      style={toastWrapperStyle}
    >
      {children}
    </div>
  )
}

export default ToastWrapper
