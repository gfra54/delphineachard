var sti=false;
$(document).ready(function() {
	$('.albums a').each(function() {
		if($(this).data('illustration')) {
			if(!$(this).data('illustration').includes('mp4')) {
				$('<img src="'+$(this).data('illustration')+'" class="dummy">').appendTo('body');
			}
		}
	})
	if($('.albums').length) {
		$('.illustration').data('background-image',$('.illustration').css('background-image'));
		$('.illustration').addClass('visible');

	}



	$('.albums a').on('mouseover',function() {
		if($(this).data('illustration')) {
			reset_illustration();
			sti = setTimeout(() => {
				let illustration = $(this).data('illustration');
				if(illustration.includes('mp4')) {
					$('.illustration').html(video_code(illustration));
				} else {
					$('.illustration').css('background-image','url('+illustration+')');
				}
				$('.illustration').addClass('visible');
			}, 300);
		}
	}).on('mouseout', () => {
		reset_illustration()
		sti = setTimeout(() => {
			$('.illustration').css('background-image',$('.illustration').data('background-image'))
			$('.illustration').addClass('visible');
		}, 300);
	})


})

function reset_illustration() {
	if(sti) {
		clearTimeout(sti);
	}
	$('.illustration').css('background-image','')
	$('.illustration').html('');
	$('.illustration').removeClass('visible');
}


function video_code(url) {
	return `
	<video width="400" height="300" preload="true" autoplay loop>
	<source src="${url}" type="video/mp4" />
	</video>
	`	
}