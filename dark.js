
$(function () {
  $("#hm-nav").load("header.html", function (response, status, request) {
    
    switch (page) {
      case "home":
        $(".nav-link").removeClass("active");
        $(".hm-home").addClass("active bulu");
        break;
      case "aichat":
        $(".nav-link").removeClass("active");
        $(".hm-aichat").addClass("active bulu");
        break;
        case "about":
        $(".nav-link").removeClass("active");
        $(".hm-about").addClass("active bulu");
        break;
    }
    

  });
});