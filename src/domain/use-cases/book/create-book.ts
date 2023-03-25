import {CreateBookUseCase} from "../../interfaces/use-cases/create-book";
import {BookRequestModel, BookResponseModel} from "../../model/book";
import {BookRepository} from "../../interfaces/repositories/book-repository";

export class CreateBook implements CreateBookUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(book: BookRequestModel): Promise<BookResponseModel | null> {
        return await this.bookRepository.createBook(book);
    }

}
