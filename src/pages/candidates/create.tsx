import { useContext, useState } from 'react'
import Frame from '@/components/ContentAlignment/Frame/Frame'
import Form from '@/components/form/Form'
import { H1, H5 } from '@/components/Headings'
import Loading from '@/components/Loading'
import { candidateOnClient } from '@/lib/schema'
import { ZodError } from 'zod'
import { AlertContext } from '@/lib/AlertContext'
import { useRouter } from 'next/router'
import { getCompanies } from '../api/company'

type CreateCandidateProps = {
  companies: object
}

export default function CreateCandidate(props: CreateCandidateProps) {
  let companies: string[] = []
  function prepareCompanyArr(companyData) {
    if (companyData.length > 0) {
      for (let i = 0; i < companyData.length; i++) {
        companies.push(companyData[i].name + ' - ID: ' + companyData[i].id)
      }
    }
  }
  prepareCompanyArr(props.companies)

  return (
    <Frame>
      <H1>Create Candidate</H1>
      <div className="flex w-full justify-around gap-2">
        <CreateCandidateForm companies={companies} />
      </div>
    </Frame>
  )
}

// Had to break Form out into function as context is not available until 'Frame' component is rendered
function CreateCandidateForm(props) {
  const { setAlert } = useContext(AlertContext) as any
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const formContent = [
    {
      title: 'Create new candidate',
      desc: 'Fill out the form below to make a new candidate.',
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
          placeholder: '02830434565',
        },
        {
          label: 'Company',
          type: 'select',
          name: 'company',
          placeholder: 'Please select an option',
          options: props.companies,
        },
      ],
      button: {
        text: 'Create',
        type: 'primary',
      },
    },
  ]

  async function handleSubmit(form: any) {
    if (!form.name || !form.company) {
      return setAlert('Please fill out required form fields. ')
    }
    const { company, ...candidateData } = form
    candidateData.companyId = form.company.split(' ').slice(-1).toString()
    setLoading(true)
    try {
      const checked = await candidateOnClient.parse(form)
      const res = await fetch('/api/candidate', {
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
    <Form
      formContent={formContent}
      btnStyle={{ width: '100%' }}
      onSubmit={handleSubmit}
      formClassName="min-w-[66%] text-left"
    />
  )
}

export async function getServerSideProps(context) {
  const companies = await getCompanies(context)
  const stringed = JSON.stringify(companies)
  const parsed = JSON.parse(stringed)
  return {
    props: { companies: parsed },
  }
}
