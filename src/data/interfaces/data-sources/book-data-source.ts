import {BookRequestModel, BookResponseModel} from "../../../domain/model/book";

export interface BookDataSource {
    create(data: BookRequestModel): Promise<BookResponseModel | null>;
    getAll(): Promise<BookResponseModel[]>;
    deleteOne(id: String): void;
    updateOne(id: String, data: BookRequestModel): void;
    getOne(id: String): Promise<BookResponseModel | null>;
}
