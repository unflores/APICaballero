'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var request = _interopDefault(require('superagent'));

const methodsToHttp = {
  'create':   'post',
  'list':     'get',
  'show':     'get',
  'update':   'put',
  'destroy':  'delete'
};

const API = {

  call(method, path, data) {
    return new Promise((resolve, reject) => {
      let http_verb = methodsToHttp[method];

      request[http_verb](path)
        .send(data)
        .end((err, res) => {

          if(err){
            reject(err);
          } else
            resolve(res.body);
        });
    })
  }
};

class UnknownRouteError extends Error {
  constructor(message) {
    super(`The route '${message}' is unknown, your choices are: list, show, update, create, destroy.`);
    this.name = 'UnknownRouteError';
  }
}

const methods = ['list','show','update','create','destroy'];

class APICaballero {

  constructor(routes){
    this.endpoints = routes;
  }

  list(type, path_vars, data) {
    return API.call('list', this.getEndpoint(type, 'list', path_vars), data)
  }
  show(type, path_vars, data) {
    return API.call('show', this.getEndpoint(type, 'show', path_vars), data)
  }
  update(type, path_vars, data) {
    return API.call('update', this.getEndpoint(type, 'update', path_vars), data)
  }
  create(type, path_vars, data) {
    return API.call('create', this.getEndpoint(type, 'create', path_vars), data)
  }

  destroy(type, path_vars, data) {
    return API.call('destroy', this.getEndpoint(type, 'destroy', path_vars), data)
  }

  call(method, type, path_vars, data) {
    if(methods.find((choice) => choice == method) == undefined){
      throw new UnknownRouteError(method)
    }
    this[method](type, path_vars, data);
  }

  getEndpoint(type, action, params) {
    let path = this.endpoints[type][action];
    for(let key in params){
      path = path.replace(`<${key}>`, params[key]);
    }
    return this.endpoints.options.base_path + path
  }
}

module.exports = APICaballero;
