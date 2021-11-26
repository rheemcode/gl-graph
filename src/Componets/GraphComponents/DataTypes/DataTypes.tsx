import React, { useRef } from "react";
import { BoolType, GLType, defaultNodeState, FloatType, IntType, NodeDispatch } from "reducers/nodesFilter";
import { useAppDispatch, useAppSelector } from "reduxStore/hooks";
import { computeNodeValue } from "Utils/helper";
import { ContentContainer } from "../ContentContainer";
import { TextInputNode, BoolInputNode, ConnectorNode } from "../InOutNode";
import { Node, NodeProps } from "../Node";
import { NodePanel } from "../NodePanel";
import { TitleBar } from "../TitleBar";

const vectorInputTypes: GLType[] = ["Integer", "Float"]

export const Integer: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const nodeDispatch: React.Dispatch<NodeDispatch> = useAppDispatch()
    let nodeValue: IntType = 0;
    const intProps: NodeProps = { ...props, value: nodeValue.toString(), nodeRefs: { id: props.id, nodeCategory: "Data Types", name: "Integer", inputDataTypes: [], outputDataType: "Integer", elementRef: ref, nodeOutputConnectorRef: connectorRef, nodeInputConnectorRef: null } };

    const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            const value = Number(event.target.value);
            if (value) {
                nodeValue = value;
                nodeDispatch({
                    type: "UPDATE_NODE_VALUE",
                    payload: {
                        ...defaultNodeState,
                        id: props.id,
                        props: {
                            x: 0, y: 0,
                            refs: null,
                            nodeDataValue: { value: value }
                        }
                    }
                })
            }
        }
    }

    return (
        <Node {...intProps}>
            <NodePanel>
                <TitleBar title="Integer" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
                <TextInputNode onChangeFn={onValueChanged} />
            </NodePanel>
        </Node>
    );
};

export const Boolean: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    let nodeValue: BoolType = false;
    const boolProps: NodeProps = { ...props, value: nodeValue.toString(), nodeRefs: { id: props.id, nodeCategory: "Data Types", name: "Boolean", inputDataTypes: [], outputDataType: "Boolean", elementRef: ref, nodeOutputConnectorRef: connectorRef, nodeInputConnectorRef: null } };

    const nodeDispatch: React.Dispatch<NodeDispatch> = useAppDispatch();

    const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        nodeValue = event.target.checked;
        nodeDispatch({
            type: "UPDATE_NODE_VALUE",
            payload: {
                ...defaultNodeState,
                id: props.id,
                props: {
                    x: 0, y: 0,
                    refs: null,
                    nodeDataValue: { value: nodeValue }
                }
            }
        })
    }

    return (
        <Node {...boolProps}>
            <NodePanel>
                <TitleBar title="Boolean" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
                <BoolInputNode onChangeFn={onValueChanged} />
            </NodePanel>
        </Node>
    );
};


export const Float: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const connectorRef = useRef(HTMLDivElement.prototype);
    const EPSILON = 0.00001;
    let nodeValue: FloatType = 0.0 + EPSILON;
    const floatProps: NodeProps = { ...props, value: nodeValue.toString(), nodeRefs: { id: props.id, nodeCategory: "Data Types", name: "Float", inputDataTypes: [], outputDataType: "Float", elementRef: ref, nodeOutputConnectorRef: connectorRef, nodeInputConnectorRef: null } };

    const nodeDispatch: React.Dispatch<NodeDispatch> = useAppDispatch();
    const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            const value = Number(event.target.value) + EPSILON;

            if (value) {
                nodeValue = value;
                nodeDispatch({
                    type: "UPDATE_NODE_VALUE",
                    payload: {
                        ...defaultNodeState,
                        id: props.id,
                        props: {
                            x: 0, y: 0,
                            refs: null,
                            nodeDataValue: { value: value }
                        }
                    }
                })
            }
        }
    }
    return (
        <Node {...floatProps}>
            <NodePanel>
                <TitleBar title="Float" />
                <ContentContainer flex={false}>
                    <ConnectorNode type="Output" ref={connectorRef} count={1} values={["Out(1)"]} />
                </ContentContainer>
                <TextInputNode onChangeFn={onValueChanged} />
            </NodePanel>
        </Node>
    );
};


export const Vector2: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);

    let nodeValue = "vec2(0, 0)";


    const vector2Props: NodeProps = {
        ...props,
        value: nodeValue.toString(),
        computeNodeValueFn: computeNodeValue(props.id, "vec2", 2),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Data Types",
            name: "Vector2",
            inputDataTypes: vectorInputTypes,
            outputDataType: "Vector2",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node  {...vector2Props} >
            <NodePanel>
                <TitleBar title="Vector2" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={2} values={["X(1)", "Y(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(2)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};


export const Vector3: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);
    const nodeState = useAppSelector((state) => state.nodesFilter.nodeStates);
    let nodeValue = "vec3(0, 0, 0)";


    const vector3Props: NodeProps = {
        ...props,
        value: nodeValue.toString(),
        computeNodeValueFn: computeNodeValue(props.id, "vec3", 3),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Data Types",
            name: "Vector3",
            inputDataTypes: vectorInputTypes,
            outputDataType: "Vector3",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...vector3Props}>
            <NodePanel>
                <TitleBar title="Vector3" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={3} values={["X(1)", "Y(1)", "Z(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(3)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};


export const Vector4: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);

    let nodeValue = "vec4(0, 0, 0, 0)";

    const vector4Props: NodeProps = {
        ...props,
        value: nodeValue.toString(),
        computeNodeValueFn: computeNodeValue(props.id, "vec4", 4),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Data Types",
            name: "Vector4",
            inputDataTypes: vectorInputTypes,
            outputDataType: "Vector4",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };


    return (
        <Node {...vector4Props}>
            <NodePanel>
                <TitleBar title="Vector4" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={4} values={["X(1)", "Y(1)", "Z(1)", "W(1)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(4)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};


export const Matrix3: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);

    // const nodeState = useAppSelector((state) => state.nodesFilter.nodeStates);
    let nodeValue = "mat3(vec3(0, 0, 0), vec3(0, 0, 0), vec3(0, 0, 0))";


    const mat3Props: NodeProps = {
        ...props,
        value: nodeValue.toString(),
        computeNodeValueFn: computeNodeValue(props.id, "mat3", 3),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Data Types",
            name: "Matrix3",
            inputDataTypes: ["Vector3"],
            outputDataType: "Matrix3",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };
    ;

    return (
        <Node {...mat3Props}>
            <NodePanel>
                <TitleBar title="Matrix3" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={3} values={["M(3)", "M(3)", "M(3)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(3X3)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};

export const Matrix4: React.FC<NodeProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    const outputConnectorRef = useRef(HTMLDivElement.prototype);
    const inputConnectorRef = useRef(HTMLDivElement.prototype);

    //const nodeState = useAppSelector((state) => state.nodesFilter.nodeStates);
    let nodeValue = "mat4(vec4(0, 0, 0, 0), vec4(0, 0, 0, 0), vec4(0, 0, 0, 0), vec4(0, 0, 0, 0))";


    const mat4Props: NodeProps = {
        ...props,
        value: nodeValue.toString(),
        computeNodeValueFn: computeNodeValue(props.id, "mat4", 4),
        nodeRefs:
        {
            id: props.id,
            nodeCategory: "Data Types",
            name: "Matrix4",
            inputDataTypes: ["Vector4"],
            outputDataType: "Matrix4",
            elementRef: ref,
            nodeOutputConnectorRef: outputConnectorRef,
            nodeInputConnectorRef: inputConnectorRef
        }
    };

    return (
        <Node {...mat4Props}>
            <NodePanel>
                <TitleBar title="Matrix4" />
                <ContentContainer flex={true}>
                    <ConnectorNode type="Input" ref={inputConnectorRef} count={4} values={["M(4)", "M(4)", "M(4)", "M(4)"]} />
                    <ConnectorNode type="Output" ref={outputConnectorRef} count={1} values={["Out(4X4)"]} />
                </ContentContainer>
            </NodePanel>
        </Node>
    )
};
