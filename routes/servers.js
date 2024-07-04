import { Router } from 'express'

import { getAll, create, remove, put } from '../controllers/servers.js'

const router = Router()

router.get('/api/server', getAll)

router.post('/api/server', create)

router.delete('/api/server/:id', remove)

router.put('/api/server/:id', put)


export default router



