# Anwendung der Chart.js Helper Funktion


## Anforderungen
Chart js in HTML als src Datei angegeben<br>
like: <br>
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```
Die eigenen Javascript Dateien als Modul definiert <br>
```html
<script defer src="src/javascript/index.js" type="module"></script>
```
dann normaler Import mit
```javascript
import generateChart from "./chart-js-helper/chart-js-helper.js";
```

## Options
Notwendige Anforderungen:
```javascript
await generateChart({
    csvFilename: "<Speicherort der Calliope Daten>",
    divElement: document.getElementById("<Id der Div im HTML file>")
})
```

csvFilename: Ort wo die Daten des Calliope gespeichert sind. <br>
divElement: Ort, an welchem der Graph erzeugt wird. Die div kann im CSS verwendet werden, um Änderungen an der Größe des Graphens vorzunehmen <br>
borderColor: Farbe der Linie <br>
backgroundColor: Farbe des Inneren des Graphens <br>
type:
<ul>
    <li>bar</li>
    <li>list</li>
    <li>bubble</li>
    <li>doughnut</li>
    <li>und mehr</li>
</ul>
<br>
animationIndex | animationName:
<ul>
    <li>0 | "none": keine Animation</li>
    <li>1 | "progressive-line": animation von links nach rechts</li>
    <li>2 | "drop-down": animation welche den Graphen von oben "hineinfallen" lässt</li>
    <li>3 | "bounce": Linie springt umher</li>
</ul>
<br>
Beispiel:

```javascript
    await generateChart({
    csvFilename: "/data/calliopemini-data-2025-03-17T12-29-16-698Z.csv",
    divElement: document.getElementById("more-charts"),
    borderColor: "rgb(0,100,255)",
    backgroundColor: "rgba(0,100,255,0.2)",
    title: "Messungen vom 17.03.2025",
    animationName: "drop-down"
})
```
