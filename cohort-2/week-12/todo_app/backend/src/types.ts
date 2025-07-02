import { z } from "zod/v4";

export const userSchema = z.object({
  username: z.string().email(),
  password: z.string(),
}).strict();

export const todoSchema = z.object({
  title: z.string(),
  description: z.string(),
}).strict();

export const updateTodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
}).strict();

export const deleteTodoSchema = z.object({
  id: z.string().uuid(),
}).strict();