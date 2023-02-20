import Card from '@/components/Card'
import Frame from '@/components/ContentAlignment/Frame/Frame'
import ProfileLayout from '@/components/ContentAlignment/Frame/ProfileLayout'
import Protected from '@/components/Protected'
import { useSession } from 'next-auth/react'

export default function dashboard() {
  const { data: session, status } = useSession()

  return (
    <Protected>
      <Frame>
        <ProfileLayout cols="grid-cols-6" className="[&>*]:md:min-h-[250px]">
          <Card
            bg="bg-white dark:bg-dark-gray"
            className="col-span-6 md:col-span-3 md:row-span-2"
          >
            <h3>{session?.user?.email}</h3>
          </Card>

          <Card
            bg="bg-white dark:bg-dark-gray"
            className="col-span-6 md:col-span-3 md:row-span-2"
          >
            Companies with most staff trained
          </Card>

          <Card
            bg="bg-white dark:bg-dark-gray hover:bg-white/[0.6] dark:hover:bg-dark-gray/[0.6]"
            className="col-span-6 cursor-pointer duration-300 ease-in-out md:col-span-2 md:row-span-2"
          >
            Create Course
          </Card>

          <Card
            bg="bg-white dark:bg-dark-gray hover:bg-white/[0.6] dark:hover:bg-dark-gray/[0.6]"
            className="col-span-6 cursor-pointer duration-300 ease-in-out md:col-span-2 md:row-span-2"
          >
            New Candidate
          </Card>

          <Card
            bg="bg-white dark:bg-dark-gray hover:bg-white/[0.6] dark:hover:bg-dark-gray/[0.6]"
            className="col-span-6 cursor-pointer duration-300 ease-in-out md:col-span-2 md:row-span-2"
          >
            Etc
          </Card>

          <Card
            bg="bg-white dark:bg-dark-gray"
            className="col-span-6 row-span-3 duration-300 ease-in-out md:col-span-5"
          >
            List of courses currently is progress
          </Card>

          <Card
            bg="bg-white dark:bg-dark-gray hover:bg-white/[0.6] dark:hover:bg-dark-gray/[0.6]"
            className="col-span-6 row-span-3 cursor-pointer duration-300 ease-in-out md:col-span-1"
          >
            etc
          </Card>
        </ProfileLayout>
      </Frame>
    </Protected>
  )
}
