import { GLType, NodeState, UID } from "reducers/nodesFilter";

let generatedUID: UID[] = []
const characterList = ["a", "b", "c", "d", "e", "f", "i", "j", "k", "l"];

const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


export const generateUID = () => {
    var uid = ""
    let uidLength = 15;
    while (uidLength) {
        var char = getRandomInt(0, 10);
        if (getRandom(0, 10) <= 5) {
            uid += characterList[char]
        }
        else {
            uid += getRandomInt(0, 10);
        }
        uidLength--;
    }

    if (generatedUID.find((val) => val == uid)) {
        generateUID();
    }
    generatedUID.push(uid);
    return uid;
}


export const swap = (a: any, b: any) => {
    let [temp1, temp2] = [a, b];
    a = temp2;
    b = temp1;
}

/**
 * Helper function that calculates value of an element based on the supplied input
 * @param id computed element id
 * @param prefixVal element return type i.e `vec2`
 * @param count element input count i.e `vec2(1, 1)`
 * @param delimeter element separator i.e "," "+"
 * @returns computed element value based on input supplied
 */
export const computeNodeValue = (id: UID, prefixVal: string, count: number, delimeter = ",", swap = false) => {
    return (nodeState: NodeState[]): string[] => {

        let nodeIndex = -1;
        let node = nodeState.find((element, index) => {
            if (element.id === id) {
                nodeIndex = index;
                return true;
            }
            return false;
        }) as NodeState;

        let nodeValue = prefixVal + "(";
        let nodeValueVar = prefixVal + "(";

        if (node) {
            if (count === 1) {
                nodeValue += `${node.inputs[0].inputData.value})`;
                nodeValueVar += `_${node.inputs[0].id})`;

                let inputNodeIndex = -1;
                const nodeInput = nodeState.find((value, index) => {
                    if (value.id === node.inputs[0].id) {
                        inputNodeIndex = index;
                        return true;
                    };

                    return false;
                }) as NodeState;


                if (inputNodeIndex > nodeIndex) {
                    nodeState[nodeIndex] = nodeInput;
                    nodeState[inputNodeIndex] = node;
                }

                return [nodeValue, nodeValueVar];
            }

            let highestInputIndex = 0;
            for (let i = 0; i < count; i++) {
                let val = node.inputs[i];
                let inputNodeIndex = -1;

                const nodeInput = nodeState.find((value, index) => {
                    if (value) {
                        if (node.inputs[i]) {
                            if (value.id === node.inputs[i].id) {
                                inputNodeIndex = index;
                                return true;
                            };

                        }
                    }


                    return false;
                }) as NodeState;

                if (!nodeInput)
                    continue;

                if (inputNodeIndex > highestInputIndex) {
                    highestInputIndex = inputNodeIndex;
                }

                if (val) {
                    nodeValue += val.inputData.value;
                    nodeValueVar += `_${node.inputs[i].id}`;
                }
                else {
                    nodeValue += 0;
                    nodeValueVar += 0;
                }

                if (i != count - 1) {
                    nodeValue += delimeter;
                    nodeValueVar += delimeter;
                }

                if (highestInputIndex > nodeIndex && i === (count - 1)) {
                    nodeState[highestInputIndex] = node;
                    nodeState[nodeIndex] = nodeInput;
                }
            }
            nodeValue += ")";
            nodeValueVar += ")";

            return swap ? [nodeValue, nodeValueVar] : [nodeValueVar, nodeValue];
        }
        nodeValue += ")";
        nodeValueVar += ")";

        return swap ? [nodeValue, nodeValueVar] : [nodeValueVar, nodeValue];
    }
}

/**
 * Flattens Dom element tree to a single Array
 */
export const flattenElementTree = (element: Element, result: Element[]) => {
    for (var i = 0; i < element.childElementCount; i++) {

        var val = element.children[i];
        if (val.childElementCount > 0) {
            flattenElementTree(val, result);
        }
        else {
            result.push(val);
        }
    }

    return result;
}

/**
 * Helper Vector2 interface
 */
export interface Vec2 {
    x: number,
    y: number,
}

/**
 * Returns length of Vector2 object
 */
export const Vec2length = (vec: Vec2): number => {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

/**
 * Returns Distance of DOM element Rect to mouse position, useful for checking if mouse collides with a DOM element
 * @param mouse mouse position
 * @param bb DOM element bounding box or DOMRect
 */
export const getDistanceToMouse = (mouse: Vec2, bb: DOMRect): number => {
    const offset: Vec2 = { x: ((bb.x + bb.right) * 0.5) - mouse.x, y: ((bb.y + bb.bottom) * 0.5) - mouse.y };
    const offsetAbs: Vec2 = { x: Math.abs(offset.x), y: Math.abs(offset.y) };
    const dir: Vec2 = { x: Math.max(0, offsetAbs.x - (bb.width / 2)), y: Math.max(0, offsetAbs.y - (bb.height / 2)) };
    return Vec2length(dir);
}


export const getGLGraphToGLSLDataType = (glGraphType: GLType) => {
    switch (glGraphType) {
        case "Boolean": return "bool";
        case "Integer": return "int";
        case "Float": return "float";
        case "Vector2": return "vec2";
        case "Vector3": return "vec3";
        case "Vector4": return "vec4";
        case "Matrix3": return "mat3";
        case "Matrix4": return "mat4";
    }
}
