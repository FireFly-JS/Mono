import FireFly from '@firefly-js/core'

const firefly = new FireFly()

firefly.add({
  path: '/',
  method: 'GET',
  schema: { query: { name: '' } },
  handler: ({  }) => {
    return new Response('Hello World')
  }
})
firefly.add({
  path: '/a',
  method: 'GET',
  schema: {},
  handler: ({  }) => {
    return new Response('Hello World')
  }
})

firefly.start(5656)
