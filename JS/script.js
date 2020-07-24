// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.

function init(){
  var meseHightlight = 1;
  var meseBase = moment("2018-"+meseHightlight+"-01", "YYYY-M-AA");
  writeMonth(meseBase);
  writeFeste(meseBase);

  $("header i.right").click(function(){

     meseHightlight +=1;
     console.log(meseHightlight);
     if (meseHightlight > 12) {
       alert("OOPS");
     } else {
       var template = $("#template").html();
       var compiled = Handlebars.compile(template);
       var target = $("#cont");

       var meseBase = moment("2018-"+meseHightlight+"-01", "YYYY-MM-AA");
       writeMonth(meseBase);
       writeFeste(meseBase);
     }
  })
  $("header i.left").click(function(){
     meseHightlight -=1;
     console.log(meseHightlight);
     if (meseHightlight <= 0) {
       alert("OOPS");
     } else {
       var meseBase = moment("2018-"+meseHightlight+"-01", "YYYY-MM-AA");
       writeMonth(meseBase);
       writeFeste(meseBase);
     }
  })

}




function writeMonth(meseBase){
  var daysInMonth = meseBase.daysInMonth();
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $("#cont");
  target.html("");

  for (var i = 1; i <= daysInMonth; i++) {
    var datacomplete = moment({year:meseBase.year(), month:meseBase.month(), day:i})
    var dayshtml = compiled({"day": i,
                  "datacomplete": datacomplete.format("YYYY-MM-DD")})
    target.append(dayshtml);
  }
}



function writeFeste(meseBase){
  var anno = meseBase.year();
  var mese = meseBase.month(); //questo restituisce il mese con base 0

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
