$(function () {
    // 初始化坐标
    var last = { row:0,col:0 };
    var now = {row:1,col:1};
    //初始化四个方向
    var direction={up:1,right:2,bottom:3,left:4};
    //判断动画是否执行完，执行完才能执行下一个事件；
    var isMoving=false;
    //向上滑
    //在添加滑动事件时记得清楚默认事件；touch-action=none；
    $(".page").swipeUp(function () {
        if(isMoving){
            return;
        }
        //将滑动前手指作用的页面的坐标赋值给滑动之后上一个页面
        last.row = now.row;
        last.col = now.col;
        //判断滑动的条件  滑动所需参数的设置
        if(last.col<3){
            now.row = 1;
            now.col = last.col + 1;
          console.log(now.col)
            pageMove(direction.up);
        }

    });
    //向下滑
    $(".page").swipeDown(function () {
        if(isMoving){
            return;
        }
        //将滑动前手指作用的页面的坐标赋值给滑动之后上一个页面
        last.row = now.row;
        last.col = now.col;
        //判断滑动的条件  滑动所需参数的设置
        if(last.col>1){
            now.row = 1;
            now.col = last.col - 1;

            pageMove(direction.bottom);
        }
    });
    //向左滑
    $(".page").swipeLeft(function () {
        if(isMoving){
            return;
        }
        //将滑动前手指作用的页面的坐标赋值给滑动之后上一个页面
        last.row = now.row;
        last.col = now.col;
        //判断滑动的条件  滑动所需参数的设置
        if(last.row==1&&last.col>1&&last.col<3){
            now.row = last.row + 1;
            pageMove(direction.left);
        }
    });
    //向右滑
    $(".page").swipeRight(function () {
        if(isMoving){
            return;
        }
        //将滑动前手指作用的页面的坐标赋值给滑动之后上一个页面
        last.row = now.row;
        last.col = now.col;
        //判断滑动的条件  滑动所需参数的设置
        //判断滑动的条件  滑动所需参数的设置
        if(last.row==2&&last.col>1&&last.col<3){
            now.row = last.row - 1;
            pageMove(direction.right);
        }
    });
    //定义动画函数
    function pageMove(dir) {
        //初始页面
        var lastPage = '.page-' + last.col + '-' + last.row;
        var nowPage = '.page-' + now.col + '-' + now.row;
        //初始化页面类
        var inClass="";
        var outClass="";
        switch (dir){
            case direction.up:
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case direction.right:
                inClass="pt-page-moveFromLeft ";
                outClass="pt-page-moveToRight";
                break;
            case direction.bottom:
                inClass="pt-page-moveFromTop ";
                outClass="pt-page-moveToBottom";
                break;
            case direction.left:
                inClass="pt-page-moveFromRight ";
                outClass="pt-page-moveToLeft";
                break;
        }
        //添加动画
        $(nowPage).removeClass("hide");
        $(lastPage).addClass(outClass);
        $(nowPage).addClass(inClass);
        isMoving = true;
        //使每次移动时，页面的切换有过渡效果；
        setTimeout(function () {
            $(lastPage).addClass("hide");
            $(lastPage).removeClass(outClass);
            // $(lastPage).removeClass('page-current');
            //使页面出来后才执行开始动画
            $(lastPage).find('img').addClass('hide');



            // $(nowPage).addClass("page-current");
            $(nowPage).removeClass(inClass);
            $(nowPage).find('img').removeClass('hide');
            isMoving = false;
        },600)

    }
});