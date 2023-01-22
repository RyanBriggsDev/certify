import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session, status } = useSession();

  return (
    <Protected className="">
      <h1>Dashboard</h1>
      <h2>Hi {session?.user.email}</h2>
      <SignOutButton />
    </Protected>
  );
}

const SignOutButton = () => {
  return <button onClick={() => signOut({ callbackUrl: "/signin" })}>Sign Out</button>;
};

const Protected = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (status === "authenticated") {
    return props.children;
  }
  if (status === "unauthenticated") {
    router.push("/signin");
  }

  return;
};
