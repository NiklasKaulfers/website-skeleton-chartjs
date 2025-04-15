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
Beispiel:
```javascript
await generateChart({
    csvFilename: "/data/calliopemini-data-2025-03-17T12-05-48-003Z.csv",
    divElement: document.getElementById("charts")
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
animationIndex:
<ul>
    <li>0 | "none": keine Animation</li>
    <li>1 | "ease-in": einfache von unten nach oben animation</li>
    <li>2 | "left-right-smooth": animation von links nach rechts</li>
    <li>3 | "dropdown": animation welche den Graphen von oben "hineinfallen" lässt</li>
</ul>
<br>
