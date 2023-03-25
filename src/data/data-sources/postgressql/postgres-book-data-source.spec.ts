import {BookRequestModel} from "../../../domain/model/book";
import createMockInstance from "jest-create-mock-instance";
import {PostgresBookDataSource} from "./postgres-book-data-source";
import {Pool} from "pg";

const DB_TABLE = "schema_book.book";
describe('postgres-book-data-source-test', () => {
    let bookDataSource: PostgresBookDataSource;
    let pool: jest.Mocked<Pool>;
    beforeEach(() => {
        pool = createMockInstance(Pool);
        bookDataSource = new PostgresBookDataSource(pool);
    })

    test('deleteOne successfully', async () => {
        // given
        const bookId = '1';

        // when
        await bookDataSource.deleteOne(bookId);

        // then
        expect(pool.query).toHaveBeenCalledWith(`delete from ${DB_TABLE} where id = $1`, [parseInt(bookId)]);
        expect(pool.query).toBeCalledTimes(1);
    });

    test('updateOne successfully', async () => {
        // given
        const bookId = '1';
        const bookRequestModel = {name: '100 years solidarity'} as BookRequestModel;

        // when
        await bookDataSource.updateOne(bookId, bookRequestModel);

        // then
        expect(pool.query).toHaveBeenCalledWith(
            `update ${DB_TABLE} set name = $1 where id = $2`, [bookRequestModel.name, parseInt(bookId)]
        );
        expect(pool.query).toBeCalledTimes(1);
    });

    test('getOne successfully', async () => {
        // given
        const bookId = '1';
        // @ts-ignore
        pool.query.mockResolvedValue({rows: [{id: bookId, name: 'othello'}]});
        // when
        const result = await bookDataSource.getOne(bookId);

        // then
        expect(result).toEqual({id: bookId, name: 'othello'});
        expect(pool.query).toHaveBeenCalledWith(
            `select * from ${DB_TABLE} where id = $1 limit 1`, [bookId]
        );
        expect(pool.query).toBeCalledTimes(1);
    });

    test('create successfully', async () => {
        const bookId = '1';
        const req = {name: 'othello'} as BookRequestModel;
        const resp = {rows: [{id: bookId, name: 'Romeo and Juliet'}]};
        // @ts-ignore
        pool.query.mockResolvedValue(resp);
        // when
        const result = await bookDataSource.create(req);

        // then
        expect(result).toEqual(resp.rows[0]);
        expect(pool.query).toHaveBeenCalledWith(
            `insert into ${DB_TABLE} (name) values ($1) RETURNING id, name`, [req.name]
        );
        expect(pool.query).toBeCalledTimes(1);
    });

    test('getAll successfully', async () => {
        // given
        const bookId = '1';
        const resp = {rows:[
            {id: bookId, name: 'crime and justice'},
            {id: bookId, name: 'game of thrones'}
        ]};
        // @ts-ignore
        pool.query.mockResolvedValue(resp);
        // when
        const result = await bookDataSource.getAll();

        // then
        expect(result).toEqual(resp.rows);
        expect(pool.query).toHaveBeenCalledWith(`select * from ${DB_TABLE}`);
        expect(pool.query).toBeCalledTimes(1);
    });
});
