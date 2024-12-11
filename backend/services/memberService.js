const memberDAL = require('../dal/memberDAL');

exports.getMemberListWithFormattedField = async () => {
    try {
        const members = await memberDAL.getAllMembers();
        const formattedMembers = members.map(member => ({
            ...member,
            formattedMember: `${member.member_id}_${member.name}`
        }));
        return { members: formattedMembers };
    } catch (err) {
        console.error('Error in memberService:', err);
        throw err;
    }
};
