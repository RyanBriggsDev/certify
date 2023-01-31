import { useState, useEffect } from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { loginSchema } from "@/lib/schema";
import { ZodError } from "zod";
import Form from "@/components/form/Form";

export default function Signin() {
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
  // async function onSubmitHandler(form: any) {
    e.preventDefault()
    try {
      const email = e.target[0].value;
      const password = e.target[1].value;
      // const email = form.email;
      // const password = form.password
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
      if (result.ok) {
        router.push("/app");
      } else {
        setError(result);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setError({
          field: error.issues[0].path[0],
          message: error.issues[0].message,
        });
      }
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);


  return (
    <>
      <Head>
        <title>Signin to Certify</title>
        <meta name="description" content="This is the login page for the Certify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-full">
        <div className="flex content-center justify-around">

          {/* <Form 
            formContent={formContent}
            btnStyle={{width: '100%'}}
            onSubmit={onSubmitHandler}
          /> */}

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label>
              Email
              <input name="email" type="text" autoComplete="off" />
            </label>
            <label>
              Password
              <input name="password" type="password" />
            </label>
            <button type="submit">Sign in</button>
          </form>
        </div>
        {error ? <div>Something's gone wrong, try again</div> : null}
      </main>
    </>
  );
}

const formContent = [
  {
    title: 'Sign In to Certify',
    desc: 'Log in to get started',
    inputs: [
      {
        label: 'Sign In',
        type: 'text',
        name: 'signIn',
        placeholder: 'r@ryanbriggs.dev',
        required: true,
      },
      {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'password',
        required: true,
      }
    ],
    button: {
        btnText: 'Submit',
        btnType: 'primary',
    },
    redirect: {
      text: 'No Account? Register.',
      link: '/register'
    }
  }
]