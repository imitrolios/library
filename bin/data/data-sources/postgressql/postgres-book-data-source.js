"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresBookDataSource = void 0;
const DB_TABLE = "schema_book.book";
class PostgresBookDataSource {
    constructor(pool) {
        this.pool = pool;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResponse = yield this.pool.query(`insert into ${DB_TABLE} (name) values ($1) RETURNING id, name`, [data.name]);
            const result = dbResponse.rows.map(item => ({
                id: item.id,
                name: item.name,
            }));
            console.log(result);
            return result[0];
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResponse = yield this.pool.query(`select * from ${DB_TABLE}`);
            const result = dbResponse.rows.map(item => ({
                id: String(item.id),
                name: item.name,
            }));
            return result;
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(`delete from ${DB_TABLE} where id = $1`, [parseInt(id)]);
        });
    }
    updateOne(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(`update ${DB_TABLE} set name = $1 where id = $2`, [data.name, parseInt(id)]);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResponse = yield this.pool.query(`select * from ${DB_TABLE} where id = $1 limit 1`, [id]);
            const result = dbResponse.rows.map(item => ({
                id: item.id,
                name: item.name,
            }));
            return result[0];
        });
    }
}
exports.PostgresBookDataSource = PostgresBookDataSource;
