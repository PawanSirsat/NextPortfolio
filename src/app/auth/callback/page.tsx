import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  console.log(auth);

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/`);
  }

  if (auth.status === 403 || auth.status === 500 || auth.status === 400) {
    return redirect("/auth/sign-in");
  }
  return redirect(`/`);
};

export default AuthCallbackPage;
