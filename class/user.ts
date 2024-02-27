class User {
  private _accessToken: string | null;
  private _refreshToken: string | null;

  id: number | null;
  username: string | null;

  constructor() {
    // this._accessToken = null;

    // 임시 토큰
    this._accessToken =
      'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExNjEwOTkyLCJpYXQiOjE3MDkwMTg5OTIsImp0aSI6IjgyNWQwNmM4Njk1NTQ5YjI5NjBjNTBlN2JlNDg2MTYzIiwidXNlcl9pZCI6MX0.TSv9x_WdOsdJ4satf3CwK8btN8CLjXHpObu8GYCRrcE';
    this._refreshToken = null;
    // this.id = null;
    this.id = 1;
    this.username = 'DummyUser1';
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
