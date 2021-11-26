import {
    NodeDispatch,
    ConnectorState,
    ConnectorDispatch,
    AppState,
    defaultNodeState,
    NodeInput,
    UID,
    GLType,
    NodeState
} from "../../reducers/nodesFilter";
import { INodeRefs } from "Componets/GraphComponents/Node";
import React, { useEffect, useRef, useState } from "react";
import { generateUID, getDistanceToMouse, Vec2 } from "Utils/helper";
import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { shaderGraphWindowRef } from "../../ShaderGraphWindow";
import { getNodeComponent } from "../../Utils/getNodeComponent";
import { ContextMenu } from "../GraphComponents/ContextMenu";

export let scale = 1;
const scaleWeight = 1.1;
const scaleLimit = 2;

let activeNodeElement: INodeRefs | null = null;
let lastActiveNodeElement: INodeRefs | null = null;
let activeNodeConnector: NodeConnectorState | null = null;

let tryingToConnectNode = false;

export let oldMousePos: Vec2 = { x: 0, y: 0 }
let mousePos: Vec2 = { x: 0, y: 0 }


interface ConnectionState {
    isInside: boolean;
    isValid: boolean;
    outputNodeIndex: number;
    inputNodeIndex?: number; // in the case of multiple input/output nodes
    inputNodeId?: UID;
    outputNodeId?: UID;
    type: "Input" | "Output";
}

const INVALID_INDEX = -1;
/** for checking null values */
const DEFAULT_INDEX = 0;


/** Validates connection state and updates output type of node element  receiving input `i.e vec2() + vec2() -> vec2 type`*/
const validateConnectionState = (elementRef = activeNodeElement, nodeStates: AppState, connectionState: ConnectionState, nodeDispatchFn: React.Dispatch<NodeDispatch>) => {
    if (connectionState.isInside && (connectionState.type === "Input")) {
        if (connectionState.inputNodeId === connectionState.outputNodeId) {
            connectionState.isValid = false;
            return;
        }

        if (elementRef) {
            const inputType = elementRef.inputDataTypes;
            const node = nodeStates.nodeStates.find((val) => val.id === elementRef.id);
            
            
            if (inputType.find((val) => val === activeNodeElement?.outputDataType)) {
                if (node?.inputs) {
                    if (elementRef.name === "texture" || elementRef.name === "textureProj" || elementRef.name === "texelFetch" || elementRef.name === "textureGather" || elementRef.name === "textureSize") {
                        if (connectionState.inputNodeIndex === 0) {
                            if (activeNodeElement?.outputDataType === "Sampler2D") {
                                connectionState.isValid = true;
                                return;
                            }

                            connectionState.isValid = false;
                            return;
                        }

                        if (connectionState.inputNodeIndex === 1) {
                            if (activeNodeElement?.outputDataType === "Vector2") {
                                connectionState.isValid = true;
                                return;
                            }

                            connectionState.isValid = false;
                            return;
                        }
                    }
                }

                
                if (!node?.inputs) {
                    
                    connectionState.isInside = true;
                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: activeNodeElement?.outputDataType as GLType } });
                    return;
                }
            }
            else connectionState.isValid = false

            if (node) {
                if (node.inputs) {



                    if (elementRef.name === "abs"
                        || elementRef.name === "ceil"
                        || elementRef.name === "floor"
                        || elementRef.name === "fract"
                        || elementRef.name === "inversesqrt"
                        || elementRef.name === "log"
                        || elementRef.name === "log2"
                        || elementRef.name === "round"
                        || elementRef.name === "roundEven"
                        || elementRef.name === "sign"
                        || elementRef.name === "sqrt"
                        || elementRef.name === "exp"
                        || elementRef.name === "exp2"
                        || elementRef.name === "acos"
                        || elementRef.name === "cos"
                        || elementRef.name === "cosh"
                        || elementRef.name === "acosh"
                        || elementRef.name === "sin"
                        || elementRef.name === "asin"
                        || elementRef.name === "sinh"
                        || elementRef.name === "asinh"
                        || elementRef.name === "tan"
                        || elementRef.name === "atan"
                        || elementRef.name === "tanh"
                        || elementRef.name === "atanh"
                        || elementRef.name === "degrees"
                        || elementRef.name === "radians"
                        || elementRef.name === "transpose"
                        || elementRef.name === "inverse"
                        || elementRef.name === "determinant"
                        || elementRef.name === "normalize"
                        || elementRef.name === "length"
                    ) {
                        if (activeNodeElement) {
                            if (elementRef.name === "transpose" || elementRef.name === "inverse" || elementRef.name === "determinant") {
                                const inputDataType = activeNodeElement.outputDataType;
                                if (inputDataType === "Matrix3" || inputDataType === "Matrix4") {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }

                                connectionState.isValid = false;
                                return;
                            }
                            if (elementRef.name === "normalize") {
                                const inputDataType = activeNodeElement.outputDataType;
                                if (inputDataType === "Vector2" || "Vector3" || "Vector4") {
                                    connectionState.isValid = true;
                                    
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }

                                connectionState.isValid = false;
                                return;
                            }

                            if (elementRef.name === "length") {
                                
                                const inputDataType = activeNodeElement.outputDataType;
                                if (inputDataType === "Vector2" || "Vector3" || "Vector4") {
                                    connectionState.isValid = true;
                                    
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Float" } });
                                    return;
                                }

                                connectionState.isValid = false;
                                return;
                            }

                            const inputDataType = activeNodeElement.outputDataType;
                            nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                            connectionState.isValid = true;
                            return;
                        }
                    }


                    if (elementRef.name === "add" || elementRef.name === "substract" || elementRef.name === "multiply" || elementRef.name === "divide") {
                        // if node already has a first input check if second input type would be valid `i.e 'vec2() + vec3()' would be invalid`
                        if (node.inputs[0] && connectionState.inputNodeIndex === 1) {

                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[0].id);
                            if (elementRef.name === "multiply") {
                                if (inputNodeElem) {
                                    const inputDataType = inputNodeElem.nodeDataType;
                                    if ((inputDataType === "Matrix3") && (activeNodeElement?.outputDataType === "Vector3")) {
                                        connectionState.isValid = true;
                                        nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Vector3" } });
                                        return;
                                    }
                                    if ((inputDataType === "Matrix4") && (activeNodeElement?.outputDataType === "Vector4")) {
                                        connectionState.isValid = true;
                                        nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Vector4" } });
                                        return;
                                    }
                                }
                            }

                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Float" } });
                                    return;
                                }
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Vector2" || activeNodeElement?.outputDataType === "Vector3" || activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: activeNodeElement?.outputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;

                            }
                        }
                        if (node.inputs[1] && connectionState.inputNodeIndex === 0) {

                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[1].id);
                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Float" } });
                                    return;
                                }
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Vector2" || activeNodeElement?.outputDataType === "Vector3" || activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: activeNodeElement?.outputDataType as GLType } });
                                    return;
                                }
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;
                            }
                        }
                        return;
                    }

                    if (elementRef.name === "isinf" || elementRef.name === "isnan") {

                        if (activeNodeElement) {
                            const inputDataType = activeNodeElement.outputDataType;
                            connectionState.isValid = true;
                            nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Boolean" } });
                            return;
                        }
                        return;
                    }

                    if (elementRef.name === "mod" || elementRef.name === "pow" || elementRef.name === "step") {

                        if (node.inputs[0] && connectionState.inputNodeIndex === 1) {

                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[0].id);
                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Float" } });
                                    return;
                                }
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;

                            }
                        }
                        if (node.inputs[1] && connectionState.inputNodeIndex === 0) {
                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[1].id);
                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Float" } });
                                    return;
                                }
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float" || activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;
                            }
                        }
                        return;
                    }
                    if (elementRef.name === "cross" || elementRef.name === "dot" || elementRef.name === "distance" || elementRef.name === "equal" || elementRef.name === "notEqual" || elementRef.name === "facefoward" || elementRef.name === "reflect" || elementRef.name === "refract") {

                        if (node.inputs[0] && connectionState.inputNodeIndex === 1) {

                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[0].id);
                            if (inputNodeElem) {
                                let inputDataType = inputNodeElem.nodeDataType;
                                
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    inputDataType = elementRef.name === "dot" || elementRef.name === "distance" ? "Float" : inputNodeElem.nodeDataType;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    inputDataType = elementRef.name === "dot" || elementRef.name === "distance" ? "Float" : inputNodeElem.nodeDataType;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    inputDataType = elementRef.name === "dot" || elementRef.name === "distance" ? "Float" : inputNodeElem.nodeDataType;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;

                            }
                        }
                        if (node.inputs[1] && connectionState.inputNodeIndex === 0) {
                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[1].id);
                            if (inputNodeElem) {
                                let inputDataType = inputNodeElem.nodeDataType;
                                
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    inputDataType = elementRef.name === "dot" || elementRef.name === "distance" ? "Float" : inputNodeElem.nodeDataType;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    inputDataType = elementRef.name === "dot" || elementRef.name === "distance" ? "Float" : inputNodeElem.nodeDataType;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    inputDataType = elementRef.name === "dot" || elementRef.name === "distance" ? "Float" : inputNodeElem.nodeDataType;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;
                            }
                        }

                        return;
                    }

                    if (elementRef.name === "matrixCompMult" || elementRef.name === "outerProduct") {

                        if (node.inputs[0] && connectionState.inputNodeIndex === 1) {

                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[0].id);
                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Matrix3") && (activeNodeElement?.outputDataType === "Matrix3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Matrix4") && (activeNodeElement?.outputDataType === "Matrix4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;

                            }
                        }
                        if (node.inputs[1] && connectionState.inputNodeIndex === 0) {
                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[1].id);
                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Matrix3") && (activeNodeElement?.outputDataType === "Matrix3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Matrix4") && (activeNodeElement?.outputDataType === "Matrix4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;
                            }
                        }

                        return;
                    }
                    if (elementRef.name === "smoothstep" || elementRef.name === "clamp") {
                        if (node.inputs[0] && (connectionState.inputNodeIndex === 1 || connectionState.inputNodeIndex === 2)) {

                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[0].id);
                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Float" } });
                                    return;
                                }
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;

                            }
                        }

                        if (node.inputs[1] && (connectionState.inputNodeIndex === 0 || connectionState.inputNodeIndex === 2)) {
                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[1].id);
                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Float" } });
                                    return;
                                }
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;
                            }
                        }
                        return;
                    }

                    if (elementRef.name === "min" || elementRef.name === "max") {
                        if (node.inputs[0] && connectionState.inputNodeIndex === 1) {

                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[0].id);
                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Float" } });
                                    return;
                                }
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;

                            }
                        }
                        if (node.inputs[1] && connectionState.inputNodeIndex === 0) {
                            const inputNodeElem = nodeStates.nodeStates.find((val) => val.id === node.inputs[1].id);
                            if (inputNodeElem) {
                                const inputDataType = inputNodeElem.nodeDataType;
                                if ((inputDataType === "Integer" || inputDataType === "Float") && (activeNodeElement?.outputDataType === "Integer" || activeNodeElement?.outputDataType === "Float")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: "Float" } });
                                    return;
                                }
                                if ((inputDataType === "Vector2") && (activeNodeElement?.outputDataType === "Vector2")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector3") && (activeNodeElement?.outputDataType === "Vector3")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                if ((inputDataType === "Vector4") && (activeNodeElement?.outputDataType === "Vector4")) {
                                    connectionState.isValid = true;
                                    nodeDispatchFn({ type: "UPDATE_OUTPUT_TYPE", payload: { ...defaultNodeState, id: elementRef.id, nodeDataType: inputDataType } });
                                    return;
                                }
                                connectionState.isValid = false;
                                return;
                            }
                        }

                        return;
                    }
                }
            }
        }

    }
}

/**
 * Checks if mouse is trying to connect a Node
 * @returns ConnectionState Object
 */
const testForConnection = (event: React.MouseEvent, elementRef = activeNodeElement): ConnectionState => {
    let outputNode = elementRef?.nodeOutputConnectorRef.current as HTMLElement;
    let inputNodeRef = elementRef?.nodeInputConnectorRef


    for (let i = 0; i < outputNode.childElementCount; i++) {

        let node = outputNode.children[i].children[1]; // circle Node
        let outputedNodebb = outputNode.children[i].children[2].getBoundingClientRect();

        let bb = node.getBoundingClientRect();
        bb = new DOMRect(bb.x, bb.y, outputedNodebb.right - bb.left, bb.height);
        let distance = getDistanceToMouse({ x: event.pageX, y: event.pageY }, bb);
        if (distance === 0) {
            return { isInside: true, outputNodeIndex: i, isValid: true, outputNodeId: elementRef?.id as UID, type: "Output" };
        }
    }

    if (inputNodeRef) {
        let inputNode = inputNodeRef.current;
        for (let i = 0; i < inputNode.childElementCount; i++) {

            let node = inputNode.children[i].children[0];
            let outputedNodebb = inputNode.children[i].children[1].getBoundingClientRect();

            let bb = node.getBoundingClientRect();

            bb = new DOMRect(bb.x, outputedNodebb.y, outputedNodebb.right - bb.left, outputedNodebb.height);
            let distance = getDistanceToMouse({ x: event.pageX, y: event.pageY }, bb);

            if (distance === 0) {
                return { isInside: true, inputNodeIndex: i, isValid: true, inputNodeId: elementRef?.id as UID, outputNodeId: "", outputNodeIndex: 0, type: "Input" };
            }
        }
    }

    return { isInside: false, isValid: false, outputNodeIndex: INVALID_INDEX, inputNodeIndex: INVALID_INDEX, type: "Input" };
}

const handleMouseDraggingConnector = (event: React.MouseEvent, dispatchFn: React.Dispatch<ConnectorDispatch>) => {
    const connectionResult = testForConnection(event);
    if (connectionResult.isInside && (connectionResult.type === "Output")) {
        dispatchFn({ type: "FINDING", payload: { type: "Output", inputIndex: INVALID_INDEX, outputIndex: connectionResult.outputNodeIndex, dragging: true, connected: false, elementRef: activeNodeElement?.nodeOutputConnectorRef } })
    }
}

const handleNodeSelection = (elementRefs: INodeRefs, connectorDispatch: React.Dispatch<ConnectorDispatch>) => {

    return (event: React.MouseEvent) => {
        switch (event.type) {
            case "mousedown":
                {
                    if (activeNodeElement) {
                        const elem = activeNodeElement.elementRef.current as HTMLDivElement;
                        elem.style.border = "none";
                    }
                    activeNodeElement = elementRefs;
                    // check if trying to start a connection
                    handleMouseDraggingConnector(event, connectorDispatch);

                    const elem = activeNodeElement.elementRef.current as HTMLDivElement;
                    elem.style.border = "solid";

                    oldMousePos = { x: event.pageX, y: event.pageY };
                    mousePos = oldMousePos;
                    break;
                }
            case "mouseup":
                {
                    break;
                }
        }
    }
}

const handleNodeConnection = (elementRefs: INodeRefs, nodeDispatchFn: React.Dispatch<NodeDispatch>, connectorDispatch: React.Dispatch<ConnectorDispatch>, nodeStates: AppState, connectorState: ConnectorState) => {
    return (event: React.MouseEvent) => {
        switch (event.type) {
            case "mousemove": {
                if (connectorState.dragging) {

                    // check if mouse if trying to connect a node
                    const connectionResult = testForConnection(event, elementRefs);

                    // validateConnectionState(elementRefs, nodeStates, connectionResult, nodeDispatchFn);
                    if (connectionResult.isInside) {
                        if (connectionResult.type === "Input") {
                            connectorDispatch({ type: "CONNECTED", payload: { type: "Input", outputIndex: connectorState.outputIndex, inputIndex: connectionResult.inputNodeIndex as number, dragging: true, connected: true, elementRef: activeNodeElement?.elementRef } })
                        }
                    }
                }
                break;
            }

            case "mouseup": {
                if (connectorState.connected) {
                    // handles when mouse was released on trying to connect to a node

                    const activeNode = activeNodeElement as INodeRefs;
                    const connectionResult = testForConnection(event, elementRefs);
                    validateConnectionState(elementRefs, nodeStates, connectionResult, nodeDispatchFn);
                    if (connectionResult.isInside && connectionResult.isValid) {
                        nodeDispatchFn(
                            {
                                type: "UPDATE_NODE",
                                payload: {
                                    ...defaultNodeState,
                                    id: elementRefs.id,
                                    props:
                                    {
                                        x: 0, y: 0,
                                        refs: elementRefs,
                                        nodeDataValue: { value: 0 }
                                    },
                                    inputs: [{
                                        id: activeNodeElement?.id as UID,
                                        index: connectorState.inputIndex,
                                        inputData: { value: 0 },
                                        nodeConnectorRef: defaultNodeState.inputs[0].nodeConnectorRef,
                                        ref: activeNodeElement as INodeRefs
                                    }]
                                }
                            });

                        nodeDispatchFn(
                            {
                                type: "UPDATE_NODE",
                                payload: {
                                    ...defaultNodeState,
                                    id: activeNode.id,
                                    props:
                                    {
                                        x: 0, y: 0,
                                        refs: activeNode,
                                        nodeDataValue: { value: 0 }
                                    },
                                    outputs: [{
                                        id: elementRefs.id as UID,
                                        index: connectorState.inputIndex,
                                        outputData: { value: 0 },
                                        ref: elementRefs as INodeRefs
                                    }]
                                }
                            });
                    }
                    connectorDispatch({ type: "RELEASE", payload: { type: "NULL", inputIndex: INVALID_INDEX, outputIndex: INVALID_INDEX, dragging: false, connected: false } })
                }
            }
        }
    }
}

const updateNodePosition = (nodeElem: NodeState, nodeState: NodeState[]) => {
    if (nodeElem !== undefined) {
        // handle Node movement/connection if seleted node has outputs
        if (nodeElem.inputs.length > 0) {

            for (let i = 0; i < nodeElem.inputs.length; i++) {
                const inputNode = nodeElem.inputs[i];
                if (inputNode) {

                    const nodeConnector = inputNode.nodeConnectorRef.current;
                    let pathStart: Vec2 = { x: 0, y: 0 };
                    let pathEnd: Vec2 = { x: 0, y: 0 };

                    if (nodeElem.props.refs) {
                        if (nodeElem.props.refs.nodeInputConnectorRef) {
                            const connector = nodeElem.props.refs.nodeInputConnectorRef.current.children[inputNode.index];
                            const rect = connector?.children[0].getBoundingClientRect() as DOMRect;
                            pathEnd = { x: rect.left, y: (rect.y + 2) }
                        }
                        // assuming its only has one output node;
                        const outputer = inputNode.ref?.nodeOutputConnectorRef.current.children[0];
                        if (outputer) {
                            const rect = outputer.children[2].getBoundingClientRect();
                            pathStart = { x: rect.right - 5, y: (rect.y + 2) };
                            nodeConnector?.setAttribute("d", `M${pathStart.x} ${pathStart.y} C${pathStart.x + 60} ${pathStart.y}, ${pathEnd.x - 60} ${pathEnd.y + 2}, ${pathEnd.x} ${pathEnd.y}`);
                        }

                    }
                }
            }
        }

        // handle Node movement/connection if seleted node has outputs
        if (nodeElem.outputs.length > 0) {

            for (let outputNode of nodeElem.outputs) {

                let index = 0;
                if (outputNode) {
                    // find ouputed element
                    let outputedNodeElem: NodeInput = defaultNodeState.inputs[0];
                    let outputedNode = nodeState.find((elem) => {
                        if (elem.id === outputNode.id) {
                            for (let i = 0; i < elem.inputs.length; i++) {
                                if (elem.inputs[i])
                                    if (elem.inputs[i].index === outputNode.index) {
                                        outputedNodeElem = elem.inputs[i];
                                        return true;
                                    }
                            }
                        }

                        return false;
                    });

                    if (!outputedNode) {
                        continue;
                    }

                    const nodeConnector = outputedNodeElem.nodeConnectorRef.current as SVGPathElement;
                    index++;
                    let pathStart: Vec2 = { x: 0, y: 0 };
                    let pathEnd: Vec2 = { x: 0, y: 0 };

                    if (nodeElem.props.refs) {
                        if (nodeElem.props.refs.nodeOutputConnectorRef) {
                            const connector = nodeElem.props.refs.nodeOutputConnectorRef.current.children[0];
                            const rect = connector?.children[2].getBoundingClientRect() as DOMRect;
                            pathStart = { x: rect.right - 5, y: (rect.y + 2) }
                        }
                        // assuming its only has one output node;
                        const inputer = outputNode.ref?.nodeInputConnectorRef?.current.children[outputNode.index] as HTMLElement;
                        const rect = inputer.children[0].getBoundingClientRect();
                        pathEnd = { x: rect.left, y: (rect.y + 2) };

                        nodeConnector?.setAttribute("d", `M${pathStart.x} ${pathStart.y} C${pathStart.x + 60} ${pathStart.y}, ${pathEnd.x - 60} ${pathEnd.y + 2}, ${pathEnd.x} ${pathEnd.y}`);
                    }
                }
            }
        }

    }
}

const handleNodeMovement = (event: React.MouseEvent, dispatchFn: Function, nodeState: AppState, connectorState: ConnectorState) => {

    mousePos = { x: event.pageX, y: event.pageY };

    if (connectorState.dragging) {

        let pathNode = defaultNodeConnectorRef.current as SVGPathElement;
        if (pathNode) {
            let connector = activeNodeElement?.nodeOutputConnectorRef.current.children[connectorState.outputIndex];
            let rect = connector?.children[2].getBoundingClientRect() as DOMRect;

            pathNode.setAttribute("d", `M${(rect.right)} ${(rect.y + 2)} C${(rect.right) + 60} ${(rect.y - 2)}, ${event.pageX - 60} ${event.pageY}, ${event.pageX} ${event.pageY}`);
        }
        return;
    }
    else {
        let pathNode = defaultNodeConnectorRef.current as SVGPathElement;
        if (pathNode) {
            pathNode.setAttribute("d", `M0 0 C 0 0, 0 0, 0 0`);
        }
    }

    if (!activeNodeElement)
        return;

    // set cursor to grabbing on root node
    let rootRef = shaderGraphWindowRef.current as HTMLDivElement;
    rootRef.style.cursor = "grabbing";

    const elem = activeNodeElement.elementRef.current as HTMLDivElement;
    elem.style.left = elem.offsetLeft + ((event.pageX - oldMousePos.x) / scale) + "px";
    elem.style.top = elem.offsetTop + ((event.pageY - oldMousePos.y) / scale) + "px";

    const nodeElem = nodeState.nodeStates.find((element) => element.id === activeNodeElement?.id) as NodeState;
    updateNodePosition(nodeElem, nodeState.nodeStates);

    oldMousePos = { x: event.pageX, y: event.pageY };
}

const handleNodeDeselection = (event: React.MouseEvent) => {

    if (event.target != activeNodeConnector?.ref.current) {
        if (activeNodeConnector) {
            if (activeNodeConnector.ref.current) {
                activeNodeConnector.ref.current.classList.remove("Active");
                activeNodeConnector = null;
            }

        }
    }

    hideContext(event);
    if (lastActiveNodeElement?.elementRef !== activeNodeElement?.elementRef) {
        if (!lastActiveNodeElement)
            return;

        let elem = lastActiveNodeElement.elementRef.current as HTMLDivElement
        elem.style.border = "none"
    }
    if (event.target === graphPanelRef.current) {
        if (!lastActiveNodeElement)
            return;
        let elem = lastActiveNodeElement.elementRef.current as HTMLDivElement
        elem.style.border = "none";
    }
}

const handleZooming = (nodeStates: NodeState[]) => {
    return (event: React.WheelEvent) => {
        if ((event.target === graphPanelRef.current?.children[0]) || (event.target === graphPanelRef.current?.children[1]) || (event.target === graphPanelRef.current)) {
            let elem = graphPanelRef.current as HTMLDivElement;
            let container = elem.children[1] as HTMLDivElement;

            if (event.deltaY < 0) {
                scale *= scaleWeight;
                if (scale >= scaleLimit) {
                    scale = scaleLimit;
                }
                container.style.transform = `scale(${scale})`;
                const connectorContainer = graphPanelRef.current.children[0];
                connectorContainer.setAttribute("stroke-width", `calc(4px * ${scale})`);
            }
            else {
                scale /= scaleWeight;

                if (scale <= 0.1) {
                    scale = 0.1;
                }

                const connectorContainer = graphPanelRef.current.children[0];
                connectorContainer.setAttribute("stroke-width", `calc(4px * ${scale})`);
                container.style.transform = `scale(${scale})`;
            }


            for (let nodeElem of nodeStates) {
                updateNodePosition(nodeElem, nodeStates);
            }

        }
    }
}
const contextMenuRef = React.createRef<HTMLDivElement>();
let contextVisible = false;

export const hideContext = (event: React.MouseEvent) => {
    if (event.button !== 0)
        return;
    const contextElem = contextMenuRef.current as HTMLDivElement;
    if (contextVisible)
        contextVisible = false;



    if (event.target === contextMenuRef.current) {
        contextVisible = true
        return;
    }
    contextElem.classList.remove("Active");
}

export const showContext = (pos = mousePos) => {
    const contextElem = contextMenuRef.current as HTMLDivElement;
    contextVisible = !contextVisible;

    contextElem.style.left = (pos.x) + "px";
    contextElem.style.top = (pos.y) + "px";
    contextElem.classList.toggle("Active");

}

const handleKeyEvents = (nodeDispatchFn: React.Dispatch<NodeDispatch>, setNodeCount: React.Dispatch<React.SetStateAction<number>>) => {
    return (event: KeyboardEvent) => {
        if (event.ctrlKey) {
            if (event.code === "KeyA") {
                showContext();
            }

            if (event.shiftKey && event.code === "KeyD") {
                event.preventDefault();
                nodeDispatchFn(
                    {
                        type: "ADD_NODE",
                        payload: {
                            ...defaultNodeState, id: generateUID(),
                            nodeName: lastActiveNodeElement?.name as string, props: {
                                x: mousePos.x, y: mousePos.y,
                                refs: null, nodeDataValue: { value: 0 },

                            },
                            inputs: []
                        },
                    });

                setNodeCount((val) => val += 1);

            }
        }

        // handle deleting node
        if (event.code == "Delete") {
            if (activeNodeConnector != null) {
                nodeDispatchFn(
                    {
                        type: "REMOVE_NODE_INPUT",
                        payload: {
                            ...defaultNodeState,
                            id: activeNodeConnector.nodeProps?.id as UID,
                            inputs: [{
                                id: "",
                                index: activeNodeConnector.index,
                                inputData: { value: 0 },
                                nodeConnectorRef: defaultNodeState.inputs[0].nodeConnectorRef,
                                ref: activeNodeElement as INodeRefs
                            }]
                        }
                    });

                activeNodeConnector = null
                setNodeCount((value) => value -= 1);
                setNodeCount((value) => value += 1);


            }
            if (lastActiveNodeElement != null) {
                nodeDispatchFn(
                    {
                        type: "REMOVE_NODE",
                        payload: {
                            ...defaultNodeState,
                            id: lastActiveNodeElement.id,
                        }
                    });
                activeNodeElement = null;
                lastActiveNodeElement = null;
                setNodeCount((value) => value -= 1)
            }
        }
    }
}

interface NodeConnectorProps {
    start: Vec2;
    end: Vec2;
    curveAmount: number,
    index: number;
    nodeProps: INodeRefs | null,
}

interface NodeConnectorState {
    index: number;
    ref: React.RefObject<SVGPathElement>;
    nodeProps: INodeRefs | null;
}

const NodeConnector = React.forwardRef<SVGPathElement, NodeConnectorProps>((props, ref) => {

    const nodeState = useAppSelector((state) => state.nodesFilter);
    const _ref = useRef<SVGPathElement>(SVGPathElement.prototype)

    useEffect(() => {

        nodeState.nodeStates.forEach((el) => {
            if (el.id === props.nodeProps?.id) {
                for (let input of el.inputs) {
                    if (input) {
                        if (input.index === props.index) {
                            input.nodeConnectorRef = _ref;

                        };
                    };
                };
            };
        });
    });

    return (
        <path className={"NodeConnector"} onMouseDown={() => {

            let state: NodeConnectorState = { index: props.index, ref: _ref, nodeProps: props.nodeProps };
            activeNodeConnector = state;
            const elem = _ref.current;
            if (elem)
                elem.classList.add("Active");

        }} ref={ref ? ref : _ref} d=
            {`M${props.start.x} ${props.start.y} 
              C${props.start.x + 60} ${props.start.y}, 
               ${props.end.x - 60} ${props.end.y}, 
               ${props.end.x} ${props.end.y}`}
        />
    );
});

const defaultNodeConnectorRef = React.createRef<SVGPathElement>();
//let connectorRefs: React.RefObject<SVGPathElement>[] = []

const ConnectorContainer = () => {
    const nodeState = useAppSelector((state) => state.nodesFilter);
    let count = 0;


    return (
        <svg className={"ConnectorContainer"} width="100vw" height="100vh" fill="transparent" stroke="grey" strokeWidth={"4px"} >
            <NodeConnector start={{ x: 0, y: 0 }} index={0} end={{ x: 0, y: 0 }} nodeProps={null} curveAmount={1} ref={defaultNodeConnectorRef} />
            {
                nodeState.nodeStates.flatMap((value, index) => {

                    let result = []
                    if (value.inputs.length > 0) {
                        for (let inputNode of value.inputs) {

                            if (inputNode) {
                                let pathStart: Vec2 = { x: 0, y: 0 };
                                let pathEnd: Vec2 = { x: 0, y: 0 };

                                if (value.props.refs) {
                                    if (value.props.refs.nodeInputConnectorRef) {
                                        const connector = value.props.refs.nodeInputConnectorRef.current.children[inputNode.index];
                                        const rect = connector?.children[0].getBoundingClientRect() as DOMRect;
                                        pathEnd = { x: rect.left, y: (rect.y + 2) }
                                    }
                                    // assuming its only has one output node;
                                    const outputer = inputNode.ref?.nodeOutputConnectorRef.current.children[0];
                                    if (outputer) {
                                        const rect = outputer.children[2].getBoundingClientRect();
                                        pathStart = { x: rect.right - 5, y: (rect.y) };

                                    }
                                }


                                //      inputNode.nodeConnectorRef = connectorRefs[index];
                                result.push(<NodeConnector key={index + count} index={value.inputs.findIndex((val) => { if (val) return (val.id == inputNode.id && val.index == inputNode.index) })} nodeProps={value.props.refs} start={pathStart} end={pathEnd} curveAmount={1} />)
                                count++;
                            };

                        };
                    };

                    return result;
                })
            }
        </svg>
    );
};

export const GraphTab = () => {
    const nodeState = useAppSelector((state) => state.nodesFilter);
    const connectorState = useAppSelector((state) => state.connectorFilter);
    const [nodeCount, setNodeCount] = useState(0);

    const nodesDispatch: React.Dispatch<NodeDispatch> = useAppDispatch();
    const connectorDispatch: React.Dispatch<ConnectorDispatch> = useAppDispatch();

    useEffect(() => {
        window.addEventListener("keydown", handleKeyEvents(nodesDispatch, setNodeCount));
    }, []);


    useEffect(() => {
        if (contextVisible) {
            contextVisible = false;
            const contextElem = contextMenuRef.current as HTMLDivElement;
            contextElem.classList.remove("Active");
        };
    });
    return (
        <div ref={graphTabRef} className="GraphTab">
            <ContextMenu onClickFn={setNodeCount} ref={contextMenuRef} />
            <div ref={graphPanelRef} className="GraphPanel"
                onWheel={handleZooming(nodeState.nodeStates)}
                onMouseMove={(event) => { handleNodeMovement(event, nodesDispatch, nodeState, connectorState) }}
                onMouseUp={() => {
                    tryingToConnectNode = false;
                    lastActiveNodeElement = activeNodeElement;
                    activeNodeElement = null;
                    if (connectorState.dragging)
                        connectorDispatch({ type: "RELEASE", payload: { type: "NULL", outputIndex: INVALID_INDEX, inputIndex: INVALID_INDEX, dragging: false, connected: false } });
                }}

                onContextMenu={(event) => {
                    switch (event.button) {
                        case 2: // right mouse button 
                            {
                                event.preventDefault();
                                showContext();
                            };
                    };
                }}

                onMouseDown={handleNodeDeselection}
            >

                <ConnectorContainer />
                <div className="PanelContainer">
                    {
                        nodeState.nodeStates.map((value, index) => getNodeComponent(value, handleNodeSelection, handleNodeConnection))
                    }
                </div>

            </div>
        </div >);

};

export const graphTabRef = React.createRef<HTMLDivElement>();
const graphPanelRef = React.createRef<HTMLDivElement>();

