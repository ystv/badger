import { z } from 'zod';

/////////////////////////////////////////
// RUNDOWN SCHEMA
/////////////////////////////////////////

export const RundownSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  showId: z.number().int(),
  order: z.number().int(),
})

export type Rundown = z.infer<typeof RundownSchema>

export default RundownSchema;
