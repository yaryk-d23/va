function generateFindingsSummaryPdf(data) {
  var doc = new jsPDF({
    orientation: "p",
    unit: "pt",
  });
  doc.setFont("helvetica");
  doc.setFontSize(12);

  // add pdf header
  doc.setFontSize(16);
  doc.setFontStyle("bold");
  doc.text(135, 45, "Business Process Area Findings Summary");
  doc.setFontSize(10);
  doc.text(40, 65, "Purpose:");
  doc.setFontStyle("normal");
  let text = doc.text(
    40,
    65,
    "                 To review the findings and recommendations from sources including but not limited to the FY 2019 financial statement audits, OIG reports, GAO reports, Service Organization reports, and/or Internal Controls assessments; assess which business processes are impacted by the findings; and assess the effects of these findings on the business.",
    {
      maxWidth: 530,
    }
  );

  // add content
  let cols = [
    {
      title: "Business Process Area",
      dataKey: "col1",
    },
    {
      title: "Findings",
      dataKey: "col2",
    },
    {
      title: "Business Process Area",
      dataKey: "col3",
    },
    {
      title: "Findings",
      dataKey: "col4",
    },
  ];
  let table = [];
  let cnunkKeys = chunkArray(Object.keys(data), 2);
  cnunkKeys.forEach(function (keys) {
    table = [];
    let maxLength = keys.length == 2 ?
      data[keys[0]].length > data[keys[1]]
        ? data[keys[0]].length
        : data[keys[1]].length : data[keys[0]].length;
    for (let i = 0; i < maxLength; i++) {
      table.push({
        col1: data[keys[0]] && data[keys[0]][i] && data[keys[0]][i].Business_x0020_Process_x0020_Are ? data[keys[0]][i].Business_x0020_Process_x0020_Are.Title : "",
        col2: data[keys[0]] && data[keys[0]][i] ? data[keys[0]][i].FindingNo : "",
        col3: data[keys[1]] && data[keys[1]][i] && data[keys[1]][i].Business_x0020_Process_x0020_Are ? data[keys[1]][i].Business_x0020_Process_x0020_Are.Title : "",
        col4: data[keys[1]] && data[keys[1]][i] ? data[keys[1]][i].FindingNo : "",
      });
    }
    let createdCell = function (data) {
      if (data.section == "body") {
        data.cell.styles.lineWidth = 1;
        data.cell.styles.lineColor = [0, 0, 0];
        data.cell.styles.fillColor = [255, 255, 255];
        data.cell.styles.fontSize = 10;
        data.cell.styles.cellPadding = 5;
      }
      if (
        data.section == "body" &&
        data.row.index == 0 &&
        (data.column.dataKey == "col1" || data.column.dataKey == "col3")
      ) {
        data.cell.rowSpan = maxLength;
      }
    };
    let style = getFindingsSummaryPdfStyles(
      doc.previousAutoTable ? doc.previousAutoTable.finalY - 5 : 110
    );
    style.didParseCell = createdCell;
    doc.autoTable(cols, table, style);
  });

  // save file
  doc.save("Findings Summary.pdf");
}

function getFindingsSummaryPdfStyles(startY) {
  return {
    startY: startY + 5,
    columnStyles: {
      col1: {
        fontSize: 10,
        halign: "center",
        valign: "top",
        fontStyle: "normal",
        cellWidth: 150,
        fillColor: [180, 198, 231],
      },
      col2: {
        fontSize: 10,
        halign: "left",
        fontStyle: "normal",
        cellWidth: 115,
      },
      col3: {
        fontSize: 10,
        halign: "center",
        valign: "top",
        fontStyle: "normal",
        cellWidth: 150,
        fillColor: [180, 198, 231],
      },
      col4: {
        fontSize: 10,
        halign: "left",
        fontStyle: "normal",
        cellWidth: 115,
      },
      fullColl: {
        halign: "left",
        fontStyle: "normal",
        fontSize: 12,
      },
    },
    margin: {
      top: 20,
      left: 40,
      right: 40,
      bottom: 20,
    },
    styles: {
      font: "helvetica",
      overflow: "linebreak",
      fillColor: false,
      textColor: [25, 25, 25],
      fontSize: 10,
      fontStyle: "normal",
      valign: "middle",
      halign: "center",
    },
    headStyles: {
      fontSize: 10,
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

function getFindingsSummaryListData() {
  return $.ajax({
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Accept", "application/json");
    },
    type: "GET",
    url: window.SITE_LOCATION_URL + "/SiteAssets/app/data.txt",
    // url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Findings Analysis')/items?$select=*,Business_x0020_Process_x0020_Are/Title&$expand=Business_x0020_Process_x0020_Are",
    dataType: "json",
  }).then(function (res) {
    return res.value;
  });
}
