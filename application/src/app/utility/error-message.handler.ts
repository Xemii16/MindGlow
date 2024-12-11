import {AbstractControl} from "@angular/forms";

export class ErrorMessageHandler {
    private _errorMessage: ErrorMessage = {message: ''};
    private readonly requiredErrorMessage?: string;
    private readonly emailErrorMessage?: string;
    private readonly otherErrorMessage?: string;


    constructor(requiredErrorMessage?: string, emailErrorMessage?: string, otherErrorMessage?: string) {
        this.requiredErrorMessage = requiredErrorMessage;
        this.emailErrorMessage = emailErrorMessage;
        this.otherErrorMessage = otherErrorMessage;
    }

    updateErrorMessage(control: AbstractControl<any, any>): void {
        if (control.hasError('required')) {
            this._errorMessage.message = this.requiredErrorMessage ? this.requiredErrorMessage : 'Введіть дані';
            return;
        } else if (control.hasError('email')) {
            this._errorMessage.message = this.emailErrorMessage ? this.emailErrorMessage : 'Недійсна пошта';
            return;
        } else if (control.invalid) {
            this._errorMessage.message = this.otherErrorMessage ? this.otherErrorMessage : 'Недійсні дані';
            return;
        } else {
            this._errorMessage.message = '';
        }
    }

    getErrorMessage(): string {
        return this._errorMessage.message;
    }


    set errorMessage(value: ErrorMessage) {
        this._errorMessage = value;
    }
}

export interface ErrorMessage {
    message: string;
}