import { useState, useEffect } from "react";
import Head from "next/head";
import Form from "@/components/form/Form";
import { useRouter } from "next/router";
import register from "../assets/img/register.jpg";
import Nav from "@/components/ContentAlignment/Frame/Nav";
import Icon from "@/components/Icon";
import { createAdmin } from "@/lib/schema";
import { ZodError } from "zod";
import Loading from "@/components/Loading";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  const onSubmitHandler = async (form: FormData) => {
    setLoading(true);
    if (form.password !== form.password2) {
      setError("Please ensure password fields match");
      return;
    }
    try {
      const admin = await createAdmin.parse({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      const result = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(admin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result?.ok) {
        router.push("/signin");
      } else {
        console.log(result);
        setError("Error when creating account. Please try again");
        setLoading(false);
        return;
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
        return;
      }
      setError("Something went wrong");
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Certify | Register for Access</title>
          <meta name="description" content="Register & create your account to start using Certify today." />
        </Head>
        <Nav />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Certify | Register for Access</title>
        <meta name="description" content="Register & create your account to start using Certify today." />
      </Head>
      <Nav />
      <div className="w-100 mx-2 flex flex-grow flex-col items-center justify-center md:mx-0">
        <div className="mx-5 flex w-full flex-col justify-center md:w-2/3">
          {error ? <RegisterAlert dismiss={() => setError("")} error={error} /> : null}
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
        </div>
      </div>
    </>
  );
}

function RegisterAlert(props: AlertProps) {
  return (
    <div className="z-[1000] my-2 flex justify-between rounded-md bg-pallete-orange px-5 py-3 text-white">
      <p>
        <span className="font-bold">Alert : </span>
        {props.error}
      </p>
      <div onClick={props.dismiss} className="mx-2 flex cursor-pointer items-center">
        <Icon icon="BiX" size="2xl" color="white" />
      </div>
    </div>
  );
}

type FormData = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

type AlertProps = {
  dismiss: () => void;
  error: string;
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
        label: "Name",
        type: "text",
        name: "name",
        placeholder: "Name",
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
