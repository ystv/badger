import type { AssetTypeType } from "bowser-server/lib/db/types/inputTypeSchemas/AssetTypeSchema";

const AssetListNames: { [K in AssetTypeType]: string } = {
  Still: "Stills",
  Graphic: "Graphics",
  SoundEffect: "Sound Effects",
  Music: "Music",
};

export const VMIX_NAMES = {
  VTS_LIST: "VTs",
  ASSET_LIST: AssetListNames,
};
