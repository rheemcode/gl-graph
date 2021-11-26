import React, { useReducer, useRef } from "react";
import { defaultNodeState } from "reducers/nodesFilter";
import { generateUID } from "Utils/helper";
import { builtinsVariables, mathFuncs, matrixFuncs, textureSampling, trigonometryFuncs, vectorFuncs } from "../../Graph/builtins";
import { useAppDispatch } from "../../reduxStore/hooks";

interface ContextListItemProps {
    itemName: NodeCategory;
    lists: string[];
    onClickFn: React.Dispatch<React.SetStateAction<number>>
}

const IconDir = React.forwardRef<SVGSVGElement, {}>((props, ref) => {

    return (
        <svg ref={ref} className="IconDir" fill="grey" viewBox="0 0 20 20" width="15" height="15">
            <path d="M15 10c0 .3-.305.515-.305.515l-8.56 5.303c-.625.41-1.135.106-1.135-.67V4.853c0-.777.51-1.078 1.135-.67l8.56 5.305S15 9.702 15 10z">
            </path>
        </svg>
    );
});


const ContextListItem = React.forwardRef<HTMLDivElement, ContextListItemProps>((props, ref) => {
    const itemsRef = useRef(HTMLDivElement.prototype);
    const iconRef = useRef(SVGSVGElement.prototype);

    const dispatch = useAppDispatch();

    const toggleListItems = () => {
        const elem = itemsRef.current;
        const icon = iconRef.current;
        icon.classList.toggle("Open");
        elem.classList.toggle("Active");
    }

    return (
        <div className="ContexListItem">
            <div className="Menu" onClick={toggleListItems}><IconDir ref={iconRef} />{props.itemName}</div>
            <div ref={itemsRef} className="SubListContainer">
                {
                    props.lists.map((el, index) => {
                        return (
                            <div
                                key={`${index}`}
                                id={el}
                                className="SubListItem"
                                onClick={(event: React.MouseEvent) => {
                                    props.onClickFn((nodeCount) => {
                                        nodeCount += 1;
                                        toggleListItems();
                                        dispatch(
                                            {
                                                type: "ADD_NODE",
                                                payload: { ...defaultNodeState, id: generateUID(), nodeName: el, props: { x: event.pageX, y: event.pageY, refs: null, nodeDataValue: { value: 0 } }, inputs: [], outputs: [] }
                                            })
                                        return nodeCount;
                                    });

                                }}>{el}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
});

interface ContextMenuProps {
    onClickFn: React.Dispatch<React.SetStateAction<number>>
}

type NodeCategory = "Builtins" | "Data Types" | "Math" | "Trigonometry" | "Vector" | "Matrix" | "Texture";

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>((props, ref) => {
    return (
        <div ref={ref} className="ContextMenu">
            <div className="ContextTitle">Add Node</div>
            <div className="ContextList">
                <ContextListItem key={"Builtins"} onClickFn={props.onClickFn} itemName="Builtins" lists={builtinsVariables} />
                <ContextListItem key={"Data Types"} onClickFn={props.onClickFn} itemName="Data Types" lists={["Integer", "Float", "Boolean", "Vector2", "Vector3", "Vector4", "Matrix3", "Matrix4"]} />
                <ContextListItem key={"Math"} onClickFn={props.onClickFn} itemName="Math" lists={mathFuncs} />
                <ContextListItem key={"Trigonometry"} onClickFn={props.onClickFn} itemName="Trigonometry" lists={trigonometryFuncs} />
                <ContextListItem key={"Vector"} onClickFn={props.onClickFn} itemName="Vector" lists={vectorFuncs} />
                <ContextListItem key={"Matrix"} onClickFn={props.onClickFn} itemName="Matrix" lists={matrixFuncs} />
                <ContextListItem key={"Texture"} onClickFn={props.onClickFn} itemName="Texture" lists={textureSampling} />
            </div>
        </div>
    )
});
