# DV.XLSXTOJSON
Convert any file from xlsx to a JSON object and to a base64 String in the CLIENT BROWSER!

##Installation
###Using Bower
`bower install dv.xlsxtojson --save`

###Vanilla
Just download the file dv.xlsxToJson.js or dv.xlsxToJson.min.js and put in your js folder.

###Add to your index.html
`<script src="YOURPATH/dv.xlsxToJson/xlsxToJson.min.js"></script>`

##Usage
In your app.js or main Angular file add:
```
angular.module('app', [
    'Controllers',
    'ui.router',
    **'dv.xlsxToJson'**
])
```

In your html add the following attribute directive:
```
<div xtj="file" on-change="getFile()"></div>

<progress value="{{progress}}"></progress>
```

The xtj directive is neccesary to include this plugin. The on-change method is mandatory too, but you can name it whatever you want.
The Progress directive is an optional tag you can use to see how the 'upload' is going.

In your controller:
``` 
    $scope.getFile = function () {
            $scope.progress = 0;
            xtjReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.base64Result = result;
                });
        };

        $scope.$on("xtjProgress", function(e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
        ```
        
The plugin always retrieve a base64 result (i'm working on making this optional) and creates a JSON array called xlsxAsJson in your $scope.

Accessing the object
`{{xlsxAsJson}}`

##Dependencies
The main dependency is ALASQL http://alasql.org/.

##License
This project is under MIT license.

This is an open source project, so, feel free to fork, contribute or make a pull request.
