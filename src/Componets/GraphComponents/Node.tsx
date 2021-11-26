import React, { useEffect } from "react";
import { useRef } from "react";
import { AppState, ConnectorDispatch, ConnectorState, GLType, defaultNodeState, NodeDispatch, NodeState, UID } from "reducers/nodesFilter";
import { useAppDispatch, useAppSelector } from "reduxStore/hooks";

export type NodeClickFn = (nodeRefs: INodeRefs, dispathFn: React.Dispatch<ConnectorDispatch>) => (event: React.MouseEvent) => void;
export type ConnectorFn = (elementRefs: INodeRefs, nodeDispatchFn: React.Dispatch<NodeDispatch>, connectorDispatch: React.Dispatch<ConnectorDispatch>, nodeState: AppState, connectorState: ConnectorState) => (event: React.MouseEvent) => void;


type NodeCategory = "Builtins" | "Data Types" | "Math" | "Trigonometry" | "Vector" | "Matrix" | "Texture";

export interface INodeRefs {
    id: UID;
    name: string;
    nodeCategory: NodeCategory;
    outputDataType: GLType;
    inputDataTypes: GLType[],
    elementRef: React.MutableRefObject<HTMLDivElement>;
    nodeOutputConnectorRef: React.MutableRefObject<HTMLDivElement>;
    nodeInputConnectorRef: React.MutableRefObject<HTMLDivElement> | null;
}

export interface NodeProps {
    id: UID;
    x: number;
    y: number;
    value: string;
    nodeRefs: INodeRefs | null;
    clickFn: NodeClickFn;
    connectorFn: ConnectorFn;
    computeNodeValueFn: (n: NodeState[]) => string[];
};

// Dumb! why not include useRef here instead of repeating in every component
export const Node = React.forwardRef<HTMLDivElement, NodeProps>((props, ref) => {
    const connectorDispatch: React.Dispatch<ConnectorDispatch> = useAppDispatch();
    const nodeDispatch: React.Dispatch<NodeDispatch> = useAppDispatch();
    const connectorState: ConnectorState = useAppSelector((state) => state.connectorFilter);
    const nodeState: AppState = useAppSelector((state) => state.nodesFilter);

    useEffect(() => {
        const thisElem = nodeState.nodeStates.find((val) => val.id === props.id);
        if (props.nodeRefs) {
            if (props.nodeRefs.outputDataType === "Any" || props.nodeRefs.outputDataType === "Vector" || props.nodeRefs.outputDataType === "Matrix") {
                props.nodeRefs.outputDataType = thisElem?.nodeDataType as GLType;

            }

        }
        const outputConnector = props.nodeRefs?.nodeOutputConnectorRef.current;
        const inputConnector = props.nodeRefs?.nodeInputConnectorRef?.current;
        outputConnector?.children[0].children[1].children[1].setAttribute("fill", "transparent");

        if (inputConnector?.children) {
            for (let childNode of inputConnector?.children) {
                childNode.children[1].children[1].setAttribute("fill", "transparent");
            }
        }


        if (thisElem?.outputs) {
            if (thisElem?.outputs.length) {
                if (thisElem?.outputs[0].id || thisElem?.outputs.length > 1) {
                    outputConnector?.children[0].children[1].children[1].setAttribute("fill", "grey");

                }
            }
        }

        if (thisElem?.inputs) {
            for (let i = 0; i < thisElem.inputs.length; i++) {
                if (thisElem.inputs[i]) {
                    inputConnector?.children[thisElem.inputs[i].index].children[1].children[1].setAttribute("fill", "grey");
                }
            }
        }

    });

    useEffect(() => {
        nodeDispatch({ type: "UPDATE_PROPS", payload: { ...defaultNodeState, id: props.id, nodeDataType: props.nodeRefs?.outputDataType as GLType, computeNodeValueFn: props.computeNodeValueFn, props: { x: 0, y: 0, refs: props.nodeRefs, nodeDataValue: { value: props.value } } } })
    }, [/*props.nodeRefs?.elementRef*/])

    return (
        <div onMouseDown={props.clickFn(props.nodeRefs as INodeRefs, connectorDispatch)}
            onMouseUp={props.connectorFn(props.nodeRefs as INodeRefs, nodeDispatch, connectorDispatch, nodeState, connectorState)}
            //    onMouseEnter={props.connectorFn(props.nodeRefs as INodeRefs, nodeDispatch, connectorDispatch, connectorState)}
            onMouseMove={props.connectorFn(props.nodeRefs as INodeRefs, nodeDispatch, connectorDispatch, nodeState, connectorState)}

            ref={props.nodeRefs?.elementRef}
            id={`${props.id}`}
            key={props.id}
            className={`Node`}
            style={{ left: `${props.x}px`, top: `${props.y}px` }}
        >
            {props.children}
        </div>
    );
});
