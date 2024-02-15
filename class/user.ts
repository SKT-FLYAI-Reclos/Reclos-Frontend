class User {
  private _accessToken: string | null;
  private _refreshToken: string | null;

  id: number | null;
  username: string | null;

  constructor() {
    this._accessToken = null;
    this._refreshToken = null;
    this.id = null;
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
