import { useContext, useState } from 'react'
import Frame from '@/components/ContentAlignment/Frame/Frame'
import Form from '@/components/form/Form'
import { H1 } from '@/components/Headings'
import Loading from '@/components/Loading'
import { useRouter } from 'next/router'
import { AlertContext } from '@/lib/AlertContext'
import { ZodError } from 'zod'

export default function CreateCourse() {
  return (
    <Frame>
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <H1>Create Course</H1>
        <div className="flex w-full justify-around gap-2">
          <CreateCourseForm />
        </div>
      </div>
    </Frame>
  )
}

function CreateCourseForm() {
  const { setAlert } = useContext(AlertContext) as any
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(form: any) {
    if (!form.name || !form.type)
      return setAlert('Please fill out required form fields.')
    try {
      setLoading(true)
      const res = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (json.success) {
        router.push('/courses')
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
    title: 'Create a New Course',
    desc: 'Fill out the form below to make a new course.',
    inputs: [
      {
        label: 'Course Name*',
        type: 'text',
        name: 'name',
        placeholder: 'Web Development for Beginners',
        required: true,
      },
      {
        label: 'Type*',
        type: 'text',
        name: 'type',
        placeholder: 'Beginner',
        required: true,
      },
      {
        label: 'Description',
        type: 'text',
        name: 'description',
        placeholder:
          'Dive into the world of web development with this complete beginners course.',
      },
      {
        label: 'Location',
        type: 'text',
        name: 'location',
        placeholder: 'Online',
      },
      {
        label: 'Start Date',
        type: 'date',
        name: 'startDate',
      },
      {
        label: 'End Date',
        type: 'date',
        name: 'endDate',
      },
    ],
    button: {
      text: 'Create',
      type: 'primary',
    },
  },
]
