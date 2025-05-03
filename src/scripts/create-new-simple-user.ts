import { auth } from "@/lib/auth";

const createNewSimpleUser = async ({
    email,
    password,
    name,
}: {
    email: string;
    password: string;
    name: string;
}) => {
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      }
    });

    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

createNewSimpleUser({
    email: "test@test.com",
    password: "test1234",
    name: "Test User",
});
