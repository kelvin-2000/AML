const mediaDAL = require('../dal/mediaDAL');

exports.getMediaList = async (page, limit) => {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const offset = (pageNumber - 1) * limitNumber;

    const mediaList = await mediaDAL.getPaginatedMedia(offset, limitNumber);
    const totalCount = await mediaDAL.getTotalMediaCount();

    return {
        data: mediaList,
        total: totalCount,
        page: pageNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
    };
};
