# API Caballero

A dumb API routes builder for calling your backend services

## Setting up API routes - caballero.js

```
  import APICaballero from './APICaballero'

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
    caballero.list('locations')
      .then(locations => {
        this.setState({locations})
      })
  }
```
