var mod = angular.module('SurveyQuestions');
mod.factory("userFactory", ["$http", 'SP_Config',
    function ($http, SP_Config) {

        function _insert(user) {
            return new Promise((resolve, reject) => {
                $http({
                    method: 'POST',
                    url: `${SP_Config.apiUrl}/user`,
                    data: user
                }).then((res) => {
                    resolve(res);
                }, (error) => {
                    reject(error);
                });
            });
        }

        function _getAll() {
            return $http.get(`${SP_Config.apiUrl}/user`)
                .then((res) => {
                    return res.data;
                })
                .catch((err) => {
                    return err;
                });


        }

        function _login(user) {
            return new Promise((resolve, reject) => {
                $http({
                    method: 'POST',
                    url: `${SP_Config.apiUrl}/login`,
                    data: user
                }).then((res) => {
                    resolve(res);
                }, (error) => {
                    reject(error);
                });
            });
        }

        function _update(user) {

        }

        function _lock(id) {

        }

        function _getSingle(id) {

        }

        return {
            Insert: _insert,
            update: _update,
            lock: _lock,
            getSingle: _getSingle,
            getAll: _getAll,
            login: _login
        }
    }
]);
