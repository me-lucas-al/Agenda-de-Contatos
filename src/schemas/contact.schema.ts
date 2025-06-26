import { z } from "zod";

export const ContactCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Telefone inválido"),
  userEmail: z.string().email("Email do usuário inválido"),
});

export type ContactCreateInput = z.infer<typeof ContactCreateSchema>;
