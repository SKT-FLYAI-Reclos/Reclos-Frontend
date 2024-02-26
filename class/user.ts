class User {
  private _accessToken: string | null;
  private _refreshToken: string | null;

  id: number | null;
  username: string | null;

  constructor() {
    // this._accessToken = null;

    // 임시 토큰
    this._accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExMTgzODI3LCJpYXQiOjE3MDg1OTE4MjcsImp0aSI6IjZlZjU5YmFjOTRmYTQ0ODVhM2YwMzEwODA4ZTJjNTBmIiwidXNlcl9pZCI6N30.4t3VLtAScG5UVKOM1gt9UMVTPzajQn07PtYcdYj3h3c';
    this._refreshToken = null;
    // this.id = null;
    this.id = 7;
    this.username = '박지수';
  }

  getAccessToken() {
    return this._accessToken;
  }

  setAccessToken(newAccessToken: string) {
    this._accessToken = newAccessToken;
  }

  deleteAccessToken() {
    this._accessToken = null;
  }

  getRefreshToken() {
    return this._refreshToken;
  }

  setRefreshToken(newRefreshToken: string) {
    this._refreshToken = newRefreshToken;
  }

  deleteRefreshToken() {
    this._refreshToken = null;
  }
}

export const user = new User();
