import { authClient } from "@/lib/auth-client";

const createNewSimpleUser = async () => {
  const { data, error } = await authClient.signUp.email({
    email: "test@test.com",
    password: "test",
    name: "Test User",
  });
};

createNewSimpleUser();
