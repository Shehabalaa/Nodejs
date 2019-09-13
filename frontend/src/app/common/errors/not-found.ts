import { AppError } from './app-error';

export class NotFound extends AppError {
    get objType() { return 'NotFound' }
    static get classType() { return 'NotFound' }
}
