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


// const db = require('../config/db');
//
// exports.calculateFine = (requestId) => {
//     return new Promise((resolve, reject) => {
//         const query = `
//             SELECT DATEDIFF(CURDATE(), due_date) AS overdue_days
//             FROM Borrowing_Request
//             WHERE request_id = ? AND status = 'borrowed'
//         `;
//         db.query(query, [requestId], (err, results) => {
//             if (err) {
//                 console.error('Error calculating fine:', err);
//                 return reject(new Error('Failed to calculate fine.'));
//             }
//             const overdueDays = results[0]?.overdue_days || 0;
//             const fineAmount = overdueDays > 0 ? overdueDays * 5 : 0;
//             resolve(fineAmount);
//         });
//     });
// };
//
// exports.addFine = (memberId, amount) => {
//     return new Promise((resolve, reject) => {
//         const query = `
//             INSERT INTO Fine (member_id, amount, status)
//             VALUES (?, ?, 'unpaid')
//         `;
//         db.query(query, [memberId, amount], (err) => {
//             if (err) {
//                 console.error('Error inserting fine:', err);
//                 return reject(new Error('Failed to add fine.'));
//             }
//             resolve();
//         });
//     });
// };
//
// exports.markAsReturned = (requestId) => {
//     return new Promise((resolve, reject) => {
//         const query = `
//             UPDATE Borrowing_Request
//             SET return_date = CURDATE(), status = 'returned'
//             WHERE request_id = ?
//         `;
//         db.query(query, [requestId], (err) => {
//             if (err) reject(err);
//             resolve();
//         });
//     });
// };
