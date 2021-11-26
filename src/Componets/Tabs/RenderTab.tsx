
import React from "react";
import { useState, useEffect } from "react";
import { GLContext } from "../../WebGL/GLContext";
import { Renderer } from "../../WebGL/GLRenderer";
import { GLCanvas } from "../GLCanvas";


export const glCanvasRef = React.createRef<HTMLCanvasElement>();

export const RenderTab: React.FC = (props) => {
    const [glRenderer, setContext] = useState<GLContext>(GLContext.prototype);

    useEffect(() => {
        Renderer.Create();
        requestAnimationFrame(Renderer.OnRender)

    }, [glRenderer]);


    return (
        <div className="RenderTab">
            <GLCanvas ref={glCanvasRef} createContextFn={setContext} />
        </div>
    );
};
