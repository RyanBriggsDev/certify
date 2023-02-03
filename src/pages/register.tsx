import { useState, useEffect } from 'react'
import Head from 'next/head'
import Form from '@/components/form/Form'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  const [error, setError] = useState(null)

  const onSubmitHandler = async (form: any) => {
    const email = form.email
    const password = form.password
    const password2 = form.password2
    if (password !== password2)
      return alert('Passwords do not match')
  }

  return (
    <div>
      <Form
        formContent={formContent}
        onSubmit={onSubmitHandler}
        btnStyle={{ width: '100%' }}
      />
    </div>
  )
}

const formContent = [
  {
    title: 'Welcome',
    desc: 'Register to Start Using Certify',
    inputs: [
      {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'r@certify.com',
        required: true,
      },
      {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'password',
        required: true,
      },
      {
        label: 'Password',
        type: 'password',
        name: 'password2',
        placeholder: 'confirm password',
        required: true,
      },
    ],
    button: {
      btnText: 'Register',
      btnType: 'primary',
    },
    redirect: {
      text: 'Already have an account? Login',
      link: '/signin',
    },
  },
]
