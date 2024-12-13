const returnDAL = require('../dal/returnDAL');
const borrowDAL = require('../dal/borrowDAL');
const notificationDAL = require('../dal/notificationDAL');
const fineDAL = require("../dal/fineDAL");

const calculateFine = (today, dueDate) => {
    const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
    const finePerDay = 5;
    return daysLate * finePerDay;
};

exports.returnMedia = async (memberId, mediaId) => {
    let fine = false;
    let fineAmount;
    const todayData = new Date();
    const borrowed = await returnDAL.getBorrowedMedia(memberId, mediaId);

    if (borrowed.length === 0) throw new Error('No borrowed record found.');

    const request = borrowed[0];

    const dueDate = new Date(request.due_date);
    if (todayData > dueDate) {
        fineAmount = calculateFine(todayData, dueDate);
        await fineDAL.insertFine(memberId, fineAmount);
        fine = true;
    }
    await returnDAL.markAsReturned(request.request_id);
    await borrowDAL.updateMediaQuantity(mediaId, 1);

    const message = fine !== true ? `Media (ID: ${mediaId}) returned successfully.` : `Charged ${fineAmount}$ because of over due date !!`;
    await notificationDAL.insertNotification(memberId, message);

    return {success: true, message};
};


