import {BookResponseModel} from "../../model/book";

export interface GetAllBooksUseCase {
    execute(): Promise<BookResponseModel[]>;
}