import request from 'superagent'

const methodsToHttp = {
  'create':   'post',
  'list':     'get',
  'show':     'get',
  'update':   'put',
  'destroy':  'delete'
}

const API = {

  call(method, path, data) {
    return new Promise((resolve, reject) => {
      let http_verb = methodsToHttp[method]

      request[http_verb](path)
        .send(data)
        .end((err, res) => {

          if(err){
            reject(err)
          } else
            resolve(res.body)
        })
    })
  }
}

export default API
