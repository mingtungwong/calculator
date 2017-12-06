const db = require('../db');

module.exports = {
    handleResponse: (res, next, error, result) => {
        if(error) next(error);
        else if(!result) next(new Error("No result"));
        else res.send(result.rows);
    },
    handleQuery: function(query, res, next) {
        db.query(query, (error, result) => {
            this.handleResponse(res, next, error, result);
        });
    }
}