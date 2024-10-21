import { z } from 'zod';

export const PermissionSchema = z.enum(['Basic','ManageUsers','ManageShows','ArchiveMedia','ManageYouTubeStreams','ManageSystemSettings','ManageJobs','SUDO']);

export type PermissionType = `${z.infer<typeof PermissionSchema>}`

export default PermissionSchema;
