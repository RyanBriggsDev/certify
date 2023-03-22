import Card from '@/components/Card'
import Frame from '@/components/ContentAlignment/Frame/Frame'
import ProfileLayout from '@/components/ContentAlignment/Frame/ProfileLayout'
import { H6 } from '@/components/Headings'
import Icon from '@/components/Icon'
import Protected from '@/components/Protected'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <Protected>
      <Frame>
        <ProfileLayout cols="grid-cols-6" className="[&>*]:md:min-h-[250px]">
          <Card
            bg="bg-white dark:bg-dark-gray"
            className="col-span-6 md:col-span-2"
          >
            <h3>{session?.user?.email}</h3>
          </Card>
          <Card
            bg="bg-white dark:bg-dark-gray"
            className="col-span-6 md:col-span-2"
          >
            Companies with most staff trained
          </Card>
          <Card
            bg="bg-white dark:bg-dark-gray hover:bg-white/[0.6] dark:hover:bg-dark-gray/[0.6]"
            className="col-span-6 cursor-pointer duration-300 ease-in-out md:col-span-2"
            onClick={() => router.push('/companies/create')}
          >
            <div className="mx-auto flex h-full flex-col place-items-center justify-center">
              <Icon icon="BiSpreadsheet" size="super" color="primary" />
              <H6 className="text-center">Create New Company</H6>
            </div>
          </Card>
          <Card
            bg="bg-white dark:bg-dark-gray"
            className="col-span-6 duration-300 ease-in-out md:col-span-4"
          >
            List of courses currently is progress
          </Card>

          <Card
            bg="bg-white dark:bg-dark-gray hover:bg-white/[0.6] dark:hover:bg-dark-gray/[0.6]"
            className="col-span-6 cursor-pointer duration-300 ease-in-out md:col-span-2"
            onClick={() => router.push('/courses/create')}
          >
            <div className="mx-auto flex h-full flex-col place-items-center justify-center">
              <Icon icon="BiDesktop" size="super" color="primary" />
              <H6 className="text-center">Create New Course</H6>
            </div>
          </Card>
          <Card
            onClick={() => router.push('/candidates/create')}
            bg="bg-white dark:bg-dark-gray hover:bg-white/[0.6] dark:hover:bg-dark-gray/[0.6]"
            className="col-span-6 cursor-pointer duration-300 ease-in-out md:col-span-2"
          >
            <div className="mx-auto flex h-full flex-col place-items-center justify-center">
              <Icon icon="BiUserPlus" size="super" color="primary" />
              <H6 className="text-center">Create New Candidate</H6>
            </div>
          </Card>

          <Card
            onClick={() => router.push('/profile')}
            bg="bg-white dark:bg-dark-gray hover:bg-white/[0.6] dark:hover:bg-dark-gray/[0.6]"
            className="col-span-6 cursor-pointer duration-300 ease-in-out md:col-span-2"
          >
            <div className="mx-auto flex h-full flex-col place-items-center justify-center">
              <Icon icon="BiIdCard" size="super" color="primary" />
              <H6 className="text-center">Account / Profile</H6>
            </div>
          </Card>
          <Card
            onClick={() => signOut()}
            bg="bg-white dark:bg-dark-gray hover:bg-white/[0.6] dark:hover:bg-dark-gray/[0.6]"
            className="col-span-6 cursor-pointer duration-300 ease-in-out md:col-span-2 "
          >
            <div className="mx-auto flex h-full flex-col place-items-center justify-center">
              <Icon icon="BiLogOut" size="super" color="primary" />
              <H6 className="text-center">Signout</H6>
            </div>
          </Card>
        </ProfileLayout>
      </Frame>
    </Protected>
  )
}
