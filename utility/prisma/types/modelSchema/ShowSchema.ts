import { z } from 'zod';

/////////////////////////////////////////
// SHOW SCHEMA
/////////////////////////////////////////

export const ShowSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  start: z.coerce.date(),
  /**
   * The version of the show. This is incremented every time the show, or any of its dependent data, is changed.
   * This is used by Desktop to watch for changes.
   */
  version: z.number().int(),
  ytStreamID: z.string().nullable(),
  ytBroadcastID: z.string().nullable(),
})

export type Show = z.infer<typeof ShowSchema>

export default ShowSchema;
