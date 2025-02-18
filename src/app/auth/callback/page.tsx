import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  console.log(auth);

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/profile`);
  }

  return redirect("/auth/sign-in");
};

export default AuthCallbackPage;
