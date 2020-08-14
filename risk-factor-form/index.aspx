<html>
 <head></head>
 <body>
 <div id="risk-factor-form">
  <div class="form-container">
    <div class="form-header">
      <h2>Risk Factor Criteria</h2>
      <p>
        <b>Purpose:</b> To define the qualitative and quantitative risk factors
        evaluated in the assessment of risk for each significant business
        process and identify the relative weighting for each risk factor. The
        risk factor weightings were determined based on management priorities
        and the significance of the particular risk factor to the overall
        business process.
      </p>
    </div>
    <div class="form-body"></div>
    <div class="form-footer"></div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"
  integrity="sha512-jGsMH83oKe9asCpkOVkBnUrDDTp8wl+adkB2D+//JtlxO4SrLoJdhbOysIFQJloQFD+C4Fl1rMsQZF76JjV0eQ=="
  crossorigin="anonymous"></script>
<script>
  window["SITE_LOCATION_URL"] = "https://dvagov.sharepoint.com/sites/VACOOMOBO/FROS/a123"; //https://dvagov.sharepoint.com/sites/VACOOMOBO/FROS/a123

  var scripts = ["/SiteAssets/app/risk-factor-form/app.js"];
  var styles = ["/SiteAssets/app/risk-factor-form/style.css"];

  for (var i = 0; i < styles.length; i++) {
    document.write(
      '<link rel="stylesheet" type="text/css" href="' +
        window.SITE_LOCATION_URL +
        styles[i] +
        "?rnd=" +
        Math.random() / 3 +
        '">'
    );
  }

  for (var i = 0; i < scripts.length; i++) {
    document.write(
      '<script language="javascript" type="text/javascript" src="' +
        window.SITE_LOCATION_URL +
        scripts[i] +
        "?rnd=" +
        Math.random() / 3 +
        '"><\/script>'
    );
  }
</script>
<body>
</html>
