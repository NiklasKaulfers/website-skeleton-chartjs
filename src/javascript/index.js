import generateChart from "./chart-js-helper/chart-js-helper.js";



loadCharts();

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
        animationIndex: 2,
    })
// generateChart({
//     csvFilename: "/data/calliopemini-data-2025-03-19T09-49-18-231Z.csv"
// })
}


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}