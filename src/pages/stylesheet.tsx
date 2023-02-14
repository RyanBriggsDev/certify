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
import Modal from '@/components/Modal'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Alert from '@/components/Alert'
import Loading from '@/components/Loading'
import Icon from '@/components/Icon'

export default function Stylesheet() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

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

      <Container>
        <hr />
      </Container>

      <Container className="flex flex-col gap-3">
        <H3>Modal</H3>
        <Button onClick={() => setModalOpen(!modalOpen)}>Open Modal</Button>
        <Modal close={() => setModalOpen(false)} modalOpen={modalOpen}>
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <H3>This is our modal</H3>
            <p>
              You'll need a button to open, state, modalOpen and close prop.
            </p>
            <p>Then you can do whatever you want with it.</p>
          </div>
        </Modal>
      </Container>

      <Container>
        <hr />
      </Container>

      <Container>
        <H3>Alert</H3>
        <p className="p-2 dark:text-white">
          Alerts will autodismiss by default (after 5 seconds) but this can be
          disabled with the autoDismiss prop. A heading is required but a body
          is optional via the text prop.
        </p>
        <p className="p-2 dark:text-white">
          Alerts should be controlled by useContext for ease of use. Adding to
          top of the context section of the Frame component and controlling
          through context will provide easy user feedback.
        </p>
        <Alert color="primary" heading="General alert" autoDismiss={false} />
        <Alert color="light" heading="Light alert" />
        <Alert color="warning" heading="Warning alert" />
        <Alert
          color="light"
          heading="General alert with body"
          autoDismiss={false}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fuga enim perspiciatis, quibusdam molestiae nemo reiciendis a soluta consequatur quaerat veniam nihil. Animi corrupti aspernatur pariatur repellendus eaque corporis ad!"
        />
      </Container>
      <Container>
        <H3>Loading</H3>
        <p className="p-2 dark:text-white">
          Size can either be "sm" or "full". Default size is full which takes up
          the height of the screen. "sm" size is designed to be used in single
          component "full" is designed to be used in a page.
        </p>
        <p className="p-2 dark:text-white">
          Color is "fill-french-blue" by default but can be passed any color.
        </p>
        <div className="flex justify-around pt-5">
          <Loading size="sm" color="fill-french-blue" />
          <Loading size="sm" color="fill-pallete-orange" />
          <Loading size="sm" color="fill-azure-blue" />
        </div>
        <div>
          <Loading />
        </div>
      </Container>

      <Container>
        <hr />
      </Container>

      <Container>
        <H3>Icons</H3>
        <p className="p-2 dark:text-white">
          Icons take in an icon type of any string value from the BoxIcons set.
          Any size can be optionally be added, the default is 'md'. Color can be
          added as optional string as well with the default being black (or
          white in dark mode)
        </p>
        <div className="flex place-items-center justify-around">
          <Icon icon="BiBarChartAlt2" size="5xl" />
          <Icon icon="BiAlignMiddle" size="4xl" color="primary" />
          <Icon icon="BiCaretDownSquare" size="3xl" />
          <Icon icon="BiExpand" size="2xl" />
          <Icon icon="BiFilterAlt" size="xl" color="warning" />
          <Icon icon="BiUserCheck" size="lg" />
          <Icon icon="BiMessageRoundedError" color="warning" />
          <Icon icon="BiFolderOpen" size="sm" />
          <Icon icon="BiShow" size="super" color="light" />
        </div>
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
