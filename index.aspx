<html>
 <head></head>
 <body>
<div class="exports-container">
  <div class="action-button" id="export-risks">
    <div class="button-content">
      <div>Export Risks Assesments</div>
    </div>
  </div>
  <div class="action-button" id="export-materiality">
    <div class="button-content">
      <div>Export Materiality</div>
    </div>
  </div>
  <div class="action-button" id="export-risk-factor">
    <div class="button-content">
      <div>Export Risk Factor</div>
      </div>
    </div>
  <div class="action-button" id="export-findings-summary">
    <div class="button-content">
      <div>Export Findings Summary</div>
    </div>
  </div>
  <div class="action-button" id="export-findings-analysis">
    <div class="button-content">
      <div>Export Findings Analysis</div>
    </div>
  </div>
  <div class="action-button" id="export-key-systems">
    <div class="button-content">
      <div>Export Key Systems</div>
    </div>
    </div>
</div>


<div style="display: none;">
  <div id="dialog">
    <div>Select FY: <select id="materiality-fy"></select></div>
  </div>
</div>

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"
  integrity="sha512-jGsMH83oKe9asCpkOVkBnUrDDTp8wl+adkB2D+//JtlxO4SrLoJdhbOysIFQJloQFD+C4Fl1rMsQZF76JjV0eQ=="
  crossorigin="anonymous"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.min.js"></script>


<script>
  window["SITE_LOCATION_URL"] = "https://dvagov.sharepoint.com/sites/VACOOMOBO/FROS/a123"; //https://dvagov.sharepoint.com/sites/VACOOMOBO/FROS/a123

  var scripts = [
    "/SiteAssets/app/app.js",
    "/SiteAssets/app/pdf-services/export-risks.services.js",
    "/SiteAssets/app/pdf-services/export-materiality.js",
    "/SiteAssets/app/pdf-services/export-risk-factor.js",
    "/SiteAssets/app/pdf-services/export-findings-summary.js",
    "/SiteAssets/app/pdf-services/export-findings-analysis.js",
    "/SiteAssets/app/pdf-services/export-key-systems.js",
  ];
  var styles = ["/SiteAssets/app/style.css"];

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