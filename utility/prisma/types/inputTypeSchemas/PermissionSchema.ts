import { z } from "zod";

export const PermissionSchema = z.enum(["Basic", "ManageUsers", "SUDO"]);

export type PermissionType = `${z.infer<typeof PermissionSchema>}`;

export default PermissionSchema;
