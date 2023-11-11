import { z } from "zod";

export const PermissionSchema = z.enum([
  "Basic",
  "ManageUsers",
  "ManageShows",
  "ArchiveMedia",
  "SUDO",
]);

export type PermissionType = `${z.infer<typeof PermissionSchema>}`;

export default PermissionSchema;
