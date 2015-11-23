window.onload = function(){
  minicalendar.onmousedown = function(e){e.preventDefault();};
  var $ = function(id){
    return document.getElementById(id);
  };
  var cells = document.getElementsByClassName('cell');
  var date = new Date();

  var ondatechange = (function(){
    var currentcell;
    var dict = {1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',0:'日'};
    var formate = function(){
      return date.getFullYear() + ' 年 ' + (date.getMonth() + 1) +
        '月 ' + date.getDate() + '日' +'星期' + dict[date.getDay()] ;
    };
    return function(){
      var d = date.getDate();
      if(currentcell){currentcell.className = 'cell';}
      $('day_'+d).className = 'cell cell-hover';
      currentcell = $('day_'+d);
      daydate.innerHTML   = d;
      titledate.innerHTML = formate().slice(0,-3);
      fulldate.innerHTML  = formate();
    };
  })();


  for ( var i = 0;  i < cells.length;  i++){
    cells[i].id = 'day_' + cells[i].innerHTML;
    cells[i].onclick = function(){
      if(this.parentElement.className.indexOf('off-month') != -1){
        console.log(1);
        date.setMonth(9);
      }else{
        date.setDate(this.innerHTML);
      }
      // ondatechange();
      drawcalender();
    };
  }

  var isLeapYear = function(Year) {
    if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
      return (true);
    } else { return (false); }
  };

  var drawcalender = function(){
    var meiyuetianshu;
    if( isLeapYear( date.getFullYear() ) ){
      console.log(1);
      meiyuetianshu = [31,28,31,30,31,30,31,31,30,31,30,31];
    }else{
      meiyuetianshu = [31,29,31,30,31,30,31,31,30,31,30,31];
    }
    var d = date.getDate();
    var month  = date.getMonth();

    date.setDate(1);
    var xingqi = date.getDay();
    date.setDate(d);

    var L =  ( xingqi - 1 ) == -1 ? 6 : ( xingqi - 1 ); var i;
    //画前一个月的天
    for (  i = 0;  i < L;  i++){
      cells[i].innerHTML = meiyuetianshu[month-1] - (L-i-1);
      cells[i].parentElement.className += ' off-month';
    }
    //画本月的天;
    for (  ; i < meiyuetianshu[month] + L;  i++){
      cells[i].innerHTML = i-L+1;
    }
    //画下月的天
    var left = 42 - i;
    for ( ;  i < 42;  i++){
      cells[i].innerHTML = left- (42-i-1);
      cells[i].parentElement.className += ' off-month';
    }
  };
  drawcalender();

};
