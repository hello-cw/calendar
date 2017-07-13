var $lis_price=0;
var $ticket_num=1;
var $calendar_index=0;
var _price;
var $lis_flag=false;
var sale_price = $('#sale_price').val();
function Calendar(priceday,year,month,day){
	var $calendar=$('.calendar');
	$calendar.empty();
	var _html='';
	var $span='';
	var monthFirst=new Date(year,parseInt(month),1).getDay();
	var d = new Date(year, parseInt(month+1), 0);
	var totalDay = d.getDate();
	var lis_num=parseInt(totalDay+monthFirst);
	for(var i=0;i<lis_num;i++){
		_html+='<li><span class="days"></span></li>';
	}
	$calendar.append(_html);
	var $lis=$calendar.find('li');
	for(var j=0;j<totalDay;j++){
		$lis.eq(j+monthFirst).find('span').html(j+1);
		
		if(parseInt(month+1)==cur_month && cur_years==years){
			if(j<day){
				$lis.eq(j+monthFirst).addClass('next_day');
			}else{
				$lis.eq(parseInt(monthFirst+j)).addClass('buy_day');
			}
		}else{
			$lis.eq(parseInt(j+monthFirst)).addClass('buy_day')
		}
		for(var k=0;k<priceday.length;k++){
			if(parseInt(j+1)==priceday[k].id){
				$span='<br /><span class="price">&yen;'+priceday[k].price+'</span>';
				$lis.eq(j+monthFirst).append($span);
				
			}
		}
	}
	if(parseInt(month+1)==cur_month){
		var a = new Array("日", "一", "二", "三", "四", "五", "六");  
		var week_today = new Date().getDay();  
		var str = "  星期"+ a[week_today];
		$lis.eq(day+monthFirst).addClass('curren');
		$lis.eq(day+monthFirst).attr('today','yes').find('span').eq(0).html('今天');
		$('.calendar_notice_time').html(year+'年'+(month+1)+'月'+ (day+monthFirst) +'日'+str)
		$lis.eq(day+monthFirst-1).find('span').eq(0).html('昨天');
		$lis.eq(day+monthFirst+1).attr('today','nextday').find('span').eq(0).html('明天');
		if($lis.eq(day+monthFirst).find('span').eq(1).html()){
			$lis_index=parseInt(day+monthFirst);
			_price=$lis.eq(day+monthFirst).find('span').eq(1).html().substring(1);
			$lis_price=parseInt(_price);
			$('.ticket_total_num').html($lis_price);
			$lis_flag=true;
		}
		$calendar_index=parseInt(day+monthFirst);

	}
	$lis.click(function(){
		if($(this).find('span').hasClass('price')){
			var w;
			var h;
			var a = new Array("日", "一", "二", "三", "四", "五", "六"); 
			if($(this).attr('today')=='nextday'){
				w=new Date();
				w.setFullYear(year,parseInt(month),parseInt(day+monthFirst+1));
				h=w.getDay()
			}else if($(this).attr('today')=='yes'){
				w=new Date();
				w.setFullYear(year,parseInt(month),parseInt(day+monthFirst));
				h=w.getDay()
			}else{
			    w=new Date();
			    w.setFullYear(year,parseInt(month),parseInt($(this).find('span').eq(0).html()));
			    h=w.getDay();
			}
			var $week_str="  星期"+ a[h];
			if(parseInt(month+1)==cur_month && cur_years==years){
				var l=parseInt($(this).index()-monthFirst);
				if(day<=l){
					$(this).toggleClass('curren').siblings('li').removeClass('curren');
				}
			}else{
				$(this).toggleClass('curren').siblings('li').removeClass('curren')
			}
			if(!$(this).hasClass('next_day')){
				$ticket_num=1;
				_price=$(this).find('span').eq(1).html().substring(1);
				$lis_price=parseInt(_price);
				$('.ticket_total_num').html(parseInt($ticket_num*$lis_price));
				$('.ticket_acount_total').html($ticket_num);
			}
			if($(this).hasClass('curren')){
				if($(this).attr('today')=='yes'){
					$('.calendar_notice_time').html(year+'年'+(month+1)+'月'+ (day+monthFirst) +'日'+$week_str)
				}else if($(this).attr('today')=='nextday'){
					$('.calendar_notice_time').html(year+'年'+(month+1)+'月'+ (day+monthFirst+1) +'日'+$week_str)
				}else if(!$(this).hasClass('next_day')){
					$('.calendar_notice_time').html(year+'年'+(month+1)+'月'+ ($(this).find('span').eq(0).html()) +'日'+$week_str)
				}
			}else{
				$('.calendar_notice_time').html('');
				$(this).siblings('li').removeClass('curren');
				$('.ticket_total_num').html('0')
			}
			
		}
	})
}
var myDate=new Date();
var years=myDate.getFullYear();
var month=myDate.getMonth();
var days=myDate.getDate()-1;
var cur_month=month+1;
var cur_years=years;
//门票数量
$('.ticket_acount_add').click(function(){
	var $calendar_lis=$('.calendar').find('li');
	for(var j=0;j<$calendar_lis.length;j++){
		if($calendar_lis.eq(j).hasClass('curren')){
			_price=$calendar_lis.eq(j).find('span').eq(1).html().substring(1);
			$lis_price=parseInt(_price);
			$('.ticket_acount_total').html(++$ticket_num);
			$('.ticket_total_num').html(parseInt($ticket_num*$lis_price))
			
		}
	}
	
	
})
$('.ticket_acount_sub').click(function(){
	if($ticket_num<=1) return;
	$('.ticket_acount_total').html(--$ticket_num);
	$('.ticket_total_num').html(parseInt($ticket_num*$lis_price))
})