import generateChart from "./chart-js-helper/chart-js-helper.js";

async function loadCharts() {
    await generateChart({
        csvFilename: "../../data/calliopemini-data-2025-03-17T12-05-48-003Z.csv",
        divElement: document.getElementById("charts"),
        title: "Schockierende Messwerte",
        backgroundColor: "rgba(250,147,147,0.2)",
        borderColor: "#FF0000",
        animationIndex: 1
    })
    await generateChart({
        csvFilename: "../../data/calliopemini-data-2025-03-17T12-29-16-698Z.csv",
        divElement: document.getElementById("more-charts"),
        borderColor: "rgb(0,100,255)",
        backgroundColor: "rgba(0,100,255,0.2)",
        title: "Messungen vom 17.03.2025",
        animationName: "drop-down"
    })
// generateChart({
//     csvFilename: "/data/calliopemini-data-2025-03-19T09-49-18-231Z.csv"
// })
}

loadCharts();