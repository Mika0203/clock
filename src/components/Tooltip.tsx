import styled from "styled-components"
import { useAppSelector } from "../redux/hooks";

const TooltipStyle = styled.div`
    background-color: black;
    color: white;
    padding: 5px 10px;
    z-index: 999;
    border-radius: 8px;
    position: absolute;
    pointer-events : none;
`;

export default function Tooltip() {
    const isShow = useAppSelector(state => state.tooltip.isShow);
    const position = useAppSelector(state => state.tooltip.position);
    const text = useAppSelector(state => state.tooltip.text);

    return <>
        {
            (isShow && text) &&
            <TooltipStyle style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }} >
                {text}
            </TooltipStyle>
        }
    </>
}