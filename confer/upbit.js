var chart;
var series = [
    // { name: 'GXC', data: [] },
    { name: 'BTC', data: [] },
    // { name: 'XRP', data: [] }
];

function ticker(idx) {
    // url = 'https://api.bithumb.com/public/ticker/{order_currency}_{payment_currency}';
    // url = 'https://api.upbit.com/v1/ticker?markets=KRW-BTC'

    // url = 'https://api.bithumb.com/public/ticker/' + series[idx].name + '_KRW';
    url = 'https://api.upbit.com/v1/ticker?markets=KRW-' + series[idx].name;
    // url = 'https://api.upbit.com/v1/ticker?markets=' + data[0]['market'];

    $.get(url, function(data){
        point = [new Date().getTime(), parseInt(data[0]['trade_price'])];
        console.log(point);

        var series = chart.series[idx],
            shift = series.data.length > 20;
        chart.series[idx].addPoint(point, true, shift);
    }, 'json');
}

function requestData() {
    for (var idx in series){
        ticker(idx);
    }
    setTimeout(requestData, 1000);
}

$(document).ready(function() {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'Upbit Live'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'price',
                margin: 80
            }
        },
        series: series
    });
});