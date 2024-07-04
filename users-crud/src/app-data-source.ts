import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "maxlan1403",
    database: "CRUD",
    synchronize: true,
    logging: false,
    entities: ["src/entity/user.entity.ts"],
    migrations: ["src/migrations.ts"],
    cache: true
});

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })