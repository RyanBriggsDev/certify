import { useContext, useState } from 'react'
import Frame from '@/components/ContentAlignment/Frame/Frame'
import Form from '@/components/form/Form'
import { H1 } from '@/components/Headings'
import Loading from '@/components/Loading'
import { useRouter } from 'next/router'
import { AlertContext } from '@/lib/AlertContext'
import { ZodError } from 'zod'

export default function CreateCompany() {
  return (
    <Frame>
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <H1>Create A New Company</H1>
        <div className="flex w-full justify-around gap-2">
          <CreateCompanyForm />
        </div>
      </div>
    </Frame>
  )
}

function CreateCompanyForm() {
  const { setAlert } = useContext(AlertContext) as any
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(form: any) {
    if (!form.name || !form.address)
      return setAlert('Please fill out required form fields.')
    try {
      setLoading(true)
      const res = await fetch('/api/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (json.success) {
        router.push('/companies')
      } else
        setAlert('Error: Uh oh something went wrong. Please reload & try again')
    } catch (error) {
      setLoading(false)
      if (error instanceof ZodError) {
        setAlert(error.issues[0].message)
      } else {
        setAlert('Error: Uh oh something went wrong. Please reload & try again')
      }
    }
  }
  if (loading) return <Loading />
  return (
    <Form
      formContent={formContent}
      formClassName="min-w-[66%] text-left"
      onSubmit={handleSubmit}
    />
  )
}

const formContent = [
  {
    title: 'Create a New Company',
    desc: 'Fill out the form below to make a new company.',
    inputs: [
      {
        label: 'Company Name*',
        type: 'text',
        name: 'name',
        placeholder: 'Rubber Ducks Ltd',
      },
      {
        label: 'Address*',
        type: 'text',
        name: 'address',
        placeholder: '53 Madeup Road, Cheshire',
      },
      {
        label: 'Telephone Number',
        type: 'tel',
        name: 'telephoneNumber',
        placeholder: '01235 654 980',
      },
      {
        label: 'Contact Name',
        type: 'text',
        name: 'contactName',
        placeholder: 'Jim Bean',
      },
      {
        label: 'Contact Email',
        type: 'email',
        name: 'contactEmail',
        placeholder: 'Jim.Bean@rubberducks.com',
      },
    ],
    button: {
      text: 'Create',
      type: 'primary',
    },
  },
]
