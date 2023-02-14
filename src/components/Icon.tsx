import * as icon from 'react-icons/bi'
import PropTypes from 'prop-types'
import { genFontColor, genFontSize } from '@/lib/styleUtils'

export default function Icon(props: IconProps) {
  const color = genFontColor(props.color)
  const size = genFontSize(props.size)

  return <div className={`${size} ${color}`}>{icon[props.icon]()}</div>
}

type IconProps = {
  icon: string
  size?: string
  color?: string
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
}
