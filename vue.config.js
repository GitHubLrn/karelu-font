let proxyObj = {}

proxyObj['/']={
    //websocket
    ws:false,
    //目标地址
    target:'http://localhost:8080',
    //发送请求host头会被设置成target
    changeOrigin:true,
    //不重写请求地址
    pathRewrite:{
        '^/':'/'
    }
}

module.exports = {
    devServer:{
        disableHostCheck:true,
        host:'10.1.188.178',
        port:8081,
        proxy:proxyObj
    }
}