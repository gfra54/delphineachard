var sti=false;
var illustration_originale=false;
$(document).ready(function() {
	$(window).scroll(function() {
		if($(window).scrollTop() > ($(window).height()/2)) {
			$('footer').addClass('visible');
		} else {
			$('footer').removeClass('visible');
		}
	});
	$('.albums a').each(function() {
		if($(this).data('illustration')) {
			if(!$(this).data('illustration').includes('mp4')) {
				$('<img src="'+$(this).data('illustration')+'" class="dummy">').appendTo('body');
			}
		}
	})
	if($('.albums').length) {
		illustration_originale = document.querySelector('.illustration').outerHTML;
		$('.illustration').addClass('visible');

	}


	$('.albums a').on('mouseover',function() {
		if($(this).data('illustration')) {
			reset_illustration();
			console.log($(this).data('afficher_en_plein_ecran'))


			sti = setTimeout(() => {
				let illustration = $(this).data('illustration');

				let classes = 'visible';
				console.log(illustration,$(this).data('afficher_en_plein_ecran'))

				if($(this).data('afficher_en_plein_ecran')) {
					classes+=' illustration-fullscreen';
				}
				if($(this).data('couleur_de_fond') == 'white') {
					classes+=' has-background-white';
				} else {
					classes+=' has-background-black';
				}

				if(illustration.includes('mp4')) {
					$('.illustration').html(video_code(illustration));
				} else {
					$('.illustration').css('background-image','url('+illustration+')');
				}
				$('.illustration').addClass(classes);
			}, 300);
		}
	}).on('mouseout', () => {
		reset_illustration()
		sti = setTimeout(() => {
			$('.illustration').replaceWith(illustration_originale);
//			$('.illustration').css('background-image',$('.illustration').data('background-image'))
			$('.illustration').addClass('visible');
		}, 300);
	})


})
$(window).load(function () {
	document.querySelectorAll('video').forEach(function(video) {
		video.muted = "muted";
	});
});


function reset_illustration() {
	if(sti) {
		clearTimeout(sti);
	}
	$('.illustration').css('background-image','')
	$('.illustration').html('');
	$('.illustration').removeClass('visible illustration-fullscreen has-background-black has-background-white');
}


function video_code(url) {
	return `
	<video width="400" height="300" preload="true" autoplay loop>
	<source src="${url}" type="video/mp4" />
	</video>
	`	
}


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });