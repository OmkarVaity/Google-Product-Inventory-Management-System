var proxy = require('http-proxy-middleware');
// const BASE_ROUTE = process.env.PRODUCTION == true ? 'http://synxe.us-east-2.elasticbeanstalk.com' : 'http://localhost:3000/';
// const {BASE_ROUTE} = require('./routes/index');
// const BASE_ROUTE = 'http://10.110.131.220:8080/';
// const BASE_ROUTE = 'http://10.110.134.87:8080/';
 const BASE_ROUTE = 'http://localhost:8080/';

module.exports = app => {
    /*To enable CORS BEGIN*/
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept,Authorization"
      );
      next();
    });

    app.use('/api', proxy({ target: BASE_ROUTE, 
      pathRewrite: {
      '^/api/': '/' // remove base path
    }, changeOrigin: true }));
    // app.listen(3000);
  
    // app.use(
    //   "/api",
    //   proxy({
    //     target : '/',
    //     changeOrigin: true,
    //     router: {
    //       // 'integration.localhost:3000' : 'http://localhost:8001',  // host only
    //       // 'staging.localhost:3000'     : 'http://localhost:8002',  // host only
    //       'localhost:3000/api'         : BASE_ROUTE,  // host + path
    //     }
    //   })
    // );
  // app.listen(port, () => console.log(`http://localhost:${port}`));
  };