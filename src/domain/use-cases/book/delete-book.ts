import {DeleteBookUseCase} from "../../interfaces/use-cases/delete-book";
import {BookRepository} from "../../interfaces/repositories/book-repository";

export class DeleteBook implements DeleteBookUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(id: string): Promise<void> {
        await this.bookRepository.deleteBook(id);
    }

}