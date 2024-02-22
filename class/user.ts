class User {
  private _accessToken: string | null;
  private _refreshToken: string | null;

  id: number | null;
  username: string | null;

  constructor() {
    // this._accessToken = null;
    this._accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTg3MjMxLCJpYXQiOjE3MDg1ODM2MzEsImp0aSI6ImZiYjVhYTRkNGNmYzRlMWNiNWY2ZjM1ZWEzMmMwMDg1IiwidXNlcl9pZCI6N30._l32R29bE-m6EmV1OGs24mhPEr8j0GDlf79koDzCJ8U';
    this._refreshToken = null;
    // this.id = null;
    this.id = 7;
    this.username = null;
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
