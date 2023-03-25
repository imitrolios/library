import {BookRepository} from "../interfaces/repositories/book-repository";
import {BookDataSource} from "../../data/interfaces/data-sources/book-data-source";
import {BookRequestModel, BookResponseModel} from "../model/book";

export class BookRepositoryImpl implements BookRepository {
    private bookDataSource: BookDataSource

    constructor(bookDataSource: BookDataSource) {
        this.bookDataSource = bookDataSource
    }

    async deleteBook(id: String): Promise<void> {
        await this.bookDataSource.deleteOne(id)
    }

    async updateBook(id: String, data: BookRequestModel): Promise<void> {
        await this.bookDataSource.updateOne(id, data);
    }

    async getBook(id: String): Promise<BookResponseModel | null> {
        return await this.bookDataSource.getOne(id);
    }

    async createBook(data: BookRequestModel): Promise<BookResponseModel | null> {
        return await this.bookDataSource.create(data);
    }

    async getAllBooks(): Promise<BookResponseModel[]> {
        return await this.bookDataSource.getAll();
    }
}
