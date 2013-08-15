// ------ Preloader ------ //
$(window).load(function(){

	$('#loading').fadeOut(2000);

	if(!Modernizr.cssanimations) {
		$('.countdown').fadeIn(1500);
		$('#logo, #navigation').fadeIn(2000);
		$('#content').fadeIn(1000);
	}else{
		$('.countdown').addClass('slide-in-top');
		$('#logo').addClass('slide-in-bottom');
		$('#navigation').addClass('slide-in-bottom-nav');
		$('#content').addClass('slide-in-left');
	}
});


// ------ Count Down ------ //
//var liftoffTime = new Date("July 21, 2014 01:15:00"); // Add your own date and time and remove the line below.
var liftoffTime = new Date();

liftoffTime.setDate(liftoffTime.getDate() + 30);
$('#asNeeded').countdown({until: liftoffTime, format: 'yowdHMS'});


$(document).ready(function() {	

	// ------ Add Accordion ------ //
	$( "#accordion" ).accordion({ heightStyle: "content" });

	// ------ Handle Hashtag Navigation ------ //
	$(window).hashchange(function(){
		var hash = location.hash;
		$('a[href='+hash+']').trigger('click');
	});

	// ------ Main Navigation Clicks ------ //
	jQuery('.main-nav ul li a').click(function() {
		var link = jQuery(this).attr('href').substr(1);
		
		if ( !jQuery('section.content.show, section#' + link).is(':animated') ) {
			jQuery('.main-nav ul li a').removeClass('active'); //remove active

			jQuery('section.content.show').addClass('show').animate({'opacity' : 0}, {queue: false, duration: 1000,
				complete: function() {
					jQuery(this).css( "display", "none");
					jQuery('a[href="#'+link+'"]').addClass('active'); // add active
					jQuery('section#' + link).addClass('show').css( "display", "block").animate({'opacity' : 1}, {queue: false, duration: 1000});	
				}
			});
		}
	});

});


// ------ Contact Form ------ //
$(document).ready(function() {
	$('form#contact-us').submit(function() {
		$('form#contact-us .form-error').remove();
		var hasError = false;
		$('.requiredField').each(function() {
			if($.trim($(this).val()) == '') {
				var labelText = $(this).prev('label').text();
				$(this).parent().append('<span class="form-error">Your forgot to enter your '+labelText+'.</span>');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).hasClass('email')) {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var labelText = $(this).prev('label').text();
					$(this).parent().append('<span class="form-error">Sorry! You\'ve entered an invalid '+labelText+'.</span>');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		if(!hasError) {
			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('form#contact-us').slideUp("fast", function() {				   
					$(this).before('<div class="alert success"><i class="icon-ok-sign icon-large"></i> Email Sent - We will get back to you soon!</div>');
				});
			});
		}
		
		return false;	
	});
});
