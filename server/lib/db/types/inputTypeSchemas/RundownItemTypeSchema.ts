import { z } from 'zod';

export const RundownItemTypeSchema = z.enum(['Segment','VT']);

export type RundownItemTypeType = `${z.infer<typeof RundownItemTypeSchema>}`

export default RundownItemTypeSchema;
