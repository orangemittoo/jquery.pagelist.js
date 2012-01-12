/* Author:
 * jquery.pagelist.js
 * Copyright (c) 2012 orangemittoo
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
*/
(function($){
	$.fn.pagelist = function(elm,obj){
		var settings = $.extend({
			style : 'square', //or plane
			naviId : '',
			prevText : '<',
			nextText : '>',
			pagePrefix : '',
			classPrefix : '',
			position : 'bottom',
			scroll : {isExecution:false,id:''}, 
			isNavigation : true
		},obj),
		displayNum = 1,
		pages = $(this).find('>'+elm),
		pageLen = pages.length,
		cn;
		
		switch(settings.style){
			case 'square':
				cn = settings.classPrefix+'pageList_square_style';
				break;
			case 'plane':
				cn = settings.classPrefix+'pageList_plane_style';
				break;
			default:
				cn = settings.classPrefix+'pageList_square_style';
				break;
		}
		
		for(var i=0;i<pageLen;i++){
			if(i!=0) $(pages[i]).hide();
		}
		
		var src = '';
		src+='<div id="'+settings.naviId+'" class="pageList_default_style '+cn+'">';
		src+='<ul>';
		if(settings.isNavigation) src+='<li class="'+settings.classPrefix+'prev '+settings.classPrefix+'none"><a href="#prev">'+settings.prevText+'</a></li>';
		for(var i=1;i<=pageLen;i++){
			src+='<li '+(i==1?'class="'+settings.classPrefix+'current"':'""')+'><a href="#'+settings.pagePrefix+i+'">'+settings.pagePrefix+i+'</a></li>';
		}
		if(settings.isNavigation) src+='<li class="'+settings.classPrefix+'next"><a href="#next">'+settings.nextText+'</a></li>';
		src+='</ul>';
		src+='</div>';
		
		if(settings.position == "bottom"){
			$(this).append(src);
		}else{
			$(this).prepend(src);
		}
		
		if(settings.scroll.isExecution){
			try{
				var scrollPosY = settings.scroll.id=='' ? $(this).get(0).offsetTop : $(settings.scroll.id).get(0).offsetTop;
			}catch(e){
				alert('settings.scroll.id is inaccurate');
			}
			
		}
		var thumbs = $(".pageList_default_style li").bind('click',function(e){
			e.preventDefault();
			if(settings.scroll.isExecution) window.scroll( 0, scrollPosY );
			var targetText = $(e.target).text();
			var c = !!settings.pagePrefix ? targetText.split(settings.pagePrefix)[1] : targetText;
			
			if(isNaN(c)){
				c = targetText.split(settings.pagePrefix)[0];
				var id;
				if(c == settings.prevText){
					if(displayNum == 1) return;
					id = Number(displayNum) -1;
				}else if(c ==  settings.nextText){
					if(displayNum == pageLen) return;
					id = Number(displayNum) +1;
				}
				change(id);
			}else{
				if(c == displayNum){
					
				}else{
					change(c);
				}
				
			}
		}).get();
		
		if(settings.isNavigation){
			var leftNavi = thumbs.splice(0,1);
			var rightNavi = thumbs.splice(thumbs.length-1,1);
		}
	
		
		function change(pageNum){
			var id = pageNum-1;
			
			var tc,tt;
			for(var i=0;i<pageLen;i++){
				tc = $(pages[i]);
				tt = $(thumbs[i]);

				if(i == id){
					tc.show();
					tt.addClass(settings.classPrefix+'current')
				}else{
					tc.hide();
					tt.removeClass(settings.classPrefix+'current')
				}
			}
			if(settings.isNavigation){
				if(pageNum == 1){
					$(leftNavi).addClass(settings.classPrefix+'none');
					$(rightNavi).removeClass(settings.classPrefix+'none');
				}else if(pageNum == pageLen){
					$(rightNavi).addClass(settings.classPrefix+'none');
					$(leftNavi).removeClass(settings.classPrefix+'none');
				}else{
					$(rightNavi).removeClass(settings.classPrefix+'none')
					$(leftNavi).removeClass(settings.classPrefix+'none')
				}
			}
			
			displayNum = pageNum;
		}
		
		return this;
	}
}(jQuery));