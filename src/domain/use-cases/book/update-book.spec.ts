import {UpdateBook} from "./update-book";
import {BookRepositoryImpl} from "../../repositories/book-repository-impl";
import createMockInstance from "jest-create-mock-instance";
import {BookRequestModel, BookResponseModel} from "../../model/book";

describe('create-book-test', () => {
    let bookRepository: jest.Mocked<BookRepositoryImpl>;
    let updateBook: UpdateBook;
    beforeEach(() => {
        bookRepository = createMockInstance(BookRepositoryImpl);
        updateBook = new UpdateBook(bookRepository);
    })

    test('update book successfully', async () => {
        // given
        const bookId = '1';
        const bookRequestModel = {name: '100 years solidarity'} as BookRequestModel;

        // when
        await updateBook.execute(bookId, bookRequestModel);

        // then
        expect(bookRepository.updateBook).toHaveBeenCalledWith(bookId, bookRequestModel);
        expect(bookRepository.updateBook).toBeCalledTimes(1);
    });
});