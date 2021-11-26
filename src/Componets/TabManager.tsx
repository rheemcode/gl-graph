import React, { useState } from "react";
import { shaderGraphWindowRef } from "../ShaderGraphWindow";
import { GLContext } from "../WebGL/GLContext";
import { graphTabRef, GraphTab } from "./Tabs/GraphTab";
import { RenderTab, glCanvasRef } from "./Tabs/RenderTab";

interface WindowProps {
    width: number;
    height: number;
    aspectRatio?: number;
}

let [windowWidth, windowHeight] = [window.innerWidth, window.innerHeight];

const TabSplit = React.forwardRef<any, {}>((props, ref) => {
    return <div className="TabSplit" ref={ref} ></div >
});


export const TabManager: React.FC = () => {
    const splitTabRef = React.createRef<HTMLDivElement>();

    let splitOffset = window.innerWidth * 0.5;
    let dragging = false;

    const computeSplitPos = (event: React.MouseEvent) => {
        if (!dragging)
            return;

        let mouseX = splitOffset >= 30 ? event.movementX : event.movementX <= 0 ? 0 : event.movementX;
        splitOffset += mouseX;

        const node = splitTabRef.current as HTMLDivElement;
        node.style.left = `${splitOffset}px`;
        onResize();
    }

    const onStartDrag = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target == splitTabRef.current) {
            let windowRef = shaderGraphWindowRef.current as HTMLDivElement;
            windowRef.style.cursor = "w-resize";
            dragging = true;
        }
    }

    const onEndDrag = () => {
        dragging = false;
        let windowRef = shaderGraphWindowRef.current as HTMLDivElement;
        windowRef.style.cursor = "auto";
    }

    const onResize = () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        let ratio = windowWidth / windowHeight;
        let computedWidth = splitOffset;
        let computedHeight = computedWidth / ratio;
        let canvas = glCanvasRef.current as HTMLCanvasElement;
        canvas.width = computedWidth;
        canvas.height = computedHeight;
        canvas.style.width = computedWidth + "px";
        canvas.style.height = computedHeight + "px";

        let graphTab = graphTabRef.current as HTMLDivElement;
        graphTab.style.width = (windowWidth - computedWidth) + "px";
        GLContext.Viewport(0, 0, computedWidth, windowHeight);
    }

    window.onresize = onResize;

    return (
        <div className="TabManager" onMouseDown={onStartDrag} onMouseUp={onEndDrag} onMouseMove={computeSplitPos}>
            <RenderTab />
            <TabSplit ref={splitTabRef} />
            <GraphTab />
        </div >
    );
}
