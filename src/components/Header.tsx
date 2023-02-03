import BtnPrimary from '@/components/buttons/BtnPrimary'
import BtnOrange from '@/components/buttons/BtnOrange'
import BtnLight from '@/components/buttons/BtnLight'
import H1 from '@/components/headings/H1'

export default function Header(props: any) {
  return (
    <div
      className={`header flex flex-col justify-between gap-4 py-5 ${
        props.className ? props.className : ''
      }`}
    >
      {props.h1Text ? (
        <H1
          className={
            props.h1ClassName
              ? props.h1ClassName
              : ''
          }
        >
          {props.h1Text}
        </H1>
      ) : (
        <p
          className={`${
            props.h1ClassName
              ? props.h1ClassName
              : ''
          } inline-block rounded bg-red-500 p-2 text-center text-white`}
        >
          Header requires a h1Text prop.
        </p>
      )}
      {props.pText ? <p>{props.pText}</p> : <></>}
      {props.btnType === 'primary' ? (
        <BtnPrimary
          btnText={props.btnText}
          btnOnClick={props.btnOnClick}
          btnClassName={props.btnClassName}
          width={props.btnWidth}
          btnFontSizeClass={
            props.btnFontSizeClass
          }
        />
      ) : props.btnType === 'orange' ? (
        <BtnOrange
          btnText={props.btnText}
          btnOnClick={props.btnOnClick}
          btnClassName={props.btnClassName}
          width={props.btnWidth}
          btnFontSizeClass={
            props.btnFontSizeClass
          }
        />
      ) : props.btnType === 'light' ? (
        <BtnLight
          btnText={props.btnText}
          btnOnClick={props.btnOnClick}
          btnClassName={props.btnClassName}
          width={props.btnWidth}
          btnFontSizeClass={
            props.btnFontSizeClass
          }
        />
      ) : (
        ''
      )}
    </div>
  )
}
