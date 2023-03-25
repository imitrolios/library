import {BookRequestModel, BookResponseModel} from "../../model/book";

export interface BookRepository {
    createBook(book: BookRequestModel): Promise<BookResponseModel | null>;
    deleteBook(id: String): Promise<void>;
    updateBook(id: String, bool: BookRequestModel): Promise<void>;
    getAllBooks(): Promise<BookResponseModel[]>;
    getBook(id: String): Promise<BookResponseModel | null>;
}
