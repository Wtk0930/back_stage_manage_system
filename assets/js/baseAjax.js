$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:8080' + options.url;
    if (options.url.includes('/my')) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    // options.complete = function (res) {
    //     if (res.responseJSON.status === 1 || res.responseJSON.msg === '身份认证失败') {
    //         location.href = 'login.html';
    //     }
    // }
})


