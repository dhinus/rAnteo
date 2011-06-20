
rAnteo = new Hash;
locs = ['conservatorio','portavenezia','umanitaria'];
var stickyBalloon = false;

/*
maps = {
	'conservatorio':'<a title="Clicca per la mappa" target="_blank" href="http://maps.google.it/maps?q=Via+Conservatorio+12,+Milano">Conservatorio</a>',
	'portavenezia':'<a title="Clicca per la mappa" target="_blank" href="http://maps.google.it/maps?q=Bastioni+di+Porta+Venezia+3,+Milano">Porta Venezia</a>',
	'umanitaria':'<a title="Clicca per la mappa" target="_blank" href="http://maps.google.it/maps?q=Via+San+Barnaba+48,+Milano">Umanitaria</a>'
	};
*/
addresses = {
	'conservatorio':'<div style="color:#333"><strong>Arianteo Conservatorio</strong><br/>Via Conservatorio 12</div>',
	'portavenezia':'<div style="color:#333"><strong>Arianteo Porta Venezia</strong><br/>Bastioni di Porta Venezia 3</div>',
	'umanitaria':'<div style="color:#333"><strong>Arianteo Umanitaria</strong><br/>Via San Barnaba 48</div>'
	};
coords = {
	'conservatorio':{'lat':'45.4645768','lng':'9.2031306'},
	'portavenezia':{'lat':'45.4744772','lng':'9.2040775'},
	'umanitaria':{'lat':'45.4600004','lng':'9.2023197'}
	};
	
function drawMap(loc) {
	var latlng = new google.maps.LatLng(coords[loc].lat, coords[loc].lng);
	var myOptions = {
	  zoom: 15,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map($('map_canvas'), myOptions);
	var marker = new google.maps.Marker({
        position: latlng, 
        map: map
    });
	var infowindow = new google.maps.InfoWindow({
		content: addresses[loc]
	});
	infowindow.open(map,marker);
}

document.observe("dom:loaded", function() {

	// IE6 upgrade warning
	//ie6warning("ie6/");

	locs.each(function(e){
		eval(e).inject(rAnteo, function(accum, value, index) {
			if (Object.isUndefined(accum.get(value.day))) accum.set(value.day, new Object);
			accum.get([value.day])[e] = value;
			return accum;
		})
	});
	
	$('clear_all').observe('click', function(event){
		event.stop();
		s.setValue('');
		clearAll();
		s.focus();
	});
	
	$('search_form').observe('submit', function(event){
		event.stop();
	});

	$$('.filter_by_date').each(function(elem){
		elem.observe('click', function(event){
			event.stop();
			clearAll();
			this.addClassName('filter_active');
			this.blur();
			filterByDate(elem.identify())
		});
	});
	
	// SMART SEARCH
	s = $('search');
	s.writeAttribute("autocomplete", "off"); 
	s.setValue('');
	s.focus();
	timeout = false;
	lastValue = '';
	s.observe('keyup', liveSearch)
	
	// MAPS OVERLAYS
	$$('.plus').each(function(e){
		e.observe('click', function(event){
			event.stop();
			if (e.hasClassName('current')) {
				e.removeClassName('current');
				$('map').scrollTo();
				$('map').morph('height:0', 1);
			} else {
				$$('.plus').each(function(ee){ee.removeClassName('current')});
				e.addClassName('current');
				drawMap(e.rel);
				$('map').morph('height:300px', 2);
			}
		});
	});

});

function clearAll() {
	stickyBalloon = false;
	$$('.generated_line').each(function(elem){elem.remove();});
	$('table_head').hide();
	$$('.filter_by_date').each(function(e){e.removeClassName('filter_active')});
}

function filterByDate(month) {
	s.setValue('');
	m = rAnteo.findAll(function(e){
		return (e[0].toLowerCase().include(month));
	});
	m.each(function(e){
		appendLine(e[0], e[1]);
	})
}

function liveSearch() {
	//alert(s.getValue());
	if (s.getValue() == lastValue) {
		return //the pressed key did not change the input value
	}
	lastValue = s.getValue();
	clearTimeout(timeout);
	$('loading').hide();
	if (s.getValue() == '') {
		clearAll();
	} else {
		$('loading').show();
		timeout = setTimeout(function(){
			clearAll();
			$('loading').hide();
			rAnteo.each(function(e){
				appendLine(e[0], e[1], s.getValue());
			});
		}, 200);
	}
}

function allDates(filmTitle) {
	clearAll();
	if (filmTitle!='') {
		rAnteo.each(function(e){
			appendLine(e[0], e[1], filmTitle);
		})
	}	
}

function appendLine(day, dayLine, search) {
	if (search) search = search.toLowerCase();
	found = new Object;
	draw = false;
	
	locs.each(function(elem){
		found[elem] = 0;
		if (Object.isUndefined(dayLine[elem]) || !dayLine[elem].title) {
			found[elem] = 0;
		} else if (Object.isUndefined(search)) {
			draw = true;
			found[elem] = 1;
		} else if (search) {
			primarySearch = dayLine[elem].title.toLowerCase();
			secondarySearch = [dayLine[elem].director.toLowerCase(), dayLine[elem].actors.toLowerCase()];
			if (primarySearch.include(search)) {
				draw = true;
				found[elem] = 1;
			} else {
				secondarySearch.each(function(e){
					if (e.include(search)) {
						draw = true;
						found[elem] = 2;
					}
				})
			}
		}
	});

	var line = new Element('div', {'class':'generated_line'});
	
	var d = new Element('div', {'class':'grid_3 box'}).update(day);
	line.appendChild(d);
	
	locs.each(function(elem){
		var box = new Element('div', {'class':'grid_3 box'});
		if (found[elem] == 1) box.update('<a class="title strong">'+dayLine[elem].title.truncate(27)+'</a>')
		else if (found[elem] == 2) box.update('<a class="title">'+dayLine[elem].title.truncate(27)+'</a>');
		else box.update('&nbsp;');
		
		if (found[elem] == 1 || found[elem] == 2) {
			box.observe('mouseleave', function(){
				if (!stickyBalloon) {
					closeBalloon(this);
				}
			});
			box.select('a.title').each(function(tit){
				tit.observe('mouseenter', function(){
					if (!stickyBalloon) {
						openBalloon(tit.up(), dayLine[elem]);
					}
				});
				tit.observe('click', function(event){
					event.stop();
					var closeSelf = false;
					tit.up().select('.balloon.stick').each(function(){
						closeSelf = true;
					});
					if (closeSelf) {
						closeBalloon(tit.up());
						stickyBalloon = false;
					} else {
						closeAllBalloons();
						openBalloon(tit.up(), dayLine[elem], true);
						stickyBalloon = true;
					}
				});
			});
		}
		
		line.appendChild(box);
	});
	
	
	if (dayLine['umanitaria'] && dayLine['umanitaria'].jsDate < today) {
		line.addClassName('past');
	};
	
	if (draw) {
		$('table_head').show();
		$('content').appendChild(line);
	}
}

// DETAILS BALLOON
function openBalloon(box, film, stick) {
	/*var pos = Element.positionedOffset(box);
	var x = pos.left;
	var y = pos.top;
	var left = pos.left - 150;
	var bottom = pos.top - 40;*/
	var search = '"'+film.title.gsub("'","&quot;")+'"';
	
	var balloon = new Element('div', {'class':'balloon'});
	balloon.setStyle({'display':'none'});
	if (stick) balloon.addClassName('stick');
	var content = '<p class="title">'+film.title+'</p>';
	content += '<p class="director">di '+film.director+'</p>';
	content += '<p class="actors">con '+film.actors+'</p>';
	content += '<p class="country">('+film.country+')</p>';
	content += '<p class="length">Durata: '+film.length+' min.</p>';
	content += '<p class="orario">Inizio film ore '+film.timeFilm+'</p>';
	content += '<a class="search1" href="" title="Tutte le date per questo film"'
		+'>Altre date</a>';	
	content += "<a class='search2' target='_blank' href='http://www.google.com/search?q="+search
		+"' title='Cerca su Google'>Google</a>";
	content += "<a class='search3' target='_blank' href='http://www.google.com/search?q="+search
		+" site:giovanecinefilo.splinder.com&btnI=1&sourceid=navclient' title='Cerca su Giovane cinefilo'>Kekkoz</a>";
	balloon.update(content);
	
	balloon.select('.search1').each(function(search1){
		search1.observe('click', function(event){
			event.stop();
			allDates(film.title)
		});
	});		
		
	box.appendChild(balloon);
	//balloon.appear({'duration':0.2});
	balloon.appear();
}
function closeBalloon(box) {
	box.select('.balloon').each(function(b){
		//b.remove();
		b.fade('slow').remove();
	});
}
function closeAllBalloons() {
	$$('.balloon').each(function(b){
		b.remove();
	});
}
