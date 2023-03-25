import createMockInstance from "jest-create-mock-instance";
import {CreateBook} from "./create-book";
import {BookRepositoryImpl} from "../../repositories/book-repository-impl";
import {BookRequestModel} from "../../model/book";

describe('create-book-test', () => {
    let bookRepository: jest.Mocked<BookRepositoryImpl>;
    let createBook: CreateBook;
    beforeEach(() => {
        bookRepository = createMockInstance(BookRepositoryImpl);
        createBook = new CreateBook(bookRepository);
    })

    test('create book successfully', async () => {
        // given
        const bookRequestModel = {name: '100 years solidarity'} as BookRequestModel;
        const bookResponseModel = {id: '1', ...bookRequestModel};
        // when
        bookRepository.createBook.mockResolvedValue(bookResponseModel);
        const result = await createBook.execute(bookRequestModel);

        // then
        expect(result).toEqual(bookResponseModel);
        expect(bookRepository.createBook).toHaveBeenCalledWith(bookRequestModel);
        expect(bookRepository.createBook).toBeCalledTimes(1);
    });
});
