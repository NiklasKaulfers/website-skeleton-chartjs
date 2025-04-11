import generateChart from "./helpers/chart-js-helper";


// todo: make import usable
// helper has to be usable as a function in any js file


async function loadCharts() {
    const files = ['calliopemini-data-2025-03-17T12-05-48-003Z.csv', 'calliopemini-data-2025-03-17T12-29-16-698Z.csv', 'calliopemini-data-2025-03-19T09-49-18-231Z.csv']; // Add your CSV filenames here
    for (const file of files) {
        await generateChart({
            csvFilename: file
        });
    }
}

loadCharts();