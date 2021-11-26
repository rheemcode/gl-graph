import { INodeRefs } from "Componets/GraphComponents/Node";
import React from "react";


interface Vector2 {
    x: FloatType,
    y: FloatType;
};

interface Vector3 {
    x: FloatType,
    y: FloatType,
    z: FloatType;
};

interface Vector4 {
    x: FloatType,
    y: FloatType,
    z: FloatType;
    w: FloatType;
}

interface Matrix3 {
    m0: Vector3;
    m1: Vector3;
    m2: Vector3;
}

interface Matrix4 {
    m0: Vector4,
    m1: Vector4,
    m2: Vector4,
    m3: Vector4,
}
export type AnyType = any;
export type BoolType = Boolean;
export type IntType = number;
export type FloatType = number;
export type Vector2Type = Vector2;
export type Vector3Type = Vector3;
export type Vector4Type = Vector4;
export type Matrix3Type = Matrix3;
export type Matrix4Type = Matrix4;

export type UID = string;

export interface NodeData {
    value: string | FloatType | IntType | BoolType | Vector2Type | Vector3Type | Vector4Type | Matrix3Type | Matrix4Type;
}

export interface NodeInput {
    id: UID;
    index: number;
    ref: INodeRefs | null,
    nodeConnectorRef: React.RefObject<SVGPathElement>;
    inputData: NodeData;
}

//probably redundant
interface NodeOutput {
    id: UID;
    index: number;
    ref: INodeRefs | null
    outputData: NodeData
}

interface NodeProps {
    x: number;
    y: number;
    refs: INodeRefs | null,
    nodeDataValue: NodeData;
}
export type GLType = "Any" | "Sampler2D" | "Integer" | "Float" | "Boolean" | "Vector" | "Vector2" | "Vector3" | "Vector4" | "Matrix" | "Matrix3" | "Matrix4"


export interface NodeState {
    id: UID;
    nodeName: string;
    nodeDataType: GLType,
    props: NodeProps;
    inputs: NodeInput[]
    outputs: NodeOutput[]
    computeNodeValueFn: (nodeStates: NodeState[]) => string[];
}

export interface ConnectorState {
    type: "Input" | "Output" | "NULL";
    inputIndex: number;
    outputIndex: number;
    dragging: boolean;
    connected: boolean;
    elementRef?: React.RefObject<HTMLDivElement>;

}

type NODE_ACTION = "ADD_NODE" | "REMOVE_NODE" | "UPDATE_NODE" | "UPDATE_PROPS" | "UPDATE_NODE_VALUE" | "UPDATE_OUTPUT_TYPE" | "REMOVE_NODE_INPUT";
type CONNECTOR_ACTION = "FINDING" | "CONNECTED" | "RELEASE"

export interface NodeDispatch {
    type: NODE_ACTION;
    payload: NodeState;
}

export interface ConnectorDispatch {
    type: CONNECTOR_ACTION;
    payload: ConnectorState;
}

export interface AppState {
    nodeStates: NodeState[]
}

const initialState: AppState = { nodeStates: [] };

export const defaultNodeState: NodeState = {
    id: "",
    nodeName: "",
    nodeDataType: "Any",
    props:
    {
        x: 0, y: 0,
        refs: null,
        nodeDataValue: { value: 0 }
    },

    computeNodeValueFn: (s) => [""],
    inputs: [
        {
            id: "",
            index: 0,
            inputData: { value: 0 },
            nodeConnectorRef: React.createRef(),
            ref: null
        }],
    outputs: [
        {
            id: "",
            index: 0, // TODO: handle nodes with multiple output
            outputData: { value: 0 },
            ref: null
        }]
}
const initialConnectorState: ConnectorState = { type: "NULL", outputIndex: -1, inputIndex: -1, dragging: false, connected: false }

/**
 * recursively updates the node element values
 * @param nodeStates node state
 * @param nodeElem updated node elements
 */
const updateNodeValue = (nodeStates: NodeState[], nodeElem: NodeState) => {

    // iterate over node Elements output
    for (let i = 0; i < nodeElem.outputs.length; i++) {
        if (nodeElem.outputs[i].id) {
            // find ouputed node Element in node state
            const outputElem = nodeStates.find((value) => {
                if (value)
                    return value.id === nodeElem.outputs[i].id
            });

            if (outputElem) {
                // find the output index of the oupting element 
                let inputedElem = outputElem.inputs.find((value) => {
                    if (value) {
                        return (nodeElem.id === value.id) && (nodeElem.outputs[i].index === value.index);
                    }

                    return false;
                })

                if (inputedElem) {
                    // update the input value to the latest and the ouput value of the outputed element based on the input
                    inputedElem.inputData.value = nodeElem.props.nodeDataValue.value;
                    const [nodeValue, nodeValueVar] = outputElem.computeNodeValueFn(nodeStates)
                    outputElem.props.nodeDataValue.value = nodeValueVar;
                }

                // remove default outputs or invalid outputs
                outputElem.outputs = outputElem.outputs.filter((val) => val.id);

                // if the outputed element also has outputs then update them as well
                if (outputElem.outputs.length > 1) {
                    updateNodeValue(nodeStates, outputElem);
                }
            }
        }
    }
}

export const connectorFilter = (state = initialConnectorState, action: ConnectorDispatch): ConnectorState => {
    switch (action.type) {
        case "FINDING": {
            return action.payload;
        }
        case "CONNECTED": {
            return action.payload;
        }
        case "RELEASE": {
            return action.payload;
        }
        default:
            return state;
    }
}

export const nodesFilter = (state = initialState, action: NodeDispatch): AppState => {
    switch (action.type) {
        case "ADD_NODE": {
            state.nodeStates.push(action.payload);
            
            return { ...state, nodeStates: state.nodeStates };
        }
        case "REMOVE_NODE": {
            state.nodeStates = state.nodeStates.filter((val) => val.id !== action.payload.id);
            state.nodeStates.forEach((element) => {
                element.outputs = element.outputs.filter((val) => val.id !== action.payload.id);
                element.inputs = element.inputs.map((val) => {
                    if (val) {
                        if (val.id === action.payload.id) return null;
                        return val
                    }
                }) as NodeInput[];
            });
            

            return state;
        }

        case "REMOVE_NODE_INPUT": {

            let value = state.nodeStates.find((value) => {
                return value.id === action.payload.id;
            }) as NodeState;

            if (value) {
                value.inputs = value.inputs.map((val) => {
                    if (val) {
                        if (val.index === action.payload.inputs[0].index) {
                            let el = state.nodeStates.find((el) => { return el.id === val.id; });
                            if (el) {
                                el.outputs = el.outputs.filter((_el) => {
                                    if ((_el.id === value.id) && (_el.index === val.index)) {
                                        return false;
                                    };
                                    return true;
                                });

                            }
                            return null;
                        };
                        return val;
                    };// value.inputs.map((val)
                }) as NodeInput[];
            };
            

            return state;
        };

        case "UPDATE_NODE": {
            state.nodeStates.forEach((value, index, arr) => {
                
                
                if (value.id === action.payload.id) {
                    if (!value.props.refs)
                        value.props.refs = action.payload.props.refs;
                    if (action.payload.inputs[0].ref) {
                        if (value.inputs[action.payload.inputs[0].index]) {

                            let oldVal = arr.find((element) => value.inputs[action.payload.inputs[0].index].id === element.id)
                            if (oldVal) {

                                oldVal.outputs = oldVal.outputs.filter((elem) => {
                                    if ((elem.id === action.payload.id))
                                        if (elem.index === action.payload.inputs[0].index) {
                                            return false;
                                        }
                                    return true;

                                });
                            }

                        }
                        // [0] because you can only dispatch one action at a time
                        value.inputs[action.payload.inputs[0].index] = action.payload.inputs[0];
                        const outputer = arr.find((value) => value.id === action.payload.inputs[0].id);
                        if (outputer) {
                            value.inputs[action.payload.inputs[0].index].inputData = outputer.props.nodeDataValue;
                        }

                        value.props.nodeDataValue = { value: value.computeNodeValueFn(state.nodeStates)[1] }
                        updateNodeValue(arr, value);
                    }
                    value.outputs = value.outputs.filter((val) => { if (val.id) return true; return false; });
                    if (action.payload.outputs[0].id) {
                        value.outputs.push(action.payload.outputs[0]);
                    }
                    return;
                }
            });
            

            return state;
        }

        case "UPDATE_OUTPUT_TYPE": {
            let activeNode = state.nodeStates.find((val) => val.id === action.payload.id);
            if (activeNode)
                activeNode.nodeDataType = action.payload.nodeDataType;
            

            return state;
        }

        case "UPDATE_PROPS": {

            let value = state.nodeStates.find((value) => { return value.id === action.payload.id; });
            if (value) {
                value.props.refs = action.payload.props.refs;
                value.props.nodeDataValue = action.payload.props.nodeDataValue;
                value.nodeDataType = action.payload.nodeDataType;
                value.computeNodeValueFn = action.payload.computeNodeValueFn;
                value.outputs.filter((val) => { if (val) return val.id; return false; });

            }
            

            return state;
        }

        case "UPDATE_NODE_VALUE": {
            state.nodeStates.forEach((element, index, arr) => {
                element.outputs.filter((val) => { if (val) return val.id; return false; });
                if (element.id == action.payload.id) {

                    element.props.nodeDataValue = action.payload.props.nodeDataValue;
                    updateNodeValue(arr, element);

                }
                return;
            });
            

            return state;
        }
        default:
            return state;
    }
}
