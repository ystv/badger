import { z } from 'zod';

/////////////////////////////////////////
// DUMMY TEST JOB SCHEMA
/////////////////////////////////////////

/**
 * Only used for testing.
 */
export const DummyTestJobSchema = z.object({
  id: z.number().int(),
  baseJobId: z.number().int(),
})

export type DummyTestJob = z.infer<typeof DummyTestJobSchema>

export default DummyTestJobSchema;
