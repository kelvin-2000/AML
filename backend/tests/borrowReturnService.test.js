const borrowService = require('../services/borrowService');
const returnService = require('../services/returnService');
const borrowDAL = require('../dal/borrowDAL');
const returnDAL = require('../dal/returnDAL');
const fineDAL = require('../dal/fineDAL');
const notificationDAL = require('../dal/notificationDAL');

jest.mock('../dal/borrowDAL');
jest.mock('../dal/returnDAL');
jest.mock('../dal/fineDAL');
jest.mock('../dal/notificationDAL');

describe('Borrow Service Tests', () => {
    test('Successful borrow of media', async () => {
        borrowDAL.getMemberById.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });
        borrowDAL.checkMediaAvailability.mockResolvedValue([{ title: 'Test Media' }]);
        borrowDAL.updateMediaQuantity.mockResolvedValue(1);
        borrowDAL.insertBorrowingRequest.mockResolvedValue(1);
        notificationDAL.insertNotification.mockResolvedValue();

        const result = await borrowService.borrowMedia(1, 1, '2025-01-20', 'pickup');
        expect(result).toBe(1);
        expect(borrowDAL.updateMediaQuantity).toHaveBeenCalledWith(1, -1);
        expect(notificationDAL.insertNotification).toHaveBeenCalledWith(1, expect.stringContaining('Due date: 2025-01-20'));
    });

    test('Media not available for borrowing', async () => {
        borrowDAL.getMemberById.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });
        borrowDAL.checkMediaAvailability.mockResolvedValue([]);

        await expect(borrowService.borrowMedia(1, 1, '2025-01-20', 'pickup')).rejects.toThrow('Media not available.');
    });

    test('Member not found', async () => {
        borrowDAL.getMemberById.mockResolvedValue(null);

        await expect(borrowService.borrowMedia(1, 1, '2025-01-20', 'pickup')).rejects.toThrow('Member not found!');
    });
});

describe('Return Service Tests', () => {
    test('Successful return of media without fine', async () => {
        const borrowedMedia = [{ due_date: '2025-01-20', request_id: 1 }];
        returnDAL.getBorrowedMedia.mockResolvedValue(borrowedMedia);
        returnDAL.markAsReturned.mockResolvedValue();
        borrowDAL.updateMediaQuantity.mockResolvedValue(1);
        notificationDAL.insertNotification.mockResolvedValue();

        const result = await returnService.returnMedia(1, 1);
        expect(result.success).toBe(true);
        expect(result.message).toContain('returned successfully');
        expect(borrowDAL.updateMediaQuantity).toHaveBeenCalledWith(1, 1);
        expect(notificationDAL.insertNotification).toHaveBeenCalledWith(1, expect.stringContaining('returned successfully'));
    });

    test('Successful return of media with fine', async () => {
        const borrowedMedia = [{ due_date: '2025-01-01', request_id: 1 }];
        returnDAL.getBorrowedMedia.mockResolvedValue(borrowedMedia);
        returnDAL.markAsReturned.mockResolvedValue();
        borrowDAL.updateMediaQuantity.mockResolvedValue(1);
        fineDAL.insertFine.mockResolvedValue();
        notificationDAL.insertNotification.mockResolvedValue();

        const result = await returnService.returnMedia(1, 1);
        expect(result.success).toBe(true);
        expect(result.message).toContain('Charged');
        expect(fineDAL.insertFine).toHaveBeenCalledWith(1, expect.any(Number));
    });

    test('Return fails if no borrowed record is found', async () => {
        returnDAL.getBorrowedMedia.mockResolvedValue([]);

        await expect(returnService.returnMedia(1, 1)).rejects.toThrow('No borrowed record found.');
    });
});
