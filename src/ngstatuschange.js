/**
 * Created by shabeeb on 24/09/16.
 */

angular
    .module('ngchangeStatus',[]).directive('changeStatus', ['$http', '$q', function($http, $q){
        return {
            scope: {
                id: '@id',
                currentvalue: '=value',
                apiurl: '@apiurl',
                apiurltype: '@apiurltype',
                actiontype:'@actiontype',
                fullscope:'=fullscope',
                deleteindex:'@dindex'
            },
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var actiontype = 'update';
                    appdata = {
                        id: attrs.id,
                        currentvalue: scope.currentvalue
                    };

                    apiurl = attrs.apiurl;
                    var baseurl = window.location.protocol+'//'+window.location.hostname+window.location.pathname;

                    var url = apiurl || baseurl;
                    if((attrs.apiurltype == undefined) || (attrs.apiurltype == 'relative')){
                        var  url = baseurl+url;
                    }


                    //update or delete
                    if((attrs.actiontype != undefined) || (attrs.actiontype == 'delete')){
                        actiontype = 'delete';
                    }

                    var request = $http({
                        method: "post",
                        url: url,
                        data: {
                            appdata : appdata
                        }
                    });
                    request.then(function successCallback(response) {


                        if(actiontype == 'delete'){

                            if(scope.fullscope !=undefined && attrs.dindex != undefined){
                                scope.fullscope.splice(attrs.dindex, 1);
                            }

                        }else if(response.data.updatedvalue != undefined){
                            scope.currentvalue = response.data.updatedvalue;
                        }

                    }, function errorCallback(response) {
                        console.log("something wrong");
                    });
                    return true;


                });

            }
        };
    }]);