import generateChart from "./chart-js-helper/chart-js-helper.js";


// todo: make import usable
// helper has to be usable as a function in any js file


async function loadCharts() {
    generateChart({
        csvFilename: "/data/calliopemini-data-2025-03-17T12-05-48-003Z.csv",
        divElement: document.getElementById("charts"),
        title: "Schockierende Messwerte",
        borderColor: "#FF0000",
        animationIndex: 1
    })
    generateChart({
        csvFilename: "/data/calliopemini-data-2025-03-17T12-29-16-698Z.csv",
        divElement: document.getElementById("more-charts"),
        borderColor: "rgb(0,100,255)",
        backgroundColor: "rgba(0,100,255,0.57)",
        title: "Messungen vom 17.03.2025",
        animationIndex: 2
    })
// generateChart({
//     csvFilename: "/data/calliopemini-data-2025-03-19T09-49-18-231Z.csv"
// })
}

loadCharts();