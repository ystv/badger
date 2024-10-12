import { z } from "zod";
import { zfd } from "zod-form-data";

export const dateFormat = "YYYY-MM-DD HH:mm";

export const schema = zfd.formData({
  id: z.coerce.number().int(),
  name: z.string(),
  start: z.coerce.date(),
});
