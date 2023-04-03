import Frame from "@/components/ContentAlignment/Frame/Frame";
import { H1, H6 } from "@/components/Headings";
import { getCandidates } from "../api/candidate";
import { GetServerSideProps } from "next";
import type { Candidate } from "@/lib/types";
import Icon from "@/components/Icon";

type CandidatesProps = {
  candidates: Candidate[];
};

type TableProps = {
  data: Candidate[];
};

type TableRowProps = {
  data: Candidate;
};

export default function Candidates(props: CandidatesProps) {
  return (
    <Frame>
      <H1>Candidates</H1>
      <div className="flex w-full flex-col justify-around gap-2">
        <CandidatesTable data={props.candidates} />
      </div>
    </Frame>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  // fetch candidates
  const candidates = await getCandidates(context);
  // convert to json string
  const string = JSON.stringify(candidates);
  // convert to js object
  const parsed = JSON.parse(string);
  return {
    props: { candidates: parsed },
  };
}

function CandidatesTable(props: TableProps) {
  if (props.data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded bg-sapph-blue p-7 dark:bg-stone-900">
        <H6>No Candidates are available</H6>
      </div>
    );
  }

  const rows = props.data.map((item, i) => {
    return <CandidateRow data={item} key={i} />;
  });

  return (
    <div className="flex h-full items-center justify-center rounded bg-stone-900 p-7">
      <table className="w-full border-separate border-spacing-y-2">
        <thead className="bg-sapph-blue text-center">
          <tr>
            <th className="py-2">Name</th>
            <th className="hidden py-2 sm:table-cell">Email</th>
            <th className="hidden py-2 md:table-cell">Telephone</th>
            <th className="hidden py-2 xl:table-cell">Address </th>
            <th className="hidden py-2 md:table-cell">Company</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function CandidateRow(props: TableRowProps) {
  return (
    <tr className="my-1 text-center">
      <td className="capitalize">{props.data.name}</td>
      <td className="hidden capitalize sm:table-cell">{props.data.email}</td>
      <td className="hidden capitalize md:table-cell">{props.data.telephoneNumber}</td>
      <td className="hidden xl:table-cell">{props.data.address}</td>
      <td className="hidden md:table-cell">{props.data.company?.name}</td>
      <td className="px-2">
        <a
          href={`/candidates/${props.data.id}`}
          className="flex justify-center rounded-lg bg-french-blue p-2"
        >
          <Icon icon="BiRightArrow" size="xl" color="white" />
        </a>
      </td>
    </tr>
  );
}
