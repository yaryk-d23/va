function generateKeySystemsPdf(listData) {
    var doc = new jsPDF({
        orientation: "p",
        unit: "pt",
    });
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // add pdf header
    doc.setFontSize(16);
    doc.setFontStyle("bold");
    doc.text(235, 45, "Key Systems");
    doc.setFontSize(10);
    doc.text(40, 65, "Purpose:");
    doc.setFontStyle("normal");
    doc.text(
        40,
        65,
        "                 To identify the major systems used to support VA's business operations and financial reporting.",
        {
            maxWidth: 530,
        }
    );

    // add content
    let cols = [
        {
            title: "System",
            dataKey: "col1",
        },
        {
            title: "System Location",
            dataKey: "col2",
        }
    ];
    let table = [];
    listData.forEach(function (item) {
        table.push({
            col1: item.Title ? item.Title : '',
            col2: item.System_Location ? item.System_Location : "",
        });
        table.push({
            col1: item.System_Description ? item.System_Description : '',
        });
    });
    let createdCell = function (data) {
        if (data.section == "body") {
            data.cell.styles.lineWidth = 1;
            data.cell.styles.lineColor = [0, 0, 0];
            data.cell.styles.fontSize = 10;
            data.cell.styles.cellPadding = 5;
        }
        if (
            data.section == "body" &&
            data.row.index % 2 !== 0 &&
            data.column.dataKey == "col1"
        ) {
            data.cell.styles.halign = 'left';
            data.cell.styles.valign = 'top';
            data.cell.styles.fillColor = [255, 255, 255];
            data.cell.colSpan = 4;
        }
    };
    let style = getKeySystemsPdfStyles(100);
    style.didParseCell = createdCell;
    doc.autoTable(cols, table, style);
    // save file
    // doc.save("Key Systems.pdf");
    return doc;
}
function getKeySystemsPdfStyles(startY) {
    return {
        startY: startY + 5,
        columnStyles: {
            col1: {
                fontSize: 10,
                halign: "center",
                fontStyle: "normal",
                minCellWidth: 200,
                fillColor: [180, 198, 231],
            },
            col2: {
                fontSize: 10,
                halign: "center",
                fontStyle: "normal",
                fillColor: [255, 255, 255]
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
        // rowPageBreak: "avoid",
        pageBreak: "auto",
    };
}
function getKeySystemsListData() {
    return $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET",
        // url: window.SITE_LOCATION_URL + "/SiteAssets/app/data.txt",
        url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Key Systems')/items?$top=50000",
        dataType: "json",
    }).then(function (res) {
        return res.value;
    });
}