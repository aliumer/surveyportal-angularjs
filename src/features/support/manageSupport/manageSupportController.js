
var mod = angular.module('SurveyQuestions');
mod.controller("manageSupportController", ["$scope", "supportFactory", "$location",
    function ($scope, supportFactory, $location) {

        $scope.title = "Support here";

        supportFactory.getAll()
            .then((data) => {
                $scope.supportlist = data;
            }, (error) => {
                console.log('error::', error);
            })

        $scope.onEditSupportClick = (Id) => {
            $location.path('/supportinfo/' + Id);
        };
    }]);