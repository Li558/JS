$(function() {
    load();
    //1 按下回车  把完整数据  存储到本地存储里面
    // 存储的数据格式   var todolist = [{title: "XXX", done:false}]
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入你要的操作");
            } else {
                // alert(11);
                //读取本地存储原来的数据
                var local = getData();
                // console.log(local);
                //把local数组进行更新  把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                //把这个数组local 存储到本地存储
                savaData(local);
                //2 toDolist 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    //3 toDoList 删除操作
    $("ol,ul").on("click", "a", function() {
            // alert(11);
            //先获取本地存储
            var data = getData();
            console.log(data);
            //修改数据
            var index = $(this).attr("id");
            console.log(index);
            data.splice(index, 1);
            //保存到本地存储
            savaData(data);
            //重新渲染页面
            load();
        })
        //4 toDoList正在进行和已经完成选项操作
    $("ol,ul").on("click", "input", function() {
        // alert(11);
        //获取本地存储的数据
        var data = getData();
        //修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        // data[?].done = ?
        data[index].done = $(this).prop("checked");
        console.log(data);
        //保存到本地存储
        savaData(data);
        //重新渲染页面
        load();
    });

    //读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            //本地存储里面的数据是字符串格式  我们需要对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储数据
    function savaData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //渲染加载数据
    function load() {
        //读取本地存储的数据
        var data = getData();
        console.log(data);
        //遍历之前先清空ol里面的元素内容
        $("ol,ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数

        // 遍历这个数据
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' ><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                // console.log(n);
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);

    }
})