# RemoteWorkTimeTracker

## Ausführung
Entwickelt wurde dieses Projekt mit Visual Studio 2019 Community Edition, C#, .Net Core 3.1 und IISExpress
Zum Ausführen sollte ein Firefox und Visual Studio mit IISExpress ausreichen.
Projekt in Vs öffnen, compilen und über den IISExpress starten.

Bei Compilerfehlern oder ähnlichem bitte Bescheid geben. Ich melde mich dann so schnell wie möglich.


## Zeitbuchung
Setup: 1h (VS Setup, Github Setup)  
Konzeption: 1h15m  
Umsetzung: 5h  
Readme / Doku: 45m

## Anmerkungen
Dieses Projekt eignet sich wunderbar als MVVM Single Page Application. Da mein Wissen im neuen Angular und in React nicht genug ausgebildet sind, habe ich das Projekt als MVC Web Application mit .Net Core 3.1 umgesetzt.
In der ASP.Net Umgebung konnte ich bis jetzt noch am meisten Erfahrungen sammeln, daher war dies das präferierte Mittel für den gegebenen Zeitrahmen.

Es gibt einige Punkte die definitiv Verbesserungswürdig sind. Mit mehr Zeit könnte man das dann direct noch Refactoren. An einigen Stellen stehen die Verbesserungsvorschläge als //Todo Kommentare im Code.
Des weiteren sind noch folgende Überlegungen und Verbesserungen möglich/sinnvoll:
- Die Javascript Dateien sollten als TypeScript Dateien umgeschrieben werden. Hierzu würde ich aber gerne erst einen Setup der automatischen Generierung mit anschließender Minifizierung aufsetzen. Dazu kam ich leider nicht mehr. Daher ist es erst einmal plain JS
- Eine korrekte Datenbank könnte als Datenspeicher dienen. In diesem Falle war ich mir unsicher, wie ich eine lokale Dev DB einbinden und in Git referenzieren konnte und wie ich alternativ eine Cloud DB korrekt aufsetze. Deswegen erst einmal JSON (Habe größtenteils Erfahrung mit SQL Servern, die allerdings von der Infrastruktur aufgesetzt wurden und auf den Deployservern liegen o.ä.)
- Strukturen im Code könnten noch anders überlegt werden. Theoretisch könnte man die Models.Task Klasse als BusinessModel sehen und die TimeSpan Property herausnehmen und dafür ein ViewModel mit dieser anlegen und mit z.B. einem Automapper die Models konvertieren. Im Moment ist der Overhead zu hoch.
- Über Dependency Injection den Datenbankservice übergeben, anstatt ihn im Controller zu initialisieren. Vom Default her scheint das schon mit dem Logger zu funktionieren habe es aber nicht gefunden, wo genau er das macht (evtl. auch durch .Net Core defaultmäßig so)
- Styling. War nicht gefordert ich weiß :D
- Korrektes Errorhandling. Die Try Catches geben leere Results. Unschön muss wenn gleich gemacht werden.
- Test driven Development oder generell Unit Tests. Verursacht immer einen recht großen Overhead daher auch hier erst einmal hinten angestellt.
- Derzeit ist alles in der Index Razor View. Es ergibt Sinn Partial Views zu bilden und die einzelnen Funktionen (+ JS Code) einzelner gekapselt auszulagern.
- Apropos kapseln und JS TaskForm und TimeTracker sollten vermutlich von einer App.js gestuert werden. Ich kenne es noch aus dem Angular 1.14 so, das die App die Komponenten verwalten sollte wenn überhaupt (oder ein Formserive etc.). Im Moment kennt der TimeTracker Variablen und Methoden aus TaskForm. Kann zu Bugs führen. Sollte man überarbeiten.