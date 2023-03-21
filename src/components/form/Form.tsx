import Input from "./Input";
import Button from "../Button";
import InlineLink from "../InlineLink";
import { useState } from "react";

const setInitialValues = (formFields: any) => {
  let initialfields = {};
  formFields.forEach((element: any) => {
    initialfields[element.name] = element.initialValue;
  });
  return initialfields;
};

export default function Form({
  formContent,
  formClassName,
  formPadding,
  formRounded,
  formWidth,
  formBg,
  onSubmit,
}: any) {
  const { title, desc, inputs, button, redirect } = formContent[0];
  const [data, setData] = useState(setInitialValues(inputs));

  const onChangeHandler = (e: any) =>
    setData((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));

  const onSubmitHandler = () => onSubmit(data);

  return (
    <form
      autoComplete={"off"}
      className={`
                ${formClassName ? formClassName : ""} 
                ${formPadding === false ? "" : "p-7"}
                ${formRounded === false ? "" : "rounded"}
                ${formWidth ? formWidth : "w-fit"}
                ${formBg ? formBg : "bg-white shadow-lg dark:bg-dark-gray"}
                flex flex-col gap-5 
                `}
    >
      {title || desc ? (
        <div className="flex flex-col items-center justify-center gap-1">
          {title ? (
            <h3 className="text-center text-2xl">{title}</h3>
          ) : (
            <p className="w-100 inline-block rounded bg-red-500 p-2 text-center text-white">
              Forms require a title prop
            </p>
          )}
          {desc ? <p>{desc}</p> : <></>}
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-3">
        {inputs.map((input: any, index: any) => (
          <div key={index} className="flex flex-col gap-1">
            <Input
              labelText={input.label}
              id={index}
              name={input.name}
              type={input.type}
              defaultValue={input.initialValue}
              onChange={(e: any) => onChangeHandler(e)}
              placeholder={input.initialValue ? null : input.placeholder}
              maxLength={input.maxLength}
              minLength={input.minLength}
              required={input.required}
            />
          </div>
        ))}
      </div>

      <Button
        type={button.type}
        onClick={(e: any) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        {button.text}
      </Button>

      {redirect ? <InlineLink text={redirect.text} href={redirect.link} /> : <></>}
    </form>
  );
}
