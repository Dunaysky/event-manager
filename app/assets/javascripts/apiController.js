const baseUrl = window._base_url;
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
};

const ApiController = () => {
  const get = async (url) => {
    return fetch(`${baseUrl}${url}`, {
      headers: headers,
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((error) => error);
  };

  const post = async (url, body) => {
    return await fetch(`${baseUrl}${url}`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => error);
  };

  const put = async (url, body) => {
    return await fetch(`${baseUrl}${url}`, {
      headers: headers,
      method: 'PUT',
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => error);
  };

  const destroy = async (url) => {
    return await fetch(`${baseUrl}${url}`, {
      headers: headers,
      method: 'DELETE',
    })
      .then((response) => response.json())
      .catch((error) => error);
  };

  return {
    get,
    post,
    put,
    destroy
  };
};