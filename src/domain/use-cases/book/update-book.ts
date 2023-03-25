import {BookRequestModel} from "../../model/book";
import {UpdateBookUseCase} from "../../interfaces/use-cases/update-book";
import {BookRepository} from "../../interfaces/repositories/book-repository";

export class UpdateBook implements UpdateBookUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(id: string, book: BookRequestModel): Promise<void> {
        await this.bookRepository.updateBook(id, book);
    }

}