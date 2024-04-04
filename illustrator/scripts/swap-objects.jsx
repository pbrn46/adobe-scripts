// Swap two objects position and size in Illustrator

try {
  var selObjs = "Please select two objects on the page.";
  var docRef = activeDocument;
  if (documents.length > 0) {
    if (docRef.selection.length == 2) {
      mySelection = docRef.selection;

      //if object is a (collection of) object(s) not a text field.
      if (mySelection instanceof Array) {
        //initialize vars
        var object_A = mySelection[0];
        var object_B = mySelection[1];

        // Set new dimensions
        var aWidth = object_B.width;
        var aHeight = object_B.width * (object_A.height / object_A.width);
        var bWidth = object_A.width;
        var bHeight = object_A.width * (object_B.height / object_B.width);
        object_A.width = aWidth;
        object_A.height = aHeight;
        object_B.width = bWidth;
        object_B.height = bHeight;

        object_A.left = (object_A.left - (object_A.width / 2)) + object_B.width / 2;
        object_A.top = (object_A.top + (object_A.height / 2)) - object_B.height / 2;
        object_B.left = (object_B.left - (object_B.width / 2)) + object_A.width / 2;
        object_B.top = (object_B.top + (object_B.height / 2)) - object_A.height / 2;

        // Calculate new center object A
        var new_A = [
          (object_B.left + (object_B.width / 2)) - object_A.width / 2,
          (object_B.top - (object_B.height / 2)) + object_A.height / 2
          // (object_B.left + (object_B.width / 2)) - object_A.width / 2,
          // (object_B.top - (object_B.height / 2)) + object_A.height / 2
        ];
        // Calculate new center object B
        var new_B = [
          (object_A.left + (object_A.width / 2)) - object_B.width / 2,
          (object_A.top - (object_A.height / 2)) + object_B.height / 2
        ];
        // Make the swap
        object_A.position = new_A;
        object_B.position = new_B;


      } else {
        alert(mySelection + " is not an array!\n" + selObjs);
      }
    } else {
      alert("Selection is not 2 objects!\n" + selObjs);
    }
  }
} catch (e) {
  alert("problem:\n" + e);
}