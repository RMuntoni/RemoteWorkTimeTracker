# RemoteWorkTimeTracker

## Ausf�hrung
Entwickelt wurde dieses Projekt mit Visual Studio 2019 Community Edition, C#, .Net Core 3.1 und IISExpress
Zum Ausf�hren sollte ein Firefox und Visual Studio mit IISExpress ausreichen.
Projekt in Vs �ffnen, compilen und �ber den IISExpress starten.

Bei Compilerfehlern oder �hnlichem bitte Bescheid geben. Ich melde mich dann so schnell wie m�glich.


## Zeitbuchung
Setup: 1h (VS Setup, Github Setup)  
Konzeption: 1h15m  
Umsetzung: 5h  
Readme / Doku: 45m

## Anmerkungen
Dieses Projekt eignet sich wunderbar als MVVM Single Page Application. Da mein Wissen im neuen Angular und in React nicht genug ausgebildet sind, habe ich das Projekt als MVC Web Application mit .Net Core 3.1 umgesetzt.
In der ASP.Net Umgebung konnte ich bis jetzt noch am meisten Erfahrungen sammeln, daher war dies das pr�ferierte Mittel f�r den gegebenen Zeitrahmen.

Es gibt einige Punkte die definitiv Verbesserungsw�rdig sind. Mit mehr Zeit k�nnte man das dann direct noch Refactoren. An einigen Stellen stehen die Verbesserungsvorschl�ge als //Todo Kommentare im Code.
Des weiteren sind noch folgende �berlegungen und Verbesserungen m�glich/sinnvoll:
- Die Javascript Dateien sollten als TypeScript Dateien umgeschrieben werden. Hierzu w�rde ich aber gerne erst einen Setup der automatischen Generierung mit anschlie�ender Minifizierung aufsetzen. Dazu kam ich leider nicht mehr. Daher ist es erst einmal plain JS
- Eine korrekte Datenbank k�nnte als Datenspeicher dienen. In diesem Falle war ich mir unsicher, wie ich eine lokale Dev DB einbinden und in Git referenzieren konnte und wie ich alternativ eine Cloud DB korrekt aufsetze. Deswegen erst einmal JSON (Habe gr��tenteils Erfahrung mit SQL Servern, die allerdings von der Infrastruktur aufgesetzt wurden und auf den Deployservern liegen o.�.)
- Strukturen im Code k�nnten noch anders �berlegt werden. Theoretisch k�nnte man die Models.Task Klasse als BusinessModel sehen und die TimeSpan Property herausnehmen und daf�r ein ViewModel mit dieser anlegen und mit z.B. einem Automapper die Models konvertieren. Im Moment ist der Overhead zu hoch.
- �ber Dependency Injection den Datenbankservice �bergeben, anstatt ihn im Controller zu initialisieren. Vom Default her scheint das schon mit dem Logger zu funktionieren habe es aber nicht gefunden, wo genau er das macht (evtl. auch durch .Net Core defaultm��ig so)
- Styling. War nicht gefordert ich wei� :D
- Korrektes Errorhandling. Die Try Catches geben leere Results. Unsch�n muss wenn gleich gemacht werden.
- Test driven Development oder generell Unit Tests. Verursacht immer einen recht gro�en Overhead daher auch hier erst einmal hinten angestellt.
- Derzeit ist alles in der Index Razor View. Es ergibt Sinn Partial Views zu bilden und die einzelnen Funktionen (+ JS Code) einzelner gekapselt auszulagern.
- Apropos kapseln und JS TaskForm und TimeTracker sollten vermutlich von einer App.js gestuert werden. Ich kenne es noch aus dem Angular 1.14 so, das die App die Komponenten verwalten sollte wenn �berhaupt (oder ein Formserive etc.). Im Moment kennt der TimeTracker Variablen und Methoden aus TaskForm. Kann zu Bugs f�hren. Sollte man �berarbeiten.