var mod = angular.module("SurveyQuestions");
mod.controller("LoginController", ["$scope", "userFactory",
    function ($scope, userFactory) {
        $scope.title = "Login";
        $scope.user = {email: 'adnan@getnada.com', password: 'Test123!!!'};
        $scope.err = false;
        $scope.onLoginClick = () => {
            userFactory.login($scope.user)
                .then((response) => {
                    // TODO: redirect to required page.
                    console.log('Response:', response);
                    $scope.err = false;
                    $scope.msg = '';
                }, (err) => {
                    $scope.err = true;
                    $scope.msg = err.data;
                });
        };

    }
]);
