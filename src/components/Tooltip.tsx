import styled from "styled-components"
import { useAppSelector } from "../redux/hooks";

const TooltipStyle = styled.div<{ x: number, y: number }>`
    background-color: yellow;
    padding: 5px 10px;
    z-index: 999;
    border-radius: 8px;
    position: absolute;
    left: ${state => state.x}px;
    top: ${state => state.y}px;
    pointer-events : none;

`;

export default function Tooltip() {
    const isShow = useAppSelector(state => state.tooltip.isShow);
    const position = useAppSelector(state => state.tooltip.position);
    const text = useAppSelector(state => state.tooltip.text);

    return <>
        {
            (isShow && text) &&
            <TooltipStyle x={position.x} y={position.y}>
                {text}
            </TooltipStyle>
        }
    </>
}