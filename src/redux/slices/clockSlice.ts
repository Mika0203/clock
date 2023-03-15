import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

interface ClockState {
    time: number,
    isStart: boolean,
    intervalTimer: NodeJS.Timer | null;
}

const initialState: ClockState = {
    time: new Date().getTime(),
    isStart: true,
    intervalTimer: null,
}


const clockSlice = createSlice({
    name: 'clock',
    initialState,
    reducers: {
        setStart: (state, { payload }: {
            payload: NodeJS.Timer | null
        }) => {
            state.isStart = true;
            state.intervalTimer != null && clearInterval(state.intervalTimer)
            state.intervalTimer = payload;
        },
        stopClock: state => {
            state.isStart = false;
            state.intervalTimer != null && clearInterval(state.intervalTimer)
        },
        updateTime: state => {
            state.time = new Date().getTime();
        }
    }
})

export const startClock = (): AppThunk => (dispatch, getState) => {
    const intervalId = setInterval(() => dispatch(updateTime()), 1000);
    dispatch(setStart(intervalId));
};

export const { setStart, stopClock, updateTime } = clockSlice.actions;
export default clockSlice.reducer;