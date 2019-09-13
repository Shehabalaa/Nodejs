import { AppError } from './app-error';

export class BadInput extends AppError {
    get objType() { return 'BadInput' }
    static get classType() { return 'BadInput' }
}
