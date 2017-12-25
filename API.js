import request from 'superagent'
import { browserHistory } from 'react-router'

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
            if(err.status == 401) {
              browserHistory.push('/login')
            }
            reject(err)
          } else
            resolve(res.body)
        })
    })
  }
}

export default API
