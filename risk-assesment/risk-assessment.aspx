<html>
 <head></head>
 <body>
<div class="exports-container">
      <button type="button" id="export-risks">Export Risk Assessment</button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"
  integrity="sha512-jGsMH83oKe9asCpkOVkBnUrDDTp8wl+adkB2D+//JtlxO4SrLoJdhbOysIFQJloQFD+C4Fl1rMsQZF76JjV0eQ=="
  crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.min.js"></script>


<script>
  window["SITE_LOCATION_URL"] = "https://dvagov.sharepoint.com/sites/VACOOMOBO/FROS/a123"; //https://dvagov.sharepoint.com/sites/VACOOMOBO/FROS/a123

  var scripts = [
    "/SiteAssets/app/risk-assesment/app.js",
    "/SiteAssets/app/risk-assesment/export-risks.services.js",
  ];
  var styles = ["/SiteAssets/app/risk-assesment/style.css"];

  for (var i = 0; i < styles.length; i++) {
    document.write(
      '<link rel="stylesheet" type="text/css" href="' + window.SITE_LOCATION_URL + styles[i] +
      "?rnd=" +
      Math.random() / 3 + '">'
    );
  }

  for (var i = 0; i < scripts.length; i++) {
    document.write(
      '<script language="javascript" type="text/javascript" src="' +
      window.SITE_LOCATION_URL + scripts[i] +
      "?rnd=" +
      Math.random() / 3 +
      '"><\/script>'
    );
  }

</script>
<body>
</html>