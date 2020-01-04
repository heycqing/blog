var config = {
    // 视觉相关
    body: "service work 推送",
}

window.addEventListener('load', function(){
    if (!('serviceWorker' in navigator)) {
        alert('该浏览器不支持service work')
        return;
    }
    if (!('PushManager' in window)) {
        alert('该浏览器不支持service work的通知功能')
        return;
    }
    if ('serviceWorker' in navigator) {
        // 注册service Woker事件；
        navigator.serviceWorker.register('./sw.js',).then(registration => {
            var serviceWorker;
            if (registration.installing) {
                serviceWorker = registration.installing;
                console.log('注册中')
            } else if (registration.waiting) {
                serviceWorker = registration.waiting;
                console.log('等待中')
            } else if (registration.active) {
                serviceWorker = registration.active;
                registration.showNotification('推送测试', config);
                console.log('注册成功')
            }
            if (serviceWorker) {
                serviceWorker.addEventListener('statechange', function (e) {
                    console.log('状态变化为' + e.target.state);
                });
            }
        }).catch(error => {
            console.log('没有注册成功: ', error);
        })
    }
})