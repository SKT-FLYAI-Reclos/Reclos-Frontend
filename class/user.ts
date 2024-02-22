class User {
  private _accessToken: string | null;
  private _refreshToken: string | null;

  id: number | null;
  username: string | null;

  constructor() {
    // this._accessToken = null;
    this._accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTg0MTgzLCJpYXQiOjE3MDg1ODA1ODMsImp0aSI6ImZiMWQ2NDU4M2VjODQ5MjliNzUxYjJjOGIxZTRlOGUwIiwidXNlcl9pZCI6N30.sLugIOEBSCkCX_uR95GFULSWGHj3fKlC871TDVbqCjk';
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
