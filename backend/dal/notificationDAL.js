const db = require('../config/db');

exports.insertNotification = (memberId, message) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO Notification (member_id, message, notification_date)
            VALUES (?, ?, NOW())
        `;
        db.query(query, [memberId, message], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};
