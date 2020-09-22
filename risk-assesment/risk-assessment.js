$(document).ready(function () {
    //fixLayOut();
    window.parent.addEventListener('resize', fixLayOut);
    let resizeEvent = new Event('resize');
    window.parent.dispatchEvent(resizeEvent);
    $("#export-risks").on("click", exportRisks);
});

function fixLayOut() {
    $(window.parent.document).find('.b_a_ck').css({
        'height': $('html').height() + 'px',
        'padding-bottom': '0'
    });
}

function exportRisks() {
    getRisksListData().then(function (res) {
        generateRisksPdf(res);
    });
}
