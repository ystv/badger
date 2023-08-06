import { z } from 'zod';

export const RundownItemScalarFieldEnumSchema = z.enum(['id','name','rundownId','order','durationSeconds','type','notes']);

export default RundownItemScalarFieldEnumSchema;
