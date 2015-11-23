window.onload = function(){
  //----------------------------------------------------
  var meiyuetianshu = [31,28,31,30,31,30,31,31,30,31,30,31];
  var date = new Date();
  var cells = document.getElementsByClassName('cell');

  var $ = function(id){
    return document.getElementById(id);
  };
  var isToday = function(){
    var d  = new Date();
    if(d.getFullYear() == date.getFullYear() &&
       d.getMonth() == date.getMonth()&&
       d.getDate() == date.getDate()){
      return true;
    }
    return false;
  };
  var addClass = function(el,c){
    var t = el.className.split(' ');
    var dict = {};
    for(var i = 0; i<t.length; i++){
      dict[t[i]] = true;
    }
    if( !dict[c] ){
      el.className += ' ' + c;
    }
  };
  var removeClass = function(el,c){
    var t = el.className.split(' ');
    var dict = {};
    for(var i = 0; i<t.length; i++){
      dict[t[i]] = true;
    }
    delete dict[c];
    var n = '';
    for (var name in dict){
      n += name + ' ';
    }
    el.className = n;
  };
  var isLeapYear = function(Year) {
    if (  Year % 4 == 0 && Year % 100 != 0 || Year % 400==0 ){
      return true;
    } else { return false; }
  };
  var setmeiyuetianshu = function(year){
    if( isLeapYear(year) ){
      meiyuetianshu[1] = 29;
    }
  };
  var previousDay = function(){
    var currentYear =  date.getFullYear(),
        currentMonth = date.getMonth(),
        currentDate  = date.getDate(),
        targetMonth,targetYear, targetDate = currentDate - 1;
    setmeiyuetianshu(currentYear);
    if( targetDate == 0 ){
      targetMonth = currentMonth - 1; targetYear = currentYear;
      if(targetMonth == -1){
        targetYear = currentYear - 1; targetMonth = 11;
        setmeiyuetianshu(targetYear);
      }
      targetDate  = meiyuetianshu[targetMonth];
    }else{
      targetMonth =  currentMonth; targetYear  =  currentYear;
    }
    date = new Date(targetYear,targetMonth,targetDate);
  };
  var nextDay = function(){
    var currentYear =  date.getFullYear(),
        currentMonth = date.getMonth(),
        currentDate  = date.getDate(),
        targetMonth,targetYear, targetDate = currentDate + 1;
    setmeiyuetianshu(currentYear);
    if( targetDate > meiyuetianshu[currentMonth] ){
      targetMonth = currentMonth + 1; targetYear  = currentYear;
      if(targetMonth == 12 ){
        targetYear = currentYear + 1; targetMonth = 0;
        setmeiyuetianshu(targetYear);
      }
      targetDate  = 1;
    }else{
      targetMonth =  currentMonth; targetYear  =  currentYear;
    }
    date = new Date(targetYear,targetMonth,targetDate);
  };
  var ondatechange = (function(){
    var currentcell;
    var dict = {1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',0:'日'};
    var formate = function(){
      return date.getFullYear() + ' 年 ' + (date.getMonth() + 1) +
        '月 ' + date.getDate() + '日' +'星期' + dict[date.getDay()] ;
    };
    return function(){
      if( currentcell ){
        removeClass( currentcell,'cell-hover' );
        removeClass( currentcell,'today' );
      }
      // if(isToday()){
      //   addClass( $('day_'+date.getDate()),'today');
      // }else{
      addClass( $('day_' + date.getDate() ) ,'cell-hover');
      // }
      currentcell = $('day_'+date.getDate());

      daydate.innerHTML   = date.getDate();
      titledate.innerHTML = formate().slice(0,-3);
      fulldate.innerHTML  = formate();
    };
  })();
  var drawcalender = function(){
    setmeiyuetianshu();
    var d = date.getDate();
    var month  = date.getMonth(); date.setDate(1);
    var xingqi = date.getDay();   date.setDate(d);

    var L =  ( xingqi - 1 ) == -1 ? 6 : ( xingqi - 1 ); var i;
    //画前一个月的天
    for (  i = 0;  i < L;  i++){
      cells[i].removeAttribute('prev'); cells[i].removeAttribute('next');
      cells[i].setAttribute('prev',true);
      if( month - 1 == -1){
        cells[i].innerHTML = 31 - (L-i-1);
      }else{
        cells[i].innerHTML = meiyuetianshu[month-1] - (L-i-1);
      }
      addClass(cells[i].parentElement,'off-month');
      cells[i].id = '';
    }
    //画本月的天;
    var tmp = new Date();
    for (  ; i < meiyuetianshu[month] + L;  i++){
      cells[i].removeAttribute('prev'); cells[i].removeAttribute('next');
      cells[i].innerHTML = i-L+1;
      cells[i].id = 'day_'+ (i-L+1);
      removeClass(cells[i].parentElement,'off-month');
    }
    //画下月的天
    var left = 42 - i;
    for ( ;  i < 42;  i++){
      cells[i].removeAttribute('prev'); cells[i].removeAttribute('next');
      cells[i].id = ''; cells[i].innerHTML = left- (42-i-1);
      cells[i].setAttribute('next');
      addClass(cells[i].parentElement,'off-month');
    }
  };
  drawcalender();
  next.onclick = function(){
    nextDay();drawcalender(); ondatechange();
  };
  prev.onclick = function(){
    previousDay();drawcalender(); ondatechange();
  };
  minicalendar.onmousedown = function(e){e.preventDefault();};
  for ( var i = 0;  i < cells.length;  i++){
    cells[i].onclick = function(){
      var currentYear = date.getFullYear();
      var currentMonth = date.getMonth();
      var currentDate = date.getDate();
      var targetYear,targetMonth,targetDate;
      targetDate = Number(this.innerHTML);
      if(this.hasAttribute('prev')){
        targetMonth = currentMonth - 1;
        if(targetMonth == -1){
          targetYear = currentYear - 1;
          setmeiyuetianshu(targetYear);
        }
        targetYear = currentYear;
      }else if( this.hasAttribute('next') ){
        targetMonth = currentMonth + 1;
        if(targetMonth == 12){
          targetYear = currentYear + 1;
          setmeiyuetianshu(targetYear);
        }
        targetYear = currentYear;
      }else{
        targetYear = currentYear;
        targetMonth = currentMonth;
      }
      date = new Date(targetYear,targetMonth,targetDate);
      drawcalender();
      ondatechange();
    };
  }
};
