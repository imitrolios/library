import createMockInstance from 'jest-create-mock-instance';
import {PostgresBookDataSource} from '../../data/data-sources/postgressql/postgres-book-data-source';
import {BookRepositoryImpl} from './book-repository-impl';
import {BookRequestModel, BookResponseModel} from '../model/book';

describe('book-repository-test', () => {
    let bookDataSource: jest.Mocked<PostgresBookDataSource>;
    let bookRepositoryImpl: BookRepositoryImpl;
    beforeEach(() => {
        bookDataSource = createMockInstance(PostgresBookDataSource);
        bookRepositoryImpl = new BookRepositoryImpl(bookDataSource);
    })

    test('deleteBook successfully', async () => {
        // given
        const bookId = '1';

        // when
        await bookRepositoryImpl.deleteBook(bookId);

        // then
        expect(bookDataSource.deleteOne).toHaveBeenCalledWith(bookId);
        expect(bookDataSource.deleteOne).toBeCalledTimes(1);
    });

    test('updateBook successfully', async () => {
        // given
        const bookId = '1';
        const bookRequestModel = {name: '100 years solidarity'} as BookRequestModel;

        // when
        await bookRepositoryImpl.updateBook(bookId, bookRequestModel);

        // then
        expect(bookDataSource.updateOne).toHaveBeenCalledWith(bookId, bookRequestModel);
        expect(bookDataSource.updateOne).toBeCalledTimes(1);
    });

    test('getBook successfully', async() => {
        // given
        const bookId = '1';
        bookDataSource.getOne.mockResolvedValue({id:bookId, name:'othello'} as BookResponseModel)
        // when
        await bookRepositoryImpl.getBook(bookId);

        // then
        expect(bookDataSource.getOne).toHaveBeenCalledWith(bookId);
        expect(bookDataSource.getOne).toBeCalledTimes(1);
    });

    test('createBook successfully', async () => {
        const bookId = '1';
        const req = {name:'othello'} as BookRequestModel;
        const resp = {id: bookId, name: 'Romeo and Juliet'} as BookResponseModel;
        bookDataSource.create.mockResolvedValue(resp);
        // when
        await bookRepositoryImpl.createBook(req);

        // then
        expect(bookDataSource.create).toHaveBeenCalledWith(req);
        expect(bookDataSource.create).toBeCalledTimes(1);
    });

    test('getAllBooks successfully', async () => {
        // given
        const bookId = '1';
        const resp = [{id:bookId, name:'crime and justice'}] as BookResponseModel[];
        bookDataSource.getAll.mockResolvedValue(resp);
        // when
        await bookRepositoryImpl.getAllBooks();

        // then
        expect(bookDataSource.getAll).toHaveBeenCalled();
        expect(bookDataSource.getAll).toBeCalledTimes(1);
    });
});
