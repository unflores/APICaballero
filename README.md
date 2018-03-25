# API Caballero

A dumb API routes builder for calling your backend services

## Setting up API routes - caballero.js

```
  import APICaballero from 'apicaballero'

  const routes = {
    options: {
      base_path: '/api'
    },
    locations: {
      list : '/locations/',
      show : '/locations/<id>',
      update : '/locations/<id>',
      destroy : '/locations/<id>'
    },
    users: {
      create: '/users'
    }
  }

  const caballero = new APICaballero(routes)

  export default caballero
```

## Using routes - Locations.jsx component

```
  import caballero from 'api/caballero'

  componentDidMount() {
    caballero.call('list','locations')
      .then(locations => {
        this.setState({locations})
      })
  }
```
## Some things to think about

* what happens when the user doesn't replace all of the <> values?
* What happens when the user calls caballero.list butno route has been defined for it?
