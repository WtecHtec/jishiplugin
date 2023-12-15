const TEMP = `<!doctype html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<title>###TITLE###</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/css/reveal.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/css/theme/league.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/zenburn.min.css">
</head>

<body>
  <div class="reveal">
    <div class="slides">
    ###CONTENT###
    </div>
  </div>

	<script src="https://cdn.jsdelivr.net/npm/headjs@1.0.3/dist/1.0.0/head.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/js/reveal.min.js"></script>

	<script>

		Reveal.initialize({
			// Display controls in the bottom right corner
			controls: true,

			width: '100%',
			height: '100%',
		});
	</script>
</body>

</html>`

module.exports = TEMP
