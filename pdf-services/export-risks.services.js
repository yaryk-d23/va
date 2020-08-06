function generateRisksPdf(data) {
  var doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    lineHeight: 1.3,
  });
  doc.setFont("helvetica");
  doc.setFontSize(12);

  // add pdf header
  let cols = [
    {
      title: "",
      dataKey: "fullHeader",
    },
  ];
  let table = [
    {
      fullHeader: "Risk Assessment",
    },
    {
      fullHeader: `Purpose:`,
    },
  ];
  var createdCell = (data) => {
    if (data.row.index == 1 && data.column.dataKey === "fullHeader") {
      data.cell.styles.fontStyle = "normal";
      data.cell.styles.fontSize = 12;
    }
  };
  var style = {
    ...getRisksPdfStyles(0),
    didParseCell: createdCell,
  };
  doc.autoTable(cols, table, style);

  // add content
  cols = [
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
  table = data;
  createdCell = (data) => {
    data.cell.styles.fontSize = 10;
    data.cell.styles.lineWidth = 1;
    data.cell.styles.lineColor = [0, 0, 0];
  };
  var style = {
    ...getRisksPdfStyles(doc.previousAutoTable.finalY),
    didParseCell: createdCell,
  };
  doc.autoTable(cols, table, style);
  // save file
  doc.save(`Risks Assesments`);
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
      left: 5,
      right: 5,
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
    showHeader: "everyPage",
    headerStyles: {
      fontSize: 10,
      fillColor: [132, 151, 176],
      textColor: [0],
      lineWidth: 1,
      lineColor: [0],
      halign: "center",
      overflow: "linebreak",
      minCellWidth: 54,
    },
    alternateRowStyles: {
      fillColor: false,
      lineWidth: 0,
      lineColor: [255, 255, 255],
    },
    pageBreak: "auto",
  };
}
function getRisksListData() {
  var siteUrl = _spPageContextInfo
    ? _spPageContextInfo.webAbsoluteUrl
    : "https://dvagov.sharepoint.com/sites/VACOOMOBO/FROS/a123"
  return $.ajax({
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Accept", "application/json");
    },
    type: "GET",
    url: siteUrl + "/_api/web/lists/getbytitle('Risk Assessment')/items",
    dataType: "json",
  }).then(function (res) {
    return res.value;
  });
}
