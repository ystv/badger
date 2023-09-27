import { z } from "zod";

export const MetadataFieldScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "type",
  "target",
  "archived",
]);

export default MetadataFieldScalarFieldEnumSchema;
