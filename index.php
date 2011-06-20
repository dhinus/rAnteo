<!DOCTYPE html>
<html>
	<head>
		
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>ariAnteo: Il programma dei film all'aperto a Milano, estate 2010</title>
		
		<!-- 960.gs -->
		<link rel="stylesheet" href="reset.css" />
		<link rel="stylesheet" href="text.css" />
		<link rel="stylesheet" href="960.css" />
		
		<!-- custom css -->
		<link rel="stylesheet" href="ranteo.css" />

		<!-- web fonts -->
		<link rel="stylesheet" href="patagonia_regular/stylesheet.css" type="text/css" charset="utf-8">

		<!-- js libs -->
		<script src="prototype.s2.min.js"></script>
		
		<!-- json database -->
		<script src="conservatorio.js"></script>
		<script src="umanitaria.js"></script>
		<script src="portavenezia.js"></script>
		
		<!-- google maps -->
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

		<!-- js webapp -->
		<script src="ranteo.js"></script>
		
		<script>
			//var today = "2010-07-15T03:00:00Z";
			var today = "<?php echo date('c') ?>";
		</script>

		<!-- google analytics -->
		<script type="text/javascript">

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-342913-2']);
		  _gaq.push(['_trackPageview']);

		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();

		</script>		
		
	</head>
	<body>
	
		<div id="header" class="container_12"><div class="grid_6 push_3">

			<h4>Il programma dei film all'aperto a Milano, estate 2010</h4>
			<h1><a href="" id="clear_all">a<span class="rrred">r</span>iAnteo</a></h1>
			
			<h2>Cerca un titolo, un regista o un attore</h2>
			<form id="search_form" action="">
				<input type="text" id="search" />
				<div id="loading" style="display:none">...</div>
			</form>
			
			<h2>Oppure filtra per data</h2>
			
			<?php
			$mesi = array(7=>'luglio',8=>'agosto',9=>'settembre');
			$d = array(
					'oggi'=>time(),
					'domani'=>mktime(0,0,0,date("m"),date("d")+1,date("Y")),
					'dopodomani'=>mktime(0,0,0,date("m"),date("d")+2,date("Y"))
					);
			$oggi = date(j,$d['oggi']) . ' ' . $mesi[date(n,$d['oggi'])];
			$domani = date(j,$d['domani']) . ' ' . $mesi[date(n,$d['domani'])];
			$dopodomani = date(j,$d['dopodomani']) . ' ' . $mesi[date(n,$d['dopodomani'])];
			?>
			
			<a class="filter_by_date filter_current" id=" <?php echo $oggi ?>" href="">Oggi</a>
			<a class="filter_by_date filter_current" id=" <?php echo $domani ?>" href="">Domani</a>
			<a class="filter_by_date filter_current" id=" <?php echo $dopodomani ?>" href="">Dopodomani</a>

			<a class="filter_by_date filter_month" id="luglio" href="">Luglio </a>
			<a class="filter_by_date filter_month" id="agosto" href="">Agosto</a>
			<a class="filter_by_date filter_month" id="settembre" href="">Settembre</a>

			<a class="filter_by_date filter_day" id="lun" href="">Lunedì</a>
			<a class="filter_by_date filter_day" id="mar" href="">Martedì</a>
			<a class="filter_by_date filter_day" id="mer" href="">Mercoledì</a>
			<a class="filter_by_date filter_day" id="gio" href="">Giovedì</a>
			<a class="filter_by_date filter_day" id="ven" href="">Venerdì</a>
			<a class="filter_by_date filter_day" id="sab" href="">Sabato</a>
			<a class="filter_by_date filter_day" id="dom" href="">Domenica</a>
		
		</div></div>

		<div id="content" class="container_12">

			<div id="table_head" style="display:none">
			
				<div id="map" class="grid_12">
					<div id="map_canvas"></div>
				</div>

				<div class="grid_3 location">Data</div>
				<div class="grid_3 location">
					<div class="location_name">Conservatorio</div>
					<a title="Clicca per la mappa" target="_blank" class="plus" rel="conservatorio"
					href="http://maps.google.it/maps?q=Via+Conservatorio+12,+Milano">+</a>
				</div>
				<div class="grid_3 location">
					<div class="location_name">Porta Venezia</div>
					<a title="Clicca per la mappa" target="_blank" class="plus" rel="portavenezia"
					href="http://maps.google.it/maps?q=Bastioni+di+Porta+Venezia+3,+Milano">+</a>
				</div>
				<div class="grid_3 location">
					<div class="location_name">Umanitaria</div>
					<a title="Clicca per la mappa" target="_blank" class="plus" rel="umanitaria"
					href="http://maps.google.it/maps?q=Via+San+Barnaba+48,+Milano">+</a>
				</div>
			</div>

		</div>

		<div id="footer" class="container_12">

			<div id="copy" class="grid_4 push_3">
				&copy; 2010 <a href="http://www.passengerseat.eu">Dhinus</a>
			</div>

		</div>
		
	</body>
</html>