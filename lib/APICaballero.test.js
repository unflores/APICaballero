import {APICaballero,UnknownRouteError} from './APICaballero'

const routes = {
  options: {
    base_path: '/api'
  },
  locations: {
    list : '/locations/',
    update : '/locations/<id>',
  }
}



test('raises an exception when no route is defined for resource', () => {
  let caballero = new APICaballero(routes)
  expect(() => {
    caballero.call('derp','locations')
  }).toThrowError(/your choices are: list, show, update, create, destroy/);
});
