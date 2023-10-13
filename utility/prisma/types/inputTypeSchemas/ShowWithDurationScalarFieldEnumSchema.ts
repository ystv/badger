import { z } from "zod";

export const ShowWithDurationScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "start",
  "durationSeconds",
  "end",
  "version",
]);

export default ShowWithDurationScalarFieldEnumSchema;
