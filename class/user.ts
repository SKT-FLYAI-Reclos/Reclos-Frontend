class User {
  private _accessToken: string | null;
  private _refreshToken: string | null;

  id: number | null;
  username: string | null;

  constructor() {
    // this._accessToken = null;

    // 임시 토큰
    this._accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExNjEzMzMwLCJpYXQiOjE3MDkwMjEzMzAsImp0aSI6IjE2N2IwZmU0YzJmYTQ3NTlhYWY0NTU5MDk4OWEyMzBlIiwidXNlcl9pZCI6MX0.CStH8Oeq1fE0mKYmUE1CjoTO5O6ZVh6_Vsxny_D7xOo';
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
