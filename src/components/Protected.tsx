import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export default function Protected({ children }): ReactElement {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <h1>Loading...</h1>
  }
  if (status === 'authenticated') {
    return children
  }
  if (status === 'unauthenticated') {
    router.push('/signin')
  }
  return <></>
}
