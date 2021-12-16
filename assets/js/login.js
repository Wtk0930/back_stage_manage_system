// 验证码
let verifyCode = null;
let layer = layui.layer;



(function () {
    // 登录与注册切换
    $('.login #register').on('click', function () {
        console.log(1);
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.register').style.display = 'block';
    })
    $('.register #login').on('click', function () {
        console.log(1);
        document.querySelector('.login').style.display = 'block';
        document.querySelector('.register').style.display = 'none';
    })
})();


// // 验证码模块
// (function () {
//     verifyCode = new GVerify("checkcode");
// })();




// 表单验证模块
(function () {
    layui.use('form', function () {
        // 从layui获取表单元素
        var form = layui.form;
        console.log(form);
        form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须为6到12位非空元素'],
            pwd2: function (value) {
                if ($('.register #password').val() !== value) {
                    return '两次密码输入不一致';
                }
            },
            // verify: function (value) {
            //     if (!verifyCode.validate(value))
            //         return '验证码填写错误';
            // }
        })
    })
})();



// 后台交互模块
(function () {
    // 注册模块
    document.querySelector('.register form').addEventListener('submit', function (e) {
        e.preventDefault();
        let user = {};
        user.username = document.querySelector('.register #username').value;
        user.password = document.querySelector('.register #password').value;
        console.log(user);
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/api/reguser",
            data: user,
            success: function (res) {
                layer.msg(`<span style='color:white'>${res.msg}</span>`, {
                    anim: 2,
                    time: 800
                });
            },
        });
    })


    // 登录模块
    document.querySelector('.login form').addEventListener('submit', function (e) {
        e.preventDefault();
        let user = {};
        user.username = document.querySelector('.login #username').value;
        user.password = document.querySelector('.login #password').value;
        console.log('登录已按下');
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: user,
            success: function (res) {
                console.log(res);
                localStorage.setItem('token',res.token);
                layer.msg(`<span style='color:white'>${res.msg}</span>`, {
                    anim: 2,
                    time: 800
                });
                if(res.msg === '登录成功'){
                    location.href = './index.html';
                }
            },
        });
    })
    document.querySelector('body').addEventListener('keyup',function(e){
        if(e.code === 'Enter'){
            // 按下回车键实现登录
            $('input[value="登录"]').click();
        }
    })
})();




