var mod = angular.module('SurveyQuestions');

mod.factory('supportFactory', ['$http', 'SP_Config', function ($http, SP_Config) {

    function _insert(support) {
        return $http({
            method: 'POST',
            url: `${SP_Config.apiUrl}/support`,
            data: support
        }).then((res) => {
            return 'Success';
        }, (error) => {
            return (error);
        });
    }

    function _getAll() {
        return $http.get(`${SP_Config.apiUrl}/support`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }

    return {
        Insert: _insert,
        getAll: _getAll
    };

}]);
