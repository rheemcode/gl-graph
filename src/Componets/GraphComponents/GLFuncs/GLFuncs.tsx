import React, { useRef, useState } from "react";
import { defaultNodeState, GLType, NodeState } from "reducers/nodesFilter";
import { useAppDispatch, useAppSelector } from "reduxStore/hooks";
import { computeNodeValue } from "Utils/helper";
import { ContentContainer } from "../ContentContainer";
import { ConnectorNode, TextInputNode } from "../InOutNode";
import { Node, NodeProps } from "../Node";
import { NodePanel } from "../NodePanel";
import { TitleBar } from "../TitleBar";

const numDataTypes: GLType[] = ["Integer", "Float"]
const vecDataTypes: GLType[] = ["Vector2", "Vector3", "Vector4"]
const matDataTypes: GLType[] = ["Matrix3", "Matrix4"]
const allDataTypes: GLType[] = [...numDataTypes, ...vecDataTypes, ...matDataTypes];

export const GlTexture: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "texture";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        computeNodeValueFn: computeNodeValue(props.id, nodeName, 2, ",", true),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Texture",
            inputDataTypes: [...vecDataTypes, "Sampler2D"],
            outputDataType: "Vector4",
            name: "texture",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef,

        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["In(1)", "In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlTexelFetch: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "texelFetch";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        computeNodeValueFn: computeNodeValue(props.id, nodeName, 2, ",", true),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Texture",
            inputDataTypes: [...vecDataTypes, "Sampler2D"],
            outputDataType: "Vector4",
            name: "texelFetch",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef,

        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["In(1)", "In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlTextureGather: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "textureGather";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        computeNodeValueFn: computeNodeValue(props.id, nodeName, 2, ",", true),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Texture",
            inputDataTypes: [...vecDataTypes, "Sampler2D"],
            outputDataType: "Vector4",
            name: "textureGather",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef,

        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["In(1)", "In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlTextureProj: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "textureProj";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        computeNodeValueFn: computeNodeValue(props.id, nodeName, 2, ",", true),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Texture",
            inputDataTypes: [...vecDataTypes, "Sampler2D"],
            outputDataType: "Vector4",
            name: "textureProj",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef,

        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["In(1)", "In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlTextureSize: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "textureSize";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        computeNodeValueFn: computeNodeValue(props.id, nodeName, 1, ",", true),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Texture",
            inputDataTypes: [...vecDataTypes, "Sampler2D"],
            outputDataType: "Vector2",
            name: "textureSize",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef,

        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};


export const GlAdd: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "add";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        computeNodeValueFn: computeNodeValue(props.id, "", 2, "+"),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: "add",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef,

        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["In(1)", "In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlSubstract: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "substract";
    let nodeValue = "";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "", 2, "-"),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["In(1)", "In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlMultiply: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "multiply";

    let nodeValue = "";



    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "", 2, "*"),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: allDataTypes,
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="multiply" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["In(1)", "In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlDivide: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "divide";

    let nodeValue = "";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "", 2, "/"),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: allDataTypes,
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="divide" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["In(1)", "In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlAbs: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "abs";
    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "abs", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="abs" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlCeil: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "ceil";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "ceil", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="ceil" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlFloor: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "floor";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "floor", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };
    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="floor" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlFract: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "fract";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "fract", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };
    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="fract" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlInvSqrt: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "inversesqrt";


    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "inversesqrt", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="inversesqrt" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlInf: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "isinf";


    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "isinf", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Boolean",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="isinf" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlNan: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "isnan";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "isnan", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Boolean",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };
    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="isnan" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlMod: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "mod";

    let nodeValue = "";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "mod", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };
    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="mod" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlMin: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "min";

    let nodeValue = "min(0, 0)";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "min", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="min" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlMax: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "max";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "max", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="max" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlLog: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "log";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "log", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="log" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};


export const GlLog2: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "log2";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "log2", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="log2" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlNoise: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "noise";


    const glProps: NodeProps = {
        ...props,
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="noise" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlPow: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "pow";

    let nodeValue = "";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "pow", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="pow" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};


export const GlRound: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "round";

    let nodeValue = "";
    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "round", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="round" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlRoundEven: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "roundEven";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "roundEven", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title="roundEven" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};


export const GlSign: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "sign";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "sign", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlSmoothstep: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "smoothstep";


    let nodeValue = "";



    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "smoothstep", 3),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={3} values={["E1(1)", "E2(1)", "X(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlSqrt: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "sqrt";


    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "sqrt", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlStep: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "step";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "step", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["E1(1)", "X(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlTrunc: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "trunc";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "trunc", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlClamp: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "clamp";

    let nodeValue = "";



    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "clamp", 3),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={3} values={["Val(1)", "min(1)", "max(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlExp: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "exp";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "exp", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["Val(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlExp2: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "exp2";


    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "exp2", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

// Trigonometry Functions
export const GlAcos: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "acos";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "acos", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlAtan: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "atan";


    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "atan", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlTan: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "tan";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "atan", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlTanH: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "tanh";


    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "tanh", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlAtanH: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "atanh";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "atanh", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };



    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlCos: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "cos";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "cos", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlCosH: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "cosh";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "cosh", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlAcosH: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "acosh";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "acosh", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    ;

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlSin: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "sin";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "sin", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };



    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlSinH: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "sinh";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "sinh", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlASin: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "asin";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "asin", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };



    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlASinH: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "asinh";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "asinh", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlDegrees: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "degrees";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "degrees", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };



    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlRadians: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "radians";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "radians", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Trigonometry",
            inputDataTypes: [...numDataTypes, ...vecDataTypes],
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };



    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["In(1)",]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

// Vectors Manipulation
export const GlCross: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "cross";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "cross", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: vecDataTypes,
            outputDataType: "Vector",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlDot: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "dot";
    let nodeValue = "";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "dot", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: vecDataTypes,
            outputDataType: "Float",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlDistance: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "distance";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "distance", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: vecDataTypes,
            outputDataType: "Vector",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlEqual: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "equal";
    let nodeValue = "";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "equal", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: allDataTypes,
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlNotEqual: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "notEqual";
    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "notEqual", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: allDataTypes,
            outputDataType: "Any",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlFaceForward: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "faceforward";
    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "faceforward", 3),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: vecDataTypes,
            outputDataType: "Vector",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={3} values={["X(1)", "Y(1)", "R(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlLength: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "length";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "length", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: vecDataTypes,
            outputDataType: "Float",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["X(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlNormalize: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "normalize";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "normalize", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: vecDataTypes,
            outputDataType: "Vector",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["X(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlReflect: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "reflect";
    let nodeValue = "";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "reflect", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: vecDataTypes,
            outputDataType: "Vector",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["I(1)", "N(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlRefract: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "refract";

    let nodeValue = "";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "refract", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Vector",
            inputDataTypes: vecDataTypes,
            outputDataType: "Vector",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["I(1)", "N(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

// Matrix Manipulation

export const GlDeterminant: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "determinant";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "determinant", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Matrix",
            inputDataTypes: matDataTypes,
            outputDataType: "Matrix",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["M(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlInverse: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "inverse";

    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "inverse", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Matrix",
            inputDataTypes: matDataTypes,
            outputDataType: "Matrix",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["M(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlTranspose: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "transpose";
    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "transpose", 1),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Matrix",
            inputDataTypes: matDataTypes,
            outputDataType: "Matrix",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["M(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlMatCompMult: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "matrixCompMult";
    let nodeValue = "";

    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "matrixCompMult", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Matrix",
            inputDataTypes: matDataTypes,
            outputDataType: "Matrix",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["M1(1)", "M2(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlOuterProduct: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeName = "outerProduct";

    let nodeValue = "";


    const glProps: NodeProps = {
        ...props,
        value: nodeValue,
        computeNodeValueFn: computeNodeValue(props.id, "outerProduct", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Matrix",
            inputDataTypes: matDataTypes,
            outputDataType: "Matrix",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["V1(1)", "V2(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlSelect: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeDispatch = useAppDispatch();
    const nodeStates = useAppSelector((state) => state.nodesFilter.nodeStates)
    const nodeName = "select";

    const selectedIndex = useRef("x");
    const nodeValue = useRef("");
    //const [selectedIndex, setSelectedIndex] = useState({ value: "x" });

    const computeNodeValueFn = (nodeState: NodeState[], s = "") => {
        let _nodeValue = "";
        let _nodeValueVar = ""
        let nodeElemIndex = -1;
        let nodeElem = nodeState.find((value, index) => { nodeElemIndex = index; return value.id === props.id }) as NodeState;
        nodeValue.current = "";

        for (let input of nodeElem?.inputs) {
            if (input) {
                if (input.id) {

                    let inputNodeIndex = -1
                    let inputNode = nodeState.find((value, index) => { inputNodeIndex = index; return value.id == input.id; }) as NodeState;

                    _nodeValue = `${input.inputData.value}.${selectedIndex.current}`;
                    _nodeValueVar = `_${input.id}.${selectedIndex.current}`

                    if (inputNodeIndex > nodeElemIndex) {
                        nodeState[inputNodeIndex] = nodeElem;
                        nodeState[nodeElemIndex] = inputNode;
                    }
                    nodeValue.current = _nodeValue;
                }
            }

        }

        return [_nodeValue, _nodeValueVar];
    };

    const glProps: NodeProps = {
        ...props,
        value: nodeValue.current,
        computeNodeValueFn,
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Math",
            inputDataTypes: [...vecDataTypes],
            outputDataType: "Float",
            name: nodeName,
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {

            const value = event.target.value.toLowerCase();

            if (value === "x" || value === "r") {
                selectedIndex.current = "x"
                //  setSelectedIndex({ value: "x" });
            }

            else if (value === "y" || value === "g") {
                selectedIndex.current = "y"
                //   setSelectedIndex({ value: "y" });
            }
            else if (value === "z" || value === "b") {
                selectedIndex.current = "z"
                //        setSelectedIndex({ value: "z" });
            }
            else if (value === "w" || value === "a") {
                selectedIndex.current = "w"
                //   setSelectedIndex({ value: "w" });
            };


            let s = "";
            const [_nodeValue, _nodeValueVar] = computeNodeValueFn(nodeStates, s);
            console.log(_nodeValueVar);

            nodeDispatch({
                type: "UPDATE_NODE_VALUE",
                payload: {
                    ...defaultNodeState,
                    id: props.id,
                    props: {
                        x: 0, y: 0,
                        refs: null,
                        nodeDataValue: { value: _nodeValueVar }
                    }
                }
            });
        }
    }

    return (
        <Node {...glProps}>
            <NodePanel>
                <TitleBar title={nodeName} />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={1} values={["V1(1)", "V2(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
                <TextInputNode onChangeFn={onValueChanged} />
            </NodePanel>
        </Node>
    )
};
