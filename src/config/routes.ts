import * as joi from 'joi';

const routes = [
  {
    path: '/users',
    method: 'get',
    controller: 'UsersController',
    action: 'load',
    rules: {
      username: joi.string(),
      password: joi.string(),
      limit: joi.number(),
      offset: joi.number(),
      orderBy: joi.string(),
      orderDirection: joi.string(),
      address: joi.object()
                      .keys({
                        street: joi.string(),
                        city: joi.string()
                      })
    }
  },
  {
    path: '/users',
    method: 'post',
    controller: 'UsersController',
    action: 'create',
    rules: {
      uuid: joi.string(),
      username: joi.string().required(),
      password: joi.string().required(),
    }
  },
  {
    path: '/users',
    method: 'put',
    controller: 'UsersController',
    action: 'update',
    rules: {
      uuid: joi.string(),
      username: joi.string().required(),
      password: joi.string().required(),
    }
  },
  {
    path: '/users',
    method: 'delete',
    controller: 'UsersController',
    action: 'del',
    rules: {
      username: joi.string().required(),
    }
  },
  {
    path: '/users/me',
    method: 'post',
    controller: 'UsersController',
    action: 'get',
    rules: {}
  }
]
export default routes;
