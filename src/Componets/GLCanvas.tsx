import React from "react";
import { useEffect, useRef } from "react";
import { GLContext } from "../WebGL/GLContext";

declare interface GLCanvasProps {
    createContextFn: Function
}


export const GLCanvas = React.forwardRef<any, GLCanvasProps>((props, canvasElement) => {

    useEffect(() => {
        let canvasRef = canvasElement as React.RefObject<HTMLCanvasElement>;
        let canvas = canvasRef.current as HTMLCanvasElement;
        const _glContext = canvas.getContext("webgl2") as WebGL2RenderingContext;
        const glContext = new GLContext();
        glContext.Create(_glContext);

        props.createContextFn(glContext);
    }, []);

    return <canvas ref={canvasElement} className="GLCanvas"></canvas>;
});
