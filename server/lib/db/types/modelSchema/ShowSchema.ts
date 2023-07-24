import { z } from 'zod';

/////////////////////////////////////////
// SHOW SCHEMA
/////////////////////////////////////////

export const ShowSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  start: z.coerce.date(),
})

export type Show = z.infer<typeof ShowSchema>

export default ShowSchema;
