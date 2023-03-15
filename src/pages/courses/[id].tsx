import Frame from '@/components/ContentAlignment/Frame/Frame'
import Head from 'next/head'
import { H1, H3 } from '@/components/Headings'
import Icon from '@/components/Icon'
import Card from '@/components/Card'
import Loading from '@/components/Loading'
import Table from '@/components/Table'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import { formatDate } from '@/lib/dates'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SingleCourse() {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/course/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const json = await res.json()
        if (json.success) {
          setData(await json.data)
          setLoading(false)
        } else {
          console.log('error')
        }
      } catch (error) {
        setLoading(false)
        alert(error)
      }
    }
    if (router.isReady) {
      fetchData()
    }
  }, [id])

  if (loading)
    return (
      <Frame>
        <Head>
          <title>Certify</title>
        </Head>
        <Loading />
      </Frame>
    )

  return (
    <>
      <Head>
        <title>{`Certify | ${data?.courses[0].name}`}</title>
      </Head>
      <Frame>
        <div>
          <Card
            padding="p-6"
            className="flex min-h-fit flex-col items-center justify-center gap-3 text-center"
          >
            <H1 textSize="text-3xl md:text-5xl lg:text-7xl">
              {data?.courses[0].name}
            </H1>
            {data?.courses[0].startDate && data?.courses[0].endDate && (
              <p className="lg:font-2xl text-xl">
                {formatDate(data?.courses[0].startDate)} -{' '}
                {formatDate(data?.courses[0].endDate)}
              </p>
            )}
          </Card>
        </div>
        <div className="grid w-full grid-cols-1 flex-wrap gap-3 text-center xl:grid-cols-5">
          <CourseDetails data={data} />
          <CandidateDetails data={data} />
        </div>
      </Frame>
    </>
  )
}

function CourseDetails({ data }) {
  let iconType
  switch (data.courses[0].location) {
    case 'classroom':
      iconType = 'BiChalkboard'
      break
    case 'virtual':
      iconType = 'BiWebcam'
      break
    case 'distance':
      iconType = 'BiWorld'
      break
    default:
      iconType = 'BiWorld'
      break
  }

  return (
    <Card
      id="course-info"
      className="col-span-1 flex flex-col items-center justify-center xl:col-span-2"
    >
      <div className="relative h-full w-full rounded-md border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8">
        <div className="flex min-h-full flex-col items-center justify-center gap-3">
          <H3
            color="text-black dark:text-white"
            textSize="text-3xl md:text-4xl lg:text-5xl"
          >
            Course Details
          </H3>

          <div className="flex w-full justify-between gap-3">
            <Icon icon={iconType} size="5xl" color="warning" />
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sapph-blue px-3 py-1.5 text-xs font-medium text-white">
                {data.courses[0].type}
              </span>
            </div>
          </div>
          <div className="">
            <p className="text-left">{data.courses[0].description}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

function CandidateDetails({ data }) {
  let iconType
  switch (data.courses[0].location) {
    case 'classroom':
      iconType = 'BiChalkboard'
      break
    case 'virtual':
      iconType = 'BiWebcam'
      break
    case 'distance':
      iconType = 'BiWorld'
      break
    default:
      iconType = 'BiWorld'
      break
  }

  const [tableData, setTableData] = useState(null)
  const [deleteCandidateModal, setDeleteCandidateModal] =
    useState<boolean>(false)
  const [createCandidateModal, setCreateCandidateModal] =
    useState<boolean>(false)
  const [existingCandidateModal, setExistingCandidateModal] =
    useState<boolean>(false)
  const [candidateId, setCandidateId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [resultId, setResultId] = useState('')

  useEffect(() => {
    if (data) {
      setCourseId(data.courses[0].id)
      const candidates = data.courses[0].results
      const tableItems = candidates.map((candidate) => [
        {
          name: candidate.candidate.name,
          company: candidate.candidate.company,
          id: candidate.candidate.id,
          delete: 'remove',
          result: candidate.id,
        },
      ])
      const formattedData = tableItems.flat(5)

      setTableData(formattedData)
    }
  }, [data])

  const handleDelete = async () => {
    const body = {
      courseId: courseId,
      candidateId: candidateId,
    }
    try {
      const res = await fetch(`/api/enroll/${resultId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const json = res.json()
      setDeleteCandidateModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card
      id="candidate-info"
      className="col-span-1 flex flex-col items-center justify-center xl:col-span-3"
    >
      <div className="relative h-full w-full rounded-md border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8">
        <div className="flex min-h-full flex-col items-center justify-center gap-3">
          <>
            <H3
              color="text-black dark:text-white"
              textSize="text-3xl md:text-4xl lg:text-5xl"
            >
              Course Candidates
            </H3>
            {data.courses[0].results.length > 0 && tableData ? (
              <Table
                pageSize={10}
                data={tableData}
                route={'/candidates/'}
                onClick={(obj) => {
                  setDeleteCandidateModal(!deleteCandidateModal)
                  setCandidateId(obj.id)
                  setResultId(obj.result)
                }}
              />
            ) : (
              <p>Looks like there aren't any existing candidates. </p>
            )}

            {/* candidate delete modal */}
            <Modal
              modalOpen={deleteCandidateModal}
              close={() => setDeleteCandidateModal(false)}
            >
              <div className="grid gap-3">
                <H3>Remove Candidate</H3>
                <p>
                  Are you sure you want to remove this candidate from the
                  course?
                </p>
                <div className="grid w-full grid-cols-2 gap-3">
                  <Button onClick={() => handleDelete()} type="orange">
                    Yes
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteCandidateModal(false)
                      setCandidateId('')
                      setResultId('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </>
          {/* create new candidate modal */}
          {/* add existing candidate modal */}
        </div>
      </div>
    </Card>
  )
}
