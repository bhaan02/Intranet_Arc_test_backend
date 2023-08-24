const {Router} = require('express')
const router = Router(); 

const resource = require('../resources.json')

router.get('/', (req, res) => {
    res.json(resource)
})

module.exports = router;