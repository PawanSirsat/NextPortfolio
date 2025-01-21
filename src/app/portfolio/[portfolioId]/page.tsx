import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@clerk/nextjs/server";

import React from "react";

type Props = {
  params: { portfolioId: string };
};

const Page = async ({ params: { portfolioId } }: Props) => {
  const user = await currentUser();
  console.log(user);

  return (
    <>
      <h2>{user?.primaryEmailAddress?.emailAddress}</h2>
    </>
  );
};

export default Page;
