import { ReactElement } from 'react'

const gradientClasses =
  'font-newake webkit-bg-clip-text bg-gradient-to-r from-french-blue to-cyan-500 bg-clip-text text-transparent'

export function H1(props: HeadingProps) {
  return (
    <h1
      className={`${gradientClasses} ${
        props.className ? props.className : ''
      } ${
        props.textSize ? props.textSize : 'text-5xl md:text-7xl lg:text-8xl'
      }`}
    >
      {props.children}
    </h1>
  )
}

export function H2(props: HeadingProps) {
  return (
    <h2
      className={`${gradientClasses} ${
        props.className ? props.className : ''
      } ${
        props.textSize ? props.textSize : 'text-4xl md:text-6xl lg:text-7xl'
      }`}
    >
      {props.children}
    </h2>
  )
}

export function H3(props: HeadingProps) {
  return (
    <h3
      className={`font-newake ${props.color ? props.color : gradientClasses} ${
        props.className ? props.className : ''
      } ${props.textSize ? props.textSize : 'text-3xl md:text-5xl lg:text-6xl'}
      $`}
    >
      {props.children}
    </h3>
  )
}

export function H4(props: HeadingProps) {
  return (
    <h4
      className={`font-newake ${props.color ? props.color : gradientClasses} ${
        props.className ? props.className : ''
      } ${
        props.textSize ? props.textSize : 'text-2xl md:text-4xl lg:text-5xl'
      }`}
    >
      {props.children}
    </h4>
  )
}

export function H5(props: HeadingProps) {
  return (
    <h5
      className={`${props.color ? props.color : gradientClasses} ${
        props.className ? props.className : ''
      } ${props.textSize ? props.textSize : 'text-xl md:text-3xl lg:text-4xl'} 
      font-newake tracking-wide
`}
    >
      {props.children}
    </h5>
  )
}

export function H6(props: HeadingProps) {
  return (
    <h6
      className={`${props.color ? props.color : gradientClasses} ${
        props.className ? props.className : ''
      } ${props.textSize ? props.textSize : ''} 
      font-newake tracking-wide
`}
    >
      {props.children}
    </h6>
  )
}

type HeadingProps = {
  className?: string
  textSize?: string
  color?: string
  children: string
}
