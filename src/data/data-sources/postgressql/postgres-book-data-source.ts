import {BookDataSource} from "../../interfaces/data-sources/book-data-source";
import {BookRequestModel, BookResponseModel} from "../../../domain/model/book";
import {Pool} from "pg";

const DB_TABLE = "schema_book.book"
export class PostgresBookDataSource implements BookDataSource {

    private pool: Pool
    constructor(pool: Pool) {
        this.pool = pool
    }

    async create(data: BookRequestModel): Promise<BookResponseModel | null> {
        const dbResponse = await this.pool.query(`insert into ${DB_TABLE} (name) values ($1) RETURNING id, name`, [data.name]);
        const result = dbResponse.rows.map( item => ({
                id: item.id,
                name: item.name,
            })
        );
        return result[0];
    }

    async getAll(): Promise<BookResponseModel[]> {
        const dbResponse = await this.pool.query(`select * from ${DB_TABLE}`)
        const result = dbResponse.rows.map(item => ({
            id: String(item.id),
            name: item.name,
        }));
        return result as BookResponseModel[];
    }

    async deleteOne(id: string): Promise<void> {
        await this.pool.query(`delete from ${DB_TABLE} where id = $1`, [parseInt(id)])
    }

    async updateOne(id: string, data: BookRequestModel) : Promise<void> {
        await this.pool.query(`update ${DB_TABLE} set name = $1 where id = $2`, [data.name, parseInt(id)])
    }

    async getOne(id: string): Promise<BookResponseModel | null> {
        const dbResponse = await this.pool.query(`select * from ${DB_TABLE} where id = $1 limit 1`, [id])
        const result = dbResponse.rows.map(item => ({
            id: item.id,
            name: item.name,
        }));

        return result[0];
    }

}
