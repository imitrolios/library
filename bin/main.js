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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_router_1 = __importDefault(require("./routes/index-router"));
const server_1 = __importDefault(require("./server"));
const book_router_1 = __importDefault(require("./routes/book-router"));
const create_book_1 = require("./domain/use-cases/book/create-book");
const delete_book_1 = require("./domain/use-cases/book/delete-book");
const get_all_books_1 = require("./domain/use-cases/book/get-all-books");
const get_book_1 = require("./domain/use-cases/book/get-book");
const update_book_1 = require("./domain/use-cases/book/update-book");
const pg_1 = require("pg");
const postgres_book_data_source_1 = require("./data/data-sources/postgressql/postgres-book-data-source");
const book_repository_impl_1 = require("./domain/repositories/book-repository-impl");
const swagger_ignite_1 = __importDefault(require("./swagger/swagger-ignite"));
function getPostgresDS() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new pg_1.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'books',
            password: 'postgres',
            port: 5432,
        });
        return new postgres_book_data_source_1.PostgresBookDataSource(pool);
    });
}
const port = process.env.PORT || 4000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const dataSource = yield getPostgresDS();
    const indexRouter = (0, index_router_1.default)();
    const bookRouter = (0, book_router_1.default)(new create_book_1.CreateBook(new book_repository_impl_1.BookRepositoryImpl(dataSource)), new delete_book_1.DeleteBook(new book_repository_impl_1.BookRepositoryImpl(dataSource)), new update_book_1.UpdateBook(new book_repository_impl_1.BookRepositoryImpl(dataSource)), new get_book_1.GetBook(new book_repository_impl_1.BookRepositoryImpl(dataSource)), new get_all_books_1.GetAllBooks(new book_repository_impl_1.BookRepositoryImpl(dataSource)));
    server_1.default.use('/index', indexRouter);
    server_1.default.use('/book', bookRouter);
    (0, swagger_ignite_1.default)(server_1.default);
    server_1.default.listen(port, () => console.log('Running on port: ' + port));
}))();
