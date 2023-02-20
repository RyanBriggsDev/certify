import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Protected(props) {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <h1>Loading...</h1>
  }
  if (status === 'authenticated') {
    return props.children
  }
  if (status === 'unauthenticated') {
    router.push('/signin')
  }
  return
}
