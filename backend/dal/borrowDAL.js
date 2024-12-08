const db = require('../config/db');

// Check media availability
exports.checkMediaAvailability = (mediaId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Media WHERE media_id = ? AND quantity_available > 0';
        db.query(query, [mediaId], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Update media quantity
exports.updateMediaQuantity = (mediaId, quantityChange) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Media SET quantity_available = quantity_available + ? WHERE media_id = ?';
        db.query(query, [quantityChange, mediaId], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

// Insert borrowing request
exports.insertBorrowingRequest = (memberId, mediaId, dueDate, pickupDeliveryChoice) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO BorrowingRequest (member_id, media_id, borrow_date, due_date, pickup_delivery_choice, status)
            VALUES (?, ?, CURDATE(), ?, ?, 'borrowed')
        `;
        db.query(query, [memberId, mediaId, dueDate, pickupDeliveryChoice], (err, results) => {
            if (err) reject(err);
            resolve(results.insertId);
        });
    });
};
