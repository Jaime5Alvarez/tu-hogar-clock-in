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
    email: "jaime5alvarez5h@gmail.com",
    password: "zwinito-gordito-jugosito",
    name: "Jaime Alvarez",
});
