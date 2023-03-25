import {BookResponseModel} from "../../model/book";

export interface GetBookUseCase{
    execute(id:string): Promise<BookResponseModel | null>;
}