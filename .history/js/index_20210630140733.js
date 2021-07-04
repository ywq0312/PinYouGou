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
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            // 手动调用点击事件
            arrow_r.click();
        },2000)
    })
    // 动态生成小圆圈 有几张图，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for(var i = 0; i < ul.children.length; i++){
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
            // 当我们点击了某个li，就要把这个li的索引号给num,索引号要和小圆圈和右边的按钮相匹配，所以要把index值给这两个变量
            num = index;
            // 当我们点击了某个li，就要把这个li的索引号给circle
            circle = index;
            var focusWidth = focus.offsetWidth;
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个li设置类名为current
    ol.children[0].className = 'current';
    // 6.克隆第一张图片（第一个li）放到ul最后面
    // cloneNode(true)深克隆，包括节点
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮，图片滚动一张
    var num = 0;
    // 控制小圆圈的变化
    var circle = 0;
    arrow_r.addEventListener('click',function(){
        // 如果走到了最后复制的一张图片，此时ul要快速复原 left改为0 
        // -1是因为多复制了一个li
        if(num == ul.children.length -1){
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        // 8.点击右侧按钮，小圆圈跟随着一起变化，声明一个circle变量控制小圆圈的播放
        circle++;
        // 如果circle == 8表示走到最后克隆的图片了 就将circle复原为0
        if(circle == ol.children.length){
            circle=0;
        }
        // // 先清除其余小圆圈的current类名
        // for(var i = 0; i < ol.children.length; i++){
        //     ol.children[i].className = '';
        // }
        // // 留下当前的小圆圈的current类名
        // ol.children[circle].className = 'current';

        circleChange();
    });
    // 9.左侧按钮的做法
    arrow_l.addEventListener('click',function(){
        // 如果走到了最后复制的一张图片，此时ul要快速复原 left改为0 
        // -1是因为多复制了一个li
        if(num == 0){
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth);
        // 8.点击右侧按钮，小圆圈跟随着一起变化，声明一个circle变量控制小圆圈的播放
        circle--;
        // 如果circle < 0 说明第一张图片跳到了最后一张图片，则小圆圈要改为第8个小圆圈（7）
        // if(circle < 0){
        //     circle = ol.children.length - 1;
        // }
        circle = circle < 0 ? ol.children.length - 1 :circle;
        // // 先清除其余小圆圈的current类名
        // for(var i = 0; i < ol.children.length; i++){
        //     ol.children[i].className = '';
        // }
        // // 留下当前的小圆圈的current类名
        // ol.children[circle].className = 'current';

        circleChange();
    });
    function circleChange(){
        // 先清除其余小圆圈的current类名
        for(var i = 0; i < ol.children.length; i++){
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10.自动播放轮播图（定时器）
    var timer = setInterval(function(){
        // 手动调用点击事件
        arrow_r.click();
    },2000)


    //左侧导航栏固定
    // 1.获取元素
    var sliderbar = this.document.querySelector('.slider-bar');
    // 当侧边栏固定定位之后应该变化的数值
    var sliderbarTop = sliderbar.offsetTop - banner; 
    // 2.页面滚动事件 scroll
    this.document.addEventListener('scroll',function(){{
        // console.log(11); 检测滚动事件是否执行
        // window.pageYOffset页面被卷去的头部
        // console.log(window.pageYOffset);
        // 3.当页面被卷去的头部大于等于330，此时侧边栏就要改为固定定位
        // 330数字可以换成变量，即获取被卷去头部的大小offsetTop，一定要写在滚动的外面
        if(window.pageYOffset >= banner){
            sliderbar.style.position = 'fixed';
            sliderbar.style.top = sliderbarTop + 'px';
        } else{
            sliderbar.style.position = 'absolute';
            sliderbar.style.top = '200px';
        }
    }}) 
})