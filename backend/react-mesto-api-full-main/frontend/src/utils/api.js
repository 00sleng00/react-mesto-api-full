class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers()
    })
      .then(this._checkResponse)
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers()
    })
      .then(this._checkResponse)
  };

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  };

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse)
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers(),
    })
      .then(this._checkResponse)
  };

  // deleteLike(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}/likes `, {
  //     method: 'DELETE',
  //     headers: this._headers(),
  //   })
  //     .then(this._checkResponse)
  // };

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes `, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers(),
    })
      .then(this._checkResponse)
  };

  // addLike(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}/likes `, {
  //     method: 'PUT',
  //     headers: this._headers(),
  //   })
  //     .then(this._checkResponse)
  // };

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse)
  };

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://api.mesto.nomoreparties.sbs',
  headers() { 
    return  {
    Accept: 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
  }
});

export default api;