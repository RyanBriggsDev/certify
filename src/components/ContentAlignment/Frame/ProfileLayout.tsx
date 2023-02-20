import PropTypes from 'prop-types'

export default function ProfileLayout({
  rows,
  cols,
  className,
  children,
}: ProfileLayoutProps) {
  return (
    <div
      id="profile-layout"
      className={`
        ${rows ? rows : ''} 
        ${cols ? cols : 'grid-cols-1'} 
        ${className ? className : ''}
        grid gap-3 py-6`}
    >
      {children}
    </div>
  )
}

type ProfileLayoutProps = {
  rows?: string
  cols?: string
  className?: string
  children: React.ReactNode
}

ProfileLayout.propTypes = {
  rows: PropTypes.string,
  cols: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
}
