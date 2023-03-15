import { useEffect, useMemo, useState } from "react";
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { offTooltip, onTooltip, setToolPosition, setTooltipText } from "../redux/slices/tooltipSlice";

const Background = styled.div`
    background-color: blue;
    width: 200px;
    height : 200px;
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

interface NiddleProps {
    length: number;
    width: number;
    deg: number;
}

const Niddle = styled.div<NiddleProps>`
    background-color: red;
    width: ${(({ width }) => `${width}px`)};
    height: ${({ length }) => 50 * Math.min(length, 1)}%;
    transform-origin: bottom;
    transform: translateY(-50%) rotateZ(${({ deg }) => deg}deg);
    position: absolute;
    pointer-events : none;
`;

const Center = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 999px;
    pointer-events : none;

`;

export default function Clock() {
    const dispatch = useAppDispatch();
    const time: number = useAppSelector(state => state.clock.time);
    const date = useMemo(() => new Date(time), [time]);

    const [isShowingTooltip, setIsShowingTooltip] = useState(false);

    useEffect(() => {
        isShowingTooltip &&
            dispatch(setTooltipText(date.toLocaleString()));
    }, [date, dispatch, isShowingTooltip]);

    const getTimeDeg = (dateTime: Date): number => {
        return ((dateTime.getHours() % 12) / 12) * 360
            + (((dateTime.getMinutes() % 60) / 60) * (360 / 12));
    };

    const getMinDeg = (dateTime: Date): number => {
        return ((dateTime.getMinutes() % 60) / 60) * 360;
    }

    const getSecDeg = (dateTime: Date): number => {
        return ((dateTime.getSeconds() % 60) / 60) * 360;
    }

    const onMouseMove = (e: React.MouseEvent) => {
        dispatch(setToolPosition({ x: e.clientX, y: e.clientY }));
    }

    const showTooltip = () => {
        setIsShowingTooltip(true);
        dispatch(setTooltipText(date.toLocaleString()))
        dispatch(onTooltip());
    };

    const dismissTooltip = () => {
        setIsShowingTooltip(false);
        dispatch(offTooltip());
    };

    return <>
        <Background
            onMouseOver={() => showTooltip()}
            onMouseOut={() => dismissTooltip()}
            onMouseMove={onMouseMove}>
            <Niddle width={5} length={0.6} deg={getTimeDeg(date)} />
            <Niddle width={3} length={0.9} deg={getMinDeg(date)} />
            <Niddle width={1} length={0.7} deg={getSecDeg(date)} />
            <Center />
        </Background>
    </>
}

