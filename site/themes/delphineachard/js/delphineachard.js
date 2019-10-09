var sti=false;
var illustration_originale=false;
$(document).ready(function() {
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
				console.log($(this).data('afficher_en_plein_ecran'))

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