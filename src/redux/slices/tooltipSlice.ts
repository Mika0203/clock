import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Position {
    x: number,
    y: number,
}

interface TooltipState {
    isShow: boolean,
    position: Position
    text: String,
}

const initialState: TooltipState = {
    isShow: false,
    text: '',
    position: {
        x: 0,
        y: 0,
    }
}


const tooltipSlice = createSlice({
    name: 'clock',
    initialState,
    reducers: {
        onTooltip: (state) => { state.isShow = true },
        offTooltip: (state) => { state.isShow = false },
        setToolPosition: (state, action: PayloadAction<Position>) => { state.position = action.payload; },
        setTooltipText: (state, action: PayloadAction<String>) => { state.text = action.payload; }
    }
})

export const { onTooltip, offTooltip, setToolPosition, setTooltipText } = tooltipSlice.actions;
export default tooltipSlice.reducer;