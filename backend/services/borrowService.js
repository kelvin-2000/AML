const borrowDAL = require('../dal/borrowDAL');
const notificationDAL = require('../dal/notificationDAL');

exports.borrowMedia = async (memberId, mediaId, dueDate, pickupDeliveryChoice) => {
    const media = await borrowDAL.checkMediaAvailability(mediaId);
    if (media.length === 0) throw new Error('Media not available.');

    await borrowDAL.updateMediaQuantity(mediaId, -1);
    const requestId = await borrowDAL.insertBorrowingRequest(memberId, mediaId, dueDate, pickupDeliveryChoice);

    const message = `You borrowed media (ID: ${mediaId}). Due date: ${dueDate}.`;
    await notificationDAL.insertNotification(memberId, message);

    return requestId;
};
