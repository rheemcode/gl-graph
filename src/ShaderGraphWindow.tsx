import React from "react";
import { TabManager } from "./Componets/TabManager";

export const ShaderGraphWindow: React.FC = () => {

    return (
        <div ref={shaderGraphWindowRef}>
            <TabManager />
        </div>
    );
};

export const shaderGraphWindowRef = React.createRef<HTMLDivElement>();