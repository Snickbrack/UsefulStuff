@echo off

::Datumsformat = dd.MM.yyyy
::dd: Zahl des Tages im aktuellen Monats mit führender 0
::MM: Zahl des aktuellen Monats mit führender 0
::yyyy: Die Jahreszahl

:: Das %-Zeichen steht für die Verwendung einer Variable
:: die date-Variable ist eine globale bereits im Vorfeld gesetzte System-Variable
:: %date:~-7,2% bedeutet, dass vom Datum 22.05.2017 ausgehend sieben Zeichen von 0 aus zurück gegangen werden und dann die 2 nächsten Zeichen Richtung Ende ausgewählt werden. Hier in dem Beispiel wäre das 05
:: Die erste Zahl steht also für den Startpunkt und die zweite Zahl für die Anzahl der Zeichen, die ausgewählt werden sollen

:: Das hier ist der Pfad, in welchem nach Dateien gesucht werden soll
set searchPath="C:\Users\KIH\Documents\Test"
:: Hier wird aus dem aktuellen Datum der Monat "ausgeschnitten"
set m=%date:~-7,2%
:: Hier wird die Variable des aktuellen Monats in eine numerische Variable konvertiert
set /A m
:: Hier wird die Jahreszahl gesetzt
set dateYear=%date:~-4,4% 
:: Und ebenfalls in eine numerische Variable konvertiert
set /A dateYear -= 2 
:: hier wird das Datum mit der angepassten Jahreszahl wieder zusammengesetzt
set DATE_DIR=%date:~0,2%.%m%.%dateYear%

:: Der Befehl "forfiles" ist ein externer Programmaufruf auf die Windows-Komponente mit selbigem Namen und führt für jede, in dem Verzeichnis gefundene, Datei (die nicht unsichtbar ist) den angegebenen Befehl aus.
:: Der Befehl beschreibt, dass die aktuelle Datei unter dem Pfad @path mit dem Force-Attribut gelöscht werden soll. Das bedeutet, dass auch schreibgeschützte Dateien gelöscht werden.
:: Der Parameter /s weist die forfiles-Kopmonente an, auch rekursiv in Unterverzeichnissen nach Dateien zu suchen
:: Der Parameter /d steht für das Datum, welches als Kriterium zählt. Das Minus vor dem Datum sagt aus, dass nur Dateien ausgewählt werden, die entweder gleich alt oder älter als das "Such"-Datum sind
:: Gesucht wird anhand des Bearbeitungsdatums
:: /c steht für den Befehl, welcher für jede gefundenen Datei ausgeführt wird
:: @path ist hierbei der Pfad der aktuellen Datei, der automatisch von forfiles erzeugt wird und nur innerhalb des Befehls verwendet werden kann
forfiles /p %searchPath% /s /m *.* /d -%DATE_DIR% /c "cmd /c del @path /F"


pause