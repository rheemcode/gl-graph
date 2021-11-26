import React from "react"
import { CSSProperties } from "react"
import { DoubleCircleIcon } from "../Icons/DoubleCircleIcon"

interface NodeProps {
    type: "Input" | "Output"
    values: string[];
    count: number;
}

export const ConnectorNode = React.forwardRef<HTMLDivElement, NodeProps>((props, ref) => {
    let elems = []
    const style: CSSProperties = {
        display: "flex",
        marginBottom: ".2em",
        alignItems: "center"
    }
    switch (props.type) {
        case "Input": {
            for (var i = 0; i < props.count; i++) {
                elems.push(
                    <div key={i} style={style}>
                        <div style={{ backgroundColor: "grey", position: "absolute", width: "1.4em", height: ".25rem", left: "0" }}></div>
                        <DoubleCircleIcon />
                        <p>{props.values[i]}</p>
                    </div>
                )
            }
            break;
        }

        case "Output": {
            for (var i = 0; i < props.count; i++) {
                elems.push(
                    <div key={i} id={`{i}`} style={{ ...style, justifyContent: "flex-end" }} >
                        <p>{props.values[i]}</p>
                        <DoubleCircleIcon />
                        <div style={{ backgroundColor: "grey", position: "absolute", width: "1.4em", height: ".25rem", right: "0" }}></div>
                    </div >
                )
            }
        }

    }


    return (
        <div ref={ref} className={props.type + "Node"}>
            {elems}
        </div>
    )
});

interface InputProps {
    onChangeFn: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInputNode: React.FC<InputProps> = (props) => {
    return (
        <div className="TextInputNode">
            <input type="text" name="" id="" onChange={props.onChangeFn} />
        </div>
    );
}

export const BoolInputNode: React.FC<InputProps> = (props) => {
    return (
        <div className="BoolInputNode">
            <input type="checkbox" onChange={props.onChangeFn} name="" value="unchecked" id="" />
        </div>
    )
}
