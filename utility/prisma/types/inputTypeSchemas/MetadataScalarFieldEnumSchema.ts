import { z } from "zod";

export const MetadataScalarFieldEnumSchema = z.enum([
  "id",
  "value",
  "fieldId",
  "showId",
  "rundownId",
]);

export default MetadataScalarFieldEnumSchema;
