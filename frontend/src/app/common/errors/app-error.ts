
export class AppError {
    constructor(public originalError?: any) { }
    public get objType() { return 'AppError'; }
    static get classType() { return 'AppError'; }
}