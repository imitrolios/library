import createMockInstance from "jest-create-mock-instance";
import {GetBook} from "./get-book";
import {BookRepositoryImpl} from "../../repositories/book-repository-impl";
import {BookResponseModel} from "../../model/book";

describe('get-book-test', () => {
    let bookRepository: jest.Mocked<BookRepositoryImpl>;
    let getBook: GetBook;
    beforeEach(() => {
        bookRepository = createMockInstance(BookRepositoryImpl);
        getBook = new GetBook(bookRepository);
    })

    test('get book successfully', async () => {
        // given
        const bookId = '1';
        const resp = {id:'1', name:'crime and justice'} as BookResponseModel
        // when
        bookRepository.getBook.mockResolvedValue(resp)
        const result = await getBook.execute(bookId);

        // then
        expect(result).toEqual(resp);
        expect(bookRepository.getBook).toHaveBeenCalledWith(bookId);
        expect(bookRepository.getBook).toBeCalledTimes(1);
    });
});