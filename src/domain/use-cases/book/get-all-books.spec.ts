import {BookRepositoryImpl} from "../../repositories/book-repository-impl";
import {GetAllBooks} from "./get-all-books";
import createMockInstance from "jest-create-mock-instance";
import {BookResponseModel} from "../../model/book";

describe('get-all-books-test', () => {
    let bookRepository: jest.Mocked<BookRepositoryImpl>;
    let getAllBooks: GetAllBooks;
    beforeEach(() => {
        bookRepository = createMockInstance(BookRepositoryImpl);
        getAllBooks = new GetAllBooks(bookRepository);
    })

    test('get all books successfully', async () => {
        // given
        const resp = [{id:'1', name:'crime and justice'}] as BookResponseModel[];
        // when
        bookRepository.getAllBooks.mockResolvedValue(resp);
        const result = await getAllBooks.execute();

        // then
        expect(result).toEqual(resp);
        expect(bookRepository.getAllBooks).toHaveBeenCalled();
        expect(bookRepository.getAllBooks).toBeCalledTimes(1);
    });
});