import { z } from 'zod';

/////////////////////////////////////////
// SHOW WITH DURATION SCHEMA
/////////////////////////////////////////

export const ShowWithDurationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  start: z.coerce.date(),
  durationSeconds: z.number().int(),
  end: z.coerce.date(),
  /**
   * The version of the show. This is incremented every time the show, or any of its dependent data, is changed.
   * This is used by Desktop to watch for changes.
   */
  version: z.number().int(),
  ytStreamID: z.string().nullable(),
  ytBroadcastID: z.string().nullable(),
})

export type ShowWithDuration = z.infer<typeof ShowWithDurationSchema>

export default ShowWithDurationSchema;
