import { auth } from "@/lib/auth";

export const changePasswordToUser = async ({
  userId,
  newPassword,
}: {
  userId: string;
  newPassword: string;
}) => {
  try {
    const ctx = await auth.$context;
    const hash = await ctx.password.hash(newPassword);
    await ctx.internalAdapter.updatePassword(userId, hash);
    console.log("Contraseña cambiada exitosamente");
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
  }
};

changePasswordToUser({
  userId: "****",
  newPassword: "***",
});
