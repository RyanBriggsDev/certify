import { useContext, useState } from 'react'
import Frame from '@/components/ContentAlignment/Frame/Frame'
import Form from '@/components/form/Form'
import { H1, H5 } from '@/components/Headings'
import Loading from '@/components/Loading'
import { createCandidateOnClient } from '@/lib/schema'
import { ZodError } from 'zod'
import { AlertContext } from '@/lib/AlertContext'
import { useRouter } from 'next/router'

export default function CreateCandidate() {
  return (
    <Frame>
      <H1>Create Candidate</H1>
      <div className="flex w-full justify-around gap-2">
        <CreateCandidateForm />
        <div className="m-2 flex w-1/2 flex-col bg-dark-gray p-5">
          <H5>Info</H5>
          <p className="py-5">
            Candidates that are created here can subsequently be added to any
            courses.
          </p>
          <p className="py-5">
            Although you can create candidates without contact details, it is
            not recommended. Without contact details you will not be able to
            issue a certificate or contact.
          </p>
        </div>
      </div>
    </Frame>
  )
}

// Had to break Form out into function as context is not available until 'Frame' component is rendered
function CreateCandidateForm() {
  const { setAlert } = useContext(AlertContext) as any
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(form: unknown) {
    setLoading(true)
    try {
      const checked = await createCandidateOnClient.parse(form)
      const res = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checked),
      })
      const response = await res.json()
      if (response.success) {
        router.push('/candidates')
      } else {
        setAlert('Error: Uh oh something went wrong. Please reload & try again')
      }
    } catch (error: any) {
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
    <div className="flex w-1/2 justify-center">
      <Form
        formContent={formContent}
        btnStyle={{ width: '100%' }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

const formContent = [
  {
    title: 'Create new candidate',
    inputs: [
      {
        label: 'Name',
        type: 'text',
        name: 'name',
        placeholder: 'John Doe',
        required: true,
      },
      {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'johndoe@gmail.com',
        required: true,
      },
      {
        label: 'Address',
        type: 'text',
        name: 'address',
        placeholder: '12 Placeholder road, Placeholder, Place',
      },
      {
        label: 'Telephone Number',
        type: 'text',
        name: 'telephoneNumber',
      },
      {
        label: 'Company',
        type: 'text',
        name: 'company',
      },
    ],
    button: {
      text: 'Create',
      type: 'primary',
    },
  },
]
