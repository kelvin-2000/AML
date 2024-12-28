const borrowDAL = require('../dal/borrowDAL');
const notificationDAL = require('../dal/notificationDAL');
const members = require("../dal/borrowDAL");
const mailSending = require("./EmailSendingService");

exports.borrowMedia = async (memberId, mediaId, dueDate, pickupDeliveryChoice) => {
    const member = await members.getMemberById(memberId);
    
    if (!member) throw new Error('Member not found!');

    const media = await borrowDAL.checkMediaAvailability(mediaId);
    if (media.length === 0) throw new Error('Media not available.');

    await borrowDAL.updateMediaQuantity(mediaId, -1);
    const requestId = await borrowDAL.insertBorrowingRequest(memberId, mediaId, dueDate, pickupDeliveryChoice);

    const message = `You borrowed media (ID: ${mediaId}). Due date: ${dueDate}.`;
    await notificationDAL.insertNotification(memberId, message);

    await mailSending.sendEmail(member.name, media[0].title, dueDate, pickupDeliveryChoice,member.email);

    return requestId;
};
