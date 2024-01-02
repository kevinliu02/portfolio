(function($) {

	"use strict";
	
	  // Cache selectors
    var lastId,
    topMenu = $(".menu-holder"),
    topMenuHeight = 55,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      
      if (item.length) { 
         return item; 
      }
    });

    if($(window).width()<=767){
      topMenuHeight = 0;
    }

    // Bind click handler to menu items
	  // so we can get a fancy scroll animation
    menuItems.click(function(e){
      var href = $(this).attr("href");
      var offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
      
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      
      e.preventDefault();
    });
	  
    // Bind to scroll
    $(window).scroll(function(){
      // Get container scroll position
      var fromTop = $(this).scrollTop()+topMenuHeight;
       
      // Get id of current scroll item
      var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
          return this;
      });
      
      // Get the id of the current element
      cur = cur[cur.length-1];
      var id = cur && cur.length ? cur[0].id : "";
       
      if (lastId !== id && id != "") {
        lastId = id;
        // Set/remove active class
        menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
      }

      changeNavMenu();
    });

    //mobile menu and desktop menu
    $("#responsive-menu").css({"right":-1500});
    $("#mobile_menu").click(function(){
        $("#responsive-menu").show();
        
        if($("#responsive-menu").css("right") == "-1500px") 
        {
          $("#responsive-menu").animate({ "right":0 }, 400);
        }
        else
        {
          $("#responsive-menu").animate({ "right":-1500 }, 400);
        }
        
        return false;
    });
    $(window).on("load resize", function(){
        changeNavMenu();
    });

    $("#responsive-menu a").click(function(){
      $("#responsive-menu").animate({ "right":-1500 }, 400);
    });

})(jQuery);



// Initialize a variable outside the function to keep track of clicks
var clickCount = 1;
var oldClickCount = clickCount;

function changeBackground() {
  // Increment the click count
  clickCount++;

  if (clickCount > 3) {
    clickCount = 1;
  }
  // Select the header element by class
  var header = document.querySelector('.templatemo-site-header');

  // Check if clickCount is even
  if (clickCount === 1) {
    // Set body background to body-bg3.jpg if clickCount is even
    document.body.style.backgroundImage = "url('../images/body-bg3.jpg')";
    // Set header background to header-bg3.jpg if clickCount is even
    header.style.background = "url('../images/header-bg3.jpg') repeat-x";
    
  } 
  if (clickCount === 2) {
    // Set body background to body-bg6.png if clickCount is odd
    document.body.style.backgroundImage = "url('../images/body-bg6.jpg')";
    // Set header background to header-bg.jpg if clickCount is odd
    header.style.background = "url('../images/header-bg.jpg') repeat-x";
  }

  if (clickCount === 3) {
    // Set body background to body-bg6.png if clickCount is odd
    document.body.style.backgroundImage = "url('../images/body-bg2.png')";
    // Set header background to header-bg.jpg if clickCount is odd
    header.style.background = "url('../images/header-bg2.png') repeat-x";
  }
}


// if (oldClickCount != clickCount)
// {
//   oldClickCount = clickCount;
//   if (clickCount % 2 === 0) {
//     $('body').css('background-position', 'calc(50% + 30px) ' + -(scrolled * 0.5) + 'px');
//       } else {$('body').css('background-position', 'calc(50% + 90px) ' + -(scrolled * 0.5) + 'px');}
// }



$(window).on('scroll', function() {
  var scrolled = $(this).scrollTop();

  // Apply the effect to the body background with a horizontal shift of 10 pixels to the right

  $('body').css('background-position', 'center ' + -(scrolled * 0.5) + 'px');
});




function changeNavMenu(){
  if($(window).width()>767)
  {
    $("#responsive-menu").css({"right":-1500});

    if ($(window).scrollTop() > 1)
    {
      $('.templatemo-site-header').addClass("sticky");        
    }
    else 
    {
      $('.templatemo-site-header').removeClass("sticky");
    } 
  }
  else {
    $('.templatemo-site-header').removeClass("sticky");
  }
}


/* http://marxo.me/target-ie-in-css/
-----------------------------------------*/
function detectIE(){
  // Detect IE and append class to <html> element
  var UA = navigator.userAgent;
  var html = document.documentElement;
  if (UA.indexOf("IEMobile") === -1) {
      if ((UA.indexOf("rv:11.") !== -1) && (!html.classList.contains('ie11')) && window.navigator.msPointerEnabled) {
          html.classList.add("ie11");
      } else if ((UA.indexOf("MSIE 10.") !== -1) && (!html.classList.contains('ie10')) && window.navigator.msPointerEnabled) {
          html.classList.add("ie10");
      }
  }
}

/* HTML document is loaded. DOM is ready. 
-----------------------------------------*/
$(document).ready(function()
{
  /* jCarousel http://sorgalla.com/jcarousel/ */
  $('.jcarousel').jcarousel();
  $('.jcarousel-control-prev')
      .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
      })
      .jcarouselControl({
          target: '-=1'
      });

  $('.jcarousel-control-next')
      .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
      })
      .jcarouselControl({
          target: '+=1'
      });

    detectIE();
});