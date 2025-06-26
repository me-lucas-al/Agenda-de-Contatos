import { z } from "zod";

export const UserCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

export const UserResponseSchema = UserCreateSchema.extend({
  id: z.string(),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T/, {
  message: "Data no formato ISO inválida",
}),
updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T/, {
  message: "Data no formato ISO inválida",
}),


});

export type UserCreateInput = z.infer<typeof UserCreateSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
