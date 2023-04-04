import { useState, useEffect, useContext } from 'react'
import { H6 } from './Headings'
import PropTypes from 'prop-types'
import Icon from './Icon'
import { genBgColor } from '@/lib/styleUtils'
import { AlertContext } from '@/lib/AlertContext'

export default function Alert(props: AlertProps) {
  const { setAlert } = useContext(AlertContext) as any
  const [show, setShow] = useState(true)
  const color = genBgColor(props.color)

  function handleDismiss() {
    setShow(false)
    setAlert(null)
  }

  useEffect(() => {
    if (props.autoDismiss) {
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    }
  }, [props])

  if (!show) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 z-[1000] w-full p-3">
      <div className={`rounded-md ${color} w-full px-5 py-3 text-white`}>
        <div className="flex justify-between">
          <p>{props.heading}</p>
          <div onClick={handleDismiss} className="cursor-pointer">
            <Icon icon="BiX" size="2xl" color="white" />
          </div>
        </div>
        {props.text ? <div className="flex py-3">{props.text}</div> : null}
      </div>
    </div>
  )
}

type AlertProps = {
  heading: string
  text?: string
  color: string
  autoDismiss?: boolean
}

Alert.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string,
  color: PropTypes.string.isRequired,
  autoDismiss: PropTypes.bool,
}

Alert.defaultProps = {
  autoDismiss: true,
}
