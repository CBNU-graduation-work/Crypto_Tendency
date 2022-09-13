var chart;
var series = [
    { name: 'ETH', data: [] }
];

function ticker(idx) {
    url = 'https://api.upbit.com/v1/ticker?markets=KRW-' + series[0].name;

    $.get(url, function(data){
        point = [new Date().getTime(), parseInt(data[0]['trade_price'])];
        console.log(point);

        var series = chart.series[0],
            shift = series.data.length > 20;
        chart.series[0].addPoint(point, true, shift);
    }, 'json');
}

function requestData() {
    ticker(series[0]);
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