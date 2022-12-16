import { Post } from "services";
import { ApiPath } from "paths";

export const searchInventorySummary = async (body) => {
    const res = await Post(ApiPath.SEARCH_INVENTORY, body);
    return res;
};