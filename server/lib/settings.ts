import { SettingKey } from "@bowser/prisma/client";
import { z } from "zod";

export const SettingsCategoriesSchema = z.enum(["YouTube"]);
export type SettingsCategory = z.infer<typeof SettingsCategoriesSchema>;

export const SettingsCategories: Record<SettingsCategory, SettingKey[]> = {
  YouTube: [
    SettingKey.TitleMetadataID,
    SettingKey.DescriptionMetadataID,
    SettingKey.ThumbnailMetadataID,
    SettingKey.DefaultDescription,
    SettingKey.DefaultResolution,
    SettingKey.DefaultIngestionType,
    SettingKey.DefaultFrameRate,
  ],
};

export const SettingsTypesSchema = z.object({
  [SettingKey.TitleMetadataID]: z.coerce.number(),
  [SettingKey.DescriptionMetadataID]: z.coerce.number(),
  [SettingKey.ThumbnailMetadataID]: z.coerce.number(),
  [SettingKey.DefaultDescription]: z.string(),
  [SettingKey.DefaultResolution]: z.enum([
    "240p",
    "360p",
    "480p",
    "720p",
    "1080p",
    "1440p",
    "2160p",
  ]),
  [SettingKey.DefaultIngestionType]: z.enum(["rtmp", "dash"]),
  [SettingKey.DefaultFrameRate]: z.enum(["30fps", "60fps"]),
});

export type SettingsTypes = z.infer<typeof SettingsTypesSchema>;

export const SettingsNames: Record<SettingKey, string> = {
  [SettingKey.TitleMetadataID]: "Title Metadata ID",
  [SettingKey.DescriptionMetadataID]: "Description Metadata ID",
  [SettingKey.ThumbnailMetadataID]: "Thumbnail Metadata ID",
  [SettingKey.DefaultDescription]: "Default Description",
  [SettingKey.DefaultResolution]: "Default Resolution",
  [SettingKey.DefaultIngestionType]: "Default Ingestion Type",
  [SettingKey.DefaultFrameRate]: "Default Frame Rate",
};

export const SETTINGS_DEFAULT_VALUES: {
  [K in keyof SettingsTypes]?: SettingsTypes[K];
} = {
  [SettingKey.DefaultFrameRate]: "30fps",
  [SettingKey.DefaultResolution]: "1080p",
  [SettingKey.TitleMetadataID]: 0,
  [SettingKey.DescriptionMetadataID]: 0,
  [SettingKey.ThumbnailMetadataID]: 0,
  [SettingKey.DefaultDescription]: "",
};
