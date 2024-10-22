import { z } from "zod";
import { Prisma } from "../../client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput =
  | Prisma.JsonValue
  | null
  | "JsonNull"
  | "DbNull"
  | Prisma.NullTypes.DbNull
  | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === "DbNull") return Prisma.DbNull;
  if (v === "JsonNull") return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ]),
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal("DbNull"), z.literal("JsonNull")])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(
  () =>
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
      z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
      z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    ]),
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "email",
  "isActive",
  "permissions",
]);

export const IdentityScalarFieldEnumSchema = z.enum([
  "id",
  "provider",
  "identityID",
  "userID",
]);

export const ConnectionScalarFieldEnumSchema = z.enum([
  "id",
  "userId",
  "target",
  "refreshToken",
]);

export const ShowScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "start",
  "version",
  "ytStreamID",
  "ytBroadcastID",
]);

export const RundownScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "showId",
  "order",
  "ytBroadcastID",
]);

export const RundownItemScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "rundownId",
  "order",
  "durationSeconds",
  "type",
  "notes",
  "mediaId",
]);

export const ContinuityItemScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "order",
  "showId",
  "durationSeconds",
  "ytBroadcastID",
  "mediaId",
]);

export const MetadataFieldScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "type",
  "target",
  "archived",
  "default",
]);

export const MetadataScalarFieldEnumSchema = z.enum([
  "id",
  "value",
  "fieldId",
  "showId",
  "rundownId",
  "mediaId",
]);

export const SettingScalarFieldEnumSchema = z.enum(["id", "key", "value"]);

export const AssetScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "category",
  "order",
  "rundownId",
  "mediaId",
]);

export const MediaScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "rawPath",
  "path",
  "durationSeconds",
  "state",
]);

export const MediaProcessingTaskScalarFieldEnumSchema = z.enum([
  "id",
  "media_id",
  "description",
  "additionalInfo",
  "state",
]);

export const BaseJobScalarFieldEnumSchema = z.enum([
  "id",
  "workerId",
  "state",
  "createdAt",
  "startedAt",
  "completedAt",
  "manuallyTriggered",
  "externalJobProvider",
  "externalJobID",
  "jobType",
  "jobPayload",
]);

export const ShowWithDurationScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "start",
  "durationSeconds",
  "end",
  "version",
  "ytStreamID",
  "ytBroadcastID",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const JsonNullValueInputSchema = z
  .enum(["JsonNull"])
  .transform((value) => (value === "JsonNull" ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const JsonNullValueFilterSchema = z
  .enum(["DbNull", "JsonNull", "AnyNull"])
  .transform((value) =>
    value === "JsonNull"
      ? Prisma.JsonNull
      : value === "DbNull"
        ? Prisma.JsonNull
        : value === "AnyNull"
          ? Prisma.AnyNull
          : value,
  );

export const PermissionSchema = z.enum([
  "Basic",
  "ManageUsers",
  "ManageShows",
  "ArchiveMedia",
  "ManageYouTubeStreams",
  "ManageSystemSettings",
  "ManageJobs",
  "SUDO",
]);

export type PermissionType = `${z.infer<typeof PermissionSchema>}`;

export const ConnectionTargetSchema = z.enum(["google"]);

export type ConnectionTargetType = `${z.infer<typeof ConnectionTargetSchema>}`;

export const RundownItemTypeSchema = z.enum(["Segment", "VT"]);

export type RundownItemTypeType = `${z.infer<typeof RundownItemTypeSchema>}`;

export const MetadataTargetTypeSchema = z.enum([
  "Show",
  "Rundown",
  "ShowOrRundown",
]);

export type MetadataTargetTypeType =
  `${z.infer<typeof MetadataTargetTypeSchema>}`;

export const MetadataValueTypeSchema = z.enum([
  "Text",
  "LongText",
  "URL",
  "Media",
]);

export type MetadataValueTypeType =
  `${z.infer<typeof MetadataValueTypeSchema>}`;

export const SettingKeySchema = z.enum([
  "TitleMetadataID",
  "DescriptionMetadataID",
  "DefaultResolution",
  "DefaultFrameRate",
  "DefaultIngestionType",
  "DefaultDescription",
]);

export type SettingKeyType = `${z.infer<typeof SettingKeySchema>}`;

export const MediaStateSchema = z.enum([
  "Pending",
  "Processing",
  "Ready",
  "ReadyWithWarnings",
  "ProcessingFailed",
  "Archived",
]);

export type MediaStateType = `${z.infer<typeof MediaStateSchema>}`;

export const MediaProcessingTaskStateSchema = z.enum([
  "Pending",
  "Running",
  "Complete",
  "Failed",
  "Warning",
]);

export type MediaProcessingTaskStateType =
  `${z.infer<typeof MediaProcessingTaskStateSchema>}`;

export const JobStateSchema = z.enum([
  "Pending",
  "Running",
  "Complete",
  "Failed",
]);

export type JobStateType = `${z.infer<typeof JobStateSchema>}`;

export const JobTypeSchema = z.enum([
  "LoadAssetJob",
  "ProcessMediaJob",
  "DummyTestJob",
]);

export type JobTypeType = `${z.infer<typeof JobTypeSchema>}`;

export const MediaFileSourceTypeSchema = z.enum(["Tus", "GoogleDrive", "S3"]);

export type MediaFileSourceTypeType =
  `${z.infer<typeof MediaFileSourceTypeSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  permissions: PermissionSchema.array(),
  id: z.number().int(),
  name: z.string(),
  email: z.string().nullable(),
  isActive: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// IDENTITY SCHEMA
/////////////////////////////////////////

export const IdentitySchema = z.object({
  id: z.number().int(),
  provider: z.string(),
  identityID: z.string(),
  userID: z.number().int(),
});

export type Identity = z.infer<typeof IdentitySchema>;

/////////////////////////////////////////
// CONNECTION SCHEMA
/////////////////////////////////////////

export const ConnectionSchema = z.object({
  target: ConnectionTargetSchema,
  id: z.number().int(),
  userId: z.number().int(),
  refreshToken: z.string(),
});

export type Connection = z.infer<typeof ConnectionSchema>;

/////////////////////////////////////////
// SHOW SCHEMA
/////////////////////////////////////////

export const ShowSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  start: z.coerce.date(),
  /**
   * The version of the show. This is incremented every time the show, or any of its dependent data, is changed.
   * This is used by Desktop to watch for changes.
   */
  version: z.number().int(),
  ytStreamID: z.string().nullable(),
  ytBroadcastID: z.string().nullable(),
});

export type Show = z.infer<typeof ShowSchema>;

/////////////////////////////////////////
// RUNDOWN SCHEMA
/////////////////////////////////////////

export const RundownSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  showId: z.number().int(),
  order: z.number().int(),
  ytBroadcastID: z.string().nullable(),
});

export type Rundown = z.infer<typeof RundownSchema>;

/////////////////////////////////////////
// RUNDOWN ITEM SCHEMA
/////////////////////////////////////////

export const RundownItemSchema = z.object({
  type: RundownItemTypeSchema,
  id: z.number().int(),
  name: z.string(),
  rundownId: z.number().int(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  notes: z.string(),
  mediaId: z.number().int().nullable(),
});

export type RundownItem = z.infer<typeof RundownItemSchema>;

/////////////////////////////////////////
// CONTINUITY ITEM SCHEMA
/////////////////////////////////////////

export const ContinuityItemSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  order: z.number().int(),
  showId: z.number().int(),
  durationSeconds: z.number().int(),
  ytBroadcastID: z.string().nullable(),
  mediaId: z.number().int().nullable(),
});

export type ContinuityItem = z.infer<typeof ContinuityItemSchema>;

/////////////////////////////////////////
// METADATA FIELD SCHEMA
/////////////////////////////////////////

export const MetadataFieldSchema = z.object({
  type: MetadataValueTypeSchema,
  target: MetadataTargetTypeSchema,
  id: z.number().int(),
  name: z.string(),
  archived: z.boolean(),
  default: z.boolean(),
});

export type MetadataField = z.infer<typeof MetadataFieldSchema>;

/////////////////////////////////////////
// METADATA SCHEMA
/////////////////////////////////////////

export const MetadataSchema = z.object({
  id: z.number().int(),
  /**
   * The metadata value. The type depends on the field value type:
   * Text, LongText, URL: String
   * Media: object - see the type definition
   * [MetadataValue]
   */
  value: JsonValueSchema,
  fieldId: z.number().int(),
  showId: z.number().int().nullable(),
  rundownId: z.number().int().nullable(),
  mediaId: z.number().int().nullable(),
});

export type Metadata = z.infer<typeof MetadataSchema>;

/////////////////////////////////////////
// SETTING SCHEMA
/////////////////////////////////////////

export const SettingSchema = z.object({
  key: SettingKeySchema,
  id: z.number().int(),
  value: JsonValueSchema,
});

export type Setting = z.infer<typeof SettingSchema>;

/////////////////////////////////////////
// ASSET SCHEMA
/////////////////////////////////////////

export const AssetSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  category: z.string(),
  order: z.number().int(),
  rundownId: z.number().int(),
  mediaId: z.number().int(),
});

export type Asset = z.infer<typeof AssetSchema>;

/////////////////////////////////////////
// MEDIA SCHEMA
/////////////////////////////////////////

export const MediaSchema = z.object({
  state: MediaStateSchema,
  id: z.number().int(),
  name: z.string(),
  rawPath: z.string(),
  path: z.string().nullable(),
  durationSeconds: z.number().int(),
});

export type Media = z.infer<typeof MediaSchema>;

/////////////////////////////////////////
// MEDIA PROCESSING TASK SCHEMA
/////////////////////////////////////////

export const MediaProcessingTaskSchema = z.object({
  state: MediaProcessingTaskStateSchema,
  id: z.number().int(),
  media_id: z.number().int(),
  description: z.string(),
  additionalInfo: z.string(),
});

export type MediaProcessingTask = z.infer<typeof MediaProcessingTaskSchema>;

/////////////////////////////////////////
// BASE JOB SCHEMA
/////////////////////////////////////////

export const BaseJobSchema = z.object({
  state: JobStateSchema,
  jobType: JobTypeSchema,
  id: z.number().int(),
  workerId: z.string().nullable(),
  createdAt: z.coerce.date(),
  startedAt: z.coerce.date().nullable(),
  completedAt: z.coerce.date().nullable(),
  manuallyTriggered: z.boolean(),
  externalJobProvider: z.string().nullable(),
  /**
   * The ID of the job in the external job execution system (e.g. Nomad)
   */
  externalJobID: z.string().nullable(),
  /**
   * [JobPayload]
   */
  jobPayload: JsonValueSchema,
});

export type BaseJob = z.infer<typeof BaseJobSchema>;

/////////////////////////////////////////
// SHOW WITH DURATION SCHEMA
/////////////////////////////////////////

export const ShowWithDurationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  start: z.coerce.date(),
  durationSeconds: z.number().int(),
  end: z.coerce.date(),
  /**
   * The version of the show. This is incremented every time the show, or any of its dependent data, is changed.
   * This is used by Desktop to watch for changes.
   */
  version: z.number().int(),
  ytStreamID: z.string().nullable(),
  ytBroadcastID: z.string().nullable(),
});

export type ShowWithDuration = z.infer<typeof ShowWithDurationSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    identities: z
      .union([z.boolean(), z.lazy(() => IdentityFindManyArgsSchema)])
      .optional(),
    connections: z
      .union([z.boolean(), z.lazy(() => ConnectionFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      identities: z.boolean().optional(),
      connections: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    isActive: z.boolean().optional(),
    permissions: z.boolean().optional(),
    identities: z
      .union([z.boolean(), z.lazy(() => IdentityFindManyArgsSchema)])
      .optional(),
    connections: z
      .union([z.boolean(), z.lazy(() => ConnectionFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// IDENTITY
//------------------------------------------------------

export const IdentityIncludeSchema: z.ZodType<Prisma.IdentityInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const IdentityArgsSchema: z.ZodType<Prisma.IdentityDefaultArgs> = z
  .object({
    select: z.lazy(() => IdentitySelectSchema).optional(),
    include: z.lazy(() => IdentityIncludeSchema).optional(),
  })
  .strict();

export const IdentitySelectSchema: z.ZodType<Prisma.IdentitySelect> = z
  .object({
    id: z.boolean().optional(),
    provider: z.boolean().optional(),
    identityID: z.boolean().optional(),
    userID: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// CONNECTION
//------------------------------------------------------

export const ConnectionIncludeSchema: z.ZodType<Prisma.ConnectionInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const ConnectionArgsSchema: z.ZodType<Prisma.ConnectionDefaultArgs> = z
  .object({
    select: z.lazy(() => ConnectionSelectSchema).optional(),
    include: z.lazy(() => ConnectionIncludeSchema).optional(),
  })
  .strict();

export const ConnectionSelectSchema: z.ZodType<Prisma.ConnectionSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    target: z.boolean().optional(),
    refreshToken: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// SHOW
//------------------------------------------------------

export const ShowIncludeSchema: z.ZodType<Prisma.ShowInclude> = z
  .object({
    rundowns: z
      .union([z.boolean(), z.lazy(() => RundownFindManyArgsSchema)])
      .optional(),
    continuityItems: z
      .union([z.boolean(), z.lazy(() => ContinuityItemFindManyArgsSchema)])
      .optional(),
    metadata: z
      .union([z.boolean(), z.lazy(() => MetadataFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ShowCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const ShowArgsSchema: z.ZodType<Prisma.ShowDefaultArgs> = z
  .object({
    select: z.lazy(() => ShowSelectSchema).optional(),
    include: z.lazy(() => ShowIncludeSchema).optional(),
  })
  .strict();

export const ShowCountOutputTypeArgsSchema: z.ZodType<Prisma.ShowCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ShowCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ShowCountOutputTypeSelectSchema: z.ZodType<Prisma.ShowCountOutputTypeSelect> =
  z
    .object({
      rundowns: z.boolean().optional(),
      continuityItems: z.boolean().optional(),
      metadata: z.boolean().optional(),
    })
    .strict();

export const ShowSelectSchema: z.ZodType<Prisma.ShowSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    start: z.boolean().optional(),
    version: z.boolean().optional(),
    ytStreamID: z.boolean().optional(),
    ytBroadcastID: z.boolean().optional(),
    rundowns: z
      .union([z.boolean(), z.lazy(() => RundownFindManyArgsSchema)])
      .optional(),
    continuityItems: z
      .union([z.boolean(), z.lazy(() => ContinuityItemFindManyArgsSchema)])
      .optional(),
    metadata: z
      .union([z.boolean(), z.lazy(() => MetadataFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ShowCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// RUNDOWN
//------------------------------------------------------

export const RundownIncludeSchema: z.ZodType<Prisma.RundownInclude> = z
  .object({
    show: z.union([z.boolean(), z.lazy(() => ShowArgsSchema)]).optional(),
    items: z
      .union([z.boolean(), z.lazy(() => RundownItemFindManyArgsSchema)])
      .optional(),
    assets: z
      .union([z.boolean(), z.lazy(() => AssetFindManyArgsSchema)])
      .optional(),
    metadata: z
      .union([z.boolean(), z.lazy(() => MetadataFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => RundownCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const RundownArgsSchema: z.ZodType<Prisma.RundownDefaultArgs> = z
  .object({
    select: z.lazy(() => RundownSelectSchema).optional(),
    include: z.lazy(() => RundownIncludeSchema).optional(),
  })
  .strict();

export const RundownCountOutputTypeArgsSchema: z.ZodType<Prisma.RundownCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => RundownCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const RundownCountOutputTypeSelectSchema: z.ZodType<Prisma.RundownCountOutputTypeSelect> =
  z
    .object({
      items: z.boolean().optional(),
      assets: z.boolean().optional(),
      metadata: z.boolean().optional(),
    })
    .strict();

export const RundownSelectSchema: z.ZodType<Prisma.RundownSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    showId: z.boolean().optional(),
    order: z.boolean().optional(),
    ytBroadcastID: z.boolean().optional(),
    show: z.union([z.boolean(), z.lazy(() => ShowArgsSchema)]).optional(),
    items: z
      .union([z.boolean(), z.lazy(() => RundownItemFindManyArgsSchema)])
      .optional(),
    assets: z
      .union([z.boolean(), z.lazy(() => AssetFindManyArgsSchema)])
      .optional(),
    metadata: z
      .union([z.boolean(), z.lazy(() => MetadataFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => RundownCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// RUNDOWN ITEM
//------------------------------------------------------

export const RundownItemIncludeSchema: z.ZodType<Prisma.RundownItemInclude> = z
  .object({
    media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
    rundown: z.union([z.boolean(), z.lazy(() => RundownArgsSchema)]).optional(),
  })
  .strict();

export const RundownItemArgsSchema: z.ZodType<Prisma.RundownItemDefaultArgs> = z
  .object({
    select: z.lazy(() => RundownItemSelectSchema).optional(),
    include: z.lazy(() => RundownItemIncludeSchema).optional(),
  })
  .strict();

export const RundownItemSelectSchema: z.ZodType<Prisma.RundownItemSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    rundownId: z.boolean().optional(),
    order: z.boolean().optional(),
    durationSeconds: z.boolean().optional(),
    type: z.boolean().optional(),
    notes: z.boolean().optional(),
    mediaId: z.boolean().optional(),
    media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
    rundown: z.union([z.boolean(), z.lazy(() => RundownArgsSchema)]).optional(),
  })
  .strict();

// CONTINUITY ITEM
//------------------------------------------------------

export const ContinuityItemIncludeSchema: z.ZodType<Prisma.ContinuityItemInclude> =
  z
    .object({
      media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
      show: z.union([z.boolean(), z.lazy(() => ShowArgsSchema)]).optional(),
    })
    .strict();

export const ContinuityItemArgsSchema: z.ZodType<Prisma.ContinuityItemDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ContinuityItemSelectSchema).optional(),
      include: z.lazy(() => ContinuityItemIncludeSchema).optional(),
    })
    .strict();

export const ContinuityItemSelectSchema: z.ZodType<Prisma.ContinuityItemSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      order: z.boolean().optional(),
      showId: z.boolean().optional(),
      durationSeconds: z.boolean().optional(),
      ytBroadcastID: z.boolean().optional(),
      mediaId: z.boolean().optional(),
      media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
      show: z.union([z.boolean(), z.lazy(() => ShowArgsSchema)]).optional(),
    })
    .strict();

// METADATA FIELD
//------------------------------------------------------

export const MetadataFieldIncludeSchema: z.ZodType<Prisma.MetadataFieldInclude> =
  z
    .object({
      values: z
        .union([z.boolean(), z.lazy(() => MetadataFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => MetadataFieldCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const MetadataFieldArgsSchema: z.ZodType<Prisma.MetadataFieldDefaultArgs> =
  z
    .object({
      select: z.lazy(() => MetadataFieldSelectSchema).optional(),
      include: z.lazy(() => MetadataFieldIncludeSchema).optional(),
    })
    .strict();

export const MetadataFieldCountOutputTypeArgsSchema: z.ZodType<Prisma.MetadataFieldCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => MetadataFieldCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const MetadataFieldCountOutputTypeSelectSchema: z.ZodType<Prisma.MetadataFieldCountOutputTypeSelect> =
  z
    .object({
      values: z.boolean().optional(),
    })
    .strict();

export const MetadataFieldSelectSchema: z.ZodType<Prisma.MetadataFieldSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      type: z.boolean().optional(),
      target: z.boolean().optional(),
      archived: z.boolean().optional(),
      default: z.boolean().optional(),
      values: z
        .union([z.boolean(), z.lazy(() => MetadataFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => MetadataFieldCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// METADATA
//------------------------------------------------------

export const MetadataIncludeSchema: z.ZodType<Prisma.MetadataInclude> = z
  .object({
    field: z
      .union([z.boolean(), z.lazy(() => MetadataFieldArgsSchema)])
      .optional(),
    show: z.union([z.boolean(), z.lazy(() => ShowArgsSchema)]).optional(),
    rundown: z.union([z.boolean(), z.lazy(() => RundownArgsSchema)]).optional(),
    media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
  })
  .strict();

export const MetadataArgsSchema: z.ZodType<Prisma.MetadataDefaultArgs> = z
  .object({
    select: z.lazy(() => MetadataSelectSchema).optional(),
    include: z.lazy(() => MetadataIncludeSchema).optional(),
  })
  .strict();

export const MetadataSelectSchema: z.ZodType<Prisma.MetadataSelect> = z
  .object({
    id: z.boolean().optional(),
    value: z.boolean().optional(),
    fieldId: z.boolean().optional(),
    showId: z.boolean().optional(),
    rundownId: z.boolean().optional(),
    mediaId: z.boolean().optional(),
    field: z
      .union([z.boolean(), z.lazy(() => MetadataFieldArgsSchema)])
      .optional(),
    show: z.union([z.boolean(), z.lazy(() => ShowArgsSchema)]).optional(),
    rundown: z.union([z.boolean(), z.lazy(() => RundownArgsSchema)]).optional(),
    media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
  })
  .strict();

// SETTING
//------------------------------------------------------

export const SettingSelectSchema: z.ZodType<Prisma.SettingSelect> = z
  .object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    value: z.boolean().optional(),
  })
  .strict();

// ASSET
//------------------------------------------------------

export const AssetIncludeSchema: z.ZodType<Prisma.AssetInclude> = z
  .object({
    media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
    rundown: z.union([z.boolean(), z.lazy(() => RundownArgsSchema)]).optional(),
  })
  .strict();

export const AssetArgsSchema: z.ZodType<Prisma.AssetDefaultArgs> = z
  .object({
    select: z.lazy(() => AssetSelectSchema).optional(),
    include: z.lazy(() => AssetIncludeSchema).optional(),
  })
  .strict();

export const AssetSelectSchema: z.ZodType<Prisma.AssetSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    category: z.boolean().optional(),
    order: z.boolean().optional(),
    rundownId: z.boolean().optional(),
    mediaId: z.boolean().optional(),
    media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
    rundown: z.union([z.boolean(), z.lazy(() => RundownArgsSchema)]).optional(),
  })
  .strict();

// MEDIA
//------------------------------------------------------

export const MediaIncludeSchema: z.ZodType<Prisma.MediaInclude> = z
  .object({
    rundownItems: z
      .union([z.boolean(), z.lazy(() => RundownItemFindManyArgsSchema)])
      .optional(),
    continuityItems: z
      .union([z.boolean(), z.lazy(() => ContinuityItemFindManyArgsSchema)])
      .optional(),
    tasks: z
      .union([z.boolean(), z.lazy(() => MediaProcessingTaskFindManyArgsSchema)])
      .optional(),
    assets: z
      .union([z.boolean(), z.lazy(() => AssetFindManyArgsSchema)])
      .optional(),
    metadata: z
      .union([z.boolean(), z.lazy(() => MetadataFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => MediaCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const MediaArgsSchema: z.ZodType<Prisma.MediaDefaultArgs> = z
  .object({
    select: z.lazy(() => MediaSelectSchema).optional(),
    include: z.lazy(() => MediaIncludeSchema).optional(),
  })
  .strict();

export const MediaCountOutputTypeArgsSchema: z.ZodType<Prisma.MediaCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => MediaCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const MediaCountOutputTypeSelectSchema: z.ZodType<Prisma.MediaCountOutputTypeSelect> =
  z
    .object({
      rundownItems: z.boolean().optional(),
      continuityItems: z.boolean().optional(),
      tasks: z.boolean().optional(),
      assets: z.boolean().optional(),
      metadata: z.boolean().optional(),
    })
    .strict();

export const MediaSelectSchema: z.ZodType<Prisma.MediaSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    rawPath: z.boolean().optional(),
    path: z.boolean().optional(),
    durationSeconds: z.boolean().optional(),
    state: z.boolean().optional(),
    rundownItems: z
      .union([z.boolean(), z.lazy(() => RundownItemFindManyArgsSchema)])
      .optional(),
    continuityItems: z
      .union([z.boolean(), z.lazy(() => ContinuityItemFindManyArgsSchema)])
      .optional(),
    tasks: z
      .union([z.boolean(), z.lazy(() => MediaProcessingTaskFindManyArgsSchema)])
      .optional(),
    assets: z
      .union([z.boolean(), z.lazy(() => AssetFindManyArgsSchema)])
      .optional(),
    metadata: z
      .union([z.boolean(), z.lazy(() => MetadataFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => MediaCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// MEDIA PROCESSING TASK
//------------------------------------------------------

export const MediaProcessingTaskIncludeSchema: z.ZodType<Prisma.MediaProcessingTaskInclude> =
  z
    .object({
      media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
    })
    .strict();

export const MediaProcessingTaskArgsSchema: z.ZodType<Prisma.MediaProcessingTaskDefaultArgs> =
  z
    .object({
      select: z.lazy(() => MediaProcessingTaskSelectSchema).optional(),
      include: z.lazy(() => MediaProcessingTaskIncludeSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskSelectSchema: z.ZodType<Prisma.MediaProcessingTaskSelect> =
  z
    .object({
      id: z.boolean().optional(),
      media_id: z.boolean().optional(),
      description: z.boolean().optional(),
      additionalInfo: z.boolean().optional(),
      state: z.boolean().optional(),
      media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
    })
    .strict();

// BASE JOB
//------------------------------------------------------

export const BaseJobSelectSchema: z.ZodType<Prisma.BaseJobSelect> = z
  .object({
    id: z.boolean().optional(),
    workerId: z.boolean().optional(),
    state: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    startedAt: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    manuallyTriggered: z.boolean().optional(),
    externalJobProvider: z.boolean().optional(),
    externalJobID: z.boolean().optional(),
    jobType: z.boolean().optional(),
    jobPayload: z.boolean().optional(),
  })
  .strict();

// SHOW WITH DURATION
//------------------------------------------------------

export const ShowWithDurationSelectSchema: z.ZodType<Prisma.ShowWithDurationSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      start: z.boolean().optional(),
      durationSeconds: z.boolean().optional(),
      end: z.boolean().optional(),
      version: z.boolean().optional(),
      ytStreamID: z.boolean().optional(),
      ytBroadcastID: z.boolean().optional(),
    })
    .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    isActive: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    permissions: z
      .lazy(() => EnumPermissionNullableListFilterSchema)
      .optional(),
    identities: z.lazy(() => IdentityListRelationFilterSchema).optional(),
    connections: z.lazy(() => ConnectionListRelationFilterSchema).optional(),
  })
  .strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
      permissions: z.lazy(() => SortOrderSchema).optional(),
      identities: z
        .lazy(() => IdentityOrderByRelationAggregateInputSchema)
        .optional(),
      connections: z
        .lazy(() => ConnectionOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          email: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          isActive: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          permissions: z
            .lazy(() => EnumPermissionNullableListFilterSchema)
            .optional(),
          identities: z.lazy(() => IdentityListRelationFilterSchema).optional(),
          connections: z
            .lazy(() => ConnectionListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
      permissions: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      email: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      isActive: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      permissions: z
        .lazy(() => EnumPermissionNullableListFilterSchema)
        .optional(),
    })
    .strict();

export const IdentityWhereInputSchema: z.ZodType<Prisma.IdentityWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => IdentityWhereInputSchema),
        z.lazy(() => IdentityWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => IdentityWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => IdentityWhereInputSchema),
        z.lazy(() => IdentityWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    provider: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    identityID: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userID: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const IdentityOrderByWithRelationInputSchema: z.ZodType<Prisma.IdentityOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      identityID: z.lazy(() => SortOrderSchema).optional(),
      userID: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const IdentityWhereUniqueInputSchema: z.ZodType<Prisma.IdentityWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        provider_identityID: z.lazy(
          () => IdentityProviderIdentityIDCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        provider_identityID: z.lazy(
          () => IdentityProviderIdentityIDCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          provider_identityID: z
            .lazy(() => IdentityProviderIdentityIDCompoundUniqueInputSchema)
            .optional(),
          AND: z
            .union([
              z.lazy(() => IdentityWhereInputSchema),
              z.lazy(() => IdentityWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => IdentityWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => IdentityWhereInputSchema),
              z.lazy(() => IdentityWhereInputSchema).array(),
            ])
            .optional(),
          provider: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          identityID: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          userID: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const IdentityOrderByWithAggregationInputSchema: z.ZodType<Prisma.IdentityOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      identityID: z.lazy(() => SortOrderSchema).optional(),
      userID: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => IdentityCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => IdentityAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => IdentityMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => IdentityMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => IdentitySumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const IdentityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IdentityScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => IdentityScalarWhereWithAggregatesInputSchema),
          z.lazy(() => IdentityScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => IdentityScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => IdentityScalarWhereWithAggregatesInputSchema),
          z.lazy(() => IdentityScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      provider: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      identityID: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userID: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const ConnectionWhereInputSchema: z.ZodType<Prisma.ConnectionWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ConnectionWhereInputSchema),
          z.lazy(() => ConnectionWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ConnectionWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ConnectionWhereInputSchema),
          z.lazy(() => ConnectionWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      target: z
        .union([
          z.lazy(() => EnumConnectionTargetFilterSchema),
          z.lazy(() => ConnectionTargetSchema),
        ])
        .optional(),
      refreshToken: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ConnectionOrderByWithRelationInputSchema: z.ZodType<Prisma.ConnectionOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      refreshToken: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const ConnectionWhereUniqueInputSchema: z.ZodType<Prisma.ConnectionWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        userId_target: z.lazy(
          () => ConnectionUserIdTargetCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        userId_target: z.lazy(
          () => ConnectionUserIdTargetCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          userId_target: z
            .lazy(() => ConnectionUserIdTargetCompoundUniqueInputSchema)
            .optional(),
          AND: z
            .union([
              z.lazy(() => ConnectionWhereInputSchema),
              z.lazy(() => ConnectionWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ConnectionWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ConnectionWhereInputSchema),
              z.lazy(() => ConnectionWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          target: z
            .union([
              z.lazy(() => EnumConnectionTargetFilterSchema),
              z.lazy(() => ConnectionTargetSchema),
            ])
            .optional(),
          refreshToken: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const ConnectionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConnectionOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      refreshToken: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => ConnectionCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => ConnectionAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ConnectionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ConnectionMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => ConnectionSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const ConnectionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConnectionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ConnectionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ConnectionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ConnectionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ConnectionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ConnectionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      userId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      target: z
        .union([
          z.lazy(() => EnumConnectionTargetWithAggregatesFilterSchema),
          z.lazy(() => ConnectionTargetSchema),
        ])
        .optional(),
      refreshToken: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ShowWhereInputSchema: z.ZodType<Prisma.ShowWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ShowWhereInputSchema),
        z.lazy(() => ShowWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ShowWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ShowWhereInputSchema),
        z.lazy(() => ShowWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    start: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    version: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    ytStreamID: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    ytBroadcastID: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    rundowns: z.lazy(() => RundownListRelationFilterSchema).optional(),
    continuityItems: z
      .lazy(() => ContinuityItemListRelationFilterSchema)
      .optional(),
    metadata: z.lazy(() => MetadataListRelationFilterSchema).optional(),
  })
  .strict();

export const ShowOrderByWithRelationInputSchema: z.ZodType<Prisma.ShowOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      rundowns: z
        .lazy(() => RundownOrderByRelationAggregateInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemOrderByRelationAggregateInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ShowWhereUniqueInputSchema: z.ZodType<Prisma.ShowWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ShowWhereInputSchema),
              z.lazy(() => ShowWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ShowWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ShowWhereInputSchema),
              z.lazy(() => ShowWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          start: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          version: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          ytStreamID: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          ytBroadcastID: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          rundowns: z.lazy(() => RundownListRelationFilterSchema).optional(),
          continuityItems: z
            .lazy(() => ContinuityItemListRelationFilterSchema)
            .optional(),
          metadata: z.lazy(() => MetadataListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const ShowOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShowOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => ShowCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => ShowAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ShowMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ShowMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => ShowSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const ShowScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShowScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ShowScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ShowScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ShowScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      start: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      version: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      ytStreamID: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RundownWhereInputSchema: z.ZodType<Prisma.RundownWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RundownWhereInputSchema),
        z.lazy(() => RundownWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RundownWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RundownWhereInputSchema),
        z.lazy(() => RundownWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    showId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    ytBroadcastID: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    show: z
      .union([
        z.lazy(() => ShowRelationFilterSchema),
        z.lazy(() => ShowWhereInputSchema),
      ])
      .optional(),
    items: z.lazy(() => RundownItemListRelationFilterSchema).optional(),
    assets: z.lazy(() => AssetListRelationFilterSchema).optional(),
    metadata: z.lazy(() => MetadataListRelationFilterSchema).optional(),
  })
  .strict();

export const RundownOrderByWithRelationInputSchema: z.ZodType<Prisma.RundownOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
      items: z
        .lazy(() => RundownItemOrderByRelationAggregateInputSchema)
        .optional(),
      assets: z.lazy(() => AssetOrderByRelationAggregateInputSchema).optional(),
      metadata: z
        .lazy(() => MetadataOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const RundownWhereUniqueInputSchema: z.ZodType<Prisma.RundownWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => RundownWhereInputSchema),
              z.lazy(() => RundownWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => RundownWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => RundownWhereInputSchema),
              z.lazy(() => RundownWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          showId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          order: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          ytBroadcastID: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          show: z
            .union([
              z.lazy(() => ShowRelationFilterSchema),
              z.lazy(() => ShowWhereInputSchema),
            ])
            .optional(),
          items: z.lazy(() => RundownItemListRelationFilterSchema).optional(),
          assets: z.lazy(() => AssetListRelationFilterSchema).optional(),
          metadata: z.lazy(() => MetadataListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const RundownOrderByWithAggregationInputSchema: z.ZodType<Prisma.RundownOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => RundownCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => RundownAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => RundownMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => RundownMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => RundownSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const RundownScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RundownScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RundownScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RundownScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RundownScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RundownScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RundownScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      showId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      order: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RundownItemWhereInputSchema: z.ZodType<Prisma.RundownItemWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RundownItemWhereInputSchema),
          z.lazy(() => RundownItemWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RundownItemWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RundownItemWhereInputSchema),
          z.lazy(() => RundownItemWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      rundownId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      durationSeconds: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      type: z
        .union([
          z.lazy(() => EnumRundownItemTypeFilterSchema),
          z.lazy(() => RundownItemTypeSchema),
        ])
        .optional(),
      notes: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      mediaId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      media: z
        .union([
          z.lazy(() => MediaNullableRelationFilterSchema),
          z.lazy(() => MediaWhereInputSchema),
        ])
        .optional()
        .nullable(),
      rundown: z
        .union([
          z.lazy(() => RundownRelationFilterSchema),
          z.lazy(() => RundownWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownItemOrderByWithRelationInputSchema: z.ZodType<Prisma.RundownItemOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      notes: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
      rundown: z.lazy(() => RundownOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const RundownItemWhereUniqueInputSchema: z.ZodType<Prisma.RundownItemWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => RundownItemWhereInputSchema),
              z.lazy(() => RundownItemWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => RundownItemWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => RundownItemWhereInputSchema),
              z.lazy(() => RundownItemWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          rundownId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          order: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          durationSeconds: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          type: z
            .union([
              z.lazy(() => EnumRundownItemTypeFilterSchema),
              z.lazy(() => RundownItemTypeSchema),
            ])
            .optional(),
          notes: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          mediaId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          media: z
            .union([
              z.lazy(() => MediaNullableRelationFilterSchema),
              z.lazy(() => MediaWhereInputSchema),
            ])
            .optional()
            .nullable(),
          rundown: z
            .union([
              z.lazy(() => RundownRelationFilterSchema),
              z.lazy(() => RundownWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const RundownItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.RundownItemOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      notes: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => RundownItemCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => RundownItemAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => RundownItemMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => RundownItemMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => RundownItemSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const RundownItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RundownItemScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RundownItemScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RundownItemScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RundownItemScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RundownItemScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RundownItemScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      rundownId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      order: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      durationSeconds: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      type: z
        .union([
          z.lazy(() => EnumRundownItemTypeWithAggregatesFilterSchema),
          z.lazy(() => RundownItemTypeSchema),
        ])
        .optional(),
      notes: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      mediaId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ContinuityItemWhereInputSchema: z.ZodType<Prisma.ContinuityItemWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContinuityItemWhereInputSchema),
          z.lazy(() => ContinuityItemWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContinuityItemWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContinuityItemWhereInputSchema),
          z.lazy(() => ContinuityItemWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      showId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      durationSeconds: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      ytBroadcastID: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      mediaId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      media: z
        .union([
          z.lazy(() => MediaNullableRelationFilterSchema),
          z.lazy(() => MediaWhereInputSchema),
        ])
        .optional()
        .nullable(),
      show: z
        .union([
          z.lazy(() => ShowRelationFilterSchema),
          z.lazy(() => ShowWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ContinuityItemOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
      show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const ContinuityItemWhereUniqueInputSchema: z.ZodType<Prisma.ContinuityItemWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ContinuityItemWhereInputSchema),
              z.lazy(() => ContinuityItemWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ContinuityItemWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ContinuityItemWhereInputSchema),
              z.lazy(() => ContinuityItemWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          order: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          showId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          durationSeconds: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          ytBroadcastID: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          mediaId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          media: z
            .union([
              z.lazy(() => MediaNullableRelationFilterSchema),
              z.lazy(() => MediaWhereInputSchema),
            ])
            .optional()
            .nullable(),
          show: z
            .union([
              z.lazy(() => ShowRelationFilterSchema),
              z.lazy(() => ShowWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const ContinuityItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContinuityItemOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => ContinuityItemCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => ContinuityItemAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => ContinuityItemMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => ContinuityItemMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => ContinuityItemSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ContinuityItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContinuityItemScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      order: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      showId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      durationSeconds: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataFieldWhereInputSchema: z.ZodType<Prisma.MetadataFieldWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MetadataFieldWhereInputSchema),
          z.lazy(() => MetadataFieldWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MetadataFieldWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MetadataFieldWhereInputSchema),
          z.lazy(() => MetadataFieldWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      type: z
        .union([
          z.lazy(() => EnumMetadataValueTypeFilterSchema),
          z.lazy(() => MetadataValueTypeSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => EnumMetadataTargetTypeFilterSchema),
          z.lazy(() => MetadataTargetTypeSchema),
        ])
        .optional(),
      archived: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      default: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      values: z.lazy(() => MetadataListRelationFilterSchema).optional(),
    })
    .strict();

export const MetadataFieldOrderByWithRelationInputSchema: z.ZodType<Prisma.MetadataFieldOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
      default: z.lazy(() => SortOrderSchema).optional(),
      values: z
        .lazy(() => MetadataOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const MetadataFieldWhereUniqueInputSchema: z.ZodType<Prisma.MetadataFieldWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => MetadataFieldWhereInputSchema),
              z.lazy(() => MetadataFieldWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MetadataFieldWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MetadataFieldWhereInputSchema),
              z.lazy(() => MetadataFieldWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          type: z
            .union([
              z.lazy(() => EnumMetadataValueTypeFilterSchema),
              z.lazy(() => MetadataValueTypeSchema),
            ])
            .optional(),
          target: z
            .union([
              z.lazy(() => EnumMetadataTargetTypeFilterSchema),
              z.lazy(() => MetadataTargetTypeSchema),
            ])
            .optional(),
          archived: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          default: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          values: z.lazy(() => MetadataListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const MetadataFieldOrderByWithAggregationInputSchema: z.ZodType<Prisma.MetadataFieldOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
      default: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => MetadataFieldCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => MetadataFieldAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => MetadataFieldMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => MetadataFieldMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => MetadataFieldSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const MetadataFieldScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MetadataFieldScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      type: z
        .union([
          z.lazy(() => EnumMetadataValueTypeWithAggregatesFilterSchema),
          z.lazy(() => MetadataValueTypeSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => EnumMetadataTargetTypeWithAggregatesFilterSchema),
          z.lazy(() => MetadataTargetTypeSchema),
        ])
        .optional(),
      archived: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      default: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
    })
    .strict();

export const MetadataWhereInputSchema: z.ZodType<Prisma.MetadataWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MetadataWhereInputSchema),
        z.lazy(() => MetadataWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MetadataWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MetadataWhereInputSchema),
        z.lazy(() => MetadataWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    value: z.lazy(() => JsonFilterSchema).optional(),
    fieldId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    showId: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    rundownId: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    mediaId: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    field: z
      .union([
        z.lazy(() => MetadataFieldRelationFilterSchema),
        z.lazy(() => MetadataFieldWhereInputSchema),
      ])
      .optional(),
    show: z
      .union([
        z.lazy(() => ShowNullableRelationFilterSchema),
        z.lazy(() => ShowWhereInputSchema),
      ])
      .optional()
      .nullable(),
    rundown: z
      .union([
        z.lazy(() => RundownNullableRelationFilterSchema),
        z.lazy(() => RundownWhereInputSchema),
      ])
      .optional()
      .nullable(),
    media: z
      .union([
        z.lazy(() => MediaNullableRelationFilterSchema),
        z.lazy(() => MediaWhereInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const MetadataOrderByWithRelationInputSchema: z.ZodType<Prisma.MetadataOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
      fieldId: z.lazy(() => SortOrderSchema).optional(),
      showId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      field: z
        .lazy(() => MetadataFieldOrderByWithRelationInputSchema)
        .optional(),
      show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
      rundown: z.lazy(() => RundownOrderByWithRelationInputSchema).optional(),
      media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const MetadataWhereUniqueInputSchema: z.ZodType<Prisma.MetadataWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        fieldId_showId: z.lazy(
          () => MetadataFieldIdShowIdCompoundUniqueInputSchema,
        ),
        fieldId_rundownId: z.lazy(
          () => MetadataFieldIdRundownIdCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.number().int(),
        fieldId_showId: z.lazy(
          () => MetadataFieldIdShowIdCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.number().int(),
        fieldId_rundownId: z.lazy(
          () => MetadataFieldIdRundownIdCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        fieldId_showId: z.lazy(
          () => MetadataFieldIdShowIdCompoundUniqueInputSchema,
        ),
        fieldId_rundownId: z.lazy(
          () => MetadataFieldIdRundownIdCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        fieldId_showId: z.lazy(
          () => MetadataFieldIdShowIdCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        fieldId_rundownId: z.lazy(
          () => MetadataFieldIdRundownIdCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          fieldId_showId: z
            .lazy(() => MetadataFieldIdShowIdCompoundUniqueInputSchema)
            .optional(),
          fieldId_rundownId: z
            .lazy(() => MetadataFieldIdRundownIdCompoundUniqueInputSchema)
            .optional(),
          AND: z
            .union([
              z.lazy(() => MetadataWhereInputSchema),
              z.lazy(() => MetadataWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MetadataWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MetadataWhereInputSchema),
              z.lazy(() => MetadataWhereInputSchema).array(),
            ])
            .optional(),
          value: z.lazy(() => JsonFilterSchema).optional(),
          fieldId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          showId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          rundownId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          mediaId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          field: z
            .union([
              z.lazy(() => MetadataFieldRelationFilterSchema),
              z.lazy(() => MetadataFieldWhereInputSchema),
            ])
            .optional(),
          show: z
            .union([
              z.lazy(() => ShowNullableRelationFilterSchema),
              z.lazy(() => ShowWhereInputSchema),
            ])
            .optional()
            .nullable(),
          rundown: z
            .union([
              z.lazy(() => RundownNullableRelationFilterSchema),
              z.lazy(() => RundownWhereInputSchema),
            ])
            .optional()
            .nullable(),
          media: z
            .union([
              z.lazy(() => MediaNullableRelationFilterSchema),
              z.lazy(() => MediaWhereInputSchema),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const MetadataOrderByWithAggregationInputSchema: z.ZodType<Prisma.MetadataOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
      fieldId: z.lazy(() => SortOrderSchema).optional(),
      showId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => MetadataCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => MetadataAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => MetadataMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => MetadataMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => MetadataSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const MetadataScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MetadataScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MetadataScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MetadataScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MetadataScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MetadataScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MetadataScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      value: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      fieldId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      showId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      rundownId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SettingWhereInputSchema: z.ZodType<Prisma.SettingWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SettingWhereInputSchema),
        z.lazy(() => SettingWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SettingWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SettingWhereInputSchema),
        z.lazy(() => SettingWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    key: z
      .union([
        z.lazy(() => EnumSettingKeyFilterSchema),
        z.lazy(() => SettingKeySchema),
      ])
      .optional(),
    value: z.lazy(() => JsonFilterSchema).optional(),
  })
  .strict();

export const SettingOrderByWithRelationInputSchema: z.ZodType<Prisma.SettingOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SettingWhereUniqueInputSchema: z.ZodType<Prisma.SettingWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        key: z.lazy(() => SettingKeySchema),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        key: z.lazy(() => SettingKeySchema),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          key: z.lazy(() => SettingKeySchema).optional(),
          AND: z
            .union([
              z.lazy(() => SettingWhereInputSchema),
              z.lazy(() => SettingWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SettingWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SettingWhereInputSchema),
              z.lazy(() => SettingWhereInputSchema).array(),
            ])
            .optional(),
          value: z.lazy(() => JsonFilterSchema).optional(),
        })
        .strict(),
    );

export const SettingOrderByWithAggregationInputSchema: z.ZodType<Prisma.SettingOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => SettingCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => SettingAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => SettingMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SettingMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => SettingSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const SettingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SettingScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SettingScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      key: z
        .union([
          z.lazy(() => EnumSettingKeyWithAggregatesFilterSchema),
          z.lazy(() => SettingKeySchema),
        ])
        .optional(),
      value: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
    })
    .strict();

export const AssetWhereInputSchema: z.ZodType<Prisma.AssetWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AssetWhereInputSchema),
        z.lazy(() => AssetWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AssetWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AssetWhereInputSchema),
        z.lazy(() => AssetWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    category: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    rundownId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    mediaId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    media: z
      .union([
        z.lazy(() => MediaRelationFilterSchema),
        z.lazy(() => MediaWhereInputSchema),
      ])
      .optional(),
    rundown: z
      .union([
        z.lazy(() => RundownRelationFilterSchema),
        z.lazy(() => RundownWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const AssetOrderByWithRelationInputSchema: z.ZodType<Prisma.AssetOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
      media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
      rundown: z.lazy(() => RundownOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const AssetWhereUniqueInputSchema: z.ZodType<Prisma.AssetWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => AssetWhereInputSchema),
              z.lazy(() => AssetWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => AssetWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => AssetWhereInputSchema),
              z.lazy(() => AssetWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          category: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          order: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          rundownId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          mediaId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          media: z
            .union([
              z.lazy(() => MediaRelationFilterSchema),
              z.lazy(() => MediaWhereInputSchema),
            ])
            .optional(),
          rundown: z
            .union([
              z.lazy(() => RundownRelationFilterSchema),
              z.lazy(() => RundownWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const AssetOrderByWithAggregationInputSchema: z.ZodType<Prisma.AssetOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => AssetCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => AssetAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => AssetMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => AssetMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => AssetSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const AssetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AssetScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AssetScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AssetScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AssetScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AssetScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AssetScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      category: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      order: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      rundownId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      mediaId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const MediaWhereInputSchema: z.ZodType<Prisma.MediaWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MediaWhereInputSchema),
        z.lazy(() => MediaWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MediaWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MediaWhereInputSchema),
        z.lazy(() => MediaWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    rawPath: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    path: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    durationSeconds: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    state: z
      .union([
        z.lazy(() => EnumMediaStateFilterSchema),
        z.lazy(() => MediaStateSchema),
      ])
      .optional(),
    rundownItems: z.lazy(() => RundownItemListRelationFilterSchema).optional(),
    continuityItems: z
      .lazy(() => ContinuityItemListRelationFilterSchema)
      .optional(),
    tasks: z.lazy(() => MediaProcessingTaskListRelationFilterSchema).optional(),
    assets: z.lazy(() => AssetListRelationFilterSchema).optional(),
    metadata: z.lazy(() => MetadataListRelationFilterSchema).optional(),
  })
  .strict();

export const MediaOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rawPath: z.lazy(() => SortOrderSchema).optional(),
      path: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemOrderByRelationAggregateInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemOrderByRelationAggregateInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskOrderByRelationAggregateInputSchema)
        .optional(),
      assets: z.lazy(() => AssetOrderByRelationAggregateInputSchema).optional(),
      metadata: z
        .lazy(() => MetadataOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const MediaWhereUniqueInputSchema: z.ZodType<Prisma.MediaWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => MediaWhereInputSchema),
              z.lazy(() => MediaWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MediaWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MediaWhereInputSchema),
              z.lazy(() => MediaWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          rawPath: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          path: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          durationSeconds: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          state: z
            .union([
              z.lazy(() => EnumMediaStateFilterSchema),
              z.lazy(() => MediaStateSchema),
            ])
            .optional(),
          rundownItems: z
            .lazy(() => RundownItemListRelationFilterSchema)
            .optional(),
          continuityItems: z
            .lazy(() => ContinuityItemListRelationFilterSchema)
            .optional(),
          tasks: z
            .lazy(() => MediaProcessingTaskListRelationFilterSchema)
            .optional(),
          assets: z.lazy(() => AssetListRelationFilterSchema).optional(),
          metadata: z.lazy(() => MetadataListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const MediaOrderByWithAggregationInputSchema: z.ZodType<Prisma.MediaOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rawPath: z.lazy(() => SortOrderSchema).optional(),
      path: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => MediaCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => MediaAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => MediaMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => MediaMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => MediaSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const MediaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MediaScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MediaScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      rawPath: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      path: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      state: z
        .union([
          z.lazy(() => EnumMediaStateWithAggregatesFilterSchema),
          z.lazy(() => MediaStateSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskWhereInputSchema: z.ZodType<Prisma.MediaProcessingTaskWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereInputSchema),
          z.lazy(() => MediaProcessingTaskWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MediaProcessingTaskWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereInputSchema),
          z.lazy(() => MediaProcessingTaskWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      media_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      additionalInfo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      state: z
        .union([
          z.lazy(() => EnumMediaProcessingTaskStateFilterSchema),
          z.lazy(() => MediaProcessingTaskStateSchema),
        ])
        .optional(),
      media: z
        .union([
          z.lazy(() => MediaRelationFilterSchema),
          z.lazy(() => MediaWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaProcessingTaskOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      media_id: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      additionalInfo: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskWhereUniqueInputSchema: z.ZodType<Prisma.MediaProcessingTaskWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        media_id_description: z.lazy(
          () => MediaProcessingTaskMedia_idDescriptionCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        media_id_description: z.lazy(
          () => MediaProcessingTaskMedia_idDescriptionCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          media_id_description: z
            .lazy(
              () =>
                MediaProcessingTaskMedia_idDescriptionCompoundUniqueInputSchema,
            )
            .optional(),
          AND: z
            .union([
              z.lazy(() => MediaProcessingTaskWhereInputSchema),
              z.lazy(() => MediaProcessingTaskWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MediaProcessingTaskWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MediaProcessingTaskWhereInputSchema),
              z.lazy(() => MediaProcessingTaskWhereInputSchema).array(),
            ])
            .optional(),
          media_id: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          additionalInfo: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          state: z
            .union([
              z.lazy(() => EnumMediaProcessingTaskStateFilterSchema),
              z.lazy(() => MediaProcessingTaskStateSchema),
            ])
            .optional(),
          media: z
            .union([
              z.lazy(() => MediaRelationFilterSchema),
              z.lazy(() => MediaWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const MediaProcessingTaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.MediaProcessingTaskOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      media_id: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      additionalInfo: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => MediaProcessingTaskCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => MediaProcessingTaskAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => MediaProcessingTaskMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => MediaProcessingTaskMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => MediaProcessingTaskSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const MediaProcessingTaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MediaProcessingTaskScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      media_id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      additionalInfo: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      state: z
        .union([
          z.lazy(() => EnumMediaProcessingTaskStateWithAggregatesFilterSchema),
          z.lazy(() => MediaProcessingTaskStateSchema),
        ])
        .optional(),
    })
    .strict();

export const BaseJobWhereInputSchema: z.ZodType<Prisma.BaseJobWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => BaseJobWhereInputSchema),
        z.lazy(() => BaseJobWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => BaseJobWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => BaseJobWhereInputSchema),
        z.lazy(() => BaseJobWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    workerId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    state: z
      .union([
        z.lazy(() => EnumJobStateFilterSchema),
        z.lazy(() => JobStateSchema),
      ])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    startedAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    completedAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    manuallyTriggered: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    externalJobProvider: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    externalJobID: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    jobType: z
      .union([
        z.lazy(() => EnumJobTypeFilterSchema),
        z.lazy(() => JobTypeSchema),
      ])
      .optional(),
    jobPayload: z.lazy(() => JsonFilterSchema).optional(),
  })
  .strict();

export const BaseJobOrderByWithRelationInputSchema: z.ZodType<Prisma.BaseJobOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      workerId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      completedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      manuallyTriggered: z.lazy(() => SortOrderSchema).optional(),
      externalJobProvider: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      externalJobID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      jobType: z.lazy(() => SortOrderSchema).optional(),
      jobPayload: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BaseJobWhereUniqueInputSchema: z.ZodType<Prisma.BaseJobWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => BaseJobWhereInputSchema),
              z.lazy(() => BaseJobWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => BaseJobWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => BaseJobWhereInputSchema),
              z.lazy(() => BaseJobWhereInputSchema).array(),
            ])
            .optional(),
          workerId: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          state: z
            .union([
              z.lazy(() => EnumJobStateFilterSchema),
              z.lazy(() => JobStateSchema),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          startedAt: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          completedAt: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          manuallyTriggered: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          externalJobProvider: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          externalJobID: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          jobType: z
            .union([
              z.lazy(() => EnumJobTypeFilterSchema),
              z.lazy(() => JobTypeSchema),
            ])
            .optional(),
          jobPayload: z.lazy(() => JsonFilterSchema).optional(),
        })
        .strict(),
    );

export const BaseJobOrderByWithAggregationInputSchema: z.ZodType<Prisma.BaseJobOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      workerId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      completedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      manuallyTriggered: z.lazy(() => SortOrderSchema).optional(),
      externalJobProvider: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      externalJobID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      jobType: z.lazy(() => SortOrderSchema).optional(),
      jobPayload: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => BaseJobCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => BaseJobAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => BaseJobMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => BaseJobMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => BaseJobSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const BaseJobScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BaseJobScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => BaseJobScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BaseJobScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => BaseJobScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => BaseJobScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BaseJobScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      workerId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      state: z
        .union([
          z.lazy(() => EnumJobStateWithAggregatesFilterSchema),
          z.lazy(() => JobStateSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      startedAt: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      completedAt: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      manuallyTriggered: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      externalJobProvider: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      externalJobID: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      jobType: z
        .union([
          z.lazy(() => EnumJobTypeWithAggregatesFilterSchema),
          z.lazy(() => JobTypeSchema),
        ])
        .optional(),
      jobPayload: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
    })
    .strict();

export const ShowWithDurationWhereInputSchema: z.ZodType<Prisma.ShowWithDurationWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ShowWithDurationWhereInputSchema),
          z.lazy(() => ShowWithDurationWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ShowWithDurationWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ShowWithDurationWhereInputSchema),
          z.lazy(() => ShowWithDurationWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      start: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      durationSeconds: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      end: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      version: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      ytStreamID: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const ShowWithDurationOrderByWithRelationInputSchema: z.ZodType<Prisma.ShowWithDurationOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ShowWithDurationWhereUniqueInputSchema: z.ZodType<Prisma.ShowWithDurationWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ShowWithDurationWhereInputSchema),
              z.lazy(() => ShowWithDurationWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ShowWithDurationWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ShowWithDurationWhereInputSchema),
              z.lazy(() => ShowWithDurationWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          start: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          durationSeconds: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          end: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          version: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          ytStreamID: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          ytBroadcastID: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const ShowWithDurationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShowWithDurationOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => ShowWithDurationCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => ShowWithDurationAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => ShowWithDurationMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => ShowWithDurationMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => ShowWithDurationSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ShowWithDurationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShowWithDurationScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      start: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      durationSeconds: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      end: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      version: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      ytStreamID: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    name: z.string(),
    email: z.string().optional().nullable(),
    isActive: z.boolean().optional(),
    permissions: z
      .union([
        z.lazy(() => UserCreatepermissionsInputSchema),
        z.lazy(() => PermissionSchema).array(),
      ])
      .optional(),
    identities: z
      .lazy(() => IdentityCreateNestedManyWithoutUserInputSchema)
      .optional(),
    connections: z
      .lazy(() => ConnectionCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      isActive: z.boolean().optional(),
      permissions: z
        .union([
          z.lazy(() => UserCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      identities: z
        .lazy(() => IdentityUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      connections: z
        .lazy(() => ConnectionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    permissions: z
      .union([
        z.lazy(() => UserUpdatepermissionsInputSchema),
        z.lazy(() => PermissionSchema).array(),
      ])
      .optional(),
    identities: z
      .lazy(() => IdentityUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    connections: z
      .lazy(() => ConnectionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => UserUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      identities: z
        .lazy(() => IdentityUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      connections: z
        .lazy(() => ConnectionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      isActive: z.boolean().optional(),
      permissions: z
        .union([
          z.lazy(() => UserCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => UserUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => UserUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IdentityCreateInputSchema: z.ZodType<Prisma.IdentityCreateInput> =
  z
    .object({
      provider: z.string(),
      identityID: z.string(),
      user: z.lazy(() => UserCreateNestedOneWithoutIdentitiesInputSchema),
    })
    .strict();

export const IdentityUncheckedCreateInputSchema: z.ZodType<Prisma.IdentityUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      provider: z.string(),
      identityID: z.string(),
      userID: z.number().int(),
    })
    .strict();

export const IdentityUpdateInputSchema: z.ZodType<Prisma.IdentityUpdateInput> =
  z
    .object({
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identityID: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutIdentitiesNestedInputSchema)
        .optional(),
    })
    .strict();

export const IdentityUncheckedUpdateInputSchema: z.ZodType<Prisma.IdentityUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identityID: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userID: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IdentityCreateManyInputSchema: z.ZodType<Prisma.IdentityCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      provider: z.string(),
      identityID: z.string(),
      userID: z.number().int(),
    })
    .strict();

export const IdentityUpdateManyMutationInputSchema: z.ZodType<Prisma.IdentityUpdateManyMutationInput> =
  z
    .object({
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identityID: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IdentityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IdentityUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identityID: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userID: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ConnectionCreateInputSchema: z.ZodType<Prisma.ConnectionCreateInput> =
  z
    .object({
      target: z.lazy(() => ConnectionTargetSchema),
      refreshToken: z.string(),
      user: z.lazy(() => UserCreateNestedOneWithoutConnectionsInputSchema),
    })
    .strict();

export const ConnectionUncheckedCreateInputSchema: z.ZodType<Prisma.ConnectionUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      userId: z.number().int(),
      target: z.lazy(() => ConnectionTargetSchema),
      refreshToken: z.string(),
    })
    .strict();

export const ConnectionUpdateInputSchema: z.ZodType<Prisma.ConnectionUpdateInput> =
  z
    .object({
      target: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => EnumConnectionTargetFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refreshToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutConnectionsNestedInputSchema)
        .optional(),
    })
    .strict();

export const ConnectionUncheckedUpdateInputSchema: z.ZodType<Prisma.ConnectionUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => EnumConnectionTargetFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refreshToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ConnectionCreateManyInputSchema: z.ZodType<Prisma.ConnectionCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      userId: z.number().int(),
      target: z.lazy(() => ConnectionTargetSchema),
      refreshToken: z.string(),
    })
    .strict();

export const ConnectionUpdateManyMutationInputSchema: z.ZodType<Prisma.ConnectionUpdateManyMutationInput> =
  z
    .object({
      target: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => EnumConnectionTargetFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refreshToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ConnectionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConnectionUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => EnumConnectionTargetFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refreshToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ShowCreateInputSchema: z.ZodType<Prisma.ShowCreateInput> = z
  .object({
    name: z.string(),
    start: z.coerce.date(),
    version: z.number().int().optional(),
    ytStreamID: z.string().optional().nullable(),
    ytBroadcastID: z.string().optional().nullable(),
    rundowns: z
      .lazy(() => RundownCreateNestedManyWithoutShowInputSchema)
      .optional(),
    continuityItems: z
      .lazy(() => ContinuityItemCreateNestedManyWithoutShowInputSchema)
      .optional(),
    metadata: z
      .lazy(() => MetadataCreateNestedManyWithoutShowInputSchema)
      .optional(),
  })
  .strict();

export const ShowUncheckedCreateInputSchema: z.ZodType<Prisma.ShowUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
      rundowns: z
        .lazy(() => RundownUncheckedCreateNestedManyWithoutShowInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema,
        )
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutShowInputSchema)
        .optional(),
    })
    .strict();

export const ShowUpdateInputSchema: z.ZodType<Prisma.ShowUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    start: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    version: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ytStreamID: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ytBroadcastID: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rundowns: z
      .lazy(() => RundownUpdateManyWithoutShowNestedInputSchema)
      .optional(),
    continuityItems: z
      .lazy(() => ContinuityItemUpdateManyWithoutShowNestedInputSchema)
      .optional(),
    metadata: z
      .lazy(() => MetadataUpdateManyWithoutShowNestedInputSchema)
      .optional(),
  })
  .strict();

export const ShowUncheckedUpdateInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundowns: z
        .lazy(() => RundownUncheckedUpdateManyWithoutShowNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema,
        )
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutShowNestedInputSchema)
        .optional(),
    })
    .strict();

export const ShowCreateManyInputSchema: z.ZodType<Prisma.ShowCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
    })
    .strict();

export const ShowUpdateManyMutationInputSchema: z.ZodType<Prisma.ShowUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ShowUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RundownCreateInputSchema: z.ZodType<Prisma.RundownCreateInput> = z
  .object({
    name: z.string(),
    order: z.number().int(),
    ytBroadcastID: z.string().optional().nullable(),
    show: z.lazy(() => ShowCreateNestedOneWithoutRundownsInputSchema),
    items: z
      .lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema)
      .optional(),
    assets: z
      .lazy(() => AssetCreateNestedManyWithoutRundownInputSchema)
      .optional(),
    metadata: z
      .lazy(() => MetadataCreateNestedManyWithoutRundownInputSchema)
      .optional(),
  })
  .strict();

export const RundownUncheckedCreateInputSchema: z.ZodType<Prisma.RundownUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      showId: z.number().int(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      items: z
        .lazy(
          () => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export const RundownUpdateInputSchema: z.ZodType<Prisma.RundownUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    order: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ytBroadcastID: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    show: z
      .lazy(() => ShowUpdateOneRequiredWithoutRundownsNestedInputSchema)
      .optional(),
    items: z
      .lazy(() => RundownItemUpdateManyWithoutRundownNestedInputSchema)
      .optional(),
    assets: z
      .lazy(() => AssetUpdateManyWithoutRundownNestedInputSchema)
      .optional(),
    metadata: z
      .lazy(() => MetadataUpdateManyWithoutRundownNestedInputSchema)
      .optional(),
  })
  .strict();

export const RundownUncheckedUpdateInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      items: z
        .lazy(
          () => RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownCreateManyInputSchema: z.ZodType<Prisma.RundownCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      showId: z.number().int(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
    })
    .strict();

export const RundownUpdateManyMutationInputSchema: z.ZodType<Prisma.RundownUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RundownUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RundownItemCreateInputSchema: z.ZodType<Prisma.RundownItemCreateInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutRundownItemsInputSchema)
        .optional(),
      rundown: z.lazy(() => RundownCreateNestedOneWithoutItemsInputSchema),
    })
    .strict();

export const RundownItemUncheckedCreateInputSchema: z.ZodType<Prisma.RundownItemUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rundownId: z.number().int(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const RundownItemUpdateInputSchema: z.ZodType<Prisma.RundownItemUpdateInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneWithoutRundownItemsNestedInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneRequiredWithoutItemsNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownItemUncheckedUpdateInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RundownItemCreateManyInputSchema: z.ZodType<Prisma.RundownItemCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rundownId: z.number().int(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const RundownItemUpdateManyMutationInputSchema: z.ZodType<Prisma.RundownItemUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ContinuityItemCreateInputSchema: z.ZodType<Prisma.ContinuityItemCreateInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutContinuityItemsInputSchema)
        .optional(),
      show: z.lazy(() => ShowCreateNestedOneWithoutContinuityItemsInputSchema),
    })
    .strict();

export const ContinuityItemUncheckedCreateInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      showId: z.number().int(),
      durationSeconds: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const ContinuityItemUpdateInputSchema: z.ZodType<Prisma.ContinuityItemUpdateInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      media: z
        .lazy(() => MediaUpdateOneWithoutContinuityItemsNestedInputSchema)
        .optional(),
      show: z
        .lazy(
          () => ShowUpdateOneRequiredWithoutContinuityItemsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContinuityItemUncheckedUpdateInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ContinuityItemCreateManyInputSchema: z.ZodType<Prisma.ContinuityItemCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      showId: z.number().int(),
      durationSeconds: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const ContinuityItemUpdateManyMutationInputSchema: z.ZodType<Prisma.ContinuityItemUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ContinuityItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataFieldCreateInputSchema: z.ZodType<Prisma.MetadataFieldCreateInput> =
  z
    .object({
      name: z.string(),
      type: z.lazy(() => MetadataValueTypeSchema),
      target: z.lazy(() => MetadataTargetTypeSchema),
      archived: z.boolean().optional(),
      default: z.boolean().optional(),
      values: z
        .lazy(() => MetadataCreateNestedManyWithoutFieldInputSchema)
        .optional(),
    })
    .strict();

export const MetadataFieldUncheckedCreateInputSchema: z.ZodType<Prisma.MetadataFieldUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      type: z.lazy(() => MetadataValueTypeSchema),
      target: z.lazy(() => MetadataTargetTypeSchema),
      archived: z.boolean().optional(),
      default: z.boolean().optional(),
      values: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutFieldInputSchema)
        .optional(),
    })
    .strict();

export const MetadataFieldUpdateInputSchema: z.ZodType<Prisma.MetadataFieldUpdateInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => EnumMetadataValueTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => EnumMetadataTargetTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      default: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      values: z
        .lazy(() => MetadataUpdateManyWithoutFieldNestedInputSchema)
        .optional(),
    })
    .strict();

export const MetadataFieldUncheckedUpdateInputSchema: z.ZodType<Prisma.MetadataFieldUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => EnumMetadataValueTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => EnumMetadataTargetTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      default: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      values: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutFieldNestedInputSchema)
        .optional(),
    })
    .strict();

export const MetadataFieldCreateManyInputSchema: z.ZodType<Prisma.MetadataFieldCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      type: z.lazy(() => MetadataValueTypeSchema),
      target: z.lazy(() => MetadataTargetTypeSchema),
      archived: z.boolean().optional(),
      default: z.boolean().optional(),
    })
    .strict();

export const MetadataFieldUpdateManyMutationInputSchema: z.ZodType<Prisma.MetadataFieldUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => EnumMetadataValueTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => EnumMetadataTargetTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      default: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MetadataFieldUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MetadataFieldUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => EnumMetadataValueTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => EnumMetadataTargetTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      default: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MetadataCreateInputSchema: z.ZodType<Prisma.MetadataCreateInput> =
  z
    .object({
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      field: z.lazy(() => MetadataFieldCreateNestedOneWithoutValuesInputSchema),
      show: z
        .lazy(() => ShowCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedCreateInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      fieldId: z.number().int(),
      showId: z.number().int().optional().nullable(),
      rundownId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const MetadataUpdateInputSchema: z.ZodType<Prisma.MetadataUpdateInput> =
  z
    .object({
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      field: z
        .lazy(
          () => MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema,
        )
        .optional(),
      show: z
        .lazy(() => ShowUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      fieldId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataCreateManyInputSchema: z.ZodType<Prisma.MetadataCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      fieldId: z.number().int(),
      showId: z.number().int().optional().nullable(),
      rundownId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const MetadataUpdateManyMutationInputSchema: z.ZodType<Prisma.MetadataUpdateManyMutationInput> =
  z
    .object({
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      fieldId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SettingCreateInputSchema: z.ZodType<Prisma.SettingCreateInput> = z
  .object({
    key: z.lazy(() => SettingKeySchema),
    value: z.union([
      z.lazy(() => JsonNullValueInputSchema),
      InputJsonValueSchema,
    ]),
  })
  .strict();

export const SettingUncheckedCreateInputSchema: z.ZodType<Prisma.SettingUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      key: z.lazy(() => SettingKeySchema),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
    })
    .strict();

export const SettingUpdateInputSchema: z.ZodType<Prisma.SettingUpdateInput> = z
  .object({
    key: z
      .union([
        z.lazy(() => SettingKeySchema),
        z.lazy(() => EnumSettingKeyFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    value: z
      .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
      .optional(),
  })
  .strict();

export const SettingUncheckedUpdateInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.lazy(() => SettingKeySchema),
          z.lazy(() => EnumSettingKeyFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict();

export const SettingCreateManyInputSchema: z.ZodType<Prisma.SettingCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      key: z.lazy(() => SettingKeySchema),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
    })
    .strict();

export const SettingUpdateManyMutationInputSchema: z.ZodType<Prisma.SettingUpdateManyMutationInput> =
  z
    .object({
      key: z
        .union([
          z.lazy(() => SettingKeySchema),
          z.lazy(() => EnumSettingKeyFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict();

export const SettingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.lazy(() => SettingKeySchema),
          z.lazy(() => EnumSettingKeyFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict();

export const AssetCreateInputSchema: z.ZodType<Prisma.AssetCreateInput> = z
  .object({
    name: z.string(),
    category: z.string(),
    order: z.number().int(),
    media: z.lazy(() => MediaCreateNestedOneWithoutAssetsInputSchema),
    rundown: z.lazy(() => RundownCreateNestedOneWithoutAssetsInputSchema),
  })
  .strict();

export const AssetUncheckedCreateInputSchema: z.ZodType<Prisma.AssetUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      rundownId: z.number().int(),
      mediaId: z.number().int(),
    })
    .strict();

export const AssetUpdateInputSchema: z.ZodType<Prisma.AssetUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    category: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    order: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    media: z
      .lazy(() => MediaUpdateOneRequiredWithoutAssetsNestedInputSchema)
      .optional(),
    rundown: z
      .lazy(() => RundownUpdateOneRequiredWithoutAssetsNestedInputSchema)
      .optional(),
  })
  .strict();

export const AssetUncheckedUpdateInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AssetCreateManyInputSchema: z.ZodType<Prisma.AssetCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      rundownId: z.number().int(),
      mediaId: z.number().int(),
    })
    .strict();

export const AssetUpdateManyMutationInputSchema: z.ZodType<Prisma.AssetUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AssetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaCreateInputSchema: z.ZodType<Prisma.MediaCreateInput> = z
  .object({
    name: z.string(),
    rawPath: z.string(),
    path: z.string().optional().nullable(),
    durationSeconds: z.number().int(),
    state: z.lazy(() => MediaStateSchema).optional(),
    rundownItems: z
      .lazy(() => RundownItemCreateNestedManyWithoutMediaInputSchema)
      .optional(),
    continuityItems: z
      .lazy(() => ContinuityItemCreateNestedManyWithoutMediaInputSchema)
      .optional(),
    tasks: z
      .lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema)
      .optional(),
    assets: z
      .lazy(() => AssetCreateNestedManyWithoutMediaInputSchema)
      .optional(),
    metadata: z
      .lazy(() => MetadataCreateNestedManyWithoutMediaInputSchema)
      .optional(),
  })
  .strict();

export const MediaUncheckedCreateInputSchema: z.ZodType<Prisma.MediaUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaUpdateInputSchema: z.ZodType<Prisma.MediaUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    rawPath: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    path: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    durationSeconds: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    state: z
      .union([
        z.lazy(() => MediaStateSchema),
        z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    rundownItems: z
      .lazy(() => RundownItemUpdateManyWithoutMediaNestedInputSchema)
      .optional(),
    continuityItems: z
      .lazy(() => ContinuityItemUpdateManyWithoutMediaNestedInputSchema)
      .optional(),
    tasks: z
      .lazy(() => MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema)
      .optional(),
    assets: z
      .lazy(() => AssetUpdateManyWithoutMediaNestedInputSchema)
      .optional(),
    metadata: z
      .lazy(() => MetadataUpdateManyWithoutMediaNestedInputSchema)
      .optional(),
  })
  .strict();

export const MediaUncheckedUpdateInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaCreateManyInputSchema: z.ZodType<Prisma.MediaCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
    })
    .strict();

export const MediaUpdateManyMutationInputSchema: z.ZodType<Prisma.MediaUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskCreateInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateInput> =
  z
    .object({
      description: z.string(),
      additionalInfo: z.string().optional(),
      state: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
      media: z.lazy(() => MediaCreateNestedOneWithoutTasksInputSchema),
    })
    .strict();

export const MediaProcessingTaskUncheckedCreateInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      media_id: z.number().int(),
      description: z.string(),
      additionalInfo: z.string().optional(),
      state: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskUpdateInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateInput> =
  z
    .object({
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      additionalInfo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(
            () => EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema,
          ),
        ])
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneRequiredWithoutTasksNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaProcessingTaskUncheckedUpdateInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      media_id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      additionalInfo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(
            () => EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskCreateManyInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      media_id: z.number().int(),
      description: z.string(),
      additionalInfo: z.string().optional(),
      state: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskUpdateManyMutationInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateManyMutationInput> =
  z
    .object({
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      additionalInfo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(
            () => EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      media_id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      additionalInfo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(
            () => EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const BaseJobCreateInputSchema: z.ZodType<Prisma.BaseJobCreateInput> = z
  .object({
    workerId: z.string().optional().nullable(),
    state: z.lazy(() => JobStateSchema).optional(),
    createdAt: z.coerce.date().optional(),
    startedAt: z.coerce.date().optional().nullable(),
    completedAt: z.coerce.date().optional().nullable(),
    manuallyTriggered: z.boolean().optional(),
    externalJobProvider: z.string().optional().nullable(),
    externalJobID: z.string().optional().nullable(),
    jobType: z.lazy(() => JobTypeSchema),
    jobPayload: z.union([
      z.lazy(() => JsonNullValueInputSchema),
      InputJsonValueSchema,
    ]),
  })
  .strict();

export const BaseJobUncheckedCreateInputSchema: z.ZodType<Prisma.BaseJobUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      workerId: z.string().optional().nullable(),
      state: z.lazy(() => JobStateSchema).optional(),
      createdAt: z.coerce.date().optional(),
      startedAt: z.coerce.date().optional().nullable(),
      completedAt: z.coerce.date().optional().nullable(),
      manuallyTriggered: z.boolean().optional(),
      externalJobProvider: z.string().optional().nullable(),
      externalJobID: z.string().optional().nullable(),
      jobType: z.lazy(() => JobTypeSchema),
      jobPayload: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
    })
    .strict();

export const BaseJobUpdateInputSchema: z.ZodType<Prisma.BaseJobUpdateInput> = z
  .object({
    workerId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    state: z
      .union([
        z.lazy(() => JobStateSchema),
        z.lazy(() => EnumJobStateFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    startedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    completedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    manuallyTriggered: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    externalJobProvider: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    externalJobID: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    jobType: z
      .union([
        z.lazy(() => JobTypeSchema),
        z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    jobPayload: z
      .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
      .optional(),
  })
  .strict();

export const BaseJobUncheckedUpdateInputSchema: z.ZodType<Prisma.BaseJobUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      state: z
        .union([
          z.lazy(() => JobStateSchema),
          z.lazy(() => EnumJobStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      completedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      manuallyTriggered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalJobProvider: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      externalJobID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      jobType: z
        .union([
          z.lazy(() => JobTypeSchema),
          z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      jobPayload: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict();

export const BaseJobCreateManyInputSchema: z.ZodType<Prisma.BaseJobCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      workerId: z.string().optional().nullable(),
      state: z.lazy(() => JobStateSchema).optional(),
      createdAt: z.coerce.date().optional(),
      startedAt: z.coerce.date().optional().nullable(),
      completedAt: z.coerce.date().optional().nullable(),
      manuallyTriggered: z.boolean().optional(),
      externalJobProvider: z.string().optional().nullable(),
      externalJobID: z.string().optional().nullable(),
      jobType: z.lazy(() => JobTypeSchema),
      jobPayload: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
    })
    .strict();

export const BaseJobUpdateManyMutationInputSchema: z.ZodType<Prisma.BaseJobUpdateManyMutationInput> =
  z
    .object({
      workerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      state: z
        .union([
          z.lazy(() => JobStateSchema),
          z.lazy(() => EnumJobStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      completedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      manuallyTriggered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalJobProvider: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      externalJobID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      jobType: z
        .union([
          z.lazy(() => JobTypeSchema),
          z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      jobPayload: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict();

export const BaseJobUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BaseJobUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      state: z
        .union([
          z.lazy(() => JobStateSchema),
          z.lazy(() => EnumJobStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      completedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      manuallyTriggered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalJobProvider: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      externalJobID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      jobType: z
        .union([
          z.lazy(() => JobTypeSchema),
          z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      jobPayload: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict();

export const ShowWithDurationCreateInputSchema: z.ZodType<Prisma.ShowWithDurationCreateInput> =
  z
    .object({
      id: z.number().int(),
      name: z.string(),
      start: z.coerce.date(),
      durationSeconds: z.number().int(),
      end: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
    })
    .strict();

export const ShowWithDurationUncheckedCreateInputSchema: z.ZodType<Prisma.ShowWithDurationUncheckedCreateInput> =
  z
    .object({
      id: z.number().int(),
      name: z.string(),
      start: z.coerce.date(),
      durationSeconds: z.number().int(),
      end: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
    })
    .strict();

export const ShowWithDurationUpdateInputSchema: z.ZodType<Prisma.ShowWithDurationUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ShowWithDurationUncheckedUpdateInputSchema: z.ZodType<Prisma.ShowWithDurationUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ShowWithDurationCreateManyInputSchema: z.ZodType<Prisma.ShowWithDurationCreateManyInput> =
  z
    .object({
      id: z.number().int(),
      name: z.string(),
      start: z.coerce.date(),
      durationSeconds: z.number().int(),
      end: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
    })
    .strict();

export const ShowWithDurationUpdateManyMutationInputSchema: z.ZodType<Prisma.ShowWithDurationUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ShowWithDurationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShowWithDurationUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const EnumPermissionNullableListFilterSchema: z.ZodType<Prisma.EnumPermissionNullableListFilter> =
  z
    .object({
      equals: z
        .lazy(() => PermissionSchema)
        .array()
        .optional()
        .nullable(),
      has: z
        .lazy(() => PermissionSchema)
        .optional()
        .nullable(),
      hasEvery: z
        .lazy(() => PermissionSchema)
        .array()
        .optional(),
      hasSome: z
        .lazy(() => PermissionSchema)
        .array()
        .optional(),
      isEmpty: z.boolean().optional(),
    })
    .strict();

export const IdentityListRelationFilterSchema: z.ZodType<Prisma.IdentityListRelationFilter> =
  z
    .object({
      every: z.lazy(() => IdentityWhereInputSchema).optional(),
      some: z.lazy(() => IdentityWhereInputSchema).optional(),
      none: z.lazy(() => IdentityWhereInputSchema).optional(),
    })
    .strict();

export const ConnectionListRelationFilterSchema: z.ZodType<Prisma.ConnectionListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ConnectionWhereInputSchema).optional(),
      some: z.lazy(() => ConnectionWhereInputSchema).optional(),
      none: z.lazy(() => ConnectionWhereInputSchema).optional(),
    })
    .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const IdentityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IdentityOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ConnectionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConnectionOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
      permissions: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict();

export const IdentityProviderIdentityIDCompoundUniqueInputSchema: z.ZodType<Prisma.IdentityProviderIdentityIDCompoundUniqueInput> =
  z
    .object({
      provider: z.string(),
      identityID: z.string(),
    })
    .strict();

export const IdentityCountOrderByAggregateInputSchema: z.ZodType<Prisma.IdentityCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      identityID: z.lazy(() => SortOrderSchema).optional(),
      userID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IdentityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IdentityAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IdentityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IdentityMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      identityID: z.lazy(() => SortOrderSchema).optional(),
      userID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IdentityMinOrderByAggregateInputSchema: z.ZodType<Prisma.IdentityMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      identityID: z.lazy(() => SortOrderSchema).optional(),
      userID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IdentitySumOrderByAggregateInputSchema: z.ZodType<Prisma.IdentitySumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumConnectionTargetFilterSchema: z.ZodType<Prisma.EnumConnectionTargetFilter> =
  z
    .object({
      equals: z.lazy(() => ConnectionTargetSchema).optional(),
      in: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => NestedEnumConnectionTargetFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const ConnectionUserIdTargetCompoundUniqueInputSchema: z.ZodType<Prisma.ConnectionUserIdTargetCompoundUniqueInput> =
  z
    .object({
      userId: z.number(),
      target: z.lazy(() => ConnectionTargetSchema),
    })
    .strict();

export const ConnectionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConnectionCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      refreshToken: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ConnectionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ConnectionAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ConnectionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConnectionMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      refreshToken: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ConnectionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConnectionMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      refreshToken: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ConnectionSumOrderByAggregateInputSchema: z.ZodType<Prisma.ConnectionSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumConnectionTargetWithAggregatesFilterSchema: z.ZodType<Prisma.EnumConnectionTargetWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ConnectionTargetSchema).optional(),
      in: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => NestedEnumConnectionTargetWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumConnectionTargetFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumConnectionTargetFilterSchema).optional(),
    })
    .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const RundownListRelationFilterSchema: z.ZodType<Prisma.RundownListRelationFilter> =
  z
    .object({
      every: z.lazy(() => RundownWhereInputSchema).optional(),
      some: z.lazy(() => RundownWhereInputSchema).optional(),
      none: z.lazy(() => RundownWhereInputSchema).optional(),
    })
    .strict();

export const ContinuityItemListRelationFilterSchema: z.ZodType<Prisma.ContinuityItemListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ContinuityItemWhereInputSchema).optional(),
      some: z.lazy(() => ContinuityItemWhereInputSchema).optional(),
      none: z.lazy(() => ContinuityItemWhereInputSchema).optional(),
    })
    .strict();

export const MetadataListRelationFilterSchema: z.ZodType<Prisma.MetadataListRelationFilter> =
  z
    .object({
      every: z.lazy(() => MetadataWhereInputSchema).optional(),
      some: z.lazy(() => MetadataWhereInputSchema).optional(),
      none: z.lazy(() => MetadataWhereInputSchema).optional(),
    })
    .strict();

export const RundownOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RundownOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContinuityItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContinuityItemOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MetadataOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MetadataOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ShowCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShowCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ShowAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ShowAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ShowMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShowMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ShowMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShowMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ShowSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShowSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const ShowRelationFilterSchema: z.ZodType<Prisma.ShowRelationFilter> = z
  .object({
    is: z.lazy(() => ShowWhereInputSchema).optional(),
    isNot: z.lazy(() => ShowWhereInputSchema).optional(),
  })
  .strict();

export const RundownItemListRelationFilterSchema: z.ZodType<Prisma.RundownItemListRelationFilter> =
  z
    .object({
      every: z.lazy(() => RundownItemWhereInputSchema).optional(),
      some: z.lazy(() => RundownItemWhereInputSchema).optional(),
      none: z.lazy(() => RundownItemWhereInputSchema).optional(),
    })
    .strict();

export const AssetListRelationFilterSchema: z.ZodType<Prisma.AssetListRelationFilter> =
  z
    .object({
      every: z.lazy(() => AssetWhereInputSchema).optional(),
      some: z.lazy(() => AssetWhereInputSchema).optional(),
      none: z.lazy(() => AssetWhereInputSchema).optional(),
    })
    .strict();

export const RundownItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RundownItemOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AssetOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AssetOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RundownCountOrderByAggregateInputSchema: z.ZodType<Prisma.RundownCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RundownAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RundownAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RundownMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RundownMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RundownMinOrderByAggregateInputSchema: z.ZodType<Prisma.RundownMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RundownSumOrderByAggregateInputSchema: z.ZodType<Prisma.RundownSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumRundownItemTypeFilterSchema: z.ZodType<Prisma.EnumRundownItemTypeFilter> =
  z
    .object({
      equals: z.lazy(() => RundownItemTypeSchema).optional(),
      in: z
        .lazy(() => RundownItemTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RundownItemTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => NestedEnumRundownItemTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const MediaNullableRelationFilterSchema: z.ZodType<Prisma.MediaNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => MediaWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => MediaWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const RundownRelationFilterSchema: z.ZodType<Prisma.RundownRelationFilter> =
  z
    .object({
      is: z.lazy(() => RundownWhereInputSchema).optional(),
      isNot: z.lazy(() => RundownWhereInputSchema).optional(),
    })
    .strict();

export const RundownItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.RundownItemCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      notes: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RundownItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RundownItemAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RundownItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RundownItemMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      notes: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RundownItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.RundownItemMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      notes: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RundownItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.RundownItemSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumRundownItemTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRundownItemTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RundownItemTypeSchema).optional(),
      in: z
        .lazy(() => RundownItemTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RundownItemTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => NestedEnumRundownItemTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRundownItemTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRundownItemTypeFilterSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const ContinuityItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContinuityItemCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContinuityItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ContinuityItemAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContinuityItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContinuityItemMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContinuityItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContinuityItemMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContinuityItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.ContinuityItemSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumMetadataValueTypeFilterSchema: z.ZodType<Prisma.EnumMetadataValueTypeFilter> =
  z
    .object({
      equals: z.lazy(() => MetadataValueTypeSchema).optional(),
      in: z
        .lazy(() => MetadataValueTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MetadataValueTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => NestedEnumMetadataValueTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const EnumMetadataTargetTypeFilterSchema: z.ZodType<Prisma.EnumMetadataTargetTypeFilter> =
  z
    .object({
      equals: z.lazy(() => MetadataTargetTypeSchema).optional(),
      in: z
        .lazy(() => MetadataTargetTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MetadataTargetTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const MetadataFieldCountOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataFieldCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
      default: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MetadataFieldAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataFieldAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MetadataFieldMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataFieldMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
      default: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MetadataFieldMinOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataFieldMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      target: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
      default: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MetadataFieldSumOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataFieldSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumMetadataValueTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMetadataValueTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MetadataValueTypeSchema).optional(),
      in: z
        .lazy(() => MetadataValueTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MetadataValueTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => NestedEnumMetadataValueTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMetadataValueTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMetadataValueTypeFilterSchema).optional(),
    })
    .strict();

export const EnumMetadataTargetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMetadataTargetTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MetadataTargetTypeSchema).optional(),
      in: z
        .lazy(() => MetadataTargetTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MetadataTargetTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => NestedEnumMetadataTargetTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema).optional(),
    })
    .strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z
  .object({
    equals: InputJsonValueSchema.optional(),
    path: z.string().array().optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_contains: InputJsonValueSchema.optional().nullable(),
    array_starts_with: InputJsonValueSchema.optional().nullable(),
    array_ends_with: InputJsonValueSchema.optional().nullable(),
    lt: InputJsonValueSchema.optional(),
    lte: InputJsonValueSchema.optional(),
    gt: InputJsonValueSchema.optional(),
    gte: InputJsonValueSchema.optional(),
    not: InputJsonValueSchema.optional(),
  })
  .strict();

export const MetadataFieldRelationFilterSchema: z.ZodType<Prisma.MetadataFieldRelationFilter> =
  z
    .object({
      is: z.lazy(() => MetadataFieldWhereInputSchema).optional(),
      isNot: z.lazy(() => MetadataFieldWhereInputSchema).optional(),
    })
    .strict();

export const ShowNullableRelationFilterSchema: z.ZodType<Prisma.ShowNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => ShowWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => ShowWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const RundownNullableRelationFilterSchema: z.ZodType<Prisma.RundownNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => RundownWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => RundownWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataFieldIdShowIdCompoundUniqueInputSchema: z.ZodType<Prisma.MetadataFieldIdShowIdCompoundUniqueInput> =
  z
    .object({
      fieldId: z.number(),
      showId: z.number(),
    })
    .strict();

export const MetadataFieldIdRundownIdCompoundUniqueInputSchema: z.ZodType<Prisma.MetadataFieldIdRundownIdCompoundUniqueInput> =
  z
    .object({
      fieldId: z.number(),
      rundownId: z.number(),
    })
    .strict();

export const MetadataCountOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
      fieldId: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MetadataAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      fieldId: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MetadataMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      fieldId: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MetadataMinOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      fieldId: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MetadataSumOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      fieldId: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> =
  z
    .object({
      equals: InputJsonValueSchema.optional(),
      path: z.string().array().optional(),
      string_contains: z.string().optional(),
      string_starts_with: z.string().optional(),
      string_ends_with: z.string().optional(),
      array_contains: InputJsonValueSchema.optional().nullable(),
      array_starts_with: InputJsonValueSchema.optional().nullable(),
      array_ends_with: InputJsonValueSchema.optional().nullable(),
      lt: InputJsonValueSchema.optional(),
      lte: InputJsonValueSchema.optional(),
      gt: InputJsonValueSchema.optional(),
      gte: InputJsonValueSchema.optional(),
      not: InputJsonValueSchema.optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedJsonFilterSchema).optional(),
      _max: z.lazy(() => NestedJsonFilterSchema).optional(),
    })
    .strict();

export const EnumSettingKeyFilterSchema: z.ZodType<Prisma.EnumSettingKeyFilter> =
  z
    .object({
      equals: z.lazy(() => SettingKeySchema).optional(),
      in: z
        .lazy(() => SettingKeySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => SettingKeySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => SettingKeySchema),
          z.lazy(() => NestedEnumSettingKeyFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const SettingCountOrderByAggregateInputSchema: z.ZodType<Prisma.SettingCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SettingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SettingAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SettingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SettingMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SettingMinOrderByAggregateInputSchema: z.ZodType<Prisma.SettingMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SettingSumOrderByAggregateInputSchema: z.ZodType<Prisma.SettingSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumSettingKeyWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSettingKeyWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => SettingKeySchema).optional(),
      in: z
        .lazy(() => SettingKeySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => SettingKeySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => SettingKeySchema),
          z.lazy(() => NestedEnumSettingKeyWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumSettingKeyFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumSettingKeyFilterSchema).optional(),
    })
    .strict();

export const MediaRelationFilterSchema: z.ZodType<Prisma.MediaRelationFilter> =
  z
    .object({
      is: z.lazy(() => MediaWhereInputSchema).optional(),
      isNot: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export const AssetCountOrderByAggregateInputSchema: z.ZodType<Prisma.AssetCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AssetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AssetAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AssetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AssetMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AssetMinOrderByAggregateInputSchema: z.ZodType<Prisma.AssetMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AssetSumOrderByAggregateInputSchema: z.ZodType<Prisma.AssetSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumMediaStateFilterSchema: z.ZodType<Prisma.EnumMediaStateFilter> =
  z
    .object({
      equals: z.lazy(() => MediaStateSchema).optional(),
      in: z
        .lazy(() => MediaStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MediaStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => NestedEnumMediaStateFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskListRelationFilterSchema: z.ZodType<Prisma.MediaProcessingTaskListRelationFilter> =
  z
    .object({
      every: z.lazy(() => MediaProcessingTaskWhereInputSchema).optional(),
      some: z.lazy(() => MediaProcessingTaskWhereInputSchema).optional(),
      none: z.lazy(() => MediaProcessingTaskWhereInputSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaCountOrderByAggregateInputSchema: z.ZodType<Prisma.MediaCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rawPath: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MediaAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rawPath: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaMinOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rawPath: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaSumOrderByAggregateInputSchema: z.ZodType<Prisma.MediaSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumMediaStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMediaStateWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MediaStateSchema).optional(),
      in: z
        .lazy(() => MediaStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MediaStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => NestedEnumMediaStateWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMediaStateFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMediaStateFilterSchema).optional(),
    })
    .strict();

export const EnumMediaProcessingTaskStateFilterSchema: z.ZodType<Prisma.EnumMediaProcessingTaskStateFilter> =
  z
    .object({
      equals: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
      in: z
        .lazy(() => MediaProcessingTaskStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MediaProcessingTaskStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskMedia_idDescriptionCompoundUniqueInputSchema: z.ZodType<Prisma.MediaProcessingTaskMedia_idDescriptionCompoundUniqueInput> =
  z
    .object({
      media_id: z.number(),
      description: z.string(),
    })
    .strict();

export const MediaProcessingTaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      media_id: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      additionalInfo: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      media_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      media_id: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      additionalInfo: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      media_id: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      additionalInfo: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      media_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumMediaProcessingTaskStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMediaProcessingTaskStateWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
      in: z
        .lazy(() => MediaProcessingTaskStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MediaProcessingTaskStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(
            () => NestedEnumMediaProcessingTaskStateWithAggregatesFilterSchema,
          ),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z
        .lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema)
        .optional(),
    })
    .strict();

export const EnumJobStateFilterSchema: z.ZodType<Prisma.EnumJobStateFilter> = z
  .object({
    equals: z.lazy(() => JobStateSchema).optional(),
    in: z
      .lazy(() => JobStateSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => JobStateSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => JobStateSchema),
        z.lazy(() => NestedEnumJobStateFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const EnumJobTypeFilterSchema: z.ZodType<Prisma.EnumJobTypeFilter> = z
  .object({
    equals: z.lazy(() => JobTypeSchema).optional(),
    in: z
      .lazy(() => JobTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => JobTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => JobTypeSchema),
        z.lazy(() => NestedEnumJobTypeFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const BaseJobCountOrderByAggregateInputSchema: z.ZodType<Prisma.BaseJobCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      workerId: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z.lazy(() => SortOrderSchema).optional(),
      completedAt: z.lazy(() => SortOrderSchema).optional(),
      manuallyTriggered: z.lazy(() => SortOrderSchema).optional(),
      externalJobProvider: z.lazy(() => SortOrderSchema).optional(),
      externalJobID: z.lazy(() => SortOrderSchema).optional(),
      jobType: z.lazy(() => SortOrderSchema).optional(),
      jobPayload: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BaseJobAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BaseJobAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BaseJobMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BaseJobMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      workerId: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z.lazy(() => SortOrderSchema).optional(),
      completedAt: z.lazy(() => SortOrderSchema).optional(),
      manuallyTriggered: z.lazy(() => SortOrderSchema).optional(),
      externalJobProvider: z.lazy(() => SortOrderSchema).optional(),
      externalJobID: z.lazy(() => SortOrderSchema).optional(),
      jobType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BaseJobMinOrderByAggregateInputSchema: z.ZodType<Prisma.BaseJobMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      workerId: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z.lazy(() => SortOrderSchema).optional(),
      completedAt: z.lazy(() => SortOrderSchema).optional(),
      manuallyTriggered: z.lazy(() => SortOrderSchema).optional(),
      externalJobProvider: z.lazy(() => SortOrderSchema).optional(),
      externalJobID: z.lazy(() => SortOrderSchema).optional(),
      jobType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BaseJobSumOrderByAggregateInputSchema: z.ZodType<Prisma.BaseJobSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumJobStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumJobStateWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => JobStateSchema).optional(),
      in: z
        .lazy(() => JobStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => JobStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => JobStateSchema),
          z.lazy(() => NestedEnumJobStateWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumJobStateFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumJobStateFilterSchema).optional(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const EnumJobTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumJobTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => JobTypeSchema).optional(),
      in: z
        .lazy(() => JobTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => JobTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => JobTypeSchema),
          z.lazy(() => NestedEnumJobTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumJobTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumJobTypeFilterSchema).optional(),
    })
    .strict();

export const ShowWithDurationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShowWithDurationCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ShowWithDurationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ShowWithDurationAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ShowWithDurationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShowWithDurationMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ShowWithDurationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShowWithDurationMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      ytStreamID: z.lazy(() => SortOrderSchema).optional(),
      ytBroadcastID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ShowWithDurationSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShowWithDurationSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserCreatepermissionsInputSchema: z.ZodType<Prisma.UserCreatepermissionsInput> =
  z
    .object({
      set: z.lazy(() => PermissionSchema).array(),
    })
    .strict();

export const IdentityCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.IdentityCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IdentityCreateWithoutUserInputSchema),
          z.lazy(() => IdentityCreateWithoutUserInputSchema).array(),
          z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IdentityCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ConnectionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConnectionCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ConnectionCreateWithoutUserInputSchema),
          z.lazy(() => ConnectionCreateWithoutUserInputSchema).array(),
          z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ConnectionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IdentityUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.IdentityUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IdentityCreateWithoutUserInputSchema),
          z.lazy(() => IdentityCreateWithoutUserInputSchema).array(),
          z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IdentityCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ConnectionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ConnectionCreateWithoutUserInputSchema),
          z.lazy(() => ConnectionCreateWithoutUserInputSchema).array(),
          z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ConnectionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict();

export const UserUpdatepermissionsInputSchema: z.ZodType<Prisma.UserUpdatepermissionsInput> =
  z
    .object({
      set: z
        .lazy(() => PermissionSchema)
        .array()
        .optional(),
      push: z
        .union([
          z.lazy(() => PermissionSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IdentityUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.IdentityUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IdentityCreateWithoutUserInputSchema),
          z.lazy(() => IdentityCreateWithoutUserInputSchema).array(),
          z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => IdentityUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => IdentityUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IdentityCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => IdentityUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => IdentityUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => IdentityUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => IdentityUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => IdentityScalarWhereInputSchema),
          z.lazy(() => IdentityScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ConnectionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConnectionUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ConnectionCreateWithoutUserInputSchema),
          z.lazy(() => ConnectionCreateWithoutUserInputSchema).array(),
          z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ConnectionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => ConnectionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ConnectionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ConnectionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => ConnectionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ConnectionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => ConnectionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ConnectionScalarWhereInputSchema),
          z.lazy(() => ConnectionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const IdentityUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.IdentityUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IdentityCreateWithoutUserInputSchema),
          z.lazy(() => IdentityCreateWithoutUserInputSchema).array(),
          z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => IdentityUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => IdentityUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IdentityCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => IdentityWhereUniqueInputSchema),
          z.lazy(() => IdentityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => IdentityUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => IdentityUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => IdentityUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => IdentityUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => IdentityScalarWhereInputSchema),
          z.lazy(() => IdentityScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ConnectionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConnectionUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ConnectionCreateWithoutUserInputSchema),
          z.lazy(() => ConnectionCreateWithoutUserInputSchema).array(),
          z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ConnectionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => ConnectionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ConnectionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ConnectionWhereUniqueInputSchema),
          z.lazy(() => ConnectionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ConnectionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => ConnectionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ConnectionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => ConnectionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ConnectionScalarWhereInputSchema),
          z.lazy(() => ConnectionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutIdentitiesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutIdentitiesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutIdentitiesInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutIdentitiesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutIdentitiesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutIdentitiesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutIdentitiesInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutIdentitiesInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutIdentitiesInputSchema),
          z.lazy(() => UserUpdateWithoutIdentitiesInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutIdentitiesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutConnectionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutConnectionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutConnectionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutConnectionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutConnectionsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumConnectionTargetFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumConnectionTargetFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => ConnectionTargetSchema).optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutConnectionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutConnectionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutConnectionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutConnectionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutConnectionsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutConnectionsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutConnectionsInputSchema),
          z.lazy(() => UserUpdateWithoutConnectionsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutConnectionsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.RundownCreateNestedManyWithoutShowInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutShowInputSchema),
          z.lazy(() => RundownCreateWithoutShowInputSchema).array(),
          z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema),
          z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownCreateManyShowInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemCreateNestedManyWithoutShowInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),
          z.lazy(() => ContinuityItemCreateWithoutShowInputSchema).array(),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ContinuityItemCreateManyShowInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.MetadataCreateNestedManyWithoutShowInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutShowInputSchema),
          z.lazy(() => MetadataCreateWithoutShowInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyShowInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RundownUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.RundownUncheckedCreateNestedManyWithoutShowInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutShowInputSchema),
          z.lazy(() => RundownCreateWithoutShowInputSchema).array(),
          z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema),
          z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownCreateManyShowInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedCreateNestedManyWithoutShowInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),
          z.lazy(() => ContinuityItemCreateWithoutShowInputSchema).array(),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ContinuityItemCreateManyShowInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateNestedManyWithoutShowInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutShowInputSchema),
          z.lazy(() => MetadataCreateWithoutShowInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyShowInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const RundownUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.RundownUpdateManyWithoutShowNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutShowInputSchema),
          z.lazy(() => RundownCreateWithoutShowInputSchema).array(),
          z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema),
          z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RundownUpsertWithWhereUniqueWithoutShowInputSchema),
          z
            .lazy(() => RundownUpsertWithWhereUniqueWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownCreateManyShowInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RundownUpdateWithWhereUniqueWithoutShowInputSchema),
          z
            .lazy(() => RundownUpdateWithWhereUniqueWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RundownUpdateManyWithWhereWithoutShowInputSchema),
          z
            .lazy(() => RundownUpdateManyWithWhereWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RundownScalarWhereInputSchema),
          z.lazy(() => RundownScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.ContinuityItemUpdateManyWithoutShowNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),
          z.lazy(() => ContinuityItemCreateWithoutShowInputSchema).array(),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ContinuityItemCreateManyShowInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ContinuityItemUpdateManyWithWhereWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemUpdateManyWithWhereWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereInputSchema),
          z.lazy(() => ContinuityItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithoutShowNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutShowInputSchema),
          z.lazy(() => MetadataCreateWithoutShowInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MetadataUpsertWithWhereUniqueWithoutShowInputSchema),
          z
            .lazy(() => MetadataUpsertWithWhereUniqueWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyShowInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MetadataUpdateWithWhereUniqueWithoutShowInputSchema),
          z
            .lazy(() => MetadataUpdateWithWhereUniqueWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MetadataUpdateManyWithWhereWithoutShowInputSchema),
          z
            .lazy(() => MetadataUpdateManyWithWhereWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RundownUncheckedUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateManyWithoutShowNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutShowInputSchema),
          z.lazy(() => RundownCreateWithoutShowInputSchema).array(),
          z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema),
          z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RundownUpsertWithWhereUniqueWithoutShowInputSchema),
          z
            .lazy(() => RundownUpsertWithWhereUniqueWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownCreateManyShowInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownWhereUniqueInputSchema),
          z.lazy(() => RundownWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RundownUpdateWithWhereUniqueWithoutShowInputSchema),
          z
            .lazy(() => RundownUpdateWithWhereUniqueWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RundownUpdateManyWithWhereWithoutShowInputSchema),
          z
            .lazy(() => RundownUpdateManyWithWhereWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RundownScalarWhereInputSchema),
          z.lazy(() => RundownScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateManyWithoutShowNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),
          z.lazy(() => ContinuityItemCreateWithoutShowInputSchema).array(),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ContinuityItemCreateManyShowInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ContinuityItemUpdateManyWithWhereWithoutShowInputSchema),
          z
            .lazy(() => ContinuityItemUpdateManyWithWhereWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereInputSchema),
          z.lazy(() => ContinuityItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutShowNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutShowInputSchema),
          z.lazy(() => MetadataCreateWithoutShowInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MetadataUpsertWithWhereUniqueWithoutShowInputSchema),
          z
            .lazy(() => MetadataUpsertWithWhereUniqueWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyShowInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MetadataUpdateWithWhereUniqueWithoutShowInputSchema),
          z
            .lazy(() => MetadataUpdateWithWhereUniqueWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MetadataUpdateManyWithWhereWithoutShowInputSchema),
          z
            .lazy(() => MetadataUpdateManyWithWhereWithoutShowInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ShowCreateNestedOneWithoutRundownsInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutRundownsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ShowCreateWithoutRundownsInputSchema),
          z.lazy(() => ShowUncheckedCreateWithoutRundownsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ShowCreateOrConnectWithoutRundownsInputSchema)
        .optional(),
      connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
    })
    .strict();

export const RundownItemCreateNestedManyWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemCreateNestedManyWithoutRundownInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutRundownInputSchema),
          z.lazy(() => RundownItemCreateWithoutRundownInputSchema).array(),
          z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownItemCreateManyRundownInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AssetCreateNestedManyWithoutRundownInputSchema: z.ZodType<Prisma.AssetCreateNestedManyWithoutRundownInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutRundownInputSchema),
          z.lazy(() => AssetCreateWithoutRundownInputSchema).array(),
          z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema),
          z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AssetCreateManyRundownInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataCreateNestedManyWithoutRundownInputSchema: z.ZodType<Prisma.MetadataCreateNestedManyWithoutRundownInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutRundownInputSchema),
          z.lazy(() => MetadataCreateWithoutRundownInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema),
          z
            .lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyRundownInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUncheckedCreateNestedManyWithoutRundownInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutRundownInputSchema),
          z.lazy(() => RundownItemCreateWithoutRundownInputSchema).array(),
          z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownItemCreateManyRundownInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AssetUncheckedCreateNestedManyWithoutRundownInputSchema: z.ZodType<Prisma.AssetUncheckedCreateNestedManyWithoutRundownInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutRundownInputSchema),
          z.lazy(() => AssetCreateWithoutRundownInputSchema).array(),
          z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema),
          z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AssetCreateManyRundownInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUncheckedCreateNestedManyWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateNestedManyWithoutRundownInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutRundownInputSchema),
          z.lazy(() => MetadataCreateWithoutRundownInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema),
          z
            .lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyRundownInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ShowUpdateOneRequiredWithoutRundownsNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneRequiredWithoutRundownsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ShowCreateWithoutRundownsInputSchema),
          z.lazy(() => ShowUncheckedCreateWithoutRundownsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ShowCreateOrConnectWithoutRundownsInputSchema)
        .optional(),
      upsert: z.lazy(() => ShowUpsertWithoutRundownsInputSchema).optional(),
      connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ShowUpdateToOneWithWhereWithoutRundownsInputSchema),
          z.lazy(() => ShowUpdateWithoutRundownsInputSchema),
          z.lazy(() => ShowUncheckedUpdateWithoutRundownsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownItemUpdateManyWithoutRundownNestedInputSchema: z.ZodType<Prisma.RundownItemUpdateManyWithoutRundownNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutRundownInputSchema),
          z.lazy(() => RundownItemCreateWithoutRundownInputSchema).array(),
          z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema,
          ),
          z
            .lazy(
              () => RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownItemCreateManyRundownInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema,
          ),
          z
            .lazy(
              () => RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RundownItemUpdateManyWithWhereWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemUpdateManyWithWhereWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RundownItemScalarWhereInputSchema),
          z.lazy(() => RundownItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AssetUpdateManyWithoutRundownNestedInputSchema: z.ZodType<Prisma.AssetUpdateManyWithoutRundownNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutRundownInputSchema),
          z.lazy(() => AssetCreateWithoutRundownInputSchema).array(),
          z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema),
          z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AssetUpsertWithWhereUniqueWithoutRundownInputSchema),
          z
            .lazy(() => AssetUpsertWithWhereUniqueWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AssetCreateManyRundownInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AssetUpdateWithWhereUniqueWithoutRundownInputSchema),
          z
            .lazy(() => AssetUpdateWithWhereUniqueWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AssetUpdateManyWithWhereWithoutRundownInputSchema),
          z
            .lazy(() => AssetUpdateManyWithWhereWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AssetScalarWhereInputSchema),
          z.lazy(() => AssetScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUpdateManyWithoutRundownNestedInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithoutRundownNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutRundownInputSchema),
          z.lazy(() => MetadataCreateWithoutRundownInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema),
          z
            .lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MetadataUpsertWithWhereUniqueWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUpsertWithWhereUniqueWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyRundownInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MetadataUpdateWithWhereUniqueWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUpdateWithWhereUniqueWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MetadataUpdateManyWithWhereWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUpdateManyWithWhereWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateManyWithoutRundownNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutRundownInputSchema),
          z.lazy(() => RundownItemCreateWithoutRundownInputSchema).array(),
          z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema,
          ),
          z
            .lazy(
              () => RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownItemCreateManyRundownInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema,
          ),
          z
            .lazy(
              () => RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RundownItemUpdateManyWithWhereWithoutRundownInputSchema),
          z
            .lazy(() => RundownItemUpdateManyWithWhereWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RundownItemScalarWhereInputSchema),
          z.lazy(() => RundownItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AssetUncheckedUpdateManyWithoutRundownNestedInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateManyWithoutRundownNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutRundownInputSchema),
          z.lazy(() => AssetCreateWithoutRundownInputSchema).array(),
          z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema),
          z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AssetUpsertWithWhereUniqueWithoutRundownInputSchema),
          z
            .lazy(() => AssetUpsertWithWhereUniqueWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AssetCreateManyRundownInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AssetUpdateWithWhereUniqueWithoutRundownInputSchema),
          z
            .lazy(() => AssetUpdateWithWhereUniqueWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AssetUpdateManyWithWhereWithoutRundownInputSchema),
          z
            .lazy(() => AssetUpdateManyWithWhereWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AssetScalarWhereInputSchema),
          z.lazy(() => AssetScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutRundownNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutRundownInputSchema),
          z.lazy(() => MetadataCreateWithoutRundownInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema),
          z
            .lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MetadataUpsertWithWhereUniqueWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUpsertWithWhereUniqueWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyRundownInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MetadataUpdateWithWhereUniqueWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUpdateWithWhereUniqueWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MetadataUpdateManyWithWhereWithoutRundownInputSchema),
          z
            .lazy(() => MetadataUpdateManyWithWhereWithoutRundownInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaCreateNestedOneWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutRundownItemsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutRundownItemsInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutRundownItemsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutRundownItemsInputSchema)
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
    })
    .strict();

export const RundownCreateNestedOneWithoutItemsInputSchema: z.ZodType<Prisma.RundownCreateNestedOneWithoutItemsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutItemsInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutItemsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RundownCreateOrConnectWithoutItemsInputSchema)
        .optional(),
      connect: z.lazy(() => RundownWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumRundownItemTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRundownItemTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => RundownItemTypeSchema).optional(),
    })
    .strict();

export const MediaUpdateOneWithoutRundownItemsNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneWithoutRundownItemsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutRundownItemsInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutRundownItemsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutRundownItemsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => MediaUpsertWithoutRundownItemsInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => MediaUpdateToOneWithWhereWithoutRundownItemsInputSchema),
          z.lazy(() => MediaUpdateWithoutRundownItemsInputSchema),
          z.lazy(() => MediaUncheckedUpdateWithoutRundownItemsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownUpdateOneRequiredWithoutItemsNestedInputSchema: z.ZodType<Prisma.RundownUpdateOneRequiredWithoutItemsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutItemsInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutItemsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RundownCreateOrConnectWithoutItemsInputSchema)
        .optional(),
      upsert: z.lazy(() => RundownUpsertWithoutItemsInputSchema).optional(),
      connect: z.lazy(() => RundownWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => RundownUpdateToOneWithWhereWithoutItemsInputSchema),
          z.lazy(() => RundownUpdateWithoutItemsInputSchema),
          z.lazy(() => RundownUncheckedUpdateWithoutItemsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const MediaCreateNestedOneWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutContinuityItemsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutContinuityItemsInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutContinuityItemsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutContinuityItemsInputSchema)
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
    })
    .strict();

export const ShowCreateNestedOneWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutContinuityItemsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ShowCreateWithoutContinuityItemsInputSchema),
          z.lazy(() => ShowUncheckedCreateWithoutContinuityItemsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ShowCreateOrConnectWithoutContinuityItemsInputSchema)
        .optional(),
      connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
    })
    .strict();

export const MediaUpdateOneWithoutContinuityItemsNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneWithoutContinuityItemsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutContinuityItemsInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutContinuityItemsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutContinuityItemsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => MediaUpsertWithoutContinuityItemsInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => MediaUpdateToOneWithWhereWithoutContinuityItemsInputSchema,
          ),
          z.lazy(() => MediaUpdateWithoutContinuityItemsInputSchema),
          z.lazy(() => MediaUncheckedUpdateWithoutContinuityItemsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ShowUpdateOneRequiredWithoutContinuityItemsNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneRequiredWithoutContinuityItemsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ShowCreateWithoutContinuityItemsInputSchema),
          z.lazy(() => ShowUncheckedCreateWithoutContinuityItemsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ShowCreateOrConnectWithoutContinuityItemsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => ShowUpsertWithoutContinuityItemsInputSchema)
        .optional(),
      connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => ShowUpdateToOneWithWhereWithoutContinuityItemsInputSchema,
          ),
          z.lazy(() => ShowUpdateWithoutContinuityItemsInputSchema),
          z.lazy(() => ShowUncheckedUpdateWithoutContinuityItemsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MetadataCreateNestedManyWithoutFieldInputSchema: z.ZodType<Prisma.MetadataCreateNestedManyWithoutFieldInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutFieldInputSchema),
          z.lazy(() => MetadataCreateWithoutFieldInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyFieldInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUncheckedCreateNestedManyWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateNestedManyWithoutFieldInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutFieldInputSchema),
          z.lazy(() => MetadataCreateWithoutFieldInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyFieldInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumMetadataValueTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMetadataValueTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => MetadataValueTypeSchema).optional(),
    })
    .strict();

export const EnumMetadataTargetTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMetadataTargetTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => MetadataTargetTypeSchema).optional(),
    })
    .strict();

export const MetadataUpdateManyWithoutFieldNestedInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithoutFieldNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutFieldInputSchema),
          z.lazy(() => MetadataCreateWithoutFieldInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MetadataUpsertWithWhereUniqueWithoutFieldInputSchema),
          z
            .lazy(() => MetadataUpsertWithWhereUniqueWithoutFieldInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyFieldInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MetadataUpdateWithWhereUniqueWithoutFieldInputSchema),
          z
            .lazy(() => MetadataUpdateWithWhereUniqueWithoutFieldInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MetadataUpdateManyWithWhereWithoutFieldInputSchema),
          z
            .lazy(() => MetadataUpdateManyWithWhereWithoutFieldInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateManyWithoutFieldNestedInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutFieldNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutFieldInputSchema),
          z.lazy(() => MetadataCreateWithoutFieldInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MetadataUpsertWithWhereUniqueWithoutFieldInputSchema),
          z
            .lazy(() => MetadataUpsertWithWhereUniqueWithoutFieldInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyFieldInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MetadataUpdateWithWhereUniqueWithoutFieldInputSchema),
          z
            .lazy(() => MetadataUpdateWithWhereUniqueWithoutFieldInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MetadataUpdateManyWithWhereWithoutFieldInputSchema),
          z
            .lazy(() => MetadataUpdateManyWithWhereWithoutFieldInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataFieldCreateNestedOneWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldCreateNestedOneWithoutValuesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataFieldCreateWithoutValuesInputSchema),
          z.lazy(() => MetadataFieldUncheckedCreateWithoutValuesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MetadataFieldCreateOrConnectWithoutValuesInputSchema)
        .optional(),
      connect: z.lazy(() => MetadataFieldWhereUniqueInputSchema).optional(),
    })
    .strict();

export const ShowCreateNestedOneWithoutMetadataInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutMetadataInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ShowCreateWithoutMetadataInputSchema),
          z.lazy(() => ShowUncheckedCreateWithoutMetadataInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ShowCreateOrConnectWithoutMetadataInputSchema)
        .optional(),
      connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
    })
    .strict();

export const RundownCreateNestedOneWithoutMetadataInputSchema: z.ZodType<Prisma.RundownCreateNestedOneWithoutMetadataInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutMetadataInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutMetadataInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RundownCreateOrConnectWithoutMetadataInputSchema)
        .optional(),
      connect: z.lazy(() => RundownWhereUniqueInputSchema).optional(),
    })
    .strict();

export const MediaCreateNestedOneWithoutMetadataInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutMetadataInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutMetadataInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutMetadataInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutMetadataInputSchema)
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
    })
    .strict();

export const MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema: z.ZodType<Prisma.MetadataFieldUpdateOneRequiredWithoutValuesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataFieldCreateWithoutValuesInputSchema),
          z.lazy(() => MetadataFieldUncheckedCreateWithoutValuesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MetadataFieldCreateOrConnectWithoutValuesInputSchema)
        .optional(),
      upsert: z
        .lazy(() => MetadataFieldUpsertWithoutValuesInputSchema)
        .optional(),
      connect: z.lazy(() => MetadataFieldWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => MetadataFieldUpdateToOneWithWhereWithoutValuesInputSchema,
          ),
          z.lazy(() => MetadataFieldUpdateWithoutValuesInputSchema),
          z.lazy(() => MetadataFieldUncheckedUpdateWithoutValuesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ShowUpdateOneWithoutMetadataNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneWithoutMetadataNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ShowCreateWithoutMetadataInputSchema),
          z.lazy(() => ShowUncheckedCreateWithoutMetadataInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ShowCreateOrConnectWithoutMetadataInputSchema)
        .optional(),
      upsert: z.lazy(() => ShowUpsertWithoutMetadataInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => ShowWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => ShowWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ShowUpdateToOneWithWhereWithoutMetadataInputSchema),
          z.lazy(() => ShowUpdateWithoutMetadataInputSchema),
          z.lazy(() => ShowUncheckedUpdateWithoutMetadataInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownUpdateOneWithoutMetadataNestedInputSchema: z.ZodType<Prisma.RundownUpdateOneWithoutMetadataNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutMetadataInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutMetadataInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RundownCreateOrConnectWithoutMetadataInputSchema)
        .optional(),
      upsert: z.lazy(() => RundownUpsertWithoutMetadataInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => RundownWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => RundownWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => RundownWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => RundownUpdateToOneWithWhereWithoutMetadataInputSchema),
          z.lazy(() => RundownUpdateWithoutMetadataInputSchema),
          z.lazy(() => RundownUncheckedUpdateWithoutMetadataInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaUpdateOneWithoutMetadataNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneWithoutMetadataNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutMetadataInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutMetadataInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutMetadataInputSchema)
        .optional(),
      upsert: z.lazy(() => MediaUpsertWithoutMetadataInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => MediaUpdateToOneWithWhereWithoutMetadataInputSchema),
          z.lazy(() => MediaUpdateWithoutMetadataInputSchema),
          z.lazy(() => MediaUncheckedUpdateWithoutMetadataInputSchema),
        ])
        .optional(),
    })
    .strict();

export const EnumSettingKeyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSettingKeyFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => SettingKeySchema).optional(),
    })
    .strict();

export const MediaCreateNestedOneWithoutAssetsInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutAssetsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutAssetsInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutAssetsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutAssetsInputSchema)
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
    })
    .strict();

export const RundownCreateNestedOneWithoutAssetsInputSchema: z.ZodType<Prisma.RundownCreateNestedOneWithoutAssetsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutAssetsInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutAssetsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RundownCreateOrConnectWithoutAssetsInputSchema)
        .optional(),
      connect: z.lazy(() => RundownWhereUniqueInputSchema).optional(),
    })
    .strict();

export const MediaUpdateOneRequiredWithoutAssetsNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneRequiredWithoutAssetsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutAssetsInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutAssetsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutAssetsInputSchema)
        .optional(),
      upsert: z.lazy(() => MediaUpsertWithoutAssetsInputSchema).optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => MediaUpdateToOneWithWhereWithoutAssetsInputSchema),
          z.lazy(() => MediaUpdateWithoutAssetsInputSchema),
          z.lazy(() => MediaUncheckedUpdateWithoutAssetsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownUpdateOneRequiredWithoutAssetsNestedInputSchema: z.ZodType<Prisma.RundownUpdateOneRequiredWithoutAssetsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownCreateWithoutAssetsInputSchema),
          z.lazy(() => RundownUncheckedCreateWithoutAssetsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RundownCreateOrConnectWithoutAssetsInputSchema)
        .optional(),
      upsert: z.lazy(() => RundownUpsertWithoutAssetsInputSchema).optional(),
      connect: z.lazy(() => RundownWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => RundownUpdateToOneWithWhereWithoutAssetsInputSchema),
          z.lazy(() => RundownUpdateWithoutAssetsInputSchema),
          z.lazy(() => RundownUncheckedUpdateWithoutAssetsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownItemCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema),
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema).array(),
          z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownItemCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema).array(),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ContinuityItemCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),
          z
            .lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema)
            .array(),
          z.lazy(
            () => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MediaProcessingTaskCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AssetCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.AssetCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutMediaInputSchema),
          z.lazy(() => AssetCreateWithoutMediaInputSchema).array(),
          z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema),
          z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AssetCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.MetadataCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutMediaInputSchema),
          z.lazy(() => MetadataCreateWithoutMediaInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUncheckedCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema),
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema).array(),
          z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownItemCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema).array(),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ContinuityItemCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),
          z
            .lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema)
            .array(),
          z.lazy(
            () => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MediaProcessingTaskCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AssetUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.AssetUncheckedCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutMediaInputSchema),
          z.lazy(() => AssetCreateWithoutMediaInputSchema).array(),
          z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema),
          z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AssetCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutMediaInputSchema),
          z.lazy(() => MetadataCreateWithoutMediaInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumMediaStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMediaStateFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => MediaStateSchema).optional(),
    })
    .strict();

export const RundownItemUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.RundownItemUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema),
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema).array(),
          z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownItemCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RundownItemUpdateManyWithWhereWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUpdateManyWithWhereWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RundownItemScalarWhereInputSchema),
          z.lazy(() => RundownItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.ContinuityItemUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema).array(),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ContinuityItemCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereInputSchema),
          z.lazy(() => ContinuityItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),
          z
            .lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema)
            .array(),
          z.lazy(
            () => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () =>
                MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MediaProcessingTaskCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () =>
                MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () =>
                MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MediaProcessingTaskScalarWhereInputSchema),
          z.lazy(() => MediaProcessingTaskScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AssetUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.AssetUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutMediaInputSchema),
          z.lazy(() => AssetCreateWithoutMediaInputSchema).array(),
          z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema),
          z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AssetUpsertWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => AssetUpsertWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AssetCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AssetUpdateWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => AssetUpdateWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AssetUpdateManyWithWhereWithoutMediaInputSchema),
          z.lazy(() => AssetUpdateManyWithWhereWithoutMediaInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AssetScalarWhereInputSchema),
          z.lazy(() => AssetScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutMediaInputSchema),
          z.lazy(() => MetadataCreateWithoutMediaInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MetadataUpsertWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => MetadataUpsertWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MetadataUpdateWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => MetadataUpdateWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MetadataUpdateManyWithWhereWithoutMediaInputSchema),
          z
            .lazy(() => MetadataUpdateManyWithWhereWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema),
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema).array(),
          z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RundownItemCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RundownItemWhereUniqueInputSchema),
          z.lazy(() => RundownItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RundownItemUpdateManyWithWhereWithoutMediaInputSchema),
          z
            .lazy(() => RundownItemUpdateManyWithWhereWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RundownItemScalarWhereInputSchema),
          z.lazy(() => RundownItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema).array(),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ContinuityItemCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContinuityItemWhereUniqueInputSchema),
          z.lazy(() => ContinuityItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereInputSchema),
          z.lazy(() => ContinuityItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),
          z
            .lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema)
            .array(),
          z.lazy(
            () => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () =>
                MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MediaProcessingTaskCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
          z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () =>
                MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () =>
                MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MediaProcessingTaskScalarWhereInputSchema),
          z.lazy(() => MediaProcessingTaskScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AssetUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutMediaInputSchema),
          z.lazy(() => AssetCreateWithoutMediaInputSchema).array(),
          z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema),
          z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AssetUpsertWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => AssetUpsertWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AssetCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AssetWhereUniqueInputSchema),
          z.lazy(() => AssetWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AssetUpdateWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => AssetUpdateWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AssetUpdateManyWithWhereWithoutMediaInputSchema),
          z.lazy(() => AssetUpdateManyWithWhereWithoutMediaInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AssetScalarWhereInputSchema),
          z.lazy(() => AssetScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MetadataCreateWithoutMediaInputSchema),
          z.lazy(() => MetadataCreateWithoutMediaInputSchema).array(),
          z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema),
          z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema),
          z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MetadataUpsertWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => MetadataUpsertWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MetadataCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MetadataWhereUniqueInputSchema),
          z.lazy(() => MetadataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MetadataUpdateWithWhereUniqueWithoutMediaInputSchema),
          z
            .lazy(() => MetadataUpdateWithWhereUniqueWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MetadataUpdateManyWithWhereWithoutMediaInputSchema),
          z
            .lazy(() => MetadataUpdateManyWithWhereWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutTasksInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutTasksInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutTasksInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutTasksInputSchema)
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMediaProcessingTaskStateFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
    })
    .strict();

export const MediaUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneRequiredWithoutTasksNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutTasksInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutTasksInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutTasksInputSchema)
        .optional(),
      upsert: z.lazy(() => MediaUpsertWithoutTasksInputSchema).optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => MediaUpdateToOneWithWhereWithoutTasksInputSchema),
          z.lazy(() => MediaUpdateWithoutTasksInputSchema),
          z.lazy(() => MediaUncheckedUpdateWithoutTasksInputSchema),
        ])
        .optional(),
    })
    .strict();

export const EnumJobStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumJobStateFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => JobStateSchema).optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const EnumJobTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumJobTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => JobTypeSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const NestedEnumConnectionTargetFilterSchema: z.ZodType<Prisma.NestedEnumConnectionTargetFilter> =
  z
    .object({
      equals: z.lazy(() => ConnectionTargetSchema).optional(),
      in: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => NestedEnumConnectionTargetFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumConnectionTargetWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumConnectionTargetWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ConnectionTargetSchema).optional(),
      in: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => NestedEnumConnectionTargetWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumConnectionTargetFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumConnectionTargetFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedEnumRundownItemTypeFilterSchema: z.ZodType<Prisma.NestedEnumRundownItemTypeFilter> =
  z
    .object({
      equals: z.lazy(() => RundownItemTypeSchema).optional(),
      in: z
        .lazy(() => RundownItemTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RundownItemTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => NestedEnumRundownItemTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumRundownItemTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRundownItemTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RundownItemTypeSchema).optional(),
      in: z
        .lazy(() => RundownItemTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RundownItemTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => NestedEnumRundownItemTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRundownItemTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRundownItemTypeFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumMetadataValueTypeFilterSchema: z.ZodType<Prisma.NestedEnumMetadataValueTypeFilter> =
  z
    .object({
      equals: z.lazy(() => MetadataValueTypeSchema).optional(),
      in: z
        .lazy(() => MetadataValueTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MetadataValueTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => NestedEnumMetadataValueTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumMetadataTargetTypeFilterSchema: z.ZodType<Prisma.NestedEnumMetadataTargetTypeFilter> =
  z
    .object({
      equals: z.lazy(() => MetadataTargetTypeSchema).optional(),
      in: z
        .lazy(() => MetadataTargetTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MetadataTargetTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumMetadataValueTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMetadataValueTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MetadataValueTypeSchema).optional(),
      in: z
        .lazy(() => MetadataValueTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MetadataValueTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => NestedEnumMetadataValueTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMetadataValueTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMetadataValueTypeFilterSchema).optional(),
    })
    .strict();

export const NestedEnumMetadataTargetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMetadataTargetTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MetadataTargetTypeSchema).optional(),
      in: z
        .lazy(() => MetadataTargetTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MetadataTargetTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => NestedEnumMetadataTargetTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema).optional(),
    })
    .strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z
  .object({
    equals: InputJsonValueSchema.optional(),
    path: z.string().array().optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_contains: InputJsonValueSchema.optional().nullable(),
    array_starts_with: InputJsonValueSchema.optional().nullable(),
    array_ends_with: InputJsonValueSchema.optional().nullable(),
    lt: InputJsonValueSchema.optional(),
    lte: InputJsonValueSchema.optional(),
    gt: InputJsonValueSchema.optional(),
    gte: InputJsonValueSchema.optional(),
    not: InputJsonValueSchema.optional(),
  })
  .strict();

export const NestedEnumSettingKeyFilterSchema: z.ZodType<Prisma.NestedEnumSettingKeyFilter> =
  z
    .object({
      equals: z.lazy(() => SettingKeySchema).optional(),
      in: z
        .lazy(() => SettingKeySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => SettingKeySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => SettingKeySchema),
          z.lazy(() => NestedEnumSettingKeyFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumSettingKeyWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSettingKeyWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => SettingKeySchema).optional(),
      in: z
        .lazy(() => SettingKeySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => SettingKeySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => SettingKeySchema),
          z.lazy(() => NestedEnumSettingKeyWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumSettingKeyFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumSettingKeyFilterSchema).optional(),
    })
    .strict();

export const NestedEnumMediaStateFilterSchema: z.ZodType<Prisma.NestedEnumMediaStateFilter> =
  z
    .object({
      equals: z.lazy(() => MediaStateSchema).optional(),
      in: z
        .lazy(() => MediaStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MediaStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => NestedEnumMediaStateFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumMediaStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMediaStateWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MediaStateSchema).optional(),
      in: z
        .lazy(() => MediaStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MediaStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => NestedEnumMediaStateWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMediaStateFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMediaStateFilterSchema).optional(),
    })
    .strict();

export const NestedEnumMediaProcessingTaskStateFilterSchema: z.ZodType<Prisma.NestedEnumMediaProcessingTaskStateFilter> =
  z
    .object({
      equals: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
      in: z
        .lazy(() => MediaProcessingTaskStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MediaProcessingTaskStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumMediaProcessingTaskStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMediaProcessingTaskStateWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
      in: z
        .lazy(() => MediaProcessingTaskStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MediaProcessingTaskStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(
            () => NestedEnumMediaProcessingTaskStateWithAggregatesFilterSchema,
          ),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z
        .lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema)
        .optional(),
    })
    .strict();

export const NestedEnumJobStateFilterSchema: z.ZodType<Prisma.NestedEnumJobStateFilter> =
  z
    .object({
      equals: z.lazy(() => JobStateSchema).optional(),
      in: z
        .lazy(() => JobStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => JobStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => JobStateSchema),
          z.lazy(() => NestedEnumJobStateFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumJobTypeFilterSchema: z.ZodType<Prisma.NestedEnumJobTypeFilter> =
  z
    .object({
      equals: z.lazy(() => JobTypeSchema).optional(),
      in: z
        .lazy(() => JobTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => JobTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => JobTypeSchema),
          z.lazy(() => NestedEnumJobTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumJobStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumJobStateWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => JobStateSchema).optional(),
      in: z
        .lazy(() => JobStateSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => JobStateSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => JobStateSchema),
          z.lazy(() => NestedEnumJobStateWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumJobStateFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumJobStateFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const NestedEnumJobTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumJobTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => JobTypeSchema).optional(),
      in: z
        .lazy(() => JobTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => JobTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => JobTypeSchema),
          z.lazy(() => NestedEnumJobTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumJobTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumJobTypeFilterSchema).optional(),
    })
    .strict();

export const IdentityCreateWithoutUserInputSchema: z.ZodType<Prisma.IdentityCreateWithoutUserInput> =
  z
    .object({
      provider: z.string(),
      identityID: z.string(),
    })
    .strict();

export const IdentityUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.IdentityUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      provider: z.string(),
      identityID: z.string(),
    })
    .strict();

export const IdentityCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.IdentityCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => IdentityWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => IdentityCreateWithoutUserInputSchema),
        z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const IdentityCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.IdentityCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => IdentityCreateManyUserInputSchema),
        z.lazy(() => IdentityCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ConnectionCreateWithoutUserInputSchema: z.ZodType<Prisma.ConnectionCreateWithoutUserInput> =
  z
    .object({
      target: z.lazy(() => ConnectionTargetSchema),
      refreshToken: z.string(),
    })
    .strict();

export const ConnectionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      target: z.lazy(() => ConnectionTargetSchema),
      refreshToken: z.string(),
    })
    .strict();

export const ConnectionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ConnectionCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => ConnectionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ConnectionCreateWithoutUserInputSchema),
        z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const ConnectionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ConnectionCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ConnectionCreateManyUserInputSchema),
        z.lazy(() => ConnectionCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const IdentityUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.IdentityUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => IdentityWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => IdentityUpdateWithoutUserInputSchema),
        z.lazy(() => IdentityUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => IdentityCreateWithoutUserInputSchema),
        z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const IdentityUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.IdentityUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => IdentityWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => IdentityUpdateWithoutUserInputSchema),
        z.lazy(() => IdentityUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const IdentityUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.IdentityUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => IdentityScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => IdentityUpdateManyMutationInputSchema),
        z.lazy(() => IdentityUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const IdentityScalarWhereInputSchema: z.ZodType<Prisma.IdentityScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => IdentityScalarWhereInputSchema),
          z.lazy(() => IdentityScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => IdentityScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => IdentityScalarWhereInputSchema),
          z.lazy(() => IdentityScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      provider: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      identityID: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      userID: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict();

export const ConnectionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => ConnectionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ConnectionUpdateWithoutUserInputSchema),
        z.lazy(() => ConnectionUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ConnectionCreateWithoutUserInputSchema),
        z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const ConnectionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => ConnectionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ConnectionUpdateWithoutUserInputSchema),
        z.lazy(() => ConnectionUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const ConnectionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => ConnectionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ConnectionUpdateManyMutationInputSchema),
        z.lazy(() => ConnectionUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const ConnectionScalarWhereInputSchema: z.ZodType<Prisma.ConnectionScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ConnectionScalarWhereInputSchema),
          z.lazy(() => ConnectionScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ConnectionScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ConnectionScalarWhereInputSchema),
          z.lazy(() => ConnectionScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      target: z
        .union([
          z.lazy(() => EnumConnectionTargetFilterSchema),
          z.lazy(() => ConnectionTargetSchema),
        ])
        .optional(),
      refreshToken: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const UserCreateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateWithoutIdentitiesInput> =
  z
    .object({
      name: z.string(),
      email: z.string().optional().nullable(),
      isActive: z.boolean().optional(),
      permissions: z
        .union([
          z.lazy(() => UserCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      connections: z
        .lazy(() => ConnectionCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutIdentitiesInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      isActive: z.boolean().optional(),
      permissions: z
        .union([
          z.lazy(() => UserCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      connections: z
        .lazy(() => ConnectionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutIdentitiesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutIdentitiesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUpsertWithoutIdentitiesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutIdentitiesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutIdentitiesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutIdentitiesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutIdentitiesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutIdentitiesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutIdentitiesInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUpdateWithoutIdentitiesInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => UserUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      connections: z
        .lazy(() => ConnectionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutIdentitiesInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => UserUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      connections: z
        .lazy(() => ConnectionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateWithoutConnectionsInputSchema: z.ZodType<Prisma.UserCreateWithoutConnectionsInput> =
  z
    .object({
      name: z.string(),
      email: z.string().optional().nullable(),
      isActive: z.boolean().optional(),
      permissions: z
        .union([
          z.lazy(() => UserCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      identities: z
        .lazy(() => IdentityCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutConnectionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutConnectionsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      isActive: z.boolean().optional(),
      permissions: z
        .union([
          z.lazy(() => UserCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      identities: z
        .lazy(() => IdentityUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutConnectionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutConnectionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutConnectionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutConnectionsInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutConnectionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutConnectionsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutConnectionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutConnectionsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutConnectionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutConnectionsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutConnectionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutConnectionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutConnectionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutConnectionsInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutConnectionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutConnectionsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => UserUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      identities: z
        .lazy(() => IdentityUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutConnectionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutConnectionsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      permissions: z
        .union([
          z.lazy(() => UserUpdatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
      identities: z
        .lazy(() => IdentityUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownCreateWithoutShowInputSchema: z.ZodType<Prisma.RundownCreateWithoutShowInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      items: z
        .lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetCreateNestedManyWithoutRundownInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export const RundownUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutShowInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      items: z
        .lazy(
          () => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export const RundownCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.RundownCreateOrConnectWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => RundownWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RundownCreateWithoutShowInputSchema),
        z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema),
      ]),
    })
    .strict();

export const RundownCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.RundownCreateManyShowInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => RundownCreateManyShowInputSchema),
        z.lazy(() => RundownCreateManyShowInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ContinuityItemCreateWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemCreateWithoutShowInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutContinuityItemsInputSchema)
        .optional(),
    })
    .strict();

export const ContinuityItemUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedCreateWithoutShowInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const ContinuityItemCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemCreateOrConnectWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),
        z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema),
      ]),
    })
    .strict();

export const ContinuityItemCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.ContinuityItemCreateManyShowInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ContinuityItemCreateManyShowInputSchema),
        z.lazy(() => ContinuityItemCreateManyShowInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MetadataCreateWithoutShowInputSchema: z.ZodType<Prisma.MetadataCreateWithoutShowInput> =
  z
    .object({
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      field: z.lazy(() => MetadataFieldCreateNestedOneWithoutValuesInputSchema),
      rundown: z
        .lazy(() => RundownCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateWithoutShowInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      fieldId: z.number().int(),
      rundownId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const MetadataCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.MetadataCreateOrConnectWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MetadataCreateWithoutShowInputSchema),
        z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema),
      ]),
    })
    .strict();

export const MetadataCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.MetadataCreateManyShowInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MetadataCreateManyShowInputSchema),
        z.lazy(() => MetadataCreateManyShowInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const RundownUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.RundownUpsertWithWhereUniqueWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => RundownWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => RundownUpdateWithoutShowInputSchema),
        z.lazy(() => RundownUncheckedUpdateWithoutShowInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RundownCreateWithoutShowInputSchema),
        z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema),
      ]),
    })
    .strict();

export const RundownUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.RundownUpdateWithWhereUniqueWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => RundownWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => RundownUpdateWithoutShowInputSchema),
        z.lazy(() => RundownUncheckedUpdateWithoutShowInputSchema),
      ]),
    })
    .strict();

export const RundownUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.RundownUpdateManyWithWhereWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => RundownScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => RundownUpdateManyMutationInputSchema),
        z.lazy(() => RundownUncheckedUpdateManyWithoutShowInputSchema),
      ]),
    })
    .strict();

export const RundownScalarWhereInputSchema: z.ZodType<Prisma.RundownScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RundownScalarWhereInputSchema),
          z.lazy(() => RundownScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RundownScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RundownScalarWhereInputSchema),
          z.lazy(() => RundownScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      showId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      ytBroadcastID: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUpsertWithWhereUniqueWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ContinuityItemUpdateWithoutShowInputSchema),
        z.lazy(() => ContinuityItemUncheckedUpdateWithoutShowInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),
        z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema),
      ]),
    })
    .strict();

export const ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUpdateWithWhereUniqueWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ContinuityItemUpdateWithoutShowInputSchema),
        z.lazy(() => ContinuityItemUncheckedUpdateWithoutShowInputSchema),
      ]),
    })
    .strict();

export const ContinuityItemUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUpdateManyWithWhereWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => ContinuityItemScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ContinuityItemUpdateManyMutationInputSchema),
        z.lazy(() => ContinuityItemUncheckedUpdateManyWithoutShowInputSchema),
      ]),
    })
    .strict();

export const ContinuityItemScalarWhereInputSchema: z.ZodType<Prisma.ContinuityItemScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereInputSchema),
          z.lazy(() => ContinuityItemScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContinuityItemScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereInputSchema),
          z.lazy(() => ContinuityItemScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      showId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      durationSeconds: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      ytBroadcastID: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      mediaId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.MetadataUpsertWithWhereUniqueWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MetadataUpdateWithoutShowInputSchema),
        z.lazy(() => MetadataUncheckedUpdateWithoutShowInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MetadataCreateWithoutShowInputSchema),
        z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema),
      ]),
    })
    .strict();

export const MetadataUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.MetadataUpdateWithWhereUniqueWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MetadataUpdateWithoutShowInputSchema),
        z.lazy(() => MetadataUncheckedUpdateWithoutShowInputSchema),
      ]),
    })
    .strict();

export const MetadataUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithWhereWithoutShowInput> =
  z
    .object({
      where: z.lazy(() => MetadataScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MetadataUpdateManyMutationInputSchema),
        z.lazy(() => MetadataUncheckedUpdateManyWithoutShowInputSchema),
      ]),
    })
    .strict();

export const MetadataScalarWhereInputSchema: z.ZodType<Prisma.MetadataScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MetadataScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MetadataScalarWhereInputSchema),
          z.lazy(() => MetadataScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      value: z.lazy(() => JsonFilterSchema).optional(),
      fieldId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      showId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      rundownId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      mediaId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
    })
    .strict();

export const ShowCreateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowCreateWithoutRundownsInput> =
  z
    .object({
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
      continuityItems: z
        .lazy(() => ContinuityItemCreateNestedManyWithoutShowInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataCreateNestedManyWithoutShowInputSchema)
        .optional(),
    })
    .strict();

export const ShowUncheckedCreateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutRundownsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema,
        )
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutShowInputSchema)
        .optional(),
    })
    .strict();

export const ShowCreateOrConnectWithoutRundownsInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutRundownsInput> =
  z
    .object({
      where: z.lazy(() => ShowWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ShowCreateWithoutRundownsInputSchema),
        z.lazy(() => ShowUncheckedCreateWithoutRundownsInputSchema),
      ]),
    })
    .strict();

export const RundownItemCreateWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemCreateWithoutRundownInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutRundownItemsInputSchema)
        .optional(),
    })
    .strict();

export const RundownItemUncheckedCreateWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUncheckedCreateWithoutRundownInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const RundownItemCreateOrConnectWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemCreateOrConnectWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => RundownItemWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RundownItemCreateWithoutRundownInputSchema),
        z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const RundownItemCreateManyRundownInputEnvelopeSchema: z.ZodType<Prisma.RundownItemCreateManyRundownInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => RundownItemCreateManyRundownInputSchema),
        z.lazy(() => RundownItemCreateManyRundownInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AssetCreateWithoutRundownInputSchema: z.ZodType<Prisma.AssetCreateWithoutRundownInput> =
  z
    .object({
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      media: z.lazy(() => MediaCreateNestedOneWithoutAssetsInputSchema),
    })
    .strict();

export const AssetUncheckedCreateWithoutRundownInputSchema: z.ZodType<Prisma.AssetUncheckedCreateWithoutRundownInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      mediaId: z.number().int(),
    })
    .strict();

export const AssetCreateOrConnectWithoutRundownInputSchema: z.ZodType<Prisma.AssetCreateOrConnectWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => AssetWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AssetCreateWithoutRundownInputSchema),
        z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const AssetCreateManyRundownInputEnvelopeSchema: z.ZodType<Prisma.AssetCreateManyRundownInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => AssetCreateManyRundownInputSchema),
        z.lazy(() => AssetCreateManyRundownInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MetadataCreateWithoutRundownInputSchema: z.ZodType<Prisma.MetadataCreateWithoutRundownInput> =
  z
    .object({
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      field: z.lazy(() => MetadataFieldCreateNestedOneWithoutValuesInputSchema),
      show: z
        .lazy(() => ShowCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedCreateWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateWithoutRundownInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      fieldId: z.number().int(),
      showId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const MetadataCreateOrConnectWithoutRundownInputSchema: z.ZodType<Prisma.MetadataCreateOrConnectWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MetadataCreateWithoutRundownInputSchema),
        z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const MetadataCreateManyRundownInputEnvelopeSchema: z.ZodType<Prisma.MetadataCreateManyRundownInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MetadataCreateManyRundownInputSchema),
        z.lazy(() => MetadataCreateManyRundownInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ShowUpsertWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUpsertWithoutRundownsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ShowUpdateWithoutRundownsInputSchema),
        z.lazy(() => ShowUncheckedUpdateWithoutRundownsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ShowCreateWithoutRundownsInputSchema),
        z.lazy(() => ShowUncheckedCreateWithoutRundownsInputSchema),
      ]),
      where: z.lazy(() => ShowWhereInputSchema).optional(),
    })
    .strict();

export const ShowUpdateToOneWithWhereWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutRundownsInput> =
  z
    .object({
      where: z.lazy(() => ShowWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ShowUpdateWithoutRundownsInputSchema),
        z.lazy(() => ShowUncheckedUpdateWithoutRundownsInputSchema),
      ]),
    })
    .strict();

export const ShowUpdateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUpdateWithoutRundownsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      continuityItems: z
        .lazy(() => ContinuityItemUpdateManyWithoutShowNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUpdateManyWithoutShowNestedInputSchema)
        .optional(),
    })
    .strict();

export const ShowUncheckedUpdateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutRundownsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema,
        )
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutShowNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUpsertWithWhereUniqueWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => RundownItemWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => RundownItemUpdateWithoutRundownInputSchema),
        z.lazy(() => RundownItemUncheckedUpdateWithoutRundownInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RundownItemCreateWithoutRundownInputSchema),
        z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUpdateWithWhereUniqueWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => RundownItemWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => RundownItemUpdateWithoutRundownInputSchema),
        z.lazy(() => RundownItemUncheckedUpdateWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const RundownItemUpdateManyWithWhereWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUpdateManyWithWhereWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => RundownItemScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => RundownItemUpdateManyMutationInputSchema),
        z.lazy(() => RundownItemUncheckedUpdateManyWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const RundownItemScalarWhereInputSchema: z.ZodType<Prisma.RundownItemScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RundownItemScalarWhereInputSchema),
          z.lazy(() => RundownItemScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RundownItemScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RundownItemScalarWhereInputSchema),
          z.lazy(() => RundownItemScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      rundownId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      durationSeconds: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      type: z
        .union([
          z.lazy(() => EnumRundownItemTypeFilterSchema),
          z.lazy(() => RundownItemTypeSchema),
        ])
        .optional(),
      notes: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      mediaId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
    })
    .strict();

export const AssetUpsertWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.AssetUpsertWithWhereUniqueWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => AssetWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AssetUpdateWithoutRundownInputSchema),
        z.lazy(() => AssetUncheckedUpdateWithoutRundownInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AssetCreateWithoutRundownInputSchema),
        z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const AssetUpdateWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.AssetUpdateWithWhereUniqueWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => AssetWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AssetUpdateWithoutRundownInputSchema),
        z.lazy(() => AssetUncheckedUpdateWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const AssetUpdateManyWithWhereWithoutRundownInputSchema: z.ZodType<Prisma.AssetUpdateManyWithWhereWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => AssetScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AssetUpdateManyMutationInputSchema),
        z.lazy(() => AssetUncheckedUpdateManyWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const AssetScalarWhereInputSchema: z.ZodType<Prisma.AssetScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AssetScalarWhereInputSchema),
          z.lazy(() => AssetScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AssetScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AssetScalarWhereInputSchema),
          z.lazy(() => AssetScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      category: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      rundownId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      mediaId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict();

export const MetadataUpsertWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUpsertWithWhereUniqueWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MetadataUpdateWithoutRundownInputSchema),
        z.lazy(() => MetadataUncheckedUpdateWithoutRundownInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MetadataCreateWithoutRundownInputSchema),
        z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const MetadataUpdateWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUpdateWithWhereUniqueWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MetadataUpdateWithoutRundownInputSchema),
        z.lazy(() => MetadataUncheckedUpdateWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const MetadataUpdateManyWithWhereWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithWhereWithoutRundownInput> =
  z
    .object({
      where: z.lazy(() => MetadataScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MetadataUpdateManyMutationInputSchema),
        z.lazy(() => MetadataUncheckedUpdateManyWithoutRundownInputSchema),
      ]),
    })
    .strict();

export const MediaCreateWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaCreateWithoutRundownItemsInput> =
  z
    .object({
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      continuityItems: z
        .lazy(() => ContinuityItemCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedCreateWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutRundownItemsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaCreateOrConnectWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutRundownItemsInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutRundownItemsInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutRundownItemsInputSchema),
      ]),
    })
    .strict();

export const RundownCreateWithoutItemsInputSchema: z.ZodType<Prisma.RundownCreateWithoutItemsInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      show: z.lazy(() => ShowCreateNestedOneWithoutRundownsInputSchema),
      assets: z
        .lazy(() => AssetCreateNestedManyWithoutRundownInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export const RundownUncheckedCreateWithoutItemsInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutItemsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      showId: z.number().int(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export const RundownCreateOrConnectWithoutItemsInputSchema: z.ZodType<Prisma.RundownCreateOrConnectWithoutItemsInput> =
  z
    .object({
      where: z.lazy(() => RundownWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RundownCreateWithoutItemsInputSchema),
        z.lazy(() => RundownUncheckedCreateWithoutItemsInputSchema),
      ]),
    })
    .strict();

export const MediaUpsertWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaUpsertWithoutRundownItemsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MediaUpdateWithoutRundownItemsInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutRundownItemsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutRundownItemsInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutRundownItemsInputSchema),
      ]),
      where: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export const MediaUpdateToOneWithWhereWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutRundownItemsInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutRundownItemsInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutRundownItemsInputSchema),
      ]),
    })
    .strict();

export const MediaUpdateWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaUpdateWithoutRundownItemsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutRundownItemsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownUpsertWithoutItemsInputSchema: z.ZodType<Prisma.RundownUpsertWithoutItemsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => RundownUpdateWithoutItemsInputSchema),
        z.lazy(() => RundownUncheckedUpdateWithoutItemsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RundownCreateWithoutItemsInputSchema),
        z.lazy(() => RundownUncheckedCreateWithoutItemsInputSchema),
      ]),
      where: z.lazy(() => RundownWhereInputSchema).optional(),
    })
    .strict();

export const RundownUpdateToOneWithWhereWithoutItemsInputSchema: z.ZodType<Prisma.RundownUpdateToOneWithWhereWithoutItemsInput> =
  z
    .object({
      where: z.lazy(() => RundownWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => RundownUpdateWithoutItemsInputSchema),
        z.lazy(() => RundownUncheckedUpdateWithoutItemsInputSchema),
      ]),
    })
    .strict();

export const RundownUpdateWithoutItemsInputSchema: z.ZodType<Prisma.RundownUpdateWithoutItemsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      show: z
        .lazy(() => ShowUpdateOneRequiredWithoutRundownsNestedInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownUncheckedUpdateWithoutItemsInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateWithoutItemsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaCreateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaCreateWithoutContinuityItemsInput> =
  z
    .object({
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedCreateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutContinuityItemsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaCreateOrConnectWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutContinuityItemsInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutContinuityItemsInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutContinuityItemsInputSchema),
      ]),
    })
    .strict();

export const ShowCreateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowCreateWithoutContinuityItemsInput> =
  z
    .object({
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
      rundowns: z
        .lazy(() => RundownCreateNestedManyWithoutShowInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataCreateNestedManyWithoutShowInputSchema)
        .optional(),
    })
    .strict();

export const ShowUncheckedCreateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutContinuityItemsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
      rundowns: z
        .lazy(() => RundownUncheckedCreateNestedManyWithoutShowInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutShowInputSchema)
        .optional(),
    })
    .strict();

export const ShowCreateOrConnectWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutContinuityItemsInput> =
  z
    .object({
      where: z.lazy(() => ShowWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ShowCreateWithoutContinuityItemsInputSchema),
        z.lazy(() => ShowUncheckedCreateWithoutContinuityItemsInputSchema),
      ]),
    })
    .strict();

export const MediaUpsertWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaUpsertWithoutContinuityItemsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MediaUpdateWithoutContinuityItemsInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutContinuityItemsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutContinuityItemsInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutContinuityItemsInputSchema),
      ]),
      where: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export const MediaUpdateToOneWithWhereWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutContinuityItemsInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutContinuityItemsInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutContinuityItemsInputSchema),
      ]),
    })
    .strict();

export const MediaUpdateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaUpdateWithoutContinuityItemsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownItems: z
        .lazy(() => RundownItemUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutContinuityItemsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const ShowUpsertWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowUpsertWithoutContinuityItemsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ShowUpdateWithoutContinuityItemsInputSchema),
        z.lazy(() => ShowUncheckedUpdateWithoutContinuityItemsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ShowCreateWithoutContinuityItemsInputSchema),
        z.lazy(() => ShowUncheckedCreateWithoutContinuityItemsInputSchema),
      ]),
      where: z.lazy(() => ShowWhereInputSchema).optional(),
    })
    .strict();

export const ShowUpdateToOneWithWhereWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutContinuityItemsInput> =
  z
    .object({
      where: z.lazy(() => ShowWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ShowUpdateWithoutContinuityItemsInputSchema),
        z.lazy(() => ShowUncheckedUpdateWithoutContinuityItemsInputSchema),
      ]),
    })
    .strict();

export const ShowUpdateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowUpdateWithoutContinuityItemsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundowns: z
        .lazy(() => RundownUpdateManyWithoutShowNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUpdateManyWithoutShowNestedInputSchema)
        .optional(),
    })
    .strict();

export const ShowUncheckedUpdateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutContinuityItemsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundowns: z
        .lazy(() => RundownUncheckedUpdateManyWithoutShowNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutShowNestedInputSchema)
        .optional(),
    })
    .strict();

export const MetadataCreateWithoutFieldInputSchema: z.ZodType<Prisma.MetadataCreateWithoutFieldInput> =
  z
    .object({
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      show: z
        .lazy(() => ShowCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedCreateWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateWithoutFieldInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      showId: z.number().int().optional().nullable(),
      rundownId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const MetadataCreateOrConnectWithoutFieldInputSchema: z.ZodType<Prisma.MetadataCreateOrConnectWithoutFieldInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MetadataCreateWithoutFieldInputSchema),
        z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema),
      ]),
    })
    .strict();

export const MetadataCreateManyFieldInputEnvelopeSchema: z.ZodType<Prisma.MetadataCreateManyFieldInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MetadataCreateManyFieldInputSchema),
        z.lazy(() => MetadataCreateManyFieldInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MetadataUpsertWithWhereUniqueWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUpsertWithWhereUniqueWithoutFieldInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MetadataUpdateWithoutFieldInputSchema),
        z.lazy(() => MetadataUncheckedUpdateWithoutFieldInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MetadataCreateWithoutFieldInputSchema),
        z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema),
      ]),
    })
    .strict();

export const MetadataUpdateWithWhereUniqueWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUpdateWithWhereUniqueWithoutFieldInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MetadataUpdateWithoutFieldInputSchema),
        z.lazy(() => MetadataUncheckedUpdateWithoutFieldInputSchema),
      ]),
    })
    .strict();

export const MetadataUpdateManyWithWhereWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithWhereWithoutFieldInput> =
  z
    .object({
      where: z.lazy(() => MetadataScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MetadataUpdateManyMutationInputSchema),
        z.lazy(() => MetadataUncheckedUpdateManyWithoutFieldInputSchema),
      ]),
    })
    .strict();

export const MetadataFieldCreateWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldCreateWithoutValuesInput> =
  z
    .object({
      name: z.string(),
      type: z.lazy(() => MetadataValueTypeSchema),
      target: z.lazy(() => MetadataTargetTypeSchema),
      archived: z.boolean().optional(),
      default: z.boolean().optional(),
    })
    .strict();

export const MetadataFieldUncheckedCreateWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldUncheckedCreateWithoutValuesInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      type: z.lazy(() => MetadataValueTypeSchema),
      target: z.lazy(() => MetadataTargetTypeSchema),
      archived: z.boolean().optional(),
      default: z.boolean().optional(),
    })
    .strict();

export const MetadataFieldCreateOrConnectWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldCreateOrConnectWithoutValuesInput> =
  z
    .object({
      where: z.lazy(() => MetadataFieldWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MetadataFieldCreateWithoutValuesInputSchema),
        z.lazy(() => MetadataFieldUncheckedCreateWithoutValuesInputSchema),
      ]),
    })
    .strict();

export const ShowCreateWithoutMetadataInputSchema: z.ZodType<Prisma.ShowCreateWithoutMetadataInput> =
  z
    .object({
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
      rundowns: z
        .lazy(() => RundownCreateNestedManyWithoutShowInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemCreateNestedManyWithoutShowInputSchema)
        .optional(),
    })
    .strict();

export const ShowUncheckedCreateWithoutMetadataInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutMetadataInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      ytStreamID: z.string().optional().nullable(),
      ytBroadcastID: z.string().optional().nullable(),
      rundowns: z
        .lazy(() => RundownUncheckedCreateNestedManyWithoutShowInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema,
        )
        .optional(),
    })
    .strict();

export const ShowCreateOrConnectWithoutMetadataInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutMetadataInput> =
  z
    .object({
      where: z.lazy(() => ShowWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ShowCreateWithoutMetadataInputSchema),
        z.lazy(() => ShowUncheckedCreateWithoutMetadataInputSchema),
      ]),
    })
    .strict();

export const RundownCreateWithoutMetadataInputSchema: z.ZodType<Prisma.RundownCreateWithoutMetadataInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      show: z.lazy(() => ShowCreateNestedOneWithoutRundownsInputSchema),
      items: z
        .lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export const RundownUncheckedCreateWithoutMetadataInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutMetadataInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      showId: z.number().int(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      items: z
        .lazy(
          () => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export const RundownCreateOrConnectWithoutMetadataInputSchema: z.ZodType<Prisma.RundownCreateOrConnectWithoutMetadataInput> =
  z
    .object({
      where: z.lazy(() => RundownWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RundownCreateWithoutMetadataInputSchema),
        z.lazy(() => RundownUncheckedCreateWithoutMetadataInputSchema),
      ]),
    })
    .strict();

export const MediaCreateWithoutMetadataInputSchema: z.ZodType<Prisma.MediaCreateWithoutMetadataInput> =
  z
    .object({
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedCreateWithoutMetadataInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutMetadataInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaCreateOrConnectWithoutMetadataInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutMetadataInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutMetadataInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutMetadataInputSchema),
      ]),
    })
    .strict();

export const MetadataFieldUpsertWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldUpsertWithoutValuesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MetadataFieldUpdateWithoutValuesInputSchema),
        z.lazy(() => MetadataFieldUncheckedUpdateWithoutValuesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MetadataFieldCreateWithoutValuesInputSchema),
        z.lazy(() => MetadataFieldUncheckedCreateWithoutValuesInputSchema),
      ]),
      where: z.lazy(() => MetadataFieldWhereInputSchema).optional(),
    })
    .strict();

export const MetadataFieldUpdateToOneWithWhereWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldUpdateToOneWithWhereWithoutValuesInput> =
  z
    .object({
      where: z.lazy(() => MetadataFieldWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MetadataFieldUpdateWithoutValuesInputSchema),
        z.lazy(() => MetadataFieldUncheckedUpdateWithoutValuesInputSchema),
      ]),
    })
    .strict();

export const MetadataFieldUpdateWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldUpdateWithoutValuesInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => EnumMetadataValueTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => EnumMetadataTargetTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      default: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MetadataFieldUncheckedUpdateWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldUncheckedUpdateWithoutValuesInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MetadataValueTypeSchema),
          z.lazy(() => EnumMetadataValueTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => MetadataTargetTypeSchema),
          z.lazy(() => EnumMetadataTargetTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      default: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ShowUpsertWithoutMetadataInputSchema: z.ZodType<Prisma.ShowUpsertWithoutMetadataInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ShowUpdateWithoutMetadataInputSchema),
        z.lazy(() => ShowUncheckedUpdateWithoutMetadataInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ShowCreateWithoutMetadataInputSchema),
        z.lazy(() => ShowUncheckedCreateWithoutMetadataInputSchema),
      ]),
      where: z.lazy(() => ShowWhereInputSchema).optional(),
    })
    .strict();

export const ShowUpdateToOneWithWhereWithoutMetadataInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutMetadataInput> =
  z
    .object({
      where: z.lazy(() => ShowWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ShowUpdateWithoutMetadataInputSchema),
        z.lazy(() => ShowUncheckedUpdateWithoutMetadataInputSchema),
      ]),
    })
    .strict();

export const ShowUpdateWithoutMetadataInputSchema: z.ZodType<Prisma.ShowUpdateWithoutMetadataInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundowns: z
        .lazy(() => RundownUpdateManyWithoutShowNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemUpdateManyWithoutShowNestedInputSchema)
        .optional(),
    })
    .strict();

export const ShowUncheckedUpdateWithoutMetadataInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutMetadataInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytStreamID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundowns: z
        .lazy(() => RundownUncheckedUpdateManyWithoutShowNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const RundownUpsertWithoutMetadataInputSchema: z.ZodType<Prisma.RundownUpsertWithoutMetadataInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => RundownUpdateWithoutMetadataInputSchema),
        z.lazy(() => RundownUncheckedUpdateWithoutMetadataInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RundownCreateWithoutMetadataInputSchema),
        z.lazy(() => RundownUncheckedCreateWithoutMetadataInputSchema),
      ]),
      where: z.lazy(() => RundownWhereInputSchema).optional(),
    })
    .strict();

export const RundownUpdateToOneWithWhereWithoutMetadataInputSchema: z.ZodType<Prisma.RundownUpdateToOneWithWhereWithoutMetadataInput> =
  z
    .object({
      where: z.lazy(() => RundownWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => RundownUpdateWithoutMetadataInputSchema),
        z.lazy(() => RundownUncheckedUpdateWithoutMetadataInputSchema),
      ]),
    })
    .strict();

export const RundownUpdateWithoutMetadataInputSchema: z.ZodType<Prisma.RundownUpdateWithoutMetadataInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      show: z
        .lazy(() => ShowUpdateOneRequiredWithoutRundownsNestedInputSchema)
        .optional(),
      items: z
        .lazy(() => RundownItemUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownUncheckedUpdateWithoutMetadataInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateWithoutMetadataInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      items: z
        .lazy(
          () => RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaUpsertWithoutMetadataInputSchema: z.ZodType<Prisma.MediaUpsertWithoutMetadataInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MediaUpdateWithoutMetadataInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutMetadataInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutMetadataInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutMetadataInputSchema),
      ]),
      where: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export const MediaUpdateToOneWithWhereWithoutMetadataInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutMetadataInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutMetadataInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutMetadataInputSchema),
      ]),
    })
    .strict();

export const MediaUpdateWithoutMetadataInputSchema: z.ZodType<Prisma.MediaUpdateWithoutMetadataInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownItems: z
        .lazy(() => RundownItemUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateWithoutMetadataInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutMetadataInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaCreateWithoutAssetsInputSchema: z.ZodType<Prisma.MediaCreateWithoutAssetsInput> =
  z
    .object({
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedCreateWithoutAssetsInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutAssetsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaCreateOrConnectWithoutAssetsInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutAssetsInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutAssetsInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutAssetsInputSchema),
      ]),
    })
    .strict();

export const RundownCreateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownCreateWithoutAssetsInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      show: z.lazy(() => ShowCreateNestedOneWithoutRundownsInputSchema),
      items: z
        .lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export const RundownUncheckedCreateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutAssetsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      showId: z.number().int(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      items: z
        .lazy(
          () => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema,
        )
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export const RundownCreateOrConnectWithoutAssetsInputSchema: z.ZodType<Prisma.RundownCreateOrConnectWithoutAssetsInput> =
  z
    .object({
      where: z.lazy(() => RundownWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RundownCreateWithoutAssetsInputSchema),
        z.lazy(() => RundownUncheckedCreateWithoutAssetsInputSchema),
      ]),
    })
    .strict();

export const MediaUpsertWithoutAssetsInputSchema: z.ZodType<Prisma.MediaUpsertWithoutAssetsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MediaUpdateWithoutAssetsInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutAssetsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutAssetsInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutAssetsInputSchema),
      ]),
      where: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export const MediaUpdateToOneWithWhereWithoutAssetsInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutAssetsInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutAssetsInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutAssetsInputSchema),
      ]),
    })
    .strict();

export const MediaUpdateWithoutAssetsInputSchema: z.ZodType<Prisma.MediaUpdateWithoutAssetsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownItems: z
        .lazy(() => RundownItemUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateWithoutAssetsInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutAssetsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownUpsertWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUpsertWithoutAssetsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => RundownUpdateWithoutAssetsInputSchema),
        z.lazy(() => RundownUncheckedUpdateWithoutAssetsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RundownCreateWithoutAssetsInputSchema),
        z.lazy(() => RundownUncheckedCreateWithoutAssetsInputSchema),
      ]),
      where: z.lazy(() => RundownWhereInputSchema).optional(),
    })
    .strict();

export const RundownUpdateToOneWithWhereWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUpdateToOneWithWhereWithoutAssetsInput> =
  z
    .object({
      where: z.lazy(() => RundownWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => RundownUpdateWithoutAssetsInputSchema),
        z.lazy(() => RundownUncheckedUpdateWithoutAssetsInputSchema),
      ]),
    })
    .strict();

export const RundownUpdateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUpdateWithoutAssetsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      show: z
        .lazy(() => ShowUpdateOneRequiredWithoutRundownsNestedInputSchema)
        .optional(),
      items: z
        .lazy(() => RundownItemUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownUncheckedUpdateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateWithoutAssetsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      items: z
        .lazy(
          () => RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema,
        )
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownItemCreateWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemCreateWithoutMediaInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
      rundown: z.lazy(() => RundownCreateNestedOneWithoutItemsInputSchema),
    })
    .strict();

export const RundownItemUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUncheckedCreateWithoutMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rundownId: z.number().int(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
    })
    .strict();

export const RundownItemCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemCreateOrConnectWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => RundownItemWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RundownItemCreateWithoutMediaInputSchema),
        z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const RundownItemCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.RundownItemCreateManyMediaInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => RundownItemCreateManyMediaInputSchema),
        z.lazy(() => RundownItemCreateManyMediaInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ContinuityItemCreateWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemCreateWithoutMediaInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      show: z.lazy(() => ShowCreateNestedOneWithoutContinuityItemsInputSchema),
    })
    .strict();

export const ContinuityItemUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedCreateWithoutMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      showId: z.number().int(),
      durationSeconds: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
    })
    .strict();

export const ContinuityItemCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemCreateOrConnectWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),
        z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const ContinuityItemCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.ContinuityItemCreateManyMediaInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ContinuityItemCreateManyMediaInputSchema),
        z.lazy(() => ContinuityItemCreateManyMediaInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MediaProcessingTaskCreateWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateWithoutMediaInput> =
  z
    .object({
      description: z.string(),
      additionalInfo: z.string().optional(),
      state: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedCreateWithoutMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      description: z.string(),
      additionalInfo: z.string().optional(),
      state: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
    })
    .strict();

export const MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateOrConnectWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),
        z.lazy(() => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const MediaProcessingTaskCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyMediaInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MediaProcessingTaskCreateManyMediaInputSchema),
        z.lazy(() => MediaProcessingTaskCreateManyMediaInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AssetCreateWithoutMediaInputSchema: z.ZodType<Prisma.AssetCreateWithoutMediaInput> =
  z
    .object({
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      rundown: z.lazy(() => RundownCreateNestedOneWithoutAssetsInputSchema),
    })
    .strict();

export const AssetUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.AssetUncheckedCreateWithoutMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      rundownId: z.number().int(),
    })
    .strict();

export const AssetCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.AssetCreateOrConnectWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => AssetWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AssetCreateWithoutMediaInputSchema),
        z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const AssetCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.AssetCreateManyMediaInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => AssetCreateManyMediaInputSchema),
        z.lazy(() => AssetCreateManyMediaInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MetadataCreateWithoutMediaInputSchema: z.ZodType<Prisma.MetadataCreateWithoutMediaInput> =
  z
    .object({
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      field: z.lazy(() => MetadataFieldCreateNestedOneWithoutValuesInputSchema),
      show: z
        .lazy(() => ShowCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateWithoutMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      fieldId: z.number().int(),
      showId: z.number().int().optional().nullable(),
      rundownId: z.number().int().optional().nullable(),
    })
    .strict();

export const MetadataCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.MetadataCreateOrConnectWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MetadataCreateWithoutMediaInputSchema),
        z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const MetadataCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.MetadataCreateManyMediaInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MetadataCreateManyMediaInputSchema),
        z.lazy(() => MetadataCreateManyMediaInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpsertWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => RundownItemWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => RundownItemUpdateWithoutMediaInputSchema),
        z.lazy(() => RundownItemUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RundownItemCreateWithoutMediaInputSchema),
        z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpdateWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => RundownItemWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => RundownItemUpdateWithoutMediaInputSchema),
        z.lazy(() => RundownItemUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const RundownItemUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpdateManyWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => RundownItemScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => RundownItemUpdateManyMutationInputSchema),
        z.lazy(() => RundownItemUncheckedUpdateManyWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUpsertWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ContinuityItemUpdateWithoutMediaInputSchema),
        z.lazy(() => ContinuityItemUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),
        z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUpdateWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ContinuityItemUpdateWithoutMediaInputSchema),
        z.lazy(() => ContinuityItemUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUpdateManyWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => ContinuityItemScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ContinuityItemUpdateManyMutationInputSchema),
        z.lazy(() => ContinuityItemUncheckedUpdateManyWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MediaProcessingTaskUpdateWithoutMediaInputSchema),
        z.lazy(() => MediaProcessingTaskUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),
        z.lazy(() => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MediaProcessingTaskUpdateWithoutMediaInputSchema),
        z.lazy(() => MediaProcessingTaskUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateManyWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => MediaProcessingTaskScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MediaProcessingTaskUpdateManyMutationInputSchema),
        z.lazy(
          () => MediaProcessingTaskUncheckedUpdateManyWithoutMediaInputSchema,
        ),
      ]),
    })
    .strict();

export const MediaProcessingTaskScalarWhereInputSchema: z.ZodType<Prisma.MediaProcessingTaskScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MediaProcessingTaskScalarWhereInputSchema),
          z.lazy(() => MediaProcessingTaskScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MediaProcessingTaskScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MediaProcessingTaskScalarWhereInputSchema),
          z.lazy(() => MediaProcessingTaskScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      media_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      additionalInfo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      state: z
        .union([
          z.lazy(() => EnumMediaProcessingTaskStateFilterSchema),
          z.lazy(() => MediaProcessingTaskStateSchema),
        ])
        .optional(),
    })
    .strict();

export const AssetUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.AssetUpsertWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => AssetWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AssetUpdateWithoutMediaInputSchema),
        z.lazy(() => AssetUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AssetCreateWithoutMediaInputSchema),
        z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const AssetUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.AssetUpdateWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => AssetWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AssetUpdateWithoutMediaInputSchema),
        z.lazy(() => AssetUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const AssetUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.AssetUpdateManyWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => AssetScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AssetUpdateManyMutationInputSchema),
        z.lazy(() => AssetUncheckedUpdateManyWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const MetadataUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUpsertWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MetadataUpdateWithoutMediaInputSchema),
        z.lazy(() => MetadataUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MetadataCreateWithoutMediaInputSchema),
        z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const MetadataUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUpdateWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => MetadataWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MetadataUpdateWithoutMediaInputSchema),
        z.lazy(() => MetadataUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const MetadataUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => MetadataScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MetadataUpdateManyMutationInputSchema),
        z.lazy(() => MetadataUncheckedUpdateManyWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const MediaCreateWithoutTasksInputSchema: z.ZodType<Prisma.MediaCreateWithoutTasksInput> =
  z
    .object({
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutTasksInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export const MediaCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutTasksInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutTasksInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutTasksInputSchema),
      ]),
    })
    .strict();

export const MediaUpsertWithoutTasksInputSchema: z.ZodType<Prisma.MediaUpsertWithoutTasksInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MediaUpdateWithoutTasksInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutTasksInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutTasksInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutTasksInputSchema),
      ]),
      where: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export const MediaUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutTasksInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutTasksInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutTasksInputSchema),
      ]),
    })
    .strict();

export const MediaUpdateWithoutTasksInputSchema: z.ZodType<Prisma.MediaUpdateWithoutTasksInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownItems: z
        .lazy(() => RundownItemUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutTasksInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export const IdentityCreateManyUserInputSchema: z.ZodType<Prisma.IdentityCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      provider: z.string(),
      identityID: z.string(),
    })
    .strict();

export const ConnectionCreateManyUserInputSchema: z.ZodType<Prisma.ConnectionCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      target: z.lazy(() => ConnectionTargetSchema),
      refreshToken: z.string(),
    })
    .strict();

export const IdentityUpdateWithoutUserInputSchema: z.ZodType<Prisma.IdentityUpdateWithoutUserInput> =
  z
    .object({
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identityID: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IdentityUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.IdentityUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identityID: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IdentityUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.IdentityUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      identityID: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ConnectionUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUpdateWithoutUserInput> =
  z
    .object({
      target: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => EnumConnectionTargetFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refreshToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ConnectionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => EnumConnectionTargetFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refreshToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ConnectionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      target: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => EnumConnectionTargetFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refreshToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownCreateManyShowInputSchema: z.ZodType<Prisma.RundownCreateManyShowInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
    })
    .strict();

export const ContinuityItemCreateManyShowInputSchema: z.ZodType<Prisma.ContinuityItemCreateManyShowInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const MetadataCreateManyShowInputSchema: z.ZodType<Prisma.MetadataCreateManyShowInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      fieldId: z.number().int(),
      rundownId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const RundownUpdateWithoutShowInputSchema: z.ZodType<Prisma.RundownUpdateWithoutShowInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      items: z
        .lazy(() => RundownItemUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownUncheckedUpdateWithoutShowInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateWithoutShowInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      items: z
        .lazy(
          () => RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownUncheckedUpdateManyWithoutShowInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateManyWithoutShowInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ContinuityItemUpdateWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUpdateWithoutShowInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      media: z
        .lazy(() => MediaUpdateOneWithoutContinuityItemsNestedInputSchema)
        .optional(),
    })
    .strict();

export const ContinuityItemUncheckedUpdateWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateWithoutShowInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ContinuityItemUncheckedUpdateManyWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateManyWithoutShowInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataUpdateWithoutShowInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutShowInput> =
  z
    .object({
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      field: z
        .lazy(
          () => MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema,
        )
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateWithoutShowInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateWithoutShowInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      fieldId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataUncheckedUpdateManyWithoutShowInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutShowInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      fieldId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RundownItemCreateManyRundownInputSchema: z.ZodType<Prisma.RundownItemCreateManyRundownInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const AssetCreateManyRundownInputSchema: z.ZodType<Prisma.AssetCreateManyRundownInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      mediaId: z.number().int(),
    })
    .strict();

export const MetadataCreateManyRundownInputSchema: z.ZodType<Prisma.MetadataCreateManyRundownInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      fieldId: z.number().int(),
      showId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const RundownItemUpdateWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUpdateWithoutRundownInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneWithoutRundownItemsNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownItemUncheckedUpdateWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateWithoutRundownInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RundownItemUncheckedUpdateManyWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateManyWithoutRundownInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const AssetUpdateWithoutRundownInputSchema: z.ZodType<Prisma.AssetUpdateWithoutRundownInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneRequiredWithoutAssetsNestedInputSchema)
        .optional(),
    })
    .strict();

export const AssetUncheckedUpdateWithoutRundownInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateWithoutRundownInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AssetUncheckedUpdateManyWithoutRundownInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateManyWithoutRundownInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MetadataUpdateWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutRundownInput> =
  z
    .object({
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      field: z
        .lazy(
          () => MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema,
        )
        .optional(),
      show: z
        .lazy(() => ShowUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateWithoutRundownInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      fieldId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataUncheckedUpdateManyWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutRundownInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      fieldId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataCreateManyFieldInputSchema: z.ZodType<Prisma.MetadataCreateManyFieldInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      showId: z.number().int().optional().nullable(),
      rundownId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export const MetadataUpdateWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutFieldInput> =
  z
    .object({
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      show: z
        .lazy(() => ShowUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateWithoutFieldInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataUncheckedUpdateManyWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutFieldInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RundownItemCreateManyMediaInputSchema: z.ZodType<Prisma.RundownItemCreateManyMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rundownId: z.number().int(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
    })
    .strict();

export const ContinuityItemCreateManyMediaInputSchema: z.ZodType<Prisma.ContinuityItemCreateManyMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      showId: z.number().int(),
      durationSeconds: z.number().int(),
      ytBroadcastID: z.string().optional().nullable(),
    })
    .strict();

export const MediaProcessingTaskCreateManyMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      description: z.string(),
      additionalInfo: z.string().optional(),
      state: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
    })
    .strict();

export const AssetCreateManyMediaInputSchema: z.ZodType<Prisma.AssetCreateManyMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      rundownId: z.number().int(),
    })
    .strict();

export const MetadataCreateManyMediaInputSchema: z.ZodType<Prisma.MetadataCreateManyMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      fieldId: z.number().int(),
      showId: z.number().int().optional().nullable(),
      rundownId: z.number().int().optional().nullable(),
    })
    .strict();

export const RundownItemUpdateWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpdateWithoutMediaInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneRequiredWithoutItemsNestedInputSchema)
        .optional(),
    })
    .strict();

export const RundownItemUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RundownItemUncheckedUpdateManyWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateManyWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => RundownItemTypeSchema),
          z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ContinuityItemUpdateWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUpdateWithoutMediaInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      show: z
        .lazy(
          () => ShowUpdateOneRequiredWithoutContinuityItemsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContinuityItemUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ContinuityItemUncheckedUpdateManyWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateManyWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ytBroadcastID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MediaProcessingTaskUpdateWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateWithoutMediaInput> =
  z
    .object({
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      additionalInfo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(
            () => EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedUpdateWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      additionalInfo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(
            () => EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const MediaProcessingTaskUncheckedUpdateManyWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedUpdateManyWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      additionalInfo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaProcessingTaskStateSchema),
          z.lazy(
            () => EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const AssetUpdateWithoutMediaInputSchema: z.ZodType<Prisma.AssetUpdateWithoutMediaInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneRequiredWithoutAssetsNestedInputSchema)
        .optional(),
    })
    .strict();

export const AssetUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AssetUncheckedUpdateManyWithoutMediaInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateManyWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MetadataUpdateWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutMediaInput> =
  z
    .object({
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      field: z
        .lazy(
          () => MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema,
        )
        .optional(),
      show: z
        .lazy(() => ShowUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
    })
    .strict();

export const MetadataUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      fieldId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MetadataUncheckedUpdateManyWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      fieldId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.UserFindFirstArgs, "select" | "include">
> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.UserFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserFindManyArgsSchema: z.ZodType<
  Omit<Prisma.UserFindManyArgs, "select" | "include">
> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.UserFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.UserFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const IdentityFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.IdentityFindFirstArgs, "select" | "include">
> = z
  .object({
    where: IdentityWhereInputSchema.optional(),
    orderBy: z
      .union([
        IdentityOrderByWithRelationInputSchema.array(),
        IdentityOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: IdentityWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        IdentityScalarFieldEnumSchema,
        IdentityScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const IdentityFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.IdentityFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: IdentityWhereInputSchema.optional(),
    orderBy: z
      .union([
        IdentityOrderByWithRelationInputSchema.array(),
        IdentityOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: IdentityWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        IdentityScalarFieldEnumSchema,
        IdentityScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const IdentityFindManyArgsSchema: z.ZodType<
  Omit<Prisma.IdentityFindManyArgs, "select" | "include">
> = z
  .object({
    where: IdentityWhereInputSchema.optional(),
    orderBy: z
      .union([
        IdentityOrderByWithRelationInputSchema.array(),
        IdentityOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: IdentityWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        IdentityScalarFieldEnumSchema,
        IdentityScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const IdentityAggregateArgsSchema: z.ZodType<Prisma.IdentityAggregateArgs> =
  z
    .object({
      where: IdentityWhereInputSchema.optional(),
      orderBy: z
        .union([
          IdentityOrderByWithRelationInputSchema.array(),
          IdentityOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: IdentityWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const IdentityGroupByArgsSchema: z.ZodType<Prisma.IdentityGroupByArgs> =
  z
    .object({
      where: IdentityWhereInputSchema.optional(),
      orderBy: z
        .union([
          IdentityOrderByWithAggregationInputSchema.array(),
          IdentityOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: IdentityScalarFieldEnumSchema.array(),
      having: IdentityScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const IdentityFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.IdentityFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: IdentityWhereUniqueInputSchema,
  })
  .strict();

export const IdentityFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.IdentityFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: IdentityWhereUniqueInputSchema,
  })
  .strict();

export const ConnectionFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.ConnectionFindFirstArgs, "select" | "include">
> = z
  .object({
    where: ConnectionWhereInputSchema.optional(),
    orderBy: z
      .union([
        ConnectionOrderByWithRelationInputSchema.array(),
        ConnectionOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ConnectionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ConnectionScalarFieldEnumSchema,
        ConnectionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const ConnectionFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ConnectionFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: ConnectionWhereInputSchema.optional(),
    orderBy: z
      .union([
        ConnectionOrderByWithRelationInputSchema.array(),
        ConnectionOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ConnectionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ConnectionScalarFieldEnumSchema,
        ConnectionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const ConnectionFindManyArgsSchema: z.ZodType<
  Omit<Prisma.ConnectionFindManyArgs, "select" | "include">
> = z
  .object({
    where: ConnectionWhereInputSchema.optional(),
    orderBy: z
      .union([
        ConnectionOrderByWithRelationInputSchema.array(),
        ConnectionOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ConnectionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ConnectionScalarFieldEnumSchema,
        ConnectionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const ConnectionAggregateArgsSchema: z.ZodType<Prisma.ConnectionAggregateArgs> =
  z
    .object({
      where: ConnectionWhereInputSchema.optional(),
      orderBy: z
        .union([
          ConnectionOrderByWithRelationInputSchema.array(),
          ConnectionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ConnectionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ConnectionGroupByArgsSchema: z.ZodType<Prisma.ConnectionGroupByArgs> =
  z
    .object({
      where: ConnectionWhereInputSchema.optional(),
      orderBy: z
        .union([
          ConnectionOrderByWithAggregationInputSchema.array(),
          ConnectionOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ConnectionScalarFieldEnumSchema.array(),
      having: ConnectionScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ConnectionFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.ConnectionFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: ConnectionWhereUniqueInputSchema,
  })
  .strict();

export const ConnectionFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ConnectionFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: ConnectionWhereUniqueInputSchema,
  })
  .strict();

export const ShowFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.ShowFindFirstArgs, "select" | "include">
> = z
  .object({
    where: ShowWhereInputSchema.optional(),
    orderBy: z
      .union([
        ShowOrderByWithRelationInputSchema.array(),
        ShowOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ShowWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ShowScalarFieldEnumSchema, ShowScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const ShowFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ShowFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: ShowWhereInputSchema.optional(),
    orderBy: z
      .union([
        ShowOrderByWithRelationInputSchema.array(),
        ShowOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ShowWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ShowScalarFieldEnumSchema, ShowScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const ShowFindManyArgsSchema: z.ZodType<
  Omit<Prisma.ShowFindManyArgs, "select" | "include">
> = z
  .object({
    where: ShowWhereInputSchema.optional(),
    orderBy: z
      .union([
        ShowOrderByWithRelationInputSchema.array(),
        ShowOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ShowWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ShowScalarFieldEnumSchema, ShowScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const ShowAggregateArgsSchema: z.ZodType<Prisma.ShowAggregateArgs> = z
  .object({
    where: ShowWhereInputSchema.optional(),
    orderBy: z
      .union([
        ShowOrderByWithRelationInputSchema.array(),
        ShowOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ShowWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ShowGroupByArgsSchema: z.ZodType<Prisma.ShowGroupByArgs> = z
  .object({
    where: ShowWhereInputSchema.optional(),
    orderBy: z
      .union([
        ShowOrderByWithAggregationInputSchema.array(),
        ShowOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ShowScalarFieldEnumSchema.array(),
    having: ShowScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ShowFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.ShowFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: ShowWhereUniqueInputSchema,
  })
  .strict();

export const ShowFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ShowFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: ShowWhereUniqueInputSchema,
  })
  .strict();

export const RundownFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.RundownFindFirstArgs, "select" | "include">
> = z
  .object({
    where: RundownWhereInputSchema.optional(),
    orderBy: z
      .union([
        RundownOrderByWithRelationInputSchema.array(),
        RundownOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RundownWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RundownScalarFieldEnumSchema,
        RundownScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const RundownFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.RundownFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: RundownWhereInputSchema.optional(),
    orderBy: z
      .union([
        RundownOrderByWithRelationInputSchema.array(),
        RundownOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RundownWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RundownScalarFieldEnumSchema,
        RundownScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const RundownFindManyArgsSchema: z.ZodType<
  Omit<Prisma.RundownFindManyArgs, "select" | "include">
> = z
  .object({
    where: RundownWhereInputSchema.optional(),
    orderBy: z
      .union([
        RundownOrderByWithRelationInputSchema.array(),
        RundownOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RundownWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RundownScalarFieldEnumSchema,
        RundownScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const RundownAggregateArgsSchema: z.ZodType<Prisma.RundownAggregateArgs> =
  z
    .object({
      where: RundownWhereInputSchema.optional(),
      orderBy: z
        .union([
          RundownOrderByWithRelationInputSchema.array(),
          RundownOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: RundownWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const RundownGroupByArgsSchema: z.ZodType<Prisma.RundownGroupByArgs> = z
  .object({
    where: RundownWhereInputSchema.optional(),
    orderBy: z
      .union([
        RundownOrderByWithAggregationInputSchema.array(),
        RundownOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: RundownScalarFieldEnumSchema.array(),
    having: RundownScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const RundownFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.RundownFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: RundownWhereUniqueInputSchema,
  })
  .strict();

export const RundownFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.RundownFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: RundownWhereUniqueInputSchema,
  })
  .strict();

export const RundownItemFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.RundownItemFindFirstArgs, "select" | "include">
> = z
  .object({
    where: RundownItemWhereInputSchema.optional(),
    orderBy: z
      .union([
        RundownItemOrderByWithRelationInputSchema.array(),
        RundownItemOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RundownItemWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RundownItemScalarFieldEnumSchema,
        RundownItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const RundownItemFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.RundownItemFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: RundownItemWhereInputSchema.optional(),
    orderBy: z
      .union([
        RundownItemOrderByWithRelationInputSchema.array(),
        RundownItemOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RundownItemWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RundownItemScalarFieldEnumSchema,
        RundownItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const RundownItemFindManyArgsSchema: z.ZodType<
  Omit<Prisma.RundownItemFindManyArgs, "select" | "include">
> = z
  .object({
    where: RundownItemWhereInputSchema.optional(),
    orderBy: z
      .union([
        RundownItemOrderByWithRelationInputSchema.array(),
        RundownItemOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RundownItemWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RundownItemScalarFieldEnumSchema,
        RundownItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const RundownItemAggregateArgsSchema: z.ZodType<Prisma.RundownItemAggregateArgs> =
  z
    .object({
      where: RundownItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          RundownItemOrderByWithRelationInputSchema.array(),
          RundownItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: RundownItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const RundownItemGroupByArgsSchema: z.ZodType<Prisma.RundownItemGroupByArgs> =
  z
    .object({
      where: RundownItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          RundownItemOrderByWithAggregationInputSchema.array(),
          RundownItemOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: RundownItemScalarFieldEnumSchema.array(),
      having: RundownItemScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const RundownItemFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.RundownItemFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: RundownItemWhereUniqueInputSchema,
  })
  .strict();

export const RundownItemFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.RundownItemFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: RundownItemWhereUniqueInputSchema,
  })
  .strict();

export const ContinuityItemFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.ContinuityItemFindFirstArgs, "select" | "include">
> = z
  .object({
    where: ContinuityItemWhereInputSchema.optional(),
    orderBy: z
      .union([
        ContinuityItemOrderByWithRelationInputSchema.array(),
        ContinuityItemOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ContinuityItemWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ContinuityItemScalarFieldEnumSchema,
        ContinuityItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const ContinuityItemFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ContinuityItemFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: ContinuityItemWhereInputSchema.optional(),
    orderBy: z
      .union([
        ContinuityItemOrderByWithRelationInputSchema.array(),
        ContinuityItemOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ContinuityItemWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ContinuityItemScalarFieldEnumSchema,
        ContinuityItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const ContinuityItemFindManyArgsSchema: z.ZodType<
  Omit<Prisma.ContinuityItemFindManyArgs, "select" | "include">
> = z
  .object({
    where: ContinuityItemWhereInputSchema.optional(),
    orderBy: z
      .union([
        ContinuityItemOrderByWithRelationInputSchema.array(),
        ContinuityItemOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ContinuityItemWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ContinuityItemScalarFieldEnumSchema,
        ContinuityItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const ContinuityItemAggregateArgsSchema: z.ZodType<Prisma.ContinuityItemAggregateArgs> =
  z
    .object({
      where: ContinuityItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContinuityItemOrderByWithRelationInputSchema.array(),
          ContinuityItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContinuityItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ContinuityItemGroupByArgsSchema: z.ZodType<Prisma.ContinuityItemGroupByArgs> =
  z
    .object({
      where: ContinuityItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContinuityItemOrderByWithAggregationInputSchema.array(),
          ContinuityItemOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ContinuityItemScalarFieldEnumSchema.array(),
      having: ContinuityItemScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ContinuityItemFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.ContinuityItemFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: ContinuityItemWhereUniqueInputSchema,
  })
  .strict();

export const ContinuityItemFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ContinuityItemFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: ContinuityItemWhereUniqueInputSchema,
  })
  .strict();

export const MetadataFieldFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFieldFindFirstArgs, "select" | "include">
> = z
  .object({
    where: MetadataFieldWhereInputSchema.optional(),
    orderBy: z
      .union([
        MetadataFieldOrderByWithRelationInputSchema.array(),
        MetadataFieldOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MetadataFieldWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MetadataFieldScalarFieldEnumSchema,
        MetadataFieldScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const MetadataFieldFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFieldFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: MetadataFieldWhereInputSchema.optional(),
    orderBy: z
      .union([
        MetadataFieldOrderByWithRelationInputSchema.array(),
        MetadataFieldOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MetadataFieldWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MetadataFieldScalarFieldEnumSchema,
        MetadataFieldScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const MetadataFieldFindManyArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFieldFindManyArgs, "select" | "include">
> = z
  .object({
    where: MetadataFieldWhereInputSchema.optional(),
    orderBy: z
      .union([
        MetadataFieldOrderByWithRelationInputSchema.array(),
        MetadataFieldOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MetadataFieldWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MetadataFieldScalarFieldEnumSchema,
        MetadataFieldScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const MetadataFieldAggregateArgsSchema: z.ZodType<Prisma.MetadataFieldAggregateArgs> =
  z
    .object({
      where: MetadataFieldWhereInputSchema.optional(),
      orderBy: z
        .union([
          MetadataFieldOrderByWithRelationInputSchema.array(),
          MetadataFieldOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MetadataFieldWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MetadataFieldGroupByArgsSchema: z.ZodType<Prisma.MetadataFieldGroupByArgs> =
  z
    .object({
      where: MetadataFieldWhereInputSchema.optional(),
      orderBy: z
        .union([
          MetadataFieldOrderByWithAggregationInputSchema.array(),
          MetadataFieldOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: MetadataFieldScalarFieldEnumSchema.array(),
      having: MetadataFieldScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MetadataFieldFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFieldFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: MetadataFieldWhereUniqueInputSchema,
  })
  .strict();

export const MetadataFieldFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFieldFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: MetadataFieldWhereUniqueInputSchema,
  })
  .strict();

export const MetadataFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFindFirstArgs, "select" | "include">
> = z
  .object({
    where: MetadataWhereInputSchema.optional(),
    orderBy: z
      .union([
        MetadataOrderByWithRelationInputSchema.array(),
        MetadataOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MetadataWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MetadataScalarFieldEnumSchema,
        MetadataScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const MetadataFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: MetadataWhereInputSchema.optional(),
    orderBy: z
      .union([
        MetadataOrderByWithRelationInputSchema.array(),
        MetadataOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MetadataWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MetadataScalarFieldEnumSchema,
        MetadataScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const MetadataFindManyArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFindManyArgs, "select" | "include">
> = z
  .object({
    where: MetadataWhereInputSchema.optional(),
    orderBy: z
      .union([
        MetadataOrderByWithRelationInputSchema.array(),
        MetadataOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MetadataWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MetadataScalarFieldEnumSchema,
        MetadataScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const MetadataAggregateArgsSchema: z.ZodType<Prisma.MetadataAggregateArgs> =
  z
    .object({
      where: MetadataWhereInputSchema.optional(),
      orderBy: z
        .union([
          MetadataOrderByWithRelationInputSchema.array(),
          MetadataOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MetadataWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MetadataGroupByArgsSchema: z.ZodType<Prisma.MetadataGroupByArgs> =
  z
    .object({
      where: MetadataWhereInputSchema.optional(),
      orderBy: z
        .union([
          MetadataOrderByWithAggregationInputSchema.array(),
          MetadataOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: MetadataScalarFieldEnumSchema.array(),
      having: MetadataScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MetadataFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: MetadataWhereUniqueInputSchema,
  })
  .strict();

export const MetadataFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: MetadataWhereUniqueInputSchema,
  })
  .strict();

export const SettingFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.SettingFindFirstArgs, "select">
> = z
  .object({
    where: SettingWhereInputSchema.optional(),
    orderBy: z
      .union([
        SettingOrderByWithRelationInputSchema.array(),
        SettingOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: SettingWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        SettingScalarFieldEnumSchema,
        SettingScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const SettingFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.SettingFindFirstOrThrowArgs, "select">
> = z
  .object({
    where: SettingWhereInputSchema.optional(),
    orderBy: z
      .union([
        SettingOrderByWithRelationInputSchema.array(),
        SettingOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: SettingWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        SettingScalarFieldEnumSchema,
        SettingScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const SettingFindManyArgsSchema: z.ZodType<
  Omit<Prisma.SettingFindManyArgs, "select">
> = z
  .object({
    where: SettingWhereInputSchema.optional(),
    orderBy: z
      .union([
        SettingOrderByWithRelationInputSchema.array(),
        SettingOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: SettingWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        SettingScalarFieldEnumSchema,
        SettingScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const SettingAggregateArgsSchema: z.ZodType<Prisma.SettingAggregateArgs> =
  z
    .object({
      where: SettingWhereInputSchema.optional(),
      orderBy: z
        .union([
          SettingOrderByWithRelationInputSchema.array(),
          SettingOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SettingWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SettingGroupByArgsSchema: z.ZodType<Prisma.SettingGroupByArgs> = z
  .object({
    where: SettingWhereInputSchema.optional(),
    orderBy: z
      .union([
        SettingOrderByWithAggregationInputSchema.array(),
        SettingOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SettingScalarFieldEnumSchema.array(),
    having: SettingScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SettingFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.SettingFindUniqueArgs, "select">
> = z
  .object({
    where: SettingWhereUniqueInputSchema,
  })
  .strict();

export const SettingFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.SettingFindUniqueOrThrowArgs, "select">
> = z
  .object({
    where: SettingWhereUniqueInputSchema,
  })
  .strict();

export const AssetFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.AssetFindFirstArgs, "select" | "include">
> = z
  .object({
    where: AssetWhereInputSchema.optional(),
    orderBy: z
      .union([
        AssetOrderByWithRelationInputSchema.array(),
        AssetOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: AssetWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([AssetScalarFieldEnumSchema, AssetScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const AssetFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.AssetFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: AssetWhereInputSchema.optional(),
    orderBy: z
      .union([
        AssetOrderByWithRelationInputSchema.array(),
        AssetOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: AssetWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([AssetScalarFieldEnumSchema, AssetScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const AssetFindManyArgsSchema: z.ZodType<
  Omit<Prisma.AssetFindManyArgs, "select" | "include">
> = z
  .object({
    where: AssetWhereInputSchema.optional(),
    orderBy: z
      .union([
        AssetOrderByWithRelationInputSchema.array(),
        AssetOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: AssetWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([AssetScalarFieldEnumSchema, AssetScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const AssetAggregateArgsSchema: z.ZodType<Prisma.AssetAggregateArgs> = z
  .object({
    where: AssetWhereInputSchema.optional(),
    orderBy: z
      .union([
        AssetOrderByWithRelationInputSchema.array(),
        AssetOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: AssetWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const AssetGroupByArgsSchema: z.ZodType<Prisma.AssetGroupByArgs> = z
  .object({
    where: AssetWhereInputSchema.optional(),
    orderBy: z
      .union([
        AssetOrderByWithAggregationInputSchema.array(),
        AssetOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: AssetScalarFieldEnumSchema.array(),
    having: AssetScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const AssetFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.AssetFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: AssetWhereUniqueInputSchema,
  })
  .strict();

export const AssetFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.AssetFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: AssetWhereUniqueInputSchema,
  })
  .strict();

export const MediaFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.MediaFindFirstArgs, "select" | "include">
> = z
  .object({
    where: MediaWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaOrderByWithRelationInputSchema.array(),
        MediaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([MediaScalarFieldEnumSchema, MediaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const MediaFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.MediaFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: MediaWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaOrderByWithRelationInputSchema.array(),
        MediaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([MediaScalarFieldEnumSchema, MediaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const MediaFindManyArgsSchema: z.ZodType<
  Omit<Prisma.MediaFindManyArgs, "select" | "include">
> = z
  .object({
    where: MediaWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaOrderByWithRelationInputSchema.array(),
        MediaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([MediaScalarFieldEnumSchema, MediaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const MediaAggregateArgsSchema: z.ZodType<Prisma.MediaAggregateArgs> = z
  .object({
    where: MediaWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaOrderByWithRelationInputSchema.array(),
        MediaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const MediaGroupByArgsSchema: z.ZodType<Prisma.MediaGroupByArgs> = z
  .object({
    where: MediaWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaOrderByWithAggregationInputSchema.array(),
        MediaOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: MediaScalarFieldEnumSchema.array(),
    having: MediaScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const MediaFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.MediaFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: MediaWhereUniqueInputSchema,
  })
  .strict();

export const MediaFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.MediaFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: MediaWhereUniqueInputSchema,
  })
  .strict();

export const MediaProcessingTaskFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskFindFirstArgs, "select" | "include">
> = z
  .object({
    where: MediaProcessingTaskWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaProcessingTaskOrderByWithRelationInputSchema.array(),
        MediaProcessingTaskOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaProcessingTaskWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MediaProcessingTaskScalarFieldEnumSchema,
        MediaProcessingTaskScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const MediaProcessingTaskFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: MediaProcessingTaskWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaProcessingTaskOrderByWithRelationInputSchema.array(),
        MediaProcessingTaskOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaProcessingTaskWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MediaProcessingTaskScalarFieldEnumSchema,
        MediaProcessingTaskScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const MediaProcessingTaskFindManyArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskFindManyArgs, "select" | "include">
> = z
  .object({
    where: MediaProcessingTaskWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaProcessingTaskOrderByWithRelationInputSchema.array(),
        MediaProcessingTaskOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaProcessingTaskWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MediaProcessingTaskScalarFieldEnumSchema,
        MediaProcessingTaskScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const MediaProcessingTaskAggregateArgsSchema: z.ZodType<Prisma.MediaProcessingTaskAggregateArgs> =
  z
    .object({
      where: MediaProcessingTaskWhereInputSchema.optional(),
      orderBy: z
        .union([
          MediaProcessingTaskOrderByWithRelationInputSchema.array(),
          MediaProcessingTaskOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MediaProcessingTaskWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MediaProcessingTaskGroupByArgsSchema: z.ZodType<Prisma.MediaProcessingTaskGroupByArgs> =
  z
    .object({
      where: MediaProcessingTaskWhereInputSchema.optional(),
      orderBy: z
        .union([
          MediaProcessingTaskOrderByWithAggregationInputSchema.array(),
          MediaProcessingTaskOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: MediaProcessingTaskScalarFieldEnumSchema.array(),
      having:
        MediaProcessingTaskScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MediaProcessingTaskFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: MediaProcessingTaskWhereUniqueInputSchema,
  })
  .strict();

export const MediaProcessingTaskFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: MediaProcessingTaskWhereUniqueInputSchema,
  })
  .strict();

export const BaseJobFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobFindFirstArgs, "select">
> = z
  .object({
    where: BaseJobWhereInputSchema.optional(),
    orderBy: z
      .union([
        BaseJobOrderByWithRelationInputSchema.array(),
        BaseJobOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: BaseJobWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        BaseJobScalarFieldEnumSchema,
        BaseJobScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const BaseJobFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobFindFirstOrThrowArgs, "select">
> = z
  .object({
    where: BaseJobWhereInputSchema.optional(),
    orderBy: z
      .union([
        BaseJobOrderByWithRelationInputSchema.array(),
        BaseJobOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: BaseJobWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        BaseJobScalarFieldEnumSchema,
        BaseJobScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const BaseJobFindManyArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobFindManyArgs, "select">
> = z
  .object({
    where: BaseJobWhereInputSchema.optional(),
    orderBy: z
      .union([
        BaseJobOrderByWithRelationInputSchema.array(),
        BaseJobOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: BaseJobWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        BaseJobScalarFieldEnumSchema,
        BaseJobScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const BaseJobAggregateArgsSchema: z.ZodType<Prisma.BaseJobAggregateArgs> =
  z
    .object({
      where: BaseJobWhereInputSchema.optional(),
      orderBy: z
        .union([
          BaseJobOrderByWithRelationInputSchema.array(),
          BaseJobOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BaseJobWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const BaseJobGroupByArgsSchema: z.ZodType<Prisma.BaseJobGroupByArgs> = z
  .object({
    where: BaseJobWhereInputSchema.optional(),
    orderBy: z
      .union([
        BaseJobOrderByWithAggregationInputSchema.array(),
        BaseJobOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: BaseJobScalarFieldEnumSchema.array(),
    having: BaseJobScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const BaseJobFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobFindUniqueArgs, "select">
> = z
  .object({
    where: BaseJobWhereUniqueInputSchema,
  })
  .strict();

export const BaseJobFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobFindUniqueOrThrowArgs, "select">
> = z
  .object({
    where: BaseJobWhereUniqueInputSchema,
  })
  .strict();

export const ShowWithDurationFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.ShowWithDurationFindFirstArgs, "select">
> = z
  .object({
    where: ShowWithDurationWhereInputSchema.optional(),
    orderBy: z
      .union([
        ShowWithDurationOrderByWithRelationInputSchema.array(),
        ShowWithDurationOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ShowWithDurationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ShowWithDurationScalarFieldEnumSchema,
        ShowWithDurationScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const ShowWithDurationFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ShowWithDurationFindFirstOrThrowArgs, "select">
> = z
  .object({
    where: ShowWithDurationWhereInputSchema.optional(),
    orderBy: z
      .union([
        ShowWithDurationOrderByWithRelationInputSchema.array(),
        ShowWithDurationOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ShowWithDurationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ShowWithDurationScalarFieldEnumSchema,
        ShowWithDurationScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const ShowWithDurationFindManyArgsSchema: z.ZodType<
  Omit<Prisma.ShowWithDurationFindManyArgs, "select">
> = z
  .object({
    where: ShowWithDurationWhereInputSchema.optional(),
    orderBy: z
      .union([
        ShowWithDurationOrderByWithRelationInputSchema.array(),
        ShowWithDurationOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ShowWithDurationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ShowWithDurationScalarFieldEnumSchema,
        ShowWithDurationScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const ShowWithDurationAggregateArgsSchema: z.ZodType<Prisma.ShowWithDurationAggregateArgs> =
  z
    .object({
      where: ShowWithDurationWhereInputSchema.optional(),
      orderBy: z
        .union([
          ShowWithDurationOrderByWithRelationInputSchema.array(),
          ShowWithDurationOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ShowWithDurationWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ShowWithDurationGroupByArgsSchema: z.ZodType<Prisma.ShowWithDurationGroupByArgs> =
  z
    .object({
      where: ShowWithDurationWhereInputSchema.optional(),
      orderBy: z
        .union([
          ShowWithDurationOrderByWithAggregationInputSchema.array(),
          ShowWithDurationOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ShowWithDurationScalarFieldEnumSchema.array(),
      having: ShowWithDurationScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ShowWithDurationFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.ShowWithDurationFindUniqueArgs, "select">
> = z
  .object({
    where: ShowWithDurationWhereUniqueInputSchema,
  })
  .strict();

export const ShowWithDurationFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ShowWithDurationFindUniqueOrThrowArgs, "select">
> = z
  .object({
    where: ShowWithDurationWhereUniqueInputSchema,
  })
  .strict();

export const UserCreateArgsSchema: z.ZodType<
  Omit<Prisma.UserCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<
  Omit<Prisma.UserUpsertArgs, "select" | "include">
> = z
  .object({
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserCreateManyInputSchema,
        UserCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserDeleteArgsSchema: z.ZodType<
  Omit<Prisma.UserDeleteArgs, "select" | "include">
> = z
  .object({
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<
  Omit<Prisma.UserUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const IdentityCreateArgsSchema: z.ZodType<
  Omit<Prisma.IdentityCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      IdentityCreateInputSchema,
      IdentityUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const IdentityUpsertArgsSchema: z.ZodType<
  Omit<Prisma.IdentityUpsertArgs, "select" | "include">
> = z
  .object({
    where: IdentityWhereUniqueInputSchema,
    create: z.union([
      IdentityCreateInputSchema,
      IdentityUncheckedCreateInputSchema,
    ]),
    update: z.union([
      IdentityUpdateInputSchema,
      IdentityUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const IdentityCreateManyArgsSchema: z.ZodType<Prisma.IdentityCreateManyArgs> =
  z
    .object({
      data: z.union([
        IdentityCreateManyInputSchema,
        IdentityCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const IdentityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.IdentityCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        IdentityCreateManyInputSchema,
        IdentityCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const IdentityDeleteArgsSchema: z.ZodType<
  Omit<Prisma.IdentityDeleteArgs, "select" | "include">
> = z
  .object({
    where: IdentityWhereUniqueInputSchema,
  })
  .strict();

export const IdentityUpdateArgsSchema: z.ZodType<
  Omit<Prisma.IdentityUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      IdentityUpdateInputSchema,
      IdentityUncheckedUpdateInputSchema,
    ]),
    where: IdentityWhereUniqueInputSchema,
  })
  .strict();

export const IdentityUpdateManyArgsSchema: z.ZodType<Prisma.IdentityUpdateManyArgs> =
  z
    .object({
      data: z.union([
        IdentityUpdateManyMutationInputSchema,
        IdentityUncheckedUpdateManyInputSchema,
      ]),
      where: IdentityWhereInputSchema.optional(),
    })
    .strict();

export const IdentityDeleteManyArgsSchema: z.ZodType<Prisma.IdentityDeleteManyArgs> =
  z
    .object({
      where: IdentityWhereInputSchema.optional(),
    })
    .strict();

export const ConnectionCreateArgsSchema: z.ZodType<
  Omit<Prisma.ConnectionCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      ConnectionCreateInputSchema,
      ConnectionUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const ConnectionUpsertArgsSchema: z.ZodType<
  Omit<Prisma.ConnectionUpsertArgs, "select" | "include">
> = z
  .object({
    where: ConnectionWhereUniqueInputSchema,
    create: z.union([
      ConnectionCreateInputSchema,
      ConnectionUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ConnectionUpdateInputSchema,
      ConnectionUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ConnectionCreateManyArgsSchema: z.ZodType<Prisma.ConnectionCreateManyArgs> =
  z
    .object({
      data: z.union([
        ConnectionCreateManyInputSchema,
        ConnectionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ConnectionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ConnectionCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ConnectionCreateManyInputSchema,
        ConnectionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ConnectionDeleteArgsSchema: z.ZodType<
  Omit<Prisma.ConnectionDeleteArgs, "select" | "include">
> = z
  .object({
    where: ConnectionWhereUniqueInputSchema,
  })
  .strict();

export const ConnectionUpdateArgsSchema: z.ZodType<
  Omit<Prisma.ConnectionUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      ConnectionUpdateInputSchema,
      ConnectionUncheckedUpdateInputSchema,
    ]),
    where: ConnectionWhereUniqueInputSchema,
  })
  .strict();

export const ConnectionUpdateManyArgsSchema: z.ZodType<Prisma.ConnectionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ConnectionUpdateManyMutationInputSchema,
        ConnectionUncheckedUpdateManyInputSchema,
      ]),
      where: ConnectionWhereInputSchema.optional(),
    })
    .strict();

export const ConnectionDeleteManyArgsSchema: z.ZodType<Prisma.ConnectionDeleteManyArgs> =
  z
    .object({
      where: ConnectionWhereInputSchema.optional(),
    })
    .strict();

export const ShowCreateArgsSchema: z.ZodType<
  Omit<Prisma.ShowCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([ShowCreateInputSchema, ShowUncheckedCreateInputSchema]),
  })
  .strict();

export const ShowUpsertArgsSchema: z.ZodType<
  Omit<Prisma.ShowUpsertArgs, "select" | "include">
> = z
  .object({
    where: ShowWhereUniqueInputSchema,
    create: z.union([ShowCreateInputSchema, ShowUncheckedCreateInputSchema]),
    update: z.union([ShowUpdateInputSchema, ShowUncheckedUpdateInputSchema]),
  })
  .strict();

export const ShowCreateManyArgsSchema: z.ZodType<Prisma.ShowCreateManyArgs> = z
  .object({
    data: z.union([
      ShowCreateManyInputSchema,
      ShowCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ShowCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShowCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ShowCreateManyInputSchema,
        ShowCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ShowDeleteArgsSchema: z.ZodType<
  Omit<Prisma.ShowDeleteArgs, "select" | "include">
> = z
  .object({
    where: ShowWhereUniqueInputSchema,
  })
  .strict();

export const ShowUpdateArgsSchema: z.ZodType<
  Omit<Prisma.ShowUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([ShowUpdateInputSchema, ShowUncheckedUpdateInputSchema]),
    where: ShowWhereUniqueInputSchema,
  })
  .strict();

export const ShowUpdateManyArgsSchema: z.ZodType<Prisma.ShowUpdateManyArgs> = z
  .object({
    data: z.union([
      ShowUpdateManyMutationInputSchema,
      ShowUncheckedUpdateManyInputSchema,
    ]),
    where: ShowWhereInputSchema.optional(),
  })
  .strict();

export const ShowDeleteManyArgsSchema: z.ZodType<Prisma.ShowDeleteManyArgs> = z
  .object({
    where: ShowWhereInputSchema.optional(),
  })
  .strict();

export const RundownCreateArgsSchema: z.ZodType<
  Omit<Prisma.RundownCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      RundownCreateInputSchema,
      RundownUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const RundownUpsertArgsSchema: z.ZodType<
  Omit<Prisma.RundownUpsertArgs, "select" | "include">
> = z
  .object({
    where: RundownWhereUniqueInputSchema,
    create: z.union([
      RundownCreateInputSchema,
      RundownUncheckedCreateInputSchema,
    ]),
    update: z.union([
      RundownUpdateInputSchema,
      RundownUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const RundownCreateManyArgsSchema: z.ZodType<Prisma.RundownCreateManyArgs> =
  z
    .object({
      data: z.union([
        RundownCreateManyInputSchema,
        RundownCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const RundownCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RundownCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        RundownCreateManyInputSchema,
        RundownCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const RundownDeleteArgsSchema: z.ZodType<
  Omit<Prisma.RundownDeleteArgs, "select" | "include">
> = z
  .object({
    where: RundownWhereUniqueInputSchema,
  })
  .strict();

export const RundownUpdateArgsSchema: z.ZodType<
  Omit<Prisma.RundownUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      RundownUpdateInputSchema,
      RundownUncheckedUpdateInputSchema,
    ]),
    where: RundownWhereUniqueInputSchema,
  })
  .strict();

export const RundownUpdateManyArgsSchema: z.ZodType<Prisma.RundownUpdateManyArgs> =
  z
    .object({
      data: z.union([
        RundownUpdateManyMutationInputSchema,
        RundownUncheckedUpdateManyInputSchema,
      ]),
      where: RundownWhereInputSchema.optional(),
    })
    .strict();

export const RundownDeleteManyArgsSchema: z.ZodType<Prisma.RundownDeleteManyArgs> =
  z
    .object({
      where: RundownWhereInputSchema.optional(),
    })
    .strict();

export const RundownItemCreateArgsSchema: z.ZodType<
  Omit<Prisma.RundownItemCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      RundownItemCreateInputSchema,
      RundownItemUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const RundownItemUpsertArgsSchema: z.ZodType<
  Omit<Prisma.RundownItemUpsertArgs, "select" | "include">
> = z
  .object({
    where: RundownItemWhereUniqueInputSchema,
    create: z.union([
      RundownItemCreateInputSchema,
      RundownItemUncheckedCreateInputSchema,
    ]),
    update: z.union([
      RundownItemUpdateInputSchema,
      RundownItemUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const RundownItemCreateManyArgsSchema: z.ZodType<Prisma.RundownItemCreateManyArgs> =
  z
    .object({
      data: z.union([
        RundownItemCreateManyInputSchema,
        RundownItemCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const RundownItemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RundownItemCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        RundownItemCreateManyInputSchema,
        RundownItemCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const RundownItemDeleteArgsSchema: z.ZodType<
  Omit<Prisma.RundownItemDeleteArgs, "select" | "include">
> = z
  .object({
    where: RundownItemWhereUniqueInputSchema,
  })
  .strict();

export const RundownItemUpdateArgsSchema: z.ZodType<
  Omit<Prisma.RundownItemUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      RundownItemUpdateInputSchema,
      RundownItemUncheckedUpdateInputSchema,
    ]),
    where: RundownItemWhereUniqueInputSchema,
  })
  .strict();

export const RundownItemUpdateManyArgsSchema: z.ZodType<Prisma.RundownItemUpdateManyArgs> =
  z
    .object({
      data: z.union([
        RundownItemUpdateManyMutationInputSchema,
        RundownItemUncheckedUpdateManyInputSchema,
      ]),
      where: RundownItemWhereInputSchema.optional(),
    })
    .strict();

export const RundownItemDeleteManyArgsSchema: z.ZodType<Prisma.RundownItemDeleteManyArgs> =
  z
    .object({
      where: RundownItemWhereInputSchema.optional(),
    })
    .strict();

export const ContinuityItemCreateArgsSchema: z.ZodType<
  Omit<Prisma.ContinuityItemCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      ContinuityItemCreateInputSchema,
      ContinuityItemUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const ContinuityItemUpsertArgsSchema: z.ZodType<
  Omit<Prisma.ContinuityItemUpsertArgs, "select" | "include">
> = z
  .object({
    where: ContinuityItemWhereUniqueInputSchema,
    create: z.union([
      ContinuityItemCreateInputSchema,
      ContinuityItemUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ContinuityItemUpdateInputSchema,
      ContinuityItemUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ContinuityItemCreateManyArgsSchema: z.ZodType<Prisma.ContinuityItemCreateManyArgs> =
  z
    .object({
      data: z.union([
        ContinuityItemCreateManyInputSchema,
        ContinuityItemCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ContinuityItemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ContinuityItemCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ContinuityItemCreateManyInputSchema,
        ContinuityItemCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ContinuityItemDeleteArgsSchema: z.ZodType<
  Omit<Prisma.ContinuityItemDeleteArgs, "select" | "include">
> = z
  .object({
    where: ContinuityItemWhereUniqueInputSchema,
  })
  .strict();

export const ContinuityItemUpdateArgsSchema: z.ZodType<
  Omit<Prisma.ContinuityItemUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      ContinuityItemUpdateInputSchema,
      ContinuityItemUncheckedUpdateInputSchema,
    ]),
    where: ContinuityItemWhereUniqueInputSchema,
  })
  .strict();

export const ContinuityItemUpdateManyArgsSchema: z.ZodType<Prisma.ContinuityItemUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ContinuityItemUpdateManyMutationInputSchema,
        ContinuityItemUncheckedUpdateManyInputSchema,
      ]),
      where: ContinuityItemWhereInputSchema.optional(),
    })
    .strict();

export const ContinuityItemDeleteManyArgsSchema: z.ZodType<Prisma.ContinuityItemDeleteManyArgs> =
  z
    .object({
      where: ContinuityItemWhereInputSchema.optional(),
    })
    .strict();

export const MetadataFieldCreateArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFieldCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      MetadataFieldCreateInputSchema,
      MetadataFieldUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const MetadataFieldUpsertArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFieldUpsertArgs, "select" | "include">
> = z
  .object({
    where: MetadataFieldWhereUniqueInputSchema,
    create: z.union([
      MetadataFieldCreateInputSchema,
      MetadataFieldUncheckedCreateInputSchema,
    ]),
    update: z.union([
      MetadataFieldUpdateInputSchema,
      MetadataFieldUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const MetadataFieldCreateManyArgsSchema: z.ZodType<Prisma.MetadataFieldCreateManyArgs> =
  z
    .object({
      data: z.union([
        MetadataFieldCreateManyInputSchema,
        MetadataFieldCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MetadataFieldCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MetadataFieldCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        MetadataFieldCreateManyInputSchema,
        MetadataFieldCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MetadataFieldDeleteArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFieldDeleteArgs, "select" | "include">
> = z
  .object({
    where: MetadataFieldWhereUniqueInputSchema,
  })
  .strict();

export const MetadataFieldUpdateArgsSchema: z.ZodType<
  Omit<Prisma.MetadataFieldUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      MetadataFieldUpdateInputSchema,
      MetadataFieldUncheckedUpdateInputSchema,
    ]),
    where: MetadataFieldWhereUniqueInputSchema,
  })
  .strict();

export const MetadataFieldUpdateManyArgsSchema: z.ZodType<Prisma.MetadataFieldUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MetadataFieldUpdateManyMutationInputSchema,
        MetadataFieldUncheckedUpdateManyInputSchema,
      ]),
      where: MetadataFieldWhereInputSchema.optional(),
    })
    .strict();

export const MetadataFieldDeleteManyArgsSchema: z.ZodType<Prisma.MetadataFieldDeleteManyArgs> =
  z
    .object({
      where: MetadataFieldWhereInputSchema.optional(),
    })
    .strict();

export const MetadataCreateArgsSchema: z.ZodType<
  Omit<Prisma.MetadataCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      MetadataCreateInputSchema,
      MetadataUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const MetadataUpsertArgsSchema: z.ZodType<
  Omit<Prisma.MetadataUpsertArgs, "select" | "include">
> = z
  .object({
    where: MetadataWhereUniqueInputSchema,
    create: z.union([
      MetadataCreateInputSchema,
      MetadataUncheckedCreateInputSchema,
    ]),
    update: z.union([
      MetadataUpdateInputSchema,
      MetadataUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const MetadataCreateManyArgsSchema: z.ZodType<Prisma.MetadataCreateManyArgs> =
  z
    .object({
      data: z.union([
        MetadataCreateManyInputSchema,
        MetadataCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MetadataCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MetadataCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        MetadataCreateManyInputSchema,
        MetadataCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MetadataDeleteArgsSchema: z.ZodType<
  Omit<Prisma.MetadataDeleteArgs, "select" | "include">
> = z
  .object({
    where: MetadataWhereUniqueInputSchema,
  })
  .strict();

export const MetadataUpdateArgsSchema: z.ZodType<
  Omit<Prisma.MetadataUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      MetadataUpdateInputSchema,
      MetadataUncheckedUpdateInputSchema,
    ]),
    where: MetadataWhereUniqueInputSchema,
  })
  .strict();

export const MetadataUpdateManyArgsSchema: z.ZodType<Prisma.MetadataUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MetadataUpdateManyMutationInputSchema,
        MetadataUncheckedUpdateManyInputSchema,
      ]),
      where: MetadataWhereInputSchema.optional(),
    })
    .strict();

export const MetadataDeleteManyArgsSchema: z.ZodType<Prisma.MetadataDeleteManyArgs> =
  z
    .object({
      where: MetadataWhereInputSchema.optional(),
    })
    .strict();

export const SettingCreateArgsSchema: z.ZodType<
  Omit<Prisma.SettingCreateArgs, "select">
> = z
  .object({
    data: z.union([
      SettingCreateInputSchema,
      SettingUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const SettingUpsertArgsSchema: z.ZodType<
  Omit<Prisma.SettingUpsertArgs, "select">
> = z
  .object({
    where: SettingWhereUniqueInputSchema,
    create: z.union([
      SettingCreateInputSchema,
      SettingUncheckedCreateInputSchema,
    ]),
    update: z.union([
      SettingUpdateInputSchema,
      SettingUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const SettingCreateManyArgsSchema: z.ZodType<Prisma.SettingCreateManyArgs> =
  z
    .object({
      data: z.union([
        SettingCreateManyInputSchema,
        SettingCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SettingCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SettingCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        SettingCreateManyInputSchema,
        SettingCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SettingDeleteArgsSchema: z.ZodType<
  Omit<Prisma.SettingDeleteArgs, "select">
> = z
  .object({
    where: SettingWhereUniqueInputSchema,
  })
  .strict();

export const SettingUpdateArgsSchema: z.ZodType<
  Omit<Prisma.SettingUpdateArgs, "select">
> = z
  .object({
    data: z.union([
      SettingUpdateInputSchema,
      SettingUncheckedUpdateInputSchema,
    ]),
    where: SettingWhereUniqueInputSchema,
  })
  .strict();

export const SettingUpdateManyArgsSchema: z.ZodType<Prisma.SettingUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SettingUpdateManyMutationInputSchema,
        SettingUncheckedUpdateManyInputSchema,
      ]),
      where: SettingWhereInputSchema.optional(),
    })
    .strict();

export const SettingDeleteManyArgsSchema: z.ZodType<Prisma.SettingDeleteManyArgs> =
  z
    .object({
      where: SettingWhereInputSchema.optional(),
    })
    .strict();

export const AssetCreateArgsSchema: z.ZodType<
  Omit<Prisma.AssetCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([AssetCreateInputSchema, AssetUncheckedCreateInputSchema]),
  })
  .strict();

export const AssetUpsertArgsSchema: z.ZodType<
  Omit<Prisma.AssetUpsertArgs, "select" | "include">
> = z
  .object({
    where: AssetWhereUniqueInputSchema,
    create: z.union([AssetCreateInputSchema, AssetUncheckedCreateInputSchema]),
    update: z.union([AssetUpdateInputSchema, AssetUncheckedUpdateInputSchema]),
  })
  .strict();

export const AssetCreateManyArgsSchema: z.ZodType<Prisma.AssetCreateManyArgs> =
  z
    .object({
      data: z.union([
        AssetCreateManyInputSchema,
        AssetCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AssetCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AssetCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AssetCreateManyInputSchema,
        AssetCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AssetDeleteArgsSchema: z.ZodType<
  Omit<Prisma.AssetDeleteArgs, "select" | "include">
> = z
  .object({
    where: AssetWhereUniqueInputSchema,
  })
  .strict();

export const AssetUpdateArgsSchema: z.ZodType<
  Omit<Prisma.AssetUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([AssetUpdateInputSchema, AssetUncheckedUpdateInputSchema]),
    where: AssetWhereUniqueInputSchema,
  })
  .strict();

export const AssetUpdateManyArgsSchema: z.ZodType<Prisma.AssetUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AssetUpdateManyMutationInputSchema,
        AssetUncheckedUpdateManyInputSchema,
      ]),
      where: AssetWhereInputSchema.optional(),
    })
    .strict();

export const AssetDeleteManyArgsSchema: z.ZodType<Prisma.AssetDeleteManyArgs> =
  z
    .object({
      where: AssetWhereInputSchema.optional(),
    })
    .strict();

export const MediaCreateArgsSchema: z.ZodType<
  Omit<Prisma.MediaCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([MediaCreateInputSchema, MediaUncheckedCreateInputSchema]),
  })
  .strict();

export const MediaUpsertArgsSchema: z.ZodType<
  Omit<Prisma.MediaUpsertArgs, "select" | "include">
> = z
  .object({
    where: MediaWhereUniqueInputSchema,
    create: z.union([MediaCreateInputSchema, MediaUncheckedCreateInputSchema]),
    update: z.union([MediaUpdateInputSchema, MediaUncheckedUpdateInputSchema]),
  })
  .strict();

export const MediaCreateManyArgsSchema: z.ZodType<Prisma.MediaCreateManyArgs> =
  z
    .object({
      data: z.union([
        MediaCreateManyInputSchema,
        MediaCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MediaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MediaCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        MediaCreateManyInputSchema,
        MediaCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MediaDeleteArgsSchema: z.ZodType<
  Omit<Prisma.MediaDeleteArgs, "select" | "include">
> = z
  .object({
    where: MediaWhereUniqueInputSchema,
  })
  .strict();

export const MediaUpdateArgsSchema: z.ZodType<
  Omit<Prisma.MediaUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([MediaUpdateInputSchema, MediaUncheckedUpdateInputSchema]),
    where: MediaWhereUniqueInputSchema,
  })
  .strict();

export const MediaUpdateManyArgsSchema: z.ZodType<Prisma.MediaUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MediaUpdateManyMutationInputSchema,
        MediaUncheckedUpdateManyInputSchema,
      ]),
      where: MediaWhereInputSchema.optional(),
    })
    .strict();

export const MediaDeleteManyArgsSchema: z.ZodType<Prisma.MediaDeleteManyArgs> =
  z
    .object({
      where: MediaWhereInputSchema.optional(),
    })
    .strict();

export const MediaProcessingTaskCreateArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      MediaProcessingTaskCreateInputSchema,
      MediaProcessingTaskUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const MediaProcessingTaskUpsertArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskUpsertArgs, "select" | "include">
> = z
  .object({
    where: MediaProcessingTaskWhereUniqueInputSchema,
    create: z.union([
      MediaProcessingTaskCreateInputSchema,
      MediaProcessingTaskUncheckedCreateInputSchema,
    ]),
    update: z.union([
      MediaProcessingTaskUpdateInputSchema,
      MediaProcessingTaskUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const MediaProcessingTaskCreateManyArgsSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyArgs> =
  z
    .object({
      data: z.union([
        MediaProcessingTaskCreateManyInputSchema,
        MediaProcessingTaskCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MediaProcessingTaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        MediaProcessingTaskCreateManyInputSchema,
        MediaProcessingTaskCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MediaProcessingTaskDeleteArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskDeleteArgs, "select" | "include">
> = z
  .object({
    where: MediaProcessingTaskWhereUniqueInputSchema,
  })
  .strict();

export const MediaProcessingTaskUpdateArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      MediaProcessingTaskUpdateInputSchema,
      MediaProcessingTaskUncheckedUpdateInputSchema,
    ]),
    where: MediaProcessingTaskWhereUniqueInputSchema,
  })
  .strict();

export const MediaProcessingTaskUpdateManyArgsSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MediaProcessingTaskUpdateManyMutationInputSchema,
        MediaProcessingTaskUncheckedUpdateManyInputSchema,
      ]),
      where: MediaProcessingTaskWhereInputSchema.optional(),
    })
    .strict();

export const MediaProcessingTaskDeleteManyArgsSchema: z.ZodType<Prisma.MediaProcessingTaskDeleteManyArgs> =
  z
    .object({
      where: MediaProcessingTaskWhereInputSchema.optional(),
    })
    .strict();

export const BaseJobCreateArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobCreateArgs, "select">
> = z
  .object({
    data: z.union([
      BaseJobCreateInputSchema,
      BaseJobUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const BaseJobUpsertArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobUpsertArgs, "select">
> = z
  .object({
    where: BaseJobWhereUniqueInputSchema,
    create: z.union([
      BaseJobCreateInputSchema,
      BaseJobUncheckedCreateInputSchema,
    ]),
    update: z.union([
      BaseJobUpdateInputSchema,
      BaseJobUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const BaseJobCreateManyArgsSchema: z.ZodType<Prisma.BaseJobCreateManyArgs> =
  z
    .object({
      data: z.union([
        BaseJobCreateManyInputSchema,
        BaseJobCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const BaseJobCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BaseJobCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        BaseJobCreateManyInputSchema,
        BaseJobCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const BaseJobDeleteArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobDeleteArgs, "select">
> = z
  .object({
    where: BaseJobWhereUniqueInputSchema,
  })
  .strict();

export const BaseJobUpdateArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobUpdateArgs, "select">
> = z
  .object({
    data: z.union([
      BaseJobUpdateInputSchema,
      BaseJobUncheckedUpdateInputSchema,
    ]),
    where: BaseJobWhereUniqueInputSchema,
  })
  .strict();

export const BaseJobUpdateManyArgsSchema: z.ZodType<Prisma.BaseJobUpdateManyArgs> =
  z
    .object({
      data: z.union([
        BaseJobUpdateManyMutationInputSchema,
        BaseJobUncheckedUpdateManyInputSchema,
      ]),
      where: BaseJobWhereInputSchema.optional(),
    })
    .strict();

export const BaseJobDeleteManyArgsSchema: z.ZodType<Prisma.BaseJobDeleteManyArgs> =
  z
    .object({
      where: BaseJobWhereInputSchema.optional(),
    })
    .strict();

export const ShowWithDurationCreateArgsSchema: z.ZodType<
  Omit<Prisma.ShowWithDurationCreateArgs, "select">
> = z
  .object({
    data: z.union([
      ShowWithDurationCreateInputSchema,
      ShowWithDurationUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const ShowWithDurationUpsertArgsSchema: z.ZodType<
  Omit<Prisma.ShowWithDurationUpsertArgs, "select">
> = z
  .object({
    where: ShowWithDurationWhereUniqueInputSchema,
    create: z.union([
      ShowWithDurationCreateInputSchema,
      ShowWithDurationUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ShowWithDurationUpdateInputSchema,
      ShowWithDurationUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ShowWithDurationCreateManyArgsSchema: z.ZodType<Prisma.ShowWithDurationCreateManyArgs> =
  z
    .object({
      data: z.union([
        ShowWithDurationCreateManyInputSchema,
        ShowWithDurationCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ShowWithDurationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShowWithDurationCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ShowWithDurationCreateManyInputSchema,
        ShowWithDurationCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ShowWithDurationDeleteArgsSchema: z.ZodType<
  Omit<Prisma.ShowWithDurationDeleteArgs, "select">
> = z
  .object({
    where: ShowWithDurationWhereUniqueInputSchema,
  })
  .strict();

export const ShowWithDurationUpdateArgsSchema: z.ZodType<
  Omit<Prisma.ShowWithDurationUpdateArgs, "select">
> = z
  .object({
    data: z.union([
      ShowWithDurationUpdateInputSchema,
      ShowWithDurationUncheckedUpdateInputSchema,
    ]),
    where: ShowWithDurationWhereUniqueInputSchema,
  })
  .strict();

export const ShowWithDurationUpdateManyArgsSchema: z.ZodType<Prisma.ShowWithDurationUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ShowWithDurationUpdateManyMutationInputSchema,
        ShowWithDurationUncheckedUpdateManyInputSchema,
      ]),
      where: ShowWithDurationWhereInputSchema.optional(),
    })
    .strict();

export const ShowWithDurationDeleteManyArgsSchema: z.ZodType<Prisma.ShowWithDurationDeleteManyArgs> =
  z
    .object({
      where: ShowWithDurationWhereInputSchema.optional(),
    })
    .strict();
