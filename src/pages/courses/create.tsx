import { useContext, useState } from 'react'
import Frame from '@/components/ContentAlignment/Frame/Frame'
import Form from '@/components/form/Form'
import H1 from '@/components/headings/H1'
import Loading from '@/components/Loading'
import { useRouter } from 'next/router'

export default function CreateCourse() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleSubmit = async (form: any) => {
    if (!form.name || !form.type)
      return alert('Please fill out all required fields.')
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
      } else console.log('error')
    } catch (error) {
      alert('error')
      setLoading(false)
    }
  }

  return (
    <Frame>
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <H1>Create Course</H1>
        <div className="flex w-full justify-around gap-2">
          {loading ? (
            <Loading />
          ) : (
            <Form
              formContent={formContent}
              formClassName="min-w-[66%] text-left"
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </Frame>
  )
}

const formContent = [
  {
    title: 'Create New Course',
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
        name: 'start-date',
      },
      {
        label: 'End Date',
        type: 'date',
        name: 'end-date',
      },
    ],
    button: {
      text: 'Create',
      type: 'primary',
    },
  },
]
