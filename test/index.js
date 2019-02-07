const test = require('tape')
const capnode = require('../')

test('a basic connection', (t) => {

  const server = capnode.createServer({
    foo: () => Promise.resolve('bar'),
    bam: 'baz',
  })

  const client = capnode.createClient(server)

  client.on('remote', async (remote) => {

    console.log('remote receivede', remote)
    t.equal(remote.bam, 'baz', 'remote returned concrete value.')
    const result = await remote.foo()
    t.equal(result, 'bar', 'remote returned correctly.')
    t.end()
  })

  client.pipe(server).pipe(client)
})

