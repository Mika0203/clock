import styled from "styled-components"
import { useAppSelector } from "../redux/hooks";

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
`;

const Center = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 999px;
`;

export default function Clock() {
    const time: number = useAppSelector(state => state.clock.time);
    const getDateFromTime = (time: number) => new Date(time);

    const getTimeDeg = (time: number): number => {
        const date = getDateFromTime(time);
        return ((date.getHours() % 12) / 12) * 360
            + (((date.getMinutes() % 60) / 60) * (360 / 12));
    };

    const getMinDeg = (time: number): number => {
        return ((getDateFromTime(time).getMinutes() % 60) / 60) * 360;
    }

    const getSecDeg = (time: number): number => {
        return ((getDateFromTime(time).getSeconds() % 60) / 60) * 360;
    }

    return <>
        <Background>
            <Niddle width={5} length={0.6} deg={getTimeDeg(time)} />
            <Niddle width={3} length={0.9} deg={getMinDeg(time)} />
            <Niddle width={1} length={0.7} deg={getSecDeg(time)} />
            <Center />
        </Background>
    </>
}

