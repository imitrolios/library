import {BookRequestModel, BookResponseModel} from "../../model/book";

export interface CreateBookUseCase{
    execute(book:BookRequestModel): Promise<BookResponseModel | null>;
}
