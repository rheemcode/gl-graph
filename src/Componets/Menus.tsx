import { textureViewPanelRef } from "App";
import React, { useRef } from "react";
import { useAppSelector } from "reduxStore/hooks";
import { getGLGraphToGLSLDataType } from "Utils/helper";
import { Renderer } from "WebGL/GLRenderer";
import { GLTexture2D } from "WebGL/Texture";
import { showContext } from "./Tabs/GraphTab";

let compiledCode = ""



const CodeIcon = () => {
    return (
        <svg className="svg-icon" focusable="false" viewBox="0 0 30 30" aria-hidden="true">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
        </svg>
    )
}
export const CompileButton = () => {
    const nodeState = useAppSelector((state) => state.nodesFilter.nodeStates);
    let shaderCode = "";
    const compileGraph = () => {
        shaderCode = "";
        nodeState.forEach((nodeElement) => {
            if (nodeElement.nodeName != "gl_FragColor") {
                if (nodeElement.nodeName != "undefined")
                    shaderCode += `${getGLGraphToGLSLDataType(nodeElement.nodeDataType)} _${nodeElement.id} = ${nodeElement.props.nodeDataValue.value};\n`;
            }
            else {
                shaderCode += `gl_FragColor = ${nodeElement.props.nodeDataValue.value};`
            }
        });
        compiledCode = Renderer.UpdateCompiledShader(shaderCode);
    }

    return (
        <div className="CompileButton" onClick={() => compileGraph()}>
            <CodeIcon />
            <div>Compile</div>
        </div>
    )
}

export const AddNodeButton = () => {
    const addNewNode = (event: React.MouseEvent) => {
        const thisElem = event.currentTarget;
        showContext({ x: thisElem.getBoundingClientRect().left, y: thisElem.getBoundingClientRect().bottom + 20 });
    }

    return (
        <div className="AddButton" onClick={addNewNode}>
            <AddIcon />
            <div>Add Node</div>
        </div>
    )
}

const AddIcon = () => {
    return (
        <svg className="svg-icon" focusable="false" viewBox="0 0 30 30 " aria-hidden="true">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
    );
}



export const UploadTexture = () => {
    const handleClick = (event: React.MouseEvent) => {
        textureViewPanelRef.current?.classList.toggle("Active");
    }

    return (
        <div className="AddButton" onClick={handleClick}>
            <AddIcon />
            <div>Upload Texture</div>
        </div>
    )
}


export const Texture: React.FC<{ index: number }> = (props) => {
    const fileInputRef = useRef<HTMLInputElement>(HTMLInputElement.prototype);
    const imgRef = useRef(HTMLImageElement.prototype);

    const handleImageFile = () => {
        const inputElem = fileInputRef.current;
        const imgElem = imgRef.current;
        const imageFile = inputElem.files as FileList;
        if (imageFile.item(0)) {
            imgElem.src = URL.createObjectURL(imageFile.item(0) as File);
            imgElem.onload = () => {
                GLTexture2D.UpdateTexture(props.index, imgElem);
                URL.revokeObjectURL(inputElem.src);
            }

        }
    }


    return (
        <div className="TextureView">
            <div className="TextureViewInput">
                <input onChange={handleImageFile} accept=".png" ref={fileInputRef} type="file" name="" id="" className="TextureInput" />
                <img ref={imgRef} src="" alt="" width={"100%"} />
            </div>
            <button onClick={(event) => {
                const inputElem = fileInputRef.current;
                inputElem.click();
                event.preventDefault();
            }}>Upload</button>
        </div >
    )
}


export const TextureViewPanel = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
        <div ref={ref} className="TextureViewPanel">
            <Texture key={0} index={0} />
            <Texture key={1} index={1} />
            <Texture key={2} index={2} />
            <Texture key={3} index={3} />

        </div>
    )
});


// export const CodeView = () => {
//     return (
//         <div className={"CodeView"}>
//             <code>
//                 {

//                 }
//             </code>
//         </div>
//     )
// }


// export const SaveButton = () => {

//     return (
//         <div className="SaveButton" onClick={() => saveToStorage}>
//             <Save viewBox={"0 0 30 30"} />

//             <div >
//                 Save
//             </div>
//         </div >
//     )
// }


// export const ShowCompiledCode = () => {
//     const addNewNode = () => {

//     }

//     return (
//         //  <div className="CompileButton" onClick={() => addNewNode}>
//         <SaveIcon />
//         //    Show Code
//         //    </div>
//     )
// }

