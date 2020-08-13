<div>
  <div class="action-button" id="export-risks">
    <div>Export to PDF</div>
  </div>
  <div class="action-button" id="export-materiality">
    <div>Export Materiality</div>
  </div>
  <div class="action-button" id="export-risk-factor">
    <div>Export Risk Factor</div>
  </div>
  <div class="action-button" id="export-findings-summary">
    <div>Export Findings Summary</div>
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
  var siteUrl ="https://dvagov.sharepoint.com/sites/VACOOMOBO/FROS/a123/SiteAssets/app";

  var scripts = [
    "/app.js",
    "/pdf-services/export-risks.services.js",
    "/pdf-services/export-materiality.js",
    "/pdf-services/export-risk-factor.js",
    "/pdf-services/export-findings-summary.js"
  ];
  var styles = ["/style.css"];

  for (var i = 0; i < styles.length; i++) {
    document.write(
      '<link rel="stylesheet" type="text/css" href="' + siteUrl + styles[i] +
      "?rnd=" +
      Math.random() / 3 + '">'
    );
  }

  for (var i = 0; i < scripts.length; i++) {
    document.write(
      '<script language="javascript" type="text/javascript" src="' +
      siteUrl + scripts[i] +
      "?rnd=" +
      Math.random() / 3 +
      '"><\/script>'
    );
  }

</script><html><head><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8"><meta name="Robots" content="NOINDEX " /></head><body></body>
                <script type="text/javascript">
                 var gearPage = document.getElementById('GearPage');
                 if(null != gearPage)
                 {
                     gearPage.parentNode.removeChild(gearPage);
                     document.title = "Error";
                 }
                 </script>
                 </html>