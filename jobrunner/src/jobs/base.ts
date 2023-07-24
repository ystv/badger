import { PrismaClient } from "@prisma/client";
import { Logger, default as logging } from "loglevel";

export default abstract class AbstractJob<TParams = {}> {
  protected db!: PrismaClient;
  protected logger!: Logger;
  abstract run(params: TParams): Promise<void>;

  public static async init<T extends AbstractJob = AbstractJob>(
    this: { new (): T },
    db: PrismaClient,
  ) {
    const job = new this();
    job.db = db;
    job.logger = logging.getLogger(this.name);
    return job;
  }
}
