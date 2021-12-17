// 发出请求渲染数据
initIndex();

function initIndex(){
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status !== 1)
                renderAvatar(res.data);
        },
    });
}


// 渲染用户头像
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#username').html(name);
    $('#welcome').html(`欢迎你 ${name}`);
    if (user.avatar === null) {
        let first = name[0].toUpperCase();
        console.log(first);
        $('.word-img').html(first);
        $('.layui-nav-img').hide();
    } else {
        $('.layui-nav-img').attr('src', user.avatar);
        $('.word-img').hide();
    }
}


// 实现退出功能
(function () {
    let layer = layui.layer;
    $('#logout').on('click', () => {
        layer.confirm('请问是否要退出', { icon: 3, title: '提示' }, function (index) {
            // 退出需要做的事：
            // 清除token 返回到login页面
            localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index);
        });
    })
})();


