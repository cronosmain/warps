# warps

A simple wrapper around some value. The library can be used as a simple
Dependency Injection.

## Install

`npm install @cronosmain/warps` || any other package managers, you know it.

## How it works

```ts
// Init warp with some value.
let w = warp(0)
// Get the value.
w() // returns 0
// Set new value.
w(42) // returns 42
```

## Using as DI

Warps can be used to implement the [singleton](https://en.m.wikipedia.org/wiki/Singleton_pattern) pattern.

```ts
// FILE: singletons.ts
import { warp } from '@cronosmain/warps'
import { FastifyInstance } from 'fastify'
import { MongoClient } from 'mongodb'

export let fastify = warp<Fastify>(null as any)
export let mongo = warp<MongoClient>(null as any)
```

```ts
// FILE: index.ts
import { fastify, mongo } from './singletons.ts'
import Fastify from 'fastify'
import { MongoClient } from 'mongodb'

// Init singletons.
// Pass new value to the warp to change its state.
fastify(Fastify())
mongo(MongoClient.connect('mongodb://localhost:27017'))

// high-level await is available in { "type": "module" }
await import('./routes.ts')

// Start the server.
await fastify().listen(3000)
```

```ts
// FILE: routes.ts
import { fastify, mongo } from './singletons.ts'

fastify().get('/someroute', async () => {
  // Singletons is a function, so you can call it to get the value.
  const collection = mongo().db('test').collection('test')
  const result = await collection.find({}).toArray()
  return result
})
```

## Performance issue

It is not here. `Warp` is a very simple wrapper function, and its call is very cheap.

1 billion calls of it takes ~0.9s on m1. That is more than a million calls per millisecond.
