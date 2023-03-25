"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepositoryImpl = void 0;
class BookRepositoryImpl {
    constructor(bookDataSource) {
        this.bookDataSource = bookDataSource;
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bookDataSource.deleteOne(id);
        });
    }
    updateBook(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bookDataSource.updateOne(id, data);
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookDataSource.getOne(id);
        });
    }
    createBook(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookDataSource.create(data);
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookDataSource.getAll();
        });
    }
}
exports.BookRepositoryImpl = BookRepositoryImpl;