
var answer = new Vue({
    el:'#content',
    data:{
        title:"hey dude.think of your question and type the button to get answer :",
        seen:'Get.',
        content: '?',
        tUrl:'#',
        isClick:false
    }
})
var sData = ['.','..','...'],
    i = 0,
    dataBf = new Date().getTime(),
    seen = $('#seen'),
    body = $('body');

var t;
seen.click(function(){
    /*屏蔽<a>标签点击事件避免重复点击*/
    answer.isClick = true;
    var j = 0;
    /*在图片加载时更新<a>标签内容避免用户认为页面假死*/
    t = setInterval(function(){
        answer.seen = sData[i++];
        i>2?i=0:i;
        j++;
        if(j>8&&j<40){
            answer.content = 'emmmm...'
        }else if(j>40){
            answer.content = 'you say what?again.'
            reset();
        }
    },400)

    body.css('background','#000');
    answer.content = 'Let me think...';

    axios({
        method:'get',
        url:'https://yesno.wtf/api'
    }).then(function (res) {
        res = res.data;
        var tAnswer=res.answer,
            tImage=res.image;
        /*加载图片在一个隐藏的元素中优化体验*/
        answer.tUrl = tImage;
        /*tAnswer的值：yes,no,maybe*/
        if(tAnswer==='yes')
            tAnswer = 'Yes !';
        else if(tAnswer==='no')
            tAnswer = 'no...';
        /*图片加载成功显示内容*/
        document.getElementById('tImg').onload = function() {
            reset();
            answer.content = tAnswer;
            /*根据设备宽度选择背景重复模式*/
            $(window).width()<=768?
                body.css({"background":"url("+tImage+") top","background-size":"100%"}):
                body.css({"background":"url("+tImage+") left top","background-size":"25%"})
        }
        var dataNow = new Date().getTime();
        console.log(dataBf,dataNow);
        $('#time').html('+'+(dataNow-dataBf)+'ms').css('color','blue');
    }).catch(function (error) {
        console.log(error)
    })
})

function reset() {
    /*恢复<a>标签点击事件*/
    answer.isClick = false;
    /*清除定时器，恢复<a>标签初始文本*/
    clearInterval(t);
    answer.seen = 'Get.'

    j=0;
}

/*  
    使用vue数据绑定代替JQuery控制文档（不过要多加载30k数据，多一个http请求。），
    使用三元运算符代替if语句，代码逻辑更清晰。（由于answer每10000次返回的数据有一个maybe，所以只能使用if）。
    获取重复的元素使用变量表示，减少运行时间。
    点击获取按钮后使用setInterval（）更新按钮文字，避免用户认为页面假死。
    点击后为<a>设置.disable类名（使用css设置pointer-events: none;），避免发生重复点击，也避免重复请求数据。
    由于图片大小不确定，在ajax获取到图片地址后马上控制页面上的隐藏元素实现预加载。
    获取图片加载状态，加载完成后才显示在页面上，通过控制用户等待时间避免白屏问题出现。
    使用onload（）代替setTimeout（），避免固定延迟出现不必要的时间浪费或者图片未加载完出现白屏。
*/