window.addEventListener('load',function(){
    //1.获取元素
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
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
    for(var i = 0; i < ul.children.length-1; i++){
        // 创建一个li
        var li = this.document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性
        li.setAttribute('index',i);
        // 把li插入到ol里面
        ol.appendChild(li);
        // 4.小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click',function(){
            // 干掉所有人 把所有的li清除 current 类名
            for(var i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            // 留下我自己 当前的li添加 current 类名
            this.className = 'current';
            // 5.点击小圆圈，移动图片，移动的是ul
            // ul的移动距离 ： 小圆圈的索引号乘以图片的宽度，注意是负值
            // 当我们点击了某个li 就拿到当前li的索引号
            var index = this.getAttribute('index');
            var focusWidth = focus.offsetWidth;
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个li设置类名为current
    ol.children[0].className = 'current'
    // 6.点击右侧按钮，图片滚动一张
    var num = 0;
    arrow_r.addEventListener('click',function(){
        // 如果走到了最后复制的一张图片，此时ul要快速复原 left改为0 
        // -1是因为多复制了一个li
        if(num == ul.children.length -1){
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
    });
})