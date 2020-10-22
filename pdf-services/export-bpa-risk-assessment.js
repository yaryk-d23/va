function generateBPARiskAssessmentPdf(
    processAreas,
    riskAssessment,
    findingAnalysis,
    financialStatement
) {
    var doc = new jsPDF({
        orientation: "p",
        unit: "pt",
    });
    doc.setFont("helvetica");
    doc.setFontSize(12);


    let cols = [];
    let table = [];
    let createdCell;
    let style;
    $.each(processAreas, function (index, area) {
        // add pdf header
        doc.setFontSize(16);
        doc.setFontStyle("bold");
        doc.text(160, 45, "Business Process Area Risk Assessment");
        doc.setFontSize(10);
        doc.text(20, 65, "Purpose:");
        doc.setFontStyle("normal");
        doc.text(
            70,
            65,
            "To provide a consolidated risk rating and summary of the risks included in each business process area.",
        );
        let riskRating = getRiskValueForArea(riskAssessment.filter(function (x) {
            return x.Business_Process_AreaId === area.Id
        }));
        let riskLevel = riskRating > 2.49 ? 'High' :
            (riskRating <= 2.49 && riskRating > 1.49) ? 'Medium' :
                riskRating <= 1.49 ? 'Low' : '';
        cols = [
            {
                title: "",
                dataKey: "col1",
            }, {
                title: "",
                dataKey: "col2",
            }, {
                title: "",
                dataKey: "col3",
            },
        ];
        table = [
            {
                col1: "Business Process",
                col2: area.Title,
                col3: ""
            }, {
                col1: "Description",
                col2: area.Description,
                col3: ""
            }, {
                col1: "Current Risk Rating / Level",
                col2: riskRating,
                col3: riskLevel
            },
        ];
        style = getBPARiskAssessmentPdfStyles(80);
        createdCell = function (data) {
            data.cell.styles.lineWidth = 1;
            data.cell.styles.lineColor = [236];
            if (data.section == "body" && data.column.dataKey === 'col2' && data.row.index === 1) {
                data.cell.styles.halign = 'left';
            }
            if (data.section == "body" && data.column.dataKey === 'col2' && data.row.index !== 2) {
                data.cell.colSpan = 2;
            }
            if (data.section == "body" && data.column.dataKey === 'col3' && data.row.index === 2) {
                data.cell.styles.fillColor = riskLevel === "High" ? [255, 199, 206] :
                    riskLevel === "Medium" ? [255, 247, 221] :
                        riskLevel === "Low" ? [206, 234, 176] : null;
                data.cell.styles.textColor = riskLevel === "High" ? [156, 0, 6] :
                    riskLevel === "Medium" ? [208, 158, 0] :
                        riskLevel === "Low" ? [105, 161, 43] : null;
            }
        };
        style.didParseCell = createdCell;
        doc.autoTable(cols, table, style);

        let currentRiskAssessment = riskAssessment.filter(function (x) {
            return x.Business_Process_AreaId === area.Id
        });
        let currentFindingAnalysis = findingAnalysis.filter(function (x) {
            return x.Business_x0020_Process_x0020_AreId === area.Id
        });
        let currentFinancialStatementImpact = [];
        financialStatement.filter(function (x) {
            return x.Business_Process_AreaId === area.Id
        }).forEach(function (item) {
            if (currentFinancialStatementImpact.indexOf(item.Financial_Statement) === -1) {
                currentFinancialStatementImpact.push(item.Financial_Statement);
            }
        });
        let currentFinancialStatement = financialStatement.filter(function (x) {
            return x.Business_Process_AreaId === area.Id
        });
        cols = [
            {
                title: "",
                dataKey: "col1",
            }, {
                title: "",
                dataKey: "col2",
            },
        ];
        let riskAssessmentList = "";
        $.each(currentRiskAssessment, function (key, val) {
            riskAssessmentList += (key + 1) + ". " + val.Title + "\n";
        });
        let findingAnalysisList = "";
        $.each(currentFindingAnalysis, function (key, val) {
            findingAnalysisList += (key + 1) + ". " + val.Title + "\n";
        });
        let financialStatementImpactList = "";
        $.each(currentFinancialStatementImpact, function (key, val) {
            financialStatementImpactList += (key + 1) + ". " + val + "\n";
        });
        let financialStatementList = "";
        $.each(currentFinancialStatement, function (key, val) {
            financialStatementList += (key + 1) + ". " + val.Title + "\n";
        });
        table = [
            {
                col1: "Total Risks in Business Process Area",
                col2: currentRiskAssessment.length,
            }, {
                col1: "List of Risks",
                col2: riskAssessmentList,
            }, {
                col1: "Related Findings",
                col2: currentFindingAnalysis.length,
            }, {
                col1: "List of Findings",
                col2: findingAnalysisList,
            }, {
                col1: "Financial Statements Impacted",
                col2: currentFinancialStatementImpact.length,
            }, {
                col1: "List of Financial Statements",
                col2: financialStatementImpactList,
            }, {
                col1: "Financial Statement Line Items Impacted",
                col2: currentFinancialStatement.length,
            }, {
                col1: "List of Financial Statement Line Items Impacted",
                col2: financialStatementList,
            }
        ];
        style = getBPARiskAssessmentPdfStyles(doc.previousAutoTable.finalY + 10);
        createdCell = function (data) {
            data.cell.styles.lineWidth = 1;
            data.cell.styles.lineColor = [236];
            if (data.section == "body" && data.column.dataKey === 'col2') {
                data.cell.styles.halign = 'left';
                data.cell.styles.valign = 'top';
            }
            if (data.section == "body" && data.column.dataKey === 'col2' && data.row.index % 2 == 0) {
                data.cell.styles.valign = 'middle';
            }
        };
        style.didParseCell = createdCell;
        doc.autoTable(cols, table, style);
        if (index !== (processAreas.length - 1)) {
            doc.addPage();
        }
    });
    return doc;
}

function getRiskValueForArea(items) {
    let riskSum = 0;
    items.forEach(function (item) {
        riskSum += parseFloat(item.Overall_Inherent_Risk);
    });
    return (riskSum / items.length).toFixed(2);
}

function getBPARiskAssessmentPdfStyles(startY) {
    return {
        startY: startY,
        columnStyles: {
            fullColl: {
                halign: "center",
                fontStyle: "bold",
                fontSize: 12,
            },
            col1: {
                halign: "center",
                valign: "middle",
                fontStyle: "bold",
                fillColor: [68, 84, 106],
                textColor: [255],
                cellWidth: 150,
            },
            col2: {
                halign: "center",
                valign: "middle",
                minCellWidth: 150,
            },
            col3: {
                halign: "center",
                valign: "middle",
                minCellWidth: 150,
            }
        },
        margin: {
            top: 20,
            left: 20,
            right: 20,
            bottom: 30,
        },
        theme: 'grid',
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
            fontSize: 12,
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

function getBpaRiskAssessmentListData() {
    return $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET",
        url: window.SITE_LOCATION_URL + "/SiteAssets/app/risk-assessment.txt",
        // url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Risk Assessment')/items?$top=50000&$select=*,Business_Process_Area/Title,Business_Process_Area/Id&$expand=Business_Process_Area",
        dataType: "json",
    }).then(function (res) {
        return res.value;
    });
}
function getBpaProcessAreasListData() {
    return $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET",
        url: window.SITE_LOCATION_URL + "/SiteAssets/app/process_areas.txt",
        // url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Bussiness Process Areas')/items?$top=50000",
        dataType: "json",
    }).then(function (res) {
        return res.value;
    });
}

function getBpaFindingsListData() {
    return $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET",
        url: window.SITE_LOCATION_URL + "/SiteAssets/app/funding.txt",
        // url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Findings Analysis')/items?$top=50000&$select=*,Business_x0020_Process_x0020_Are/Title,Business_x0020_Process_x0020_Are/Id&$expand=Business_x0020_Process_x0020_Are",
        dataType: "json",
    }).then(function (res) {
        return res.value;
    });
}

function getBpaFinancialListData() {
    return $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET",
        url: window.SITE_LOCATION_URL + "/SiteAssets/app/financial.txt",
        // url: window.SITE_LOCATION_URL + "/_api/web/lists/getbytitle('Financial Statement Analysis')/items?$top=50000&$select=*,Business_x0020_Process_x0020_Are/Title,Business_x0020_Process_x0020_Are/Id&$expand=Business_x0020_Process_x0020_Are",
        dataType: "json",
    }).then(function (res) {
        return res.value;
    });
}