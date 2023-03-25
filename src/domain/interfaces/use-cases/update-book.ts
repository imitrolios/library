import {BookRequestModel} from "../../model/book";

export interface UpdateBookUseCase{
    execute(id: string, book:BookRequestModel): void;
}