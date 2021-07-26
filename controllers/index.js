const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
// collect the packaged group of API endpoints and prefix them with the `/api` path. 
router.use('/',homeRoutes);
router.use('/api',apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;