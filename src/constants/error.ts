export class UnregisteredObjectError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UnregisteredObjectError';
  }
}
