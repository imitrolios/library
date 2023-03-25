import {BookResponseModel} from "../../model/book";
import {GetBookUseCase} from "../../interfaces/use-cases/get-book";
import {BookRepository} from "../../interfaces/repositories/book-repository";

export class GetBook implements GetBookUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(id: string): Promise<BookResponseModel | null> {
        return await this.bookRepository.getBook(id);
    }

}
