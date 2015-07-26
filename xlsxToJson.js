/**
 * Created by Danilo Velasquez on 26-07-2015.
 */
(function (undefined) {
    var module = angular.module("dv.xlsxToJson", []);
    var fileReader = function ($q, $log) {

        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var onProgress = function (reader, scope) {
            return function (event) {
                scope.$broadcast("xtjProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };

        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    };

    module.factory("xtjReader",
        ["$q", "$log", fileReader]);

    var fileInput = function ($parse) {
        return {
            restrict: "EA",
            template: "<input type='file' />",
            replace: true,
            link: function (scope, element, attrs) {

                var modelGet = $parse(attrs.xtj);
                var modelSet = modelGet.assign;
                var onChange = $parse(attrs.onChange);

                var updateModel = function () {
                    scope.$apply(function () {

                        var modelGet = $parse(element.attr("xtj"));
                        var modelSet = modelGet.assign;
                        var onChange = $parse(element.attr("on-change"));

                        alasql('SELECT * FROM FILE(?,{headers:true})', [window.event], function (data) {
                            scope.xlsxAsJson = data;
                        });
                        modelSet(scope, element[0].files[0]);
                        onChange(scope);
                    });
                };

                element.bind('change', updateModel);
            }
        };
    };

    module.directive("xtj",
        ['$parse', fileInput]);

}());