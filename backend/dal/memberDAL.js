const db = require('../config/db');

exports.getAllMembers = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Member`;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching members:', err);
                return reject(new Error('Failed to fetch members.'));
            }
            resolve(results);
        });
    });
};

