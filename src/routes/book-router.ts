import express from 'express';
import {Request, Response} from 'express';
import {CreateBookUseCase} from "../domain/interfaces/use-cases/create-book";
import {GetAllBooksUseCase} from "../domain/interfaces/use-cases/get-all-books";
import {GetBookUseCase} from "../domain/interfaces/use-cases/get-book";
import {UpdateBookUseCase} from "../domain/interfaces/use-cases/update-book";
import {DeleteBookUseCase} from "../domain/interfaces/use-cases/delete-book";
import {BookRequestModel, BookResponseModel} from "../domain/model/book";

export default function BookRouter(
    createBookUseCase: CreateBookUseCase,
    deleteBookUseCase: DeleteBookUseCase,
    updateBookUseCase: UpdateBookUseCase,
    getBookUseCase: GetBookUseCase,
    getAllBooksUseCase: GetAllBooksUseCase
) {
    const router = express.Router();
    router.get('/:id', async (req: Request, res: Response) => {
        return res.status(200).json(await getBookUseCase.execute(req.params.id));
    });
    router.post('/', async (req: Request, res: Response) => {
        res.status(201).json(await createBookUseCase.execute(req.body as BookResponseModel));
    });
    router.delete('/:id', async (req: Request, res: Response) => {
        await deleteBookUseCase.execute(req.params.id);
        res.status(204).send();
    });
    router.put('/:id', async (req: Request, res: Response) => {
        await updateBookUseCase.execute(req.params.id, req.body as BookRequestModel);
        res.status(204).send();
    });
    router.get('/', async (req: Request, res: Response) => {
        res.status(200).json(await getAllBooksUseCase.execute());
    });
    return router;
}