const StatusMessages: {
  [key: number]: string
} = {
  401: 'Unauthorized'
}

export class ServerError extends Error implements ServerError {
  public status: number;
  constructor(message: string, status: number) {
    super(message)
    this.status = status;
    this.message = StatusMessages[status] || message;
    this.stack = (new Error()).stack;
  }
}