export class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static AuthorizationError(msg) {
    return new ApiError(403, msg);
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static DoubleNameError() {
    return new ApiError(401, "Пользователь с таким именем уже существует");
  }

  static ShortNameError() {
    return new ApiError(403, "Имя слишком короткое");
  }

  static ExitError() {
    return new ApiError(403, "Ошибка выхода");
  }

  static TokenError() {
    return new ApiError(403, "Ошибка обновления токена");
  }

  static GetUsersError() {
    return new ApiError(500, "Ошибка получения пользователей");
  }

  static GameError() {
    return new ApiError(405, "Игра не найдена");
  }
}
