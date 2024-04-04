@REM Make link from this folder to InDesign script user  folder

@REM Example target folder:
@REM C:\Users\Boris\AppData\Roaming\Adobe\InDesign\Version 19.0\en_US\Scripts\Scripts Panel
mklink /J "%APPDATA%\Adobe\InDesign\Version 19.0\en_US\Scripts\Scripts Panel\linked" "%~dp0"