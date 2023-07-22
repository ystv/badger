import sh from "shelljs";
sh.config.fatal = true;
sh.config.verbose = true;

console.log("Starting PostgreSQL database...");
sh.config.fatal = false;
sh.exec("docker rm -f bowser_test_postgres");
sh.config.fatal = true;
sh.exec(
  "docker run --rm -d -p 5432:5432 --name bowser_test_postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=postgres -e POSTGRES_HOST_AUTH_METHOD=trust postgres:alpine"
);
console.log("Waiting for PostgreSQL to start...");
sh.exec("sleep 3");
console.log("Preparing test database...");
sh.exec("docker exec bowser_test_postgres createdb -O root bowser_test");
process.env.DATABASE_URL =
  "postgresql://root:postgres@localhost:5432/bowser_test";
sh.exec("yarn prisma db push"); // TODO: use migrations instead
