import React, { useRef } from "react";
import { NodeState } from "reducers/nodesFilter";
import { ContentContainer } from "../ContentContainer";
import { ConnectorNode } from "../InOutNode";
import { Node, NodeProps } from "../Node";
import { NodePanel } from "../NodePanel";
import { TitleBar } from "../TitleBar";

export const GLTexture0: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "glTexture0";
    const glTexture0: NodeProps = {
        ...props,
        value: outputValue,
        nodeRefs: {
            id: props.id,
            nodeCategory: "Builtins",
            name: outputValue,
            inputDataTypes: [],
            outputDataType: "Sampler2D",
            elementRef: ref,
            nodeOutputConnectorRef: connectorRef,
            nodeInputConnectorRef: null
        }
    };

    return (
        <Node {...glTexture0}>
            <NodePanel>
                <TitleBar title="glTexture0" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node >
    )
}

export const GLTexture1: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "glTexture1";
    const glTexture0: NodeProps = {
        ...props,
        value: outputValue,
        nodeRefs: {
            id: props.id,
            nodeCategory: "Builtins",
            name: outputValue,
            inputDataTypes: [],
            outputDataType: "Sampler2D",
            elementRef: ref,
            nodeOutputConnectorRef: connectorRef,
            nodeInputConnectorRef: null
        }
    };

    return (
        <Node {...glTexture0}>
            <NodePanel>
                <TitleBar title="glTexture1" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node >
    )
}

export const GLTexture2: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "glTexture2";
    const glTexture0: NodeProps = {
        ...props,
        value: outputValue,
        nodeRefs: {
            id: props.id,
            nodeCategory: "Builtins",
            name: outputValue,
            inputDataTypes: [],
            outputDataType: "Sampler2D",
            elementRef: ref,
            nodeOutputConnectorRef: connectorRef,
            nodeInputConnectorRef: null
        }
    };

    return (
        <Node {...glTexture0}>
            <NodePanel>
                <TitleBar title="glTexture2" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node >
    )
}


export const GLTexture3: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "glTexture3";
    const glTexture0: NodeProps = {
        ...props,
        value: outputValue,
        nodeRefs: {
            id: props.id,
            nodeCategory: "Builtins",
            name: outputValue,
            inputDataTypes: [],
            outputDataType: "Sampler2D",
            elementRef: ref,
            nodeOutputConnectorRef: connectorRef,
            nodeInputConnectorRef: null
        }
    };

    return (
        <Node {...glTexture0}>
            <NodePanel>
                <TitleBar title="glTexture3" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node >
    )
}

export const GlFragColor: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "gl_FragColor";

    const computeNodeValueFn = (nodeState: NodeState[]) => {
        let _nodeValue = "";
        let _nodeValueVar = ""
        let nodeElemIndex = -1;
        let nodeElem = nodeState.find((value, index) => { nodeElemIndex = index; return value.id === props.id }) as NodeState;


        for (let input of nodeElem?.inputs) {
            if (input) {
                if (input.id) {

                    let inputNodeIndex = -1
                    let inputNode = nodeState.find((value, index) => { inputNodeIndex = index; return value.id == input.id; }) as NodeState;

                    _nodeValue = `${input.inputData.value}`;
                    _nodeValueVar = `_${input.id}`

                    if (inputNodeIndex > nodeElemIndex) {
                        nodeState[inputNodeIndex] = nodeElem;
                        nodeState[nodeElemIndex] = inputNode;
                    }
                }
            }

        }


        return [_nodeValue, _nodeValueVar];
    };

    const fragCoordProps: NodeProps = {
        ...props,
        value: outputValue,
        computeNodeValueFn,
        nodeRefs: {
            id: props.id,
            nodeCategory: "Builtins",
            name: outputValue,
            inputDataTypes: ["Vector4"],
            outputDataType: "Vector4",
            elementRef: ref,
            nodeOutputConnectorRef:
                connectorRef,
            nodeInputConnectorRef: connectorRef
        }
    };

    return (
        <Node {...fragCoordProps}>
            <NodePanel>
                <TitleBar title="gl_FragColor" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Input" ref={connectorRef} count={1} values={["In(4)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlFragCoord: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "gl_FragCoord";
    const fragCoordProps: NodeProps = { ...props, value: outputValue, nodeRefs: { id: props.id, nodeCategory: "Builtins", name: outputValue, inputDataTypes: [], outputDataType: "Vector4", elementRef: ref, nodeOutputConnectorRef: connectorRef, nodeInputConnectorRef: null } };

    return (
        <Node {...fragCoordProps}>
            <NodePanel>
                <TitleBar title="gl_FragCoord" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(4)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};


export const GlFragDepth: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "gl_FragDepth";
    const depthProps: NodeProps = { ...props, value: outputValue, nodeRefs: { id: props.id, nodeCategory: "Builtins", name: outputValue, inputDataTypes: [], outputDataType: "Float", elementRef: ref, nodeOutputConnectorRef: connectorRef, nodeInputConnectorRef: null } };

    return (
        <Node {...depthProps}>
            <NodePanel>
                <TitleBar title="gl_FragDepth" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    );
};

export const GlTime: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "iTime";
    const timeProps: NodeProps = { ...props, value: outputValue, nodeRefs: { id: props.id, nodeCategory: "Builtins", name: outputValue, inputDataTypes: [], outputDataType: "Float", elementRef: ref, nodeOutputConnectorRef: connectorRef, nodeInputConnectorRef: null } };

    return (
        <Node {...timeProps}>
            <NodePanel>
                <TitleBar title="iTime" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    );
};

export const GlResolution: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "iResolution";
    const resProps: NodeProps = { ...props, value: outputValue, nodeRefs: { id: props.id, nodeCategory: "Builtins", name: outputValue, inputDataTypes: [], outputDataType: "Vector2", elementRef: ref, nodeOutputConnectorRef: connectorRef, nodeInputConnectorRef: null } };


    return (
        <Node {...resProps}>
            <NodePanel>
                <TitleBar title="iResolution" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(2)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const GlMouseCoords: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const outputValue = "iMouseCoords";
    const mouseProps: NodeProps = { ...props, value: outputValue, nodeRefs: { id: props.id, nodeCategory: "Builtins", name: outputValue, inputDataTypes: [], outputDataType: "Vector2", elementRef: ref, nodeOutputConnectorRef: connectorRef, nodeInputConnectorRef: null } };


    return (
        <Node {...mouseProps}>
            <NodePanel>
                <TitleBar title="iMouseCoord" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(2)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};