// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.

function init(){
  var monthHightlight = 1;
  var monthBase = moment("2018-"+monthHightlight+"-01", "YYYY-M-AA");

  $(document).keydown(function(){
    var key = event.keyCode;
    console.log(key);
    if (key == 39 && monthHightlight <12) {
      monthHightlight += 1;
      nextMonth(monthHightlight);
    }
    else if (key == 37 && monthHightlight >1) {
      monthHightlight -= 1;
      prevMonth(monthHightlight);
    }

  })

  $("header i.left").click(function(){
     console.log(monthHightlight);
     if (monthHightlight <= 1) {
       alert("Out Of Range");
     } else {
       monthHightlight -=1;
       var monthBase = moment("2018-"+monthHightlight+"-01", "YYYY-MM-AA");
       var selectHeader = $("header h1");
       var monthInVerbose = moment(monthHightlight+"/2018", "MM/YYYY").format("MMMM");
       var test = selectHeader.text("Calendario "+monthInVerbose+" 2018 ");
       writeMonth(monthBase);
       writeFeste(monthBase);
     }
  })

  $("header i.right").click(function(){
     if (monthHightlight >= 12) {
       alert("Out Of Range");
     } else {
       monthHightlight +=1;
       var monthBase = moment("2018-"+monthHightlight+"-01", "YYYY-MM-AA");
       var selectHeader = $("header h1");
       var monthInVerbose = moment(monthHightlight+"/2018", "MM/YYYY").format("MMMM");
       var test = selectHeader.text("Calendario "+monthInVerbose+" 2018 ");
       writeMonth(monthBase);
       writeFeste(monthBase);
     }
  })


  writeMonth(monthBase);
  writeFeste(monthBase);

}

function nextMonth(monthHightlight){
     console.log(monthHightlight);
       var monthBase = moment("2018-"+monthHightlight+"-01", "YYYY-MM-AA");
       var selectHeader = $("header h1");
       var monthInVerbose = moment(monthHightlight+"/2018", "MM/YYYY").format("MMMM");
       var test = selectHeader.text("Calendario "+monthInVerbose+" 2018 ");
       console.log(test);
       writeMonth(monthBase);
       writeFeste(monthBase);

}

function prevMonth(monthHightlight){
       var monthBase = moment("2018-"+monthHightlight+"-01", "YYYY-MM-AA");
       var selectHeader = $("header h1");
       var monthInVerbose = moment(monthHightlight+"/2018", "MM/YYYY").format("MMMM");
       var test = selectHeader.text("Calendario "+monthInVerbose+" 2018 ");
       writeMonth(monthBase);
       writeFeste(monthBase);

}

function writeMonth(monthBase){
  var daysInMonth = monthBase.daysInMonth();
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $("#cont");
  target.html("");

  for (var i = 1; i <= daysInMonth; i++) {
    var datacomplete = moment({year:monthBase.year(), month:monthBase.month(), day:i})
    var dayshtml = compiled({"day": i,
                  "datacomplete": datacomplete.format("YYYY-MM-DD")})
    target.append(dayshtml);
  }
}



function writeFeste(monthBase){
  var anno = monthBase.year();
  var mese = monthBase.month(); //questo restituisce il mese con base 0

  $.ajax({
      url:'https://flynn.boolean.careers/exercises/api/holidays',
      method:'GET',
      data: {'month': mese,
            'year': anno},

      success:function(data, state) {
        var holidays = data["response"];
        for (var i = 0; i < holidays.length; i++) {
          var element = $(".calendarCell span[data-complete='"+holidays[i].date+"']");
          console.log(element);
          element.addClass("festa");
          element.siblings("p").append(holidays[i].name);
        }

      },
      error:function (error) {
        console.log('error');
      }
  })
}


$(document).ready(init);
