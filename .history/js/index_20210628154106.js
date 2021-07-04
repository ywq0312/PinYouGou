window.addEventListener('load',function(){
    //1.获取元素
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    // 2.鼠标经过focus就显示隐藏左右按钮
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    })
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    })
    // 动态生成小圆圈 有几张图，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for(var i = 0; i < ul.children.length; i++){
        // 创建一个li
        var li = this.document.createElement('li');
        // 把li插入到ol里面
        ol.appendChild(li);
        // 4.小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click',function(){
            // 干掉所有人 把所有的li清除 current 类名
            for(var i = 0; i < ol.children.length; i++){
                ol.children[i]
            }
            // 留下我自己 当前的li添加 current 类名
        })
    }
    // 把ol里面的第一个li设置类名为current
    ol.children[0].className = 'current'
})