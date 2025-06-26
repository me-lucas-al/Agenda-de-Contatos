import { z } from "zod";

export const UserCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

export const UserResponseSchema = UserCreateSchema.extend({
  id: z.string(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Data inválida",
}),
updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Data inválida",
}),

});

export type UserCreateInput = z.infer<typeof UserCreateSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
