import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { IdentityOrderByRelationAggregateInputSchema } from "./IdentityOrderByRelationAggregateInputSchema";

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
    })
    .strict();

export default UserOrderByWithRelationInputSchema;
