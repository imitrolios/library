import {BookResponseModel} from "../../model/book";
import {GetAllBooksUseCase} from "../../interfaces/use-cases/get-all-books";
import {BookRepository} from "../../interfaces/repositories/book-repository";

export class GetAllBooks implements GetAllBooksUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(): Promise<BookResponseModel []> {
        return await this.bookRepository.getAllBooks();
    }

}