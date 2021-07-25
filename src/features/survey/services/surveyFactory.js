
var mod = angular.module('SurveyQuestions');
mod.factory("surveyFactory", ["$http", 'SP_Config',
    function ($http, SP_Config) {

        function _AddQuestion(question) {
            return $http({
                method: 'POST',
                url: `${SP_Config.apiUrl}/addquestion`,
                data: question
            }).then((res) => {
                return 'Success';
            }, (error) => {
                return (error);
            });
        }

        function _surveyList() {
            return $http.get(`${SP_Config.apiUrl}/survey`)
                .then((res) => {
                    return res.data;
                })
                .catch((err) => {
                    return err;
                });
        }
        return {
            AddQuestion: _AddQuestion,
            getAll: _surveyList
        }

    }
]);