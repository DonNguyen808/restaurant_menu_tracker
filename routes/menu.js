const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menu')

// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', menuController.getIndex)
// colon tells that this parameter will vary
router.get('/:id', menuController.geteditMenu)
router.get('/delete/:id', menuController.getdeleteMenu)
router.post('/save', menuController.saveMenu)
router.post('/new', menuController.newMenu)

module.exports = router