async function generateChart({
    csvFilename,
    borderColor,
    backgroundColor,
    animationIndex,
    type
                              }){

    const options = {
        borderColor,
        backgroundColor,
        animationIndex,
        type
    }
    await createChart(csvFilename, options);
}

function getAnimation(index) {
    const delayBetweenPoints = 10;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const options = [{
        // empty for if no animation is wished
    }, {
        tension: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
        ,
    }, {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    }
    ];
    if (index >= options.length) {
        console.error(`Faulty animation index detected of ${index}, will continue with no animation`)
        index = 0;
    }
    return options[index] ?? options[0]
}




async function fetchCSV(file) {
    const response = await fetch(file);
    const text = await response.text();
    return text;
}

function parseCSV(data) {
    const lines = data.split('\n').filter(line => line);
    const labels = [];
    const values = [];
    for (let i = 1; i < lines.length; i++) { // Skip header
        const [time, brightness] = lines[i].split(';');
        labels.push(time);
        values.push(brightness);
    }
    return { labels, values };
}

async function createChart(file, options) {
    const data = await fetchCSV(file);
    const parsedData = parseCSV(data);

    const ctx = document.createElement('canvas');
    document.getElementById('charts').appendChild(ctx);

    new Chart(ctx, {
        type: options.type ?? 'line',
        data: {
            labels: parsedData.labels,
            datasets: [{
                label: file.split('/').pop(), // Get filename
                data: parsedData.values,
                borderColor: options.borderColor ?? 'rgba(75, 192, 192, 1)',
                backgroundColor: options.backgroundColor ?? 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        },
        options: {
            animations: getAnimation(options.animationIndex),
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Brightness'
                    }
                }
            }
        }
    });
}





// generateChart({
//     csvFilename: "/data/calliopemini-data-2025-03-17T12-05-48-003Z.csv",
//     borderColor: "#FF0000",
//     animationIndex: 1
// })
generateChart({
    csvFilename: "/data/calliopemini-data-2025-03-17T12-29-16-698Z.csv",
    animationIndex: 2
})
// generateChart({
//     csvFilename: "/data/calliopemini-data-2025-03-19T09-49-18-231Z.csv"
// })
export default generateChart;