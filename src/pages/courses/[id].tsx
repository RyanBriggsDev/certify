import Frame from '@/components/ContentAlignment/Frame/Frame'
import Head from 'next/head'
import { H1, H3 } from '@/components/Headings'
import Icon from '@/components/Icon'
import Card from '@/components/Card'
import Loading from '@/components/Loading'
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
          <Card className="flex min-h-fit flex-col items-center justify-center gap-3 text-center">
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
        <div className="grid w-full grid-cols-1 flex-wrap gap-3 text-center lg:grid-cols-2">
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
      className="flex flex-col items-center justify-center"
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

  return (
    <Card
      id="candidate-info"
      className="flex flex-col items-center justify-center"
    >
      <div className="relative h-full w-full rounded-md border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8">
        <div className="flex min-h-full flex-col items-center justify-center gap-3">
          <H3>Course Candidates</H3>
        </div>
      </div>
    </Card>
  )
}
