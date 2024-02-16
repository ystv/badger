import {
  LoadAssetJob as LoadAssetJobType,
  MediaState,
} from "@badger/prisma/client";
import { MediaJobCommon } from "./MediaJobCommon.js";

export class LoadAssetJob extends MediaJobCommon {
  constructor() {
    super();
  }

  async run(params: LoadAssetJobType): Promise<void> {
    await this.db.asset.update({
      where: {
        id: params.asset_id,
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
    const fullJob = await this.db.loadAssetJob.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        asset: {
          include: {
            rundown: true,
          },
        },
      },
    });
    try {
      // Test only: allow testing failure handling
      if (fullJob.asset.name.includes("__FAIL__")) {
        throw new Error("Test failure!");
      }

      const path = await this._downloadSourceFile(params);
      const asset = fullJob.asset;
      const res = await this._uploadFileToS3(
        path,
        `shows/${asset.rundown.showId}/rundown/${asset.rundown.id}/assets/${asset.id} - ${asset.name}`,
      );
      await this.db.asset.update({
        where: {
          id: fullJob.asset.id,
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
          id: fullJob.asset.id,
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
