import { fetch_users, select_user } from "../types/userType";

export const fetchUserAction = payload =>({
    type:fetch_users,
    payload
})

export const selectUserAction = payload =>({
    type: select_user,
    payload
})