class ApiResponse {
  constructor(statusCode, data, message = null) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message || (statusCode < 400 ? "Success" : "Error");
    this._statusCode = statusCode;
  }

  get success() {
    return this._statusCode < 400;
  }
}
export { ApiResponse };
