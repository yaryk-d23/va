function generateRisksPdf(data) {
  var doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
  });
  doc.setFont("helvetica");
  doc.setFontSize(12);

  // add pdf header
  doc.setFontSize(14);
  doc.setFontStyle("bold");
  doc.text(10, 15, "Risk Assessment");
  doc.setFontSize(12);
  doc.setFontStyle("normal");
  doc.text(10, 30, "Purpose:");
  let cols = [
    {
      title: "Risk ID",
      dataKey: "Risk_x0020_ID",
    },
    {
      title: "Risk Description",
      dataKey: "Risk_Description",
    },
    {
      title: "Risk Origin",
      dataKey: "Risk_x0020_Origin",
    },
    {
      title: "Inherent Risk\nRating",
      dataKey: "Overall_Inherent_Risk",
    },
    {
      title: "Inherent\nRating\nJustification",
      dataKey: "Inherent_x0020_Rating_x0020_Just",
    },
    {
      title: "Inherent\nRisk\nResponse",
      dataKey: "Risk_Response",
    },
    {
      title: "Assertions",
      dataKey: "Risk_Assertions",
    },
    {
      title: "Financial\nStatement\nLine Item",
      dataKey: "Fin_Stat_Line_Item",
    },
    {
      title: "Business\nProcess\nArea",
      dataKey: "Business_Process_Area",
    },
    {
      title: "Related\nInternal\nControl/Gap",
      dataKey: "Related_x0020_Internal_x0020_Con",
    },
    {
      title: "Residual\nRisk\nRating",
      dataKey: "Overall_Residual_Risk",
    },
    {
      title: "Residual\nRating\nJustification",
      dataKey: "Residual_Rating_Justification",
    },
    {
      title: "Residual\nRisk\nResponse",
      dataKey: "Residual_Risk_Response",
    },
    {
      title: "Point of\nContact",
      dataKey: "Risk_Owner",
    },
    {
      title: "Risk\nApproval\nStatus",
      dataKey: "Risk_Assessment_Status",
    },
  ];
  let table = data.map(function (i) {
    let newItem = i;
    newItem.Overall_Inherent_Risk = Math.round(parseFloat(newItem.Overall_Inherent_Risk) * 100) / 100;
    newItem.Risk_Description = i.Risk_Description
      ? i.Risk_Description + "\n"
      : "";
    return newItem;
  });

  let createdCell = function (data) {
    if (data.section == "body") {
      data.cell.styles.fontSize = 8;
      data.cell.styles.lineWidth = 1;
      data.cell.styles.lineColor = [0, 0, 0];
      data.cell.styles.halign = "left";
      data.cell.styles.valign = "top";
      data.cell.styles.cellPadding = 4;
      data.cell.styles.fillColor = [255, 255, 255];
    }
  };
  let style = getRisksPdfStyles(30);
  style.didParseCell = createdCell;
  doc.autoTable(cols, table, style);
  // save file
  return doc;
  //doc.save("Risks Assesments.pdf");
}

function getRisksPdfStyles(startY) {
  return {
    startY: startY + 5,
    columnStyles: {
      col1: {
        fontSize: 12,
        cellWidth: 80,
        halign: "left",
        fontStyle: "normal",
      },
      col2: {
        fontSize: 12,
        cellWidth: 200,
        halign: "left",
        fontStyle: "normal",
      },
      col3: {
        fontSize: 12,
        cellWidth: 80,
        halign: "left",
        fontStyle: "normal",
      },
      fullHeader: {
        halign: "Left",
        fontStyle: "bold",
        fontSize: 14,
      },
    },
    margin: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
    },
    styles: {
      font: "helvetica",
      overflow: "linebreak",
      fillColor: false,
      textColor: [25, 25, 25],
      fontSize: 8,
      fontStyle: "normal",
      valign: "middle",
      halign: "center",
      cellPadding: 2,
    },
    showHead: "everyPage",
    headStyles: {
      fontSize: 9,
      fillColor: [132, 151, 176],
      textColor: [0],
      lineWidth: 1,
      lineColor: [0],
      halign: "center",
      overflow: "linebreak",
      minCellWidth: 54,
    },
    bodyStyles: {
      owerflow: "linebreak",
    },
    pageBreak: "auto",
  };
}
function getRisksListData() {
  return $.ajax({
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Accept", "application/json");
    },
    type: "GET",
    url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Risk Assessment')/items?$top=50000",
    dataType: "json",
  }).then(function (res) {
    return res.value;
  });
}
