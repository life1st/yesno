var dataBf = new Date().getTime();
/*    for(var i=0;i<b.length;i++)
console.log(1);*/
// $('p').css({'font-size':"14px",'line-height':'28px'});
$('#seen').click(function(){
$.ajax({
    url:'https://yesno.wtf/api',
    Type:'get',
    dataType:'json',
    success:function(res){
        console.log(res);
        var tAnswer = res.answer,
        tImage = res.image;
        if(tAnswer=='yes'){
            tAnswer = 'Yes !';
        }
        var _dom = "<p class='answer'>"+tAnswer+"</p>"/*+"<img src="+tImage+" class='anspic' />"*/;

        $('#content').text('please wait...');
        
        $('body').css('background','url('+tImage+')');
        setTimeout($('#content').html(_dom),5000);
        var dataNow = new Date().getTime();
        console.log(dataNow);
        $('#time').html(dataNow-dataBf+'ms').css('color','blue');
    }
})
})
console.log(dataBf);


/*<script>
    $.ajax({
        url:'/operator/queryRoles.json',
        dataType:'json',
        type:'post',
        success:function(res){

            var userList = res.data.list;
            $('#searchUserName').on('click',function () {
                var userName = document.getElementById('ipt').value;

                for(var i=0;i<userList.length;i++){
                    console.log(userList.length)
                    console.log(userList[i].roleName.match(userName));
                    if(userList[i].roleName.match(userName)==null){
                        res.data.list.splice(i,1);
                        i = 0;
                    }
                }
                console.log(res.data);
                //重新设置DOM;
                $('#thelist').doRender(res.data);
            })

        }
    });
</script>*/