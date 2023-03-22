import Frame from '@/components/ContentAlignment/Frame/Frame'
import Table from '@/components/Table'
import { H1 } from '@/components/Headings'
import { getCandidates } from '../api/candidate'

export default function candidates(props: CandidatesProps) {
  const data = props.candidates.map((att) => {
    return {
      name: att.name,
      company: att.company?.name ? att.company.name : 'N/A',
      id: att.id,
      // remove: 'remove',
    }
  })

  return (
    <Frame>
      <H1>Candidates</H1>
      {props.candidates.length === 0 ? (
        <p>
          It looks like you don't have any candidates associated with your
          account.
        </p>
      ) : (
        <Table
          data={data}
          route="/candidates/"
          onClick={(obj) => console.log(obj.id)}
        />
      )}
    </Frame>
  )
}

export async function getServerSideProps(context) {
  // fetch candidates
  const candidates = await getCandidates(context)
  // convert to json string
  const string = JSON.stringify(candidates)
  // convert to js object
  const parsed = JSON.parse(string)
  return {
    props: { candidates: parsed },
  }
}

type CandidatesProps = {
  candidates: any
}
