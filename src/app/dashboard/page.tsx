import { redirect } from "next/navigation";
import React from "react";
import { onAuthenticateUser } from "../actions/user";

type Props = {};

const DasboardPage = async (props: Props) => {
  //Authentication
  const auth = await onAuthenticateUser();
  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.id}`);

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect("/auth/sign-in");
  }
};

export default DasboardPage;
