import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function TestPage() {
  const { data: session, status } = useSession();

  const sendRequest = async () => {
    try {
      const response = await fetch(`/api/courses`, {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //   name: "New Course 16",
        //   type: "Forklift",
        //   description: "A course designed to stop you killing yourself or others",
        //   location: "Warehouse 4",
        // }),
      });
      if (!response.ok) {
        console.log("ERROR");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("ERROR");
    }
  };

  return (
    <Protected className="">
      <h1>TEST PAGE ONLY</h1>
      <h2>Check console</h2>
      <button onClick={sendRequest}>Send Request</button>
    </Protected>
  );
}

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
