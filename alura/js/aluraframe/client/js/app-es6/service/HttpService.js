export class HttpService {
  getUsingXMLHttpReq(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            console.log(xhr.responseText);
            reject(xhr.responseText);
          }
        }
      }
      xhr.send();
    });
  }

  postUsingXMLHttpReq(url, dado) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }
        }
      };
      xhr.send(JSON.stringfy(dado));
    });
  }

  _handleErrors(res) {
    if (!res.ok) throw new Error(res.statusText);
    return res;
  }

  get(url) {
    return fetch(url)
      .then(res => this._handleErrors(res))
      .then(res => res.json());
  }

  post(url, dado) {
    return fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify(dado)
      })
      .then(res => this._handleErrors(res));
  }
}