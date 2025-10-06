import User from '~~/server/models/User';
import { getUserFromEvent } from "~~/server/utils/getUserFromEvent";

export default defineEventHandler(async (event) => {
    const user = await getUserFromEvent(event);
    if (!user) {
        setResponseStatus(event, 401);
        return { error: "Unauthorized" };
    }

    const dbInfo = await User.findById(user.id)
    if (!dbInfo) {
        setResponseStatus(event, 404)
        return { error: 'User not found' }
    }

    const dd: string = String(dbInfo.joinDate.getDate()).padStart(2, '0');
    const mm: string = String(dbInfo.joinDate.getMonth() + 1).padStart(2, '0');
    const yyyy: string = dbInfo.joinDate.getFullYear();

    const formattedDate: string = dd + '.' + mm + '.' + yyyy;

    return {
        id: dbInfo._id.toString(),
        username: dbInfo.username,
        email: dbInfo.email,
        joinDate: formattedDate,
        isPremium: dbInfo.isPremium
    }
});
