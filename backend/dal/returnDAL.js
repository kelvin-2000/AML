const db = require('../config/db');

// Get borrowed media record
exports.getBorrowedMedia = (memberId, mediaId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM BorrowingRequest 
            WHERE member_id = ? AND media_id = ? AND status = 'borrowed'
        `;
        db.query(query, [memberId, mediaId], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Mark media as returned
exports.markAsReturned = (requestId) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE BorrowingRequest 
            SET return_date = CURDATE(), status = 'returned' 
            WHERE request_id = ?
        `;
        db.query(query, [requestId], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};
