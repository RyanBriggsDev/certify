import Input from "./Input"
import BtnPrimary from '../buttons/BtnPrimary'
import BtnOrange from '../buttons/BtnOrange'
import BtnLight from '../buttons/BtnLight'
import InlineLink from "../InlineLink"
import { useRouter } from "next/router"
import { useState } from "react"

const setInitialValues = (formFields: any) => {
    let initialfields = {};
    formFields.forEach((element: any) => {
      initialfields[element.name] = element.initialvalue;
    });
    return initialfields;
  };
  

export default function Form ({
    formClassName,
    formPadding,
    formRounded,
    formContent,
    btnStyle,
    onSubmit,
}: any) {

    // console.log(formContent);
    const {title, desc, inputs, button, redirect} = formContent[0]
    const [data, setData] = useState(setInitialValues(inputs))

    const onChangeHandler = (e: any) => setData((p) => ({ ...p, [e.target.name]: e.target.value }))
    const onSubmitHandler = () => onSubmit(data)

    return (
        <form 
            autoComplete={"off"}
            className={`
                ${formClassName ? formClassName : ''} 
                ${formPadding === false ? '' : 'p-5'}
                ${formRounded === false ? '' : 'rounded'}
                bg-[#2b2b2b] flex flex-col gap-5
                `
            }
        >
            {title || desc ?
            <div className='flex flex-col gap-1 justify-center items-center'>
                {title ? <h3 className="text-center text-2xl">{title}</h3> : <p className="w-100 bg-red-500 text-white p-2 text-center rounded inline-block">Forms require a title prop</p>}
                {desc ? <p>{desc}</p> : <></>}
            </div>
            :
            <></>
            }
            <div className="flex flex-col gap-3">
            {inputs.map((input: any, index: any ) => (
                <div key={index} className='flex flex-col gap-1'>
                    <label>{input.label}</label>
                    <Input 
                        id={index}
                        name={input.name}
                        type={input.type}
                        defaultValue={input.initialValue}
                        onChange={(e: any)=>onChangeHandler(e)}
                        placeholder={input.initialValue ? null: input.placeholder}
                        maxLength={input.maxLength}
                        minLength={input.minLength}
                        required={input.required}      
                    />
                </div>
            ))}
            </div>
            {button.btnType === 'primary' 
            ? 
            <BtnPrimary 
            btnText={button.btnText} 
            style={btnStyle}                 
            btnOnClick={(e: any) => {
                    e.preventDefault()
                    onSubmitHandler()
                }}   
            />
            : button.btnType === 'orange' ? 
            <BtnOrange 
                btnText={button.btnText} 
                btnOnClick={(e: any) => {
                    e.preventDefault()
                    onSubmitHandler()
                }}  
            /> 
            : button.btnType === 'light' ? 
            <BtnLight 
                btnText={button.btnText} 
                btnOnClick={(e: any) => {
                    e.preventDefault()
                    onSubmitHandler()
                }} 
            /> 
            : ''
        }
        {redirect 
        ? 
            <InlineLink text={redirect.text} href={redirect.link} />
        :
            <></>
        }
        </form>
    )
}

const styles = {
    form: {
        
    }
}