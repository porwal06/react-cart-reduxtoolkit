import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {isVisible: false, notification: null},
    reducers: {
        toggle(state) {
            state.isVisible = !state.isVisible;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            };
        }
    }    
});

export const uiAction = uiSlice.actions;
export default uiSlice;


