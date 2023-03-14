import { useContext, useState } from "react";
import Frame from "@/components/ContentAlignment/Frame/Frame";
import Protected from "@/components/Protected";
import Form from "@/components/form/Form";
import { H1 } from "@/components/Headings";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { AlertContext } from "@/lib/AlertContext";
import { ZodError } from "zod";
import { getProfile } from "./api/profile";
import { GetServerSideProps } from "next";

type ProfileProps = {
  profile: Profile;
};

type Profile = {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  email: string;
};

export default function Profile(props: ProfileProps) {
  return (
    <Protected>
      <Frame>
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <H1>Account / Profile</H1>
          <div className="flex w-full justify-around gap-2">
            <ProfileForm profile={props.profile} />
          </div>
        </div>
      </Frame>
    </Protected>
  );
}


export const getServerSideProps:GetServerSideProps = async (context) =>{ 
  const profile = await getProfile(context);
  const stringed = JSON.stringify(profile);
  const parsed = JSON.parse(stringed);
  return {
    props: { profile: parsed },
  };
}

function ProfileForm(props: ProfileProps) {
  const { setAlert } = useContext(AlertContext) as any;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formContent = [
    {
      title: "Update your profile",
      inputs: [
        {
          label: "Name",
          type: "text",
          name: "name",
          placeholder: props.profile.name,
          initialvalue: props.profile.name,
          required: true,
        },
      ],
      button: {
        text: "Update",
        type: "primary",
      },
    },
  ];

  async function handleSubmit(form: any) {
    if (!form.name) return setAlert("Please fill out required form fields.");
    try {
      setLoading(true);
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        router.push("/dashboard");
      } else setAlert("Error: Uh oh something went wrong. Please reload & try again");
    } catch (error) {
      setLoading(false);
      if (error instanceof ZodError) {
        setAlert(error.issues[0].message);
      } else {
        setAlert("Error: Uh oh something went wrong. Please reload & try again");
      }
    }
  }
  if (loading) return <Loading />;
  return (
    <div className="flex w-full justify-around gap-2">
      <Form formContent={formContent} formClassName="min-w-[50%] text-left" onSubmit={handleSubmit} />
    </div>
  );
}
