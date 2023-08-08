import * as sh from "shelljs";
import detectPort from "detect-port";
sh.config.fatal = true;
sh.config.verbose = true;

async function prepare() {
    if (await detectPort(5432)) {
        console.log("PostgreSQL is already running");
        process.env.SKIP_DB_TEARDOWN = "true";
        if (!process.env.DATABASE_URL) {
            console.warn("Guessing DATABASE_URL - if the tests fail, set it manually");
            process.env.DATABASE_URL = "postgresql://postgres@localhost:5432/bowser_test";
        }
    } else {
        console.log("Starting PostgreSQL database...");
        sh.config.fatal = false;
        sh.exec("docker rm -f bowser_test_postgres");
        sh.config.fatal = true;
        sh.exec(
            "docker run --rm -d -p 5432:5432 --name bowser_test_postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=postgres -e POSTGRES_HOST_AUTH_METHOD=trust postgres:alpine",
        );
        console.log("Waiting for PostgreSQL to start...");
        sh.exec("sleep 3");
        console.log("Preparing test database...");
        sh.exec("docker exec bowser_test_postgres createdb -O root bowser_test");
        process.env.DATABASE_URL =
            "postgresql://root:postgres@localhost:5432/bowser_test";
        sh.exec("yarn prisma migrate deploy");
    }
}

export { prepare };
prepare();
