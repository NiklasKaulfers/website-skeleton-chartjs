async function generateChart({
                                 csvFilename,        // required
                                 divElement,         // required
                                 borderColor,
                                 backgroundColor,
                                 animationIndex,
                                 animationName,
                                 xAxisName,
                                 yAxisName,
                                 title,
                                 type
                             }) {
    if (!csvFilename) {
        console.error("csvFilename is missing");
        throw new Error("csvFilename is missing");
    }

    if (!divElement) {
        console.error("div id is missing");
        throw new Error("div id is missing");
    }

    const options = {
        borderColor,
        backgroundColor,
        animationIndex,
        animationName,
        title,
        yAxisName,
        xAxisName,
        type
    }
    await createChart(csvFilename, divElement, options);
}

async function fetchCSV(file) {
    const response = await fetch(file);
    return await response.text();
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
    return {labels, values};
}

async function createChart(file, divElement, options) {
    const data = await fetchCSV(file);
    const parsedData = parseCSV(data);

    const ctx = document.createElement('canvas');
    divElement.appendChild(ctx);

    new Chart(ctx, {
        type: options.type ?? 'line',
        data: {
            labels: parsedData.labels,
            datasets: [{
                label: options.title ?? file.split('/').pop(), // Get filename
                data: parsedData.values,
                borderColor: options.borderColor ?? 'rgba(75, 192, 192, 1)',
                backgroundColor: options.backgroundColor ?? 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        },
        options: {
            animations: getAnimation({
                index: options.animationIndex,
                animationName: options.animationName
            }),
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: options.xAxisName ?? 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: options.yAxisName ?? 'Brightness'
                    }
                }
            }
        }
    });
}

function getAnimation({
                          index,
                          animationName,
                          delay
                      }) {
    if (animationName && index) {
        throw new Error("Can't take both name and index as identifiers for the animation.")
    }
    if ((!animationName && !index) || (index === 0 || animationName === "none")){
        return {}
    }

    if (index === 1 || animationName === "progressive-line") {
        const delayBetweenPoints = delay ?? 10;
        return leftRightSmoothAnimation(delayBetweenPoints);
    }
    if (index === 2 || animationName === "drop-down"){
        return dropDownAnimation;
    }
    if (index === 3 || animationName === "bounce") {
        return bouncyAnimation;
    }
    // if (index === 4 || animationName === "loop"){
    //     return loopAnimation;
    // }
    throw new Error("Chosen Animation is not defined.");
}

const loopAnimation = {
    radius: {
        duration: 400,
        easing: 'linear',
        loop: (context) => context.active
    }
}

const bouncyAnimation = {
    tension: {
        duration: 750,
        easing: 'easeInBounce',
        from: 0,
        to: 3,
        loop: true
    }
}

const dropDownAnimation = {
    y: {
        easing: 'easeInOutElastic',
        from: (ctx) => {
            if (ctx.type === 'data') {
                if (ctx.mode === 'default' && !ctx.dropped) {
                    ctx.dropped = true;
                    return 0;
                }
            }
        }
    }
}

const leftRightSmoothAnimation = (delayBetweenPoints) => {
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    return {
        x: {
            type: 'number',
            easing:
                'linear',
            duration:
            delayBetweenPoints,
            from:
            NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
        ,
        y: {
            type: 'number',
            easing:
                'linear',
            duration:
            delayBetweenPoints,
            from:
            previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    }
}


export default generateChart;