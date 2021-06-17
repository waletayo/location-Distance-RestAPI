class AppError extends Error {

    constructor(message, statusCode, messages = null) {
        super(message);
        this._message = message;
        if (messages) {
            this._messages = message;
        }
        this.status_code = statusCode;
    }

    get message() {
        return this._message;
    }

    get messages() {
        return this._messages;
    }

    format(meta) {
        let response = {status_code: this.status_code, message: this.message};
        if (meta.messages) {
            response.messages = this.messages;
        }
        return response;
    }
}

export default AppError;
