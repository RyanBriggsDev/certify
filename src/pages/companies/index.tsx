import Frame from "@/components/ContentAlignment/Frame/Frame";
import { H1, H6 } from "@/components/Headings";
import { getCompanies } from "../api/company";
import { GetServerSideProps } from "next";
import type { Company } from "@/lib/types";
import Icon from "@/components/Icon";

type CompanyProps = {
  companies: Company[];
};

type TableProps = {
  data: Company[];
};

type TableRowProps = {
  data: Company;
};

export default function Companies(props: CompanyProps) {
  return (
    <Frame>
      <H1>Companies</H1>
      <div className="flex w-full flex-col justify-around gap-2">
        <CompaniesTable data={props.companies} />
      </div>
    </Frame>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const companies = await getCompanies(context);
  const stringed = JSON.stringify(companies);
  const parsed = JSON.parse(stringed);
  return {
    props: { companies: parsed },
  };
};

function CompaniesTable(props: TableProps) {
  if (props.data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded bg-sapph-blue p-7 dark:bg-stone-900">
        <H6>No Companies are available</H6>
      </div>
    );
  }

  const rows = props.data.map((item, i) => {
    return <CompanyRow data={item} key={i} />;
  });

  return (
    <div className="flex h-full items-center justify-center rounded bg-stone-900 p-7">
      <table className="w-full border-separate border-spacing-y-2">
        <thead className="bg-sapph-blue text-center">
          <tr>
            <th className="py-2">Name</th>
            <th className="hidden py-2 md:table-cell">Address</th>
            <th className="hidden py-2 lg:table-cell">Telephone</th>
            <th className="hidden py-2 sm:table-cell">Contact </th>
            <th className="hidden py-2 lg:table-cell">Contact Email</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function CompanyRow(props: TableRowProps) {
  return (
    <tr className="my-1 text-center">
      <td className="capitalize">{props.data.name}</td>
      <td className="hidden capitalize md:table-cell">{props.data.address}</td>
      <td className="hidden capitalize lg:table-cell">{props.data.telephoneNumber}</td>
      <td className="hidden sm:table-cell">{props.data.contactName}</td>
      <td className="hidden lg:table-cell">{props.data.contactEmail}</td>
      <td className="px-2">
        <a href={`/companies/${props.data.id}`} className="flex justify-center rounded-lg bg-french-blue p-2">
          <Icon icon="BiRightArrow" size="xl" color="white" />
        </a>
      </td>
    </tr>
  );
}
