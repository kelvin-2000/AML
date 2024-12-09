const db = require('../config/db');

exports.getBorrowedMedia = (memberId, mediaId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM Borrowing_Request 
            WHERE member_id = ? AND media_id = ? AND status = 'borrowed'
        `;
        db.query(query, [memberId, mediaId], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

exports.markAsReturned = (requestId) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE Borrowing_Request 
            SET return_date = CURDATE(), status = 'returned' 
            WHERE request_id = ?
        `;
        db.query(query, [requestId], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};
