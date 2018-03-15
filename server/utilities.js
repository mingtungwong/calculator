const db = require('../db');

module.exports = {
    handleResponse: (res, next, error, result) => {
        if(error) next(error);
        else if(!result) next(new Error("No result"));
        else res.send(result.rows);
    },
    handleQuery: (query, res, next) => {
        db.query(query, (error, result) => {
            this.handleResponse(res, next, error, result);
        });
    },
    handleDBTransaction: (res, queryText, handleResultsFunction) => {
        let error = false;
        (async () => {
            const client = await db.connect();
            try {
                await client.query('BEGIN');
                const { rows } = await client.query(queryText);
                await client.query('COMMIT');
            } catch(e) {
                await client.query('ROLLBACK');
                error = true;
                throw e;
            } finally {
                client.release();
                handleResultsFunction(res, rows, error);
            }
        })();
    }
}