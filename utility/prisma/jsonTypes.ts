interface MediaMetaValue {
  fileName: string;
  fileType: "image";
}

declare global {
  namespace PrismaJson {
    type MetadataValue = string | MediaMetaValue;
  }
}

export {};
