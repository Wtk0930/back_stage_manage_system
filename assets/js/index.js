$.ajax({
    type: "get",
    url: "/my/userinfo",
    data: "data",
    success: function (res) {
        console.log(res);
    }
});