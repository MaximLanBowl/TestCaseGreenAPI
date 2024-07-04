"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
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
exports.myDataSource.initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization", err);
});
