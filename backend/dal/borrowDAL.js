const db = require('../config/db');

exports.checkMediaAvailability = (mediaId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Media WHERE media_id = ? AND quantity_available > 0';
        db.query(query, [mediaId], (err, results) => {
            if (err) {
                console.error('Error in checkMediaAvailability:', err);
                return reject(new Error('Failed to check media availability.'));
            }
            resolve(results);
        });
    });
};

exports.updateMediaQuantity = (mediaId, quantityChange) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Media SET quantity_available = quantity_available + ? WHERE media_id = ?';
        db.query(query, [quantityChange, mediaId], (err, results) => {
            if (err) {
                console.error('Error in updateMediaQuantity:', err);
                return reject(new Error('Failed to update media quantity.'));
            }
            resolve(results.affectedRows);
        });
    });
};

exports.insertBorrowingRequest = (memberId, mediaId, dueDate, pickupDeliveryChoice) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO Borrowing_Request (member_id, media_id, borrow_date, due_date, pickup_delivery_choice, status)
            VALUES (?, ?, CURDATE(), ?, ?, 'borrowed')
        `;
        db.query(query, [memberId, mediaId, dueDate, pickupDeliveryChoice], (err, results) => {
            if (err) {
                console.error('Database Error:', err);
                return reject(new Error('Failed to insert borrowing request.'));
            }
            console.log('Insert Results:', results);
            if (!results || !results.insertId) {
                return reject(new Error('Insert ID not returned.'));
            }
            resolve(results.insertId);
        });
    });
};

exports.getMemberById = (memberId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT member_id, CONCAT(member_id, '_', name) AS formatted_member, name, email, phone, address
            FROM Member
            WHERE member_id = ?
        `;
        db.query(query, [memberId], (err, results) => {
            if (err) {
                console.error('Error in getMemberById:', err);
                return reject(new Error('Failed to retrieve member details.'));
            }
            if (results.length === 0) {
                return reject(new Error('Member not found.'));
            }
            resolve(results[0]);
        });
    });
};


