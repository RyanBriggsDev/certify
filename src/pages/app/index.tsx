import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Protected from '@/components/Protected'

export default function Dashboard() {
  const { data: session, status } = useSession()

  return (
    <Protected>
      <h1>Dashboard</h1>
      <h2>Hi {session?.user?.email}</h2>
      <SignOutButton />
    </Protected>
  )
}

const SignOutButton = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: '/signin' })}>
      Sign Out
    </button>
  )
}
