import IndexRouter from "./routes/index-router";
import server from "./server";
import BookRouter from "./routes/book-router";
import {CreateBook} from "./domain/use-cases/book/create-book";
import {DeleteBook} from "./domain/use-cases/book/delete-book";
import {GetAllBooks} from "./domain/use-cases/book/get-all-books";
import {GetBook} from "./domain/use-cases/book/get-book";
import {UpdateBook} from "./domain/use-cases/book/update-book";
import {Pool} from 'pg'
import {PostgresBookDataSource} from "./data/data-sources/postgressql/postgres-book-data-source";
import {BookRepositoryImpl} from "./domain/repositories/book-repository-impl";
import swaggerIgnite from "./swagger/swagger-ignite";

async function getPostgresDS(): Promise<PostgresBookDataSource> {

    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'books',
        password: 'postgres',
        port: 5432,
    })
    return new PostgresBookDataSource(pool);
}

const port = process.env.PORT || 4000;

(async () => {
    const dataSource = await getPostgresDS();
    const indexRouter = IndexRouter();
    const bookRouter = BookRouter(
        new CreateBook(new BookRepositoryImpl(dataSource)),
        new DeleteBook(new BookRepositoryImpl(dataSource)),
        new UpdateBook(new BookRepositoryImpl(dataSource)),
        new GetBook(new BookRepositoryImpl(dataSource)),
        new GetAllBooks(new BookRepositoryImpl(dataSource)));
    server.use('/index', indexRouter);
    server.use('/book', bookRouter);
    swaggerIgnite(server);
    server.listen(port, () => console.log('Running on port: ' + port));
})()
