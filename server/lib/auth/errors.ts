import { Permission } from "@badger/prisma/client";

export class Forbidden extends Error {
  constructor(require: Permission) {
    super("Forbidden");
    this.name = "Forbidden";
    // Work around the fact that this.name isn't transmitted to the client from a server component
    this.message = `${this.name}: You must have the ${require} permission to access this resource`;
  }
}

export class Unauthorized extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "Unauthorized";
    this.message = `${this.name}: You must be logged in to access this resource`;
  }
}
