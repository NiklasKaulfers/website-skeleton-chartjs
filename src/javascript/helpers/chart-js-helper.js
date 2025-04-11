async function generateChart({
    csvFilename,
    borderColor,
    backgroundColor,
    animationIndex

                              }){
    let animationOptions = [{
        // empty for if no animation is wished
    },{
        tension: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
        ,
    },{
        type: 'number',
        easing: 'linear',
        duration: 10

    }
    ];
    if (animationIndex >= animationOptions.length) {
        console.error("Faulty animation index detected, will continue with no animation")
        animationIndex = 0;
    }
    const animation = animationOptions[animationIndex] ?? animationOptions[0];

    const options = {
        borderColor,
        backgroundColor,
        animation
    }
    await createChart(csvFilename, options);
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
        type: 'line',
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
            animations: options.animation,
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





generateChart({
    csvFilename: "/data/calliopemini-data-2025-03-17T12-05-48-003Z.csv",
    borderColor: "#FF0000",
    animationIndex: 1
})
generateChart({
    csvFilename: "/data/calliopemini-data-2025-03-17T12-29-16-698Z.csv",
    animationIndex: 3
})
generateChart({
    csvFilename: "/data/calliopemini-data-2025-03-19T09-49-18-231Z.csv"
})
export default generateChart;