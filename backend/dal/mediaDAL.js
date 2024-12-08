const db = require('../config/db');

exports.getPaginatedMedia = (offset, limit) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Media LIMIT ? OFFSET ?';
        db.query(query, [limit, offset], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

exports.getTotalMediaCount = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS total FROM Media';
        db.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results[0].total);
        });
    });
};
