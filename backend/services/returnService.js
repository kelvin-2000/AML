// const returnDAL = require('../dal/returnDAL');
// const borrowDAL = require('../dal/borrowDAL');
// const notificationDAL = require('../dal/notificationDAL');
//
// exports.returnMedia = async (memberId, mediaId) => {
//     const borrowed = await returnDAL.getBorrowedMedia(memberId, mediaId);
//     if (borrowed.length === 0) throw new Error('No borrowed record found.');
//
//     const request = borrowed[0];
//     await returnDAL.markAsReturned(request.request_id);
//     await borrowDAL.updateMediaQuantity(mediaId, 1);
//
//     const message = `Media (ID: ${mediaId}) returned successfully.`;
//     await notificationDAL.insertNotification(memberId, message);
//
//     return { success: true };
// };


const returnDAL = require('../dal/returnDAL');

exports.returnMedia = async (requestId, memberId) => {
    const fineAmount = await returnDAL.calculateFine(requestId);

    if (fineAmount > 0) {
        await returnDAL.addFine(memberId, fineAmount);
    }

    await returnDAL.markAsReturned(requestId);

    return {
        message: 'Media returned successfully',
        fine: fineAmount > 0 ? `A fine of $${fineAmount} has been applied.` : 'No fine applied.',
    };
};
