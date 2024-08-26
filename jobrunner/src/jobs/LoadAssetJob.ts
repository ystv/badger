import { MediaState } from "@badger/prisma/client";
import { MediaJobCommon } from "./MediaJobCommon.js";
import invariant from "../invariant.js";

export class LoadAssetJob extends MediaJobCommon {
  constructor() {
    super();
  }

  async run(params: PrismaJson.JobPayload): Promise<void> {
    invariant("assetId" in params, "assetId is required");
    await this.db.asset.update({
      where: {
        id: params.assetId,
      },
      data: {
        media: {
          update: {
            state: MediaState.Processing,
          },
        },
        rundown: {
          update: {
            show: {
              update: {
                version: {
                  increment: 1,
                },
              },
            },
          },
        },
      },
    });
    const asset = await this.db.asset.findFirst({
      where: {
        id: params.assetId,
      },
      include: {
        rundown: {
          include: {
            show: true,
          },
        },
      },
    });
    invariant(asset, "Asset not found");
    try {
      // Test only: allow testing failure handling
      if (asset.name.includes("__FAIL__")) {
        throw new Error(
          "Failing job to test error handling (I sure do hope this is a test...)",
        );
      }

      const path = await this._downloadSourceFile(params);
      const res = await this._uploadFileToS3(
        path,
        `media/${asset.mediaId}/asset/${asset.id} - ${asset.name}`,
      );
      await this.db.asset.update({
        where: {
          id: asset.id,
        },
        data: {
          media: {
            update: {
              path: res,
              rawPath: res,
              state: MediaState.Ready,
            },
          },
          rundown: {
            update: {
              show: {
                update: {
                  version: {
                    increment: 1,
                  },
                },
              },
            },
          },
        },
      });
    } catch (e) {
      await this.db.asset.update({
        where: {
          id: asset.id,
        },
        data: {
          media: {
            update: {
              state: MediaState.ProcessingFailed,
            },
          },
          rundown: {
            update: {
              show: {
                update: {
                  version: {
                    increment: 1,
                  },
                },
              },
            },
          },
        },
      });
      throw e;
    }
  }
}
