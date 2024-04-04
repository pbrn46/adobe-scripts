# ExtendScript to UXP

https://developer.adobe.com/indesign/uxp/resources/migration-guides/extendscript/

ExtendScript uses an older version of JavaScript (ES3). In contrast, UXP uses the V8 JavaScript engine which supports ES6; this has several notable features lacking in ExtendScript.

Not all the newer features of ES6 are used and/or supported in the UXP world, but as an ExtendScript developer, you should familiarize yourself with ECMAScript ES6 so you can understand the sample code.

This page goes over how ExtendScript can be rewritten in UXP script in simple steps.

For scripts,

1. Save `.jsx` the file with `.idjs` extension.
1. Update the script for unsupported methods

Each section below highlights the following:

- DIFFERENCES
- EXTENDSCRIPT
- UXP
- APPLICABLE TO

## subscript operator []

### Differences

Collection objects returned by InDesign like documents and paragraphs will not support subscript operator [ ] to access element at a particular index. The alternative is to use the method by name item()Objects like app.selection which is of type Array will support subscript operator.

### ExtendScript

```javascript
for (j = 0; j < app.selection[0].paragraphs.length; j++) {
  var item = app.selection[0].paragraphs[j];
}
```

### UXP

```javascript
for (j = 0; j < app.selection[0].paragraphs.length; j++) {
  var item = app.selection[0].paragraphs.item(j);
}
```

### Applicable to

All Versions

## Object.constructor.name

### Differences

Object.constructor.name which is a standard property in JS will return an empty string ("") for DOM objects. Alternatively, use the object.constructorName property.

### ExtendScript

```javascript
switch(myPageItem.constructor.name) {
case "Rectangle":
case "Oval":
...
break;
}
```

### UXP

```javascript
switch(myPageItem.constructorName) {
case "Rectangle":
case "Oval":
...
break;
}
```

### Applicable to

Prior to v18.4

## Comparison operators(== and ===)

### Differences

Comparison operators(== and ===) on InDesign DOM objects will always return false unless the objects have the same reference. Instead use method equals()

### ExtendScript

```javascript
if (myPath.pathType == PathType.closedPath) { ... }
```

### UXP

```javascript
if (myPath.pathType.equals(PathType.closedPath)) { ... }
```

### Applicable to

All Versions

## instanceof

### Differences

The instanceof keyword isn't supported for InDesign DOM objects. Instead using object.constructorName property.

### ExtendScript

```javascript
if (app.selection[0].paragraphs[0].appliedParagraphStyle.parent instanceofParagraphStyleGroup) { ... }
```

### UXP

```javascript
if (app.selection[0].paragraphs.item(0).parent.constructorName == "ParagraphStyleGroup") { ... }
```

### Applicable to

All Versions

## Global object `document`

### Differences

Global object `document` is not supported now. Instead, use `app.activeDocument`

### ExtendScript

```javascript
document.findText();
```

### UXP

```javascript
app.activeDocument.findText();
```

### Applicable to

All Versions

## ActiveScript

### Differences

`app.activeScript`

### ExtendScript

`app.activeScript` returns the current running script as a file object on which you can access other properties.

### UXP

`app.activeScript` returns the path of the current script as a string. No other properties can be accessed on `app.activeScript`

### Applicable to

Prior to v18.4

## Fetching the InDesign Server arguments passed to a script.

### Differences

```javascript
var myArg = app.scriptArgs.getValue("_argumentName_");
```

### UXP

```javascript
let arguments = script.args;
```

Learn more about [script.args](https://www.adobe.io/photoshop/uxp/guides/uxp-concepts/#script-args)

### Applicable to

v18.4 Onwards

# InDesign DOM APIs

https://developer.adobe.com/indesign/uxp/resources/fundamentals/dom-versioning/

InDesign APIs (aka Document Object Model DOM or OMV) is used to create and modify the application document and content.

**Prior to v18.4**, the InDesign DOM was available in the global space by default.

**Starting v18.4**, InDesign DOM is available only as a JavaScript module and should be retrieved on a need basis using `require()`.

To access the InDesign DOM APIs from v18.4 onwards, use

```javascript
const myInDesign = require("indesign");
const app = myInDesign.app;
```

## DOM version

DOM versioning refers to the specific version of InDesign Document Object Model. By specifying a version, you can ensure that your script/plugin remains forward compatible, which means it will work with newer versions of InDesign, even if DOM has changed in subsequent releases.

The available DOM versions as of today are **3.0, 4.0, 5.0, 6.0, 7.0, 7.5, 8.0, 9.0, 10.0, 10.1, 10.2, 11.0, 11.2, 11.3, 11.4, 12.0, 12.1, 13.0, 13.1, 14.0, 15.0, 15.1, 16.0, 16.1, 16.2, 17.0, 18.0**

To know which version of DOM API your app is currently using, you can use

```javascript
const myInDesign = require("indesign");
const app = myInDesign.app;
console.log(app.scriptPreferences.version);
```

To switch to a particular version of DOM API, use

```javascript
const myInDesign = require("indesign-16.1");
```

The above will make sure that going forward you will be using v16.1 DOM APIs.

**NOTE** that if you retrieved a specific DOM version (let's assume 'A') and then did require("indesign"), it will fetch the same DOM version 'A'. For example,

```javascript
const inDesignAppV17 = require("indesign-17.0").app;
const inDesignApp = require("indesign").app;
console.log(
  `Versions: ${inDesignAppV17.scriptPreferences.version} and ${inDesignApp.scriptPreferences.version} will be v17.0`
);
```

Also note that you cannot work with two different DOM versions at the same time. require("indesign"); assumes that there will be no further change in the DOM version. In the below example, the object inDesignV17 will be `undefined`.

```javascript
const inDesign = require("indesign");
const inDesignV17 = require("indesign-17.0");
```

Once you have the right DOM API version, use the [API reference](https://developer.adobe.com/indesign/dom/api/) to access available objects, methods etc.
