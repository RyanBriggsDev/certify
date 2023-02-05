import Hero from '@/components/Hero'
import H1 from '@/components/headings/H1'
import H2 from '@/components/headings/H2'
import H3 from '@/components/headings/H3'
import H4 from '@/components/headings/H4'
import H5 from '@/components/headings/H5'
import Button from '@/components/Button'
import Container from '@/components/ContentAlignment/Container'
import Card from '@/components/Card'
import Form from '@/components/form/Form'
import { useRouter } from 'next/router'

export default function Stylesheet() {
  const router = useRouter()

  const onSubmitHandler = () => {
    alert('You pass formContent and an onSubmit')
  }
  return (
    <>
      <Hero
        bg="bg-zinc-700"
        containerClassName="flex flex-col justify-center items-center text-center gap-5"
      >
        <H1>StyleSheet</H1>
        <p className="text-lg text-white md:text-2xl">
          Welcome to the Certify StyleSheet
        </p>
        <Button width="w-1/2 md:w-1/4" onClick={() => router.push('/')}>
          Home
        </Button>
      </Hero>

      <Container>
        <div className="headings flex flex-col gap-3">
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3>Heading 3</H3>
          <H4>Heading 4</H4>
          <H5>Heading 5</H5>
        </div>
      </Container>

      <Container>
        <hr />
      </Container>

      <Container className="flex flex-col gap-3">
        <H3>Buttons</H3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Button>This is a button</Button>
          <Button type="orange">This is a button</Button>
          <Button type="light">This is a button</Button>
        </div>
      </Container>

      <Container>
        <hr />
      </Container>

      <Container className="flex flex-col gap-3">
        <H3>Cards</H3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Card>This is a card</Card>
          <Card
            tinted
            onClick={() => alert('you can press buttons!')}
            bg="bg-green-300"
            color="text-black"
            className="flex flex-col items-center justify-center gap-3 hover:text-red-500"
          >
            <H5>You can make it look however you want</H5>
            <Button>With whatever content you want</Button>
          </Card>
          <Card
            tinted
            bg="bg-yellow-100"
            color="text-yellow-500"
            className="flex justify-end py-5 line-through hover:underline"
            onClick={() => alert('Suprise!')}
          >
            That does not mean you should
          </Card>
        </div>
      </Container>

      <Container>
        <hr />
      </Container>

      <Container className="flex flex-col gap-3">
        <H3>Forms</H3>
        <Form
          formContent={formContent}
          btnStyle={{ width: '100%' }}
          onSubmit={onSubmitHandler}
        />
      </Container>
    </>
  )
}

const formContent = [
  {
    title: 'Sign In to Certify',
    desc: 'Log in to get started',
    inputs: [
      {
        label: 'Email',
        type: 'text',
        name: 'email',
        placeholder: 'r@certify.com',
        required: true,
      },
      {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'password',
        required: true,
      },
    ],
    button: {
      text: 'Submit',
      type: 'primary',
    },
    redirect: {
      text: 'No Account? Register.',
      link: '/register',
    },
  },
]
