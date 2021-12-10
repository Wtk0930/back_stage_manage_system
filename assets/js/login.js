// 验证码
let verifyCode = null;



(function () {
    // 登录与注册切换
    $('#register').on('click', function () {
        console.log(1);
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.register').style.display = 'block';
    })
    $('#login').on('click', function () {
        console.log(1);
        document.querySelector('.login').style.display = 'block';
        document.querySelector('.register').style.display = 'none';
    })
})();


// 验证码模块
(function () {
    verifyCode = new GVerify("checkcode");
})();


console.log(verifyCode);


// 表单验证模块
(function () {
    layui.use('form', function () {
        // 从layui获取表单元素
        var form = layui.form;
        console.log(form);
        form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须为6到12位非空元素'],
            pwd2: function (value) {
                if ($('#password').val() !== value) {
                    return '两次密码输入不一致';
                }
            },
            verify: function (value) {
                if (!verifyCode.validate(value))
                    return '验证码填写错误';

            }
        })
    })
})();