const db = require('../config/db');


exports.insertFine = (memberId, amount) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO Fine (member_id, amount, status)
            VALUES (?, ?, 'paid')
        `;

        db.query(query, [memberId, amount], (err, results) => {
            if (err) {
                console.error('Error in insertFine:', err);
                return reject(new Error('Failed to insert fine.'));
            }

            if (!results || !results.insertId) {
                return reject(new Error('Failed to get insert ID for fine.'));
            }

            resolve(results.insertId);
        });
    });
};
