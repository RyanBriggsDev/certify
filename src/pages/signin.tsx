import { useState, useEffect } from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { loginSchema } from "@/lib/schema";
import { ZodError } from "zod";
import Form from "@/components/form/Form";
import Icon from "@/components/Icon";
import signin from "../assets/img/signin.jpg";
import Nav from "@/components/ContentAlignment/Frame/Nav";
import Loading from "@/components/Loading";

export default function Signin() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmitHandler(form: any) {
    const email = form.email;
    const password = form.password;
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      setError("Email & password are required to login.");
      return;
    }
    try {
      // Check credentials are valid
      const loginDetails = await loginSchema.parse({
        email,
        password,
      });
      // Pass credentials to NextAuth & login
      const result = await signIn("credentials", {
        email: loginDetails.email,
        password: loginDetails.password,
        redirect: false,
      });
      if (result?.ok) {
        router.push("/dashboard");
      } else {
        setLoading(false);
        setError("Log in error");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
        return;
      }
      setError("Something went wrong. Please try to sign in again.");
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return (
      <>
        <Head>
          <title>Certify | Signin to Certify</title>
          <meta name="description" content="This is the login page for the Certify" />
        </Head>
        <Nav />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Certify | Signin to Certify</title>
        <meta name="description" content="This is the login page for the Certify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="w-100 mx-2 flex flex-grow flex-col items-center justify-center md:mx-0">
        <div className="mx-5 flex w-full flex-col justify-center md:w-2/3">
          {error ? <LoginAlert dismiss={() => setError("")} error={error} /> : null}
          <div className="flex">
            <div className="w-full lg:w-1/2">
              <Form
                formContent={formContent}
                onSubmit={onSubmitHandler}
                btnStyle={{ width: "100%" }}
                formWidth="w-full"
              />
            </div>
            <div className="hidden max-h-96 lg:block lg:w-1/2">
              <img
                src={signin.src}
                alt="Warehouse door representing the way to sign into Certify"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LoginAlert(props: AlertProps) {
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

type AlertProps = {
  dismiss: () => void;
  error: string;
};

const formContent = [
  {
    title: "Sign In to Certify",
    desc: "Log in to get started",
    inputs: [
      {
        label: "Sign In",
        type: "text",
        name: "email",
        placeholder: "Email address",
        required: true,
      },
      {
        label: "Password",
        type: "password",
        name: "password",
        placeholder: "Password",
        required: true,
      },
    ],
    button: {
      text: "Submit",
      type: "primary",
    },
    redirect: {
      text: "No Account? Register.",
      link: "/register",
    },
  },
];
