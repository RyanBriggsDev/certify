import Container from './ContentAlignment/Container'

export default function Hero({
  children,
  className,
  containerClassName,
  bg,
}: any) {
  return (
    <div
      className={`hero flex items-center justify-center
      ${className ? className : ''}
      ${bg ? bg : ''}
      `}
    >
      <Container className={`${containerClassName ? containerClassName : ''}`}>
        {children}
      </Container>
    </div>
  )
}
