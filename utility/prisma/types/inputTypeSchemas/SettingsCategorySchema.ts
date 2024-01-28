import { z } from "zod";

export const SettingsCategorySchema = z.enum(["YouTube"]);

export type SettingsCategoryType = `${z.infer<typeof SettingsCategorySchema>}`;

export default SettingsCategorySchema;
