if ($.cookie("theme_csspath")) {
  $("link#theme-stylesheet").attr("href", $.cookie("theme_csspath"));
}

$(function() {
  sticky();
  utils();
  demo();
});

/* for demo purpose only - can be deleted */

function demo() {
  if ($.cookie("theme_csspath")) {
    $("link#theme-stylesheet").attr("href", $.cookie("theme_csspath"));
  }

  $("#colour").change(function() {
    if ($(this).val !== "") {
      var colour = $(this).val();

      var theme_csspath = "css/style." + $(this).val() + ".css";
      $("link#theme-stylesheet").attr("href", theme_csspath);
      $.cookie("theme_csspath", theme_csspath, { expires: 365, path: "/" });
    }

    return false;
  });
}

function sticky() {
  $(".header").sticky();
}

/* =========================================
 *  Font Effect
 *  =======================================*/

$(document).ready(function() {
  $(".typy").typed({
    strings: ["interface", "instruction", "experience"],
    typeSpeed: 45,
    backSpeed: 35,
    showCursor: false,
    loop: true,
    loopCount: false,
    backDelay: 2000
  });
});

/* =========================================
 *  UTILS
 *  =======================================*/

function utils() {
  /* tooltips */

  $('[data-toggle="tooltip"]').tooltip();

  /* click on the box activates the radio */

  $("#checkout").on(
    "click",
    ".box.shipping-method, .box.payment-method",
    function(e) {
      var radio = $(this).find(":radio");
      radio.prop("checked", true);
    }
  );
  /* click on the box activates the link in it */

  $(".box.clickable").on("click", function(e) {
    window.location = $(this)
      .find("a")
      .attr("href");
  });
  /* external links in new window*/

  $(".external").on("click", function(e) {
    e.preventDefault();
    window.open($(this).attr("href"));
  });
  /* animated scrolling */

  $(".scroll-to, #navigation a").click(function(event) {
    event.preventDefault();
    var full_url = this.href;
    var parts = full_url.split("#");
    var trgt = parts[1];

    $("body").scrollTo($("#" + trgt), 800, { offset: -50 });
  });
}

$.fn.alignElementsSameHeight = function() {
  $(".same-height-row").each(function() {
    var maxHeight = 0;
    var children = $(this).find(".same-height");
    children.height("auto");
    if ($(window).width() > 768) {
      children.each(function() {
        if ($(this).innerHeight() > maxHeight) {
          maxHeight = $(this).innerHeight();
        }
      });
      children.innerHeight(maxHeight);
    }

    maxHeight = 0;
    children = $(this).find(".same-height-always");
    children.height("auto");
    children.each(function() {
      if ($(this).innerHeight() > maxHeight) {
        maxHeight = $(this).innerHeight();
      }
    });
    children.innerHeight(maxHeight);
  });
};

$(window).load(function() {
  windowWidth = $(window).width();

  $(this).alignElementsSameHeight();
});
$(window).resize(function() {
  newWindowWidth = $(window).width();

  if (windowWidth !== newWindowWidth) {
    setTimeout(function() {
      $(this).alignElementsSameHeight();
    }, 100);
    windowWidth = newWindowWidth;
  }
});

$(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    // $('#contact-form').validator();


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});
