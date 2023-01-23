import { produce } from "immer";
import { fetch_users, select_user } from "../types/userType";

const initialState = {
    users: [],
    selectedUser: null
}
export const userReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case fetch_users: {
                draft.users = action.payload
            }
            case select_user: {
                draft.selectedUser = action.payload
            }
        }
    })
}