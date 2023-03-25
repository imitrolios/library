import {BookRepositoryImpl} from "../../repositories/book-repository-impl";
import createMockInstance from "jest-create-mock-instance";
import {DeleteBook} from "./delete-book";

describe('delete-book-test', () => {
    let bookRepository: jest.Mocked<BookRepositoryImpl>;
    let deleteBook: DeleteBook;
    beforeEach(() => {
        bookRepository = createMockInstance(BookRepositoryImpl);
        deleteBook = new DeleteBook(bookRepository);
    })

    test('delete book successfully', async () => {
        // given
        const bookId = '1';

        // when
        await deleteBook.execute(bookId);

        // then
        expect(bookRepository.deleteBook).toHaveBeenCalledWith(bookId);
        expect(bookRepository.deleteBook).toBeCalledTimes(1);
    });
});