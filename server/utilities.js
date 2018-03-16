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
    },
    handleDBTransaction: function(res, queryText, handleResultsFunction) {
        let error = false;
        let resultingRows;
        (async () => {
            const client = await db.connect();
            try {
                await client.query('BEGIN');
                const { rows } = await client.query(queryText);
                resultingRows = rows;
                await client.query('COMMIT');
            } catch(e) {
                await client.query('ROLLBACK');
                error = true;
                throw e;
            } finally {
                client.release();
                handleResultsFunction(res, resultingRows, error);
            }
        })();
    },
    simpleDBTransactionResponseHandler: (res, rows, error) => {
        if(error) res.sendStatus(500);
        else if(rows) res.json(rows);
        else res.sendStatus(200);
    }
}