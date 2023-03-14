import { useState } from 'react'
import Alert from '@/components/Alert'
import { AlertContext } from '@/lib/AlertContext'

export default function Content({ children }) {
  const [alert, setAlert] = useState('')
  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
      }}
    >
      {alert ? <Alert color="warning" heading={alert} /> : null}
      <div
        className="flex h-full flex-col justify-center gap-3 py-6"
        id="content"
      >
        {children}
      </div>
    </AlertContext.Provider>
  )
}
