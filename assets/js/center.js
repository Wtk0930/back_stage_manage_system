let form = layui.form;
let layer = layui.layer;


// 个人资料模块
(function () {
    // 个人基本资料 显示隐藏
    $('.layui-side #basic_message').on('click', () => {
        initUserinfo('basic_form');
        $('.mask').show();
        $('.basic_information').show();
    })

    $('.basic_information .close').on('click', () => {
        $('.mask').hide();
        $('.basic_information').hide();
    })

    // 重置按钮
    $('.basic_information #reset').on('click', function (e) {
        e.preventDefault();
        initUserinfo('basic_form');
    })

    // 提交信息
    $('.basic_information .layui-form').on('submit', (e) => {
        e.preventDefault();
        let data = form.val('basic_form');
        $.ajax({
            type: "POST",
            url: "/my/updateuserinfo",
            data: data,
            success: function (res) {
                console.log(res);
                layer.msg(res.msg);
                initIndex();
            }
        });
    })



})();


// 修改密码模块
(function () {
    // 修改密码 显示隐藏
    $('.layui-side #reset_password').on('click', () => {
        $('.mask').show();
        $('.reset_password').show();
    })

    $('.reset_password .close').on('click', () => {
        document.querySelector('.reset_password #reset').click();
        $('.mask').hide();
        $('.reset_password').hide();
    })


    // 提交信息
    $('.reset_password .layui-form').on('submit', (e) => {
        e.preventDefault();
        let data = form.val('reset_psw_form');
        $.ajax({
            type: "POST",
            url: "/my/updatepassword",
            data: data,
            success: function (res) {
                console.log(res);
                layer.msg(res.message);
            }
        });
    })
})();


// 修改头像模块
(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('.change-avatar #image')
    // 个人基本资料 显示隐藏
    $('.layui-side #change_avatar').on('click', () => {
        // 1.2 配置选项
        const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }

        // 1.3 创建裁剪区域
        $image.cropper(options)
        $('.mask').show();
        document.querySelector('.change-avatar').style.display = 'block';
    })

    $('.change-avatar .close').on('click', () => {
        $('.mask').hide();
        document.querySelector('.change-avatar').style.display = 'none';
    })



    // 给上传头像按钮绑定点击事件
    $('.change-avatar .row2 #load').on('click', (e) => {
        document.querySelector('.change-avatar #file').click();
    })

    $('#file').on('change', (e) => {
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    $('#upload').on('click', (e) => {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: "post",
            url: "/my//update/avatar",
            data: { avatar: dataURL },
            success: function (res) {
                layer.msg(res.message)
                initIndex();
            }
        });
    })
})();



// 初始化表单数据
function initUserinfo(formstr) {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 1) {
                // 利用form.val快速给表单赋值
                form.val(formstr, res.data);
            }
        },
    });
}


// 定义表单验证规则
form.verify({
    nickname: function (value) {
        if (value.length > 6)
            return '昵称长度应在1 —— 6个字符之间'
    },
    email: function (value) {
        if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)))
            return '邮箱格式不正确';
    },
    pwd: [/^[\S]{6,12}$/, '密码必须为6到12位非空元素'],
    pwd2: function (value) {
        if ($('.reset_password #newPwd').val() !== value) {
            return '两次密码输入不一致';
        }
    },
})
