import Frame from "@/components/ContentAlignment/Frame/Frame";
import { H1, H3, H5, H6 } from "@/components/Headings";
import Form from "@/components/form/Form";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { getCandidate } from "../api/candidate/[id]";
import Icon from "@/components/Icon";
import { useState, useContext } from "react";
import Loading from "@/components/Loading";
import { AlertContext } from "@/lib/AlertContext";
import { candidateOnClient } from "@/lib/schema";
import { ZodError } from "zod";
import Modal from "@/components/Modal";
import type { Company, Result } from "@/lib/types";
import { formatDate } from "@/lib/dates";

type SingleCandidateProps = {
  candidate: object;
};

type CandidateDetailProps = {
  candidateForm: any[];
  id: string | string[] | undefined;
  setLoading: (boolean) => void;
};

type CompanyDetailsProps = {
  company: Company;
};

type CourseTableProps = {
  results: Result[] | any;
};

export default function SingleCandidate(props: SingleCandidateProps) {
  const router = useRouter();
  const { id } = router.query;
  const candidate = props.candidate[0];
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await fetch(`/api/candidate/${id}`, {
        method: "DELETE",
      });
      router.push("/candidates");
    } catch (error: unknown) {
      router.push("/candidates");
    }
  }

  const candidateForm = [
    {
      inputs: [
        {
          label: "Full Name*",
          type: "text",
          name: "name",
          initialValue: candidate.name,
        },
        {
          label: "Email",
          type: "email",
          name: "email",
          initialValue: candidate.email,
        },
        {
          label: "Address",
          type: "text",
          name: "address",
          initialValue: candidate.address,
        },
        {
          label: "Telephone",
          type: "tel",
          name: "telephoneNumber",
          initialValue: candidate.telephoneNumber,
        },
      ],
      button: {
        text: "Update",
        type: "primary",
      },
    },
  ];
  return (
    <Frame>
      {loading ? (
        <Loading size="full" />
      ) : (
        <>
          <H1>Candidate</H1>
          <div className="flex w-full flex-col justify-around gap-2">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="grid gap-3">
                <Candidate candidateForm={candidateForm} id={id} setLoading={setLoading} />
              </div>
              <div className="grid gap-3">
                {candidate.company ? <Company company={candidate.company} /> : <NoCompany />}
              </div>
            </div>
            <H5>Courses</H5>
            <CoursesTable results={candidate.results} />
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-6/12 lg:w-3/12">
              <Button type="orange" onClick={() => setOpen(true)}>
                Delete Candidate
              </Button>
            </div>
            <Modal modalOpen={open} close={() => setOpen(false)}>
              <div className="grid gap-3">
                <H3>Delete Candidate</H3>
                <p>Are you sure you want to delete this candidate?</p>
                <div className="grid w-full grid-cols-2 gap-3">
                  <Button onClick={() => handleDelete()} type="orange">
                    Yes
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}
    </Frame>
  );
}

function Candidate(props: CandidateDetailProps) {
  const router = useRouter();
  const { setAlert } = useContext(AlertContext) as any;

  async function submitForm(form: any) {
    props.setLoading(true);
    try {
      const checked = await candidateOnClient.parse(form);
      const res = await fetch(`/api/candidate/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checked),
      });
      const response = await res.json();
      if (response.success) {
        router.push("/candidates");
      } else {
        setAlert("Error: Uh oh something went wrong. Please reload & try again");
      }
    } catch (error: unknown) {
      props.setLoading(false);
      if (error instanceof ZodError) {
        setAlert(error.issues[0].message);
      } else {
        setAlert("Error: Uh oh something went wrong. Please reload & try again");
      }
    }
  }
  return (
    <Form
      formContent={props.candidateForm}
      formBg="bg-sapph-blue dark:bg-stone-900"
      formClassName="text-white text-left"
      formWidth="w-full"
      onSubmit={submitForm}
    />
  );
}

function Company(props: CompanyDetailsProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 rounded bg-sapph-blue p-7 dark:bg-stone-900">
      <H5>Company Details</H5>
      <div className="flex w-full justify-between px-5">
        <H6>Name</H6>
        <p>{props.company.name}</p>
      </div>
      <div className="flex w-full justify-between px-5">
        <H6>Address</H6>
        <p>{props.company.address}</p>
      </div>
      <div className="flex w-full justify-between px-5">
        <H6>Telephone</H6>
        <p>{props.company.telephoneNumber}</p>
      </div>
      <div className="flex w-full justify-between px-5">
        <H6>Contact Name</H6>
        <p>{props.company.contactName}</p>
      </div>
      <div className="flex w-full justify-between px-5">
        <H6>Contact Email</H6>
        <p>{props.company.contactEmail}</p>
      </div>
      <a href={`/company/${props.company.id}`} className="w-full px-0 xl:px-36">
        <Button type="light">View Company</Button>
      </a>
    </div>
  );
}
function NoCompany() {
  return (
    <div className="flex h-full items-center justify-center rounded bg-sapph-blue p-7 dark:bg-stone-900">
      <H6>This candidate does not belong to a company</H6>
    </div>
  );
}

function CoursesTable(props: CourseTableProps) {
  if (props.results.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded bg-sapph-blue p-7 dark:bg-stone-900">
        <H6>This candidate is not enrolled in any courses yet</H6>
      </div>
    );
  }

  const rows = props.results.map((item, i) => {
    return <CourseRow data={item} key={i} />;
  });

  return (
    <div className="flex h-full items-center justify-center rounded bg-stone-900 p-7">
      <table className="w-full border-separate border-spacing-y-2">
        <thead className="bg-sapph-blue text-center">
          <tr>
            <th className="py-2">Name</th>
            <th className="hidden py-2 md:table-cell">Type</th>
            <th className="hidden py-2 lg:table-cell">Location</th>
            <th className="hidden py-2 sm:table-cell">Pass Date</th>
            <th className="hidden py-2 lg:table-cell">Expiry</th>
            <th className="py-2">View</th>
            <th className="py-2">Certificate</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function CourseRow(props: any) {
  return (
    <tr className="my-1 text-center">
      <td className="capitalize">{props.data.course.name}</td>
      <td className="hidden capitalize md:table-cell">{props.data.course.type}</td>
      <td className="hidden capitalize lg:table-cell">{props.data.course.location}</td>
      <td className="hidden sm:table-cell">
        {props.data.passDate ? formatDate(props.data.passDate) : "N/A"}
      </td>
      <td className="hidden lg:table-cell">
        {props.data.expiryDate ? formatDate(props.data.expiryDate) : "N/A"}
      </td>
      <td className="px-2">
        <a
          href={`/courses/${props.data.course.id}`}
          className="flex justify-center rounded-lg bg-azure-blue p-2"
        >
          <Icon icon="BiDesktop" size="xl" color="black" />
        </a>
      </td>
      <td className="px-2">
        <div className="flex cursor-pointer justify-center rounded-lg bg-french-blue p-2">
          <Icon icon="BiCertification" size="xl" color="white" />
        </div>
      </td>
    </tr>
  );
}

export async function getServerSideProps(context) {
  const candidate = await getCandidate(context);
  const stringed = JSON.stringify(candidate);
  const parsed = JSON.parse(stringed);
  return {
    props: { candidate: parsed },
  };
}
