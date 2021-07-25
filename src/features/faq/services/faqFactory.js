var mod = angular.module('SurveyQuestions');
mod.factory("faqFactory", ['$http', 'SP_Config', function ($http, SP_Config) {

    function _insert(faq) {
        return $http({
            method: 'POST',
            url: `${SP_Config.apiUrl}/faq`,
            data: faq
        }).then((res) => {
            return 'Success';
        }, (error) => {
            return (error);
        });
    }

    function _update(faq) {
        return $http({
            method: 'PUT',
            url: `${SP_Config.apiUrl}/faq`,
            data: faq
        }).then((res) => {
            return 'Success';
        }, (error) => {
            return (error);
        });
    }

    function _getAll() {
        return $http.get(`${SP_Config.apiUrl}/faq`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }

    function _delete(id) {
        return $http.delete(`${SP_Config.apiUrl}/faq/${id}`)
            .then((data) => {
                return data;
            }).catch((err) => {
                return err;
            })
    }

    function _getSingle(id) {
        return $http.get(`${SP_Config.apiUrl}/faq/${id}`)
            .then((data) => {
                return data;
            }).catch((err) => {
                return err;
            })
    }

    return {
        Insert: _insert,
        Update: _update,
        GetAll: _getAll,
        Delete: _delete,
        GetSingle: _getSingle
    };
}]);

