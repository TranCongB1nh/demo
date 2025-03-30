const url = require("url");
const { httpMethods } = require('../utils/constant')

function getMethod (request, response, path, callback) {
  if (path === url.parse(request.url, true).pathname && request.method === httpMethods.GET) {
    callback(request, response)
  }
};

function postMethod (request, response, path, callback) {
  if (path === request.url && request.method === httpMethods.POST) {
    callback(request, response);
  }
};

function deleteMethod (request, response, path, callback) {
  if (request.method === httpMethods.DELETE) {
    callback(request, response);
  }
};

function putMethod (request, response, path, callback) {
  if (path === url.parse(request.url, true).pathname && request.method === httpMethods.PUT) {
    callback(request, response);
  }
};

const routerMethods = {
  get: getMethod,
  post: postMethod,
  delete: deleteMethod,
  put: putMethod,
};

module.exports = routerMethods;
