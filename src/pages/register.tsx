import { useState } from "react";
import Head from "next/head";
import Form from "@/components/form/Form";
import { useRouter } from "next/router";
import register from "../assets/img/register.jpg";
import Nav from "@/components/ContentAlignment/Frame/Nav";
import Icon from "@/components/Icon";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);

  const onSubmitHandler = async (form: FormData) => {
    console.log(form);
    setError(true);
  };

  return (
    <>
      <Head>
        <title>Certify | Register for Access</title>
        <meta name="description" content="Register & create your account to start using Certify today." />
      </Head>
      <Nav />
      <div className="w-100 mx-2 flex flex-grow flex-col items-center justify-center md:mx-0">
        <div className="mx-5 flex w-full flex-col justify-center md:w-2/3">
          <div className="flex">
            <div className="hidden lg:block lg:w-1/2">
              <img src={register.src} alt="" className="h-full object-cover brightness-50" />
            </div>
            <div className="w-full lg:w-1/2">
              <Form
                formContent={formContent}
                onSubmit={onSubmitHandler}
                btnStyle={{ width: "100%" }}
                formWidth="w-full"
              />
            </div>
          </div>
          {error ? <RegisterAlert dismiss={() => setError(false)} /> : null}
        </div>
      </div>
    </>
  );
}

function RegisterAlert(props: AlertProps) {
  return (
    <div className="my-2 flex justify-between rounded-md bg-pallete-orange px-5 py-3 text-white">
      <p>
        <span className="font-bold">Alert : </span>Something went wrong registering your account. Please try
        again.
      </p>
      <div onClick={props.dismiss} className="mx-2 flex cursor-pointer items-center">
        <Icon icon="BiX" size="2xl" color="white" />
      </div>
    </div>
  );
}

type FormData = {
  email: string;
  password: string;
  password2: string;
};

type AlertProps = {
  dismiss: () => void;
};

const formContent = [
  {
    title: "Welcome",
    desc: "Register to Start Using Certify",
    inputs: [
      {
        label: "Email",
        type: "email",
        name: "email",
        placeholder: "Email",
        required: true,
      },
      {
        label: "Password",
        type: "password",
        name: "password",
        placeholder: "Password",
        required: true,
      },
      {
        label: "Password",
        type: "password",
        name: "password2",
        placeholder: "Confirm password",
        required: true,
      },
    ],
    button: {
      text: "Register",
      type: "primary",
    },
    redirect: {
      text: "Already have an account? Signin",
      link: "/signin",
    },
  },
];
