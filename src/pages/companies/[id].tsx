import Frame from '@/components/ContentAlignment/Frame/Frame'
import { H1, H3, H6 } from '@/components/Headings'
import Form from '@/components/form/Form'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import { getSingleCompany } from '../api/company/[id]'
import Icon from '@/components/Icon'
import { useState, useContext } from 'react'
import Loading from '@/components/Loading'
import { AlertContext } from '@/lib/AlertContext'
import { companyOnClient } from '@/lib/schema'
import { ZodError } from 'zod'
import Modal from '@/components/Modal'
import Link from 'next/link'

type SingleCompanyProps = {
  company: any
}

type CompanyDetailProps = {
  companyForm: any[]
  id?: string | string[] | undefined
  setLoading: (boolean) => void
}

type CompanyCandidateProps = {
  data: any
}

export default function SingleCompany(props: SingleCompanyProps) {
  const router = useRouter()
  const { id } = router.query
  const company = props.company.data[0]

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      await fetch(`/api/company/${id}`, {
        method: 'DELETE',
      })
      router.push('/companies')
    } catch (error: unknown) {
      router.push('/companies')
    }
  }

  const companyForm = [
    {
      inputs: [
        {
          label: 'Full Name*',
          type: 'text',
          name: 'name',
          initialValue: company.name,
        },
        {
          label: 'Contact Name',
          type: 'text',
          name: 'contactName',
          initialValue: company.contactName,
        },
        {
          label: 'Contact Email',
          type: 'email',
          name: 'contactEmail',
          initialValue: company.contactEmail,
        },
        {
          label: 'Address',
          type: 'text',
          name: 'address',
          initialValue: company.address,
        },
        {
          label: 'Telephone',
          type: 'tel',
          name: 'telephoneNumber',
          initialValue: company.telephoneNumber,
        },
      ],
      button: {
        text: 'Update',
        type: 'primary',
      },
    },
  ]
  return (
    <Frame>
      {loading ? (
        <Loading size="full" />
      ) : (
        <>
          <H1>{company.name}</H1>
          <div className="grid gap-3">
            <CompanyDetails
              companyForm={companyForm}
              setLoading={setLoading}
              id={id}
            />
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-6/12 lg:w-3/12">
              <Button type="orange" onClick={() => setOpen(true)}>
                Delete Company
              </Button>
            </div>
            <Modal modalOpen={open} close={() => setOpen(false)}>
              <div className="grid gap-3 text-center">
                <H3>Delete Candidate</H3>
                <p>Are you sure you want to delete this company?</p>
                <div className="grid w-full grid-cols-2 gap-3">
                  <Button onClick={() => handleDelete()} type="orange">
                    Yes
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
          <CompanyCandidates data={company} />
        </>
      )}
    </Frame>
  )
}

function CompanyDetails(props: CompanyDetailProps) {
  const router = useRouter()
  const { setAlert } = useContext(AlertContext) as any

  async function submitForm(form: any) {
    props.setLoading(true)
    console.log(props.id)
    try {
      const checked = await companyOnClient.parse(form)
      const res = await fetch(`/api/company/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checked),
      })
      const response = await res.json()
      if (response.success) {
        router.push('/companies')
      } else {
        setAlert('Error: Uh oh something went wrong. Please reload & try again')
      }
    } catch (error: unknown) {
      props.setLoading(false)
      if (error instanceof ZodError) {
        setAlert(error.issues[0].message)
      } else {
        setAlert('Error: Uh oh something went wrong. Please reload & try again')
      }
    }
  }
  return (
    <Form
      formContent={props.companyForm}
      formBg="bg-sapph-blue dark:bg-stone-900"
      formClassName="text-white text-left"
      formWidth="w-full"
      onSubmit={submitForm}
    />
  )
}

function CompanyCandidates(props: CompanyCandidateProps) {
  const router = useRouter()

  return (
    <div className="py-9">
      <H3>Company Candidates</H3>
      {props.data.candidates.length === 0 ? (
        <p>There are no candidates associated with this company</p>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-2 bg-sapph-blue py-2 text-center md:grid-cols-3">
            <p>Name</p>
            <p className="hidden md:block">Phone</p>
            <p>View</p>
          </div>
          {props.data.candidates.map((candidate, index: number) => (
            <div
              className="grid grid-cols-2 items-center justify-center gap-2 py-1 text-center md:grid-cols-3"
              key={index}
            >
              <p>{candidate.name}</p>
              <p className="hidden md:block">
                {candidate.telephoneNumber
                  ? candidate.telephoneNumber
                  : 'Not on file.'}
              </p>
              <div className="flex w-full items-center justify-center">
                <div
                  className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-azure-blue p-2 duration-300 ease-in-out hover:scale-105"
                  onClick={() => router.push(`/candidates/${candidate.id}`)}
                >
                  <Icon icon="BiDesktop" size="xl" color="black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const company = await getSingleCompany(context)
  const stringed = JSON.stringify(company)
  const parsed = JSON.parse(stringed)
  return {
    props: { company: parsed },
  }
}
