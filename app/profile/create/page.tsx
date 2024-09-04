import SubmitButton from "@/components/form/Button";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";

import { createProfileAction } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CreateProfile() {
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect("/");
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 rounded-md max-w-lg">
        <FormContainer action={createProfileAction}>
          <div className="grid gap-4 mt-4">
            <FormInput name="firstName" label="first name" type="text" />
            <FormInput name="lastName" label="last name" type="text" />
            <FormInput name="username" label="user name" type="text" />
          </div>
          <SubmitButton className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfile;
