import {z} from 'zod'

export const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(3)
})