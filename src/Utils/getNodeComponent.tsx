import { NodeState } from "reducers/nodesFilter";
import { GlFragCoord, GlFragDepth, GlResolution, GlTime, GlMouseCoords, GlFragColor, GLTexture0, GLTexture1, GLTexture2, GLTexture3 } from "../Componets/GraphComponents/Builtins/Builtins";
import * as GLComp from "../Componets/GraphComponents/GLFuncs/GLFuncs"
import * as GlType from "../Componets/GraphComponents/DataTypes/DataTypes"


import { ConnectorFn, NodeClickFn, NodeProps } from "Componets/GraphComponents/Node";

export const getNodeComponent = (nodeState: NodeState, clickFn: NodeClickFn, connectorFn: ConnectorFn) => {
    const props: NodeProps = { id: nodeState.id, x: nodeState.props.x, y: nodeState.props.y, value: "", nodeRefs: null, clickFn, connectorFn, computeNodeValueFn: (n) => [""] }

    switch (nodeState.nodeName) {
        case "glTexture0": {
            return <GLTexture0 key={nodeState.id} {...props} />
        }
        case "glTexture1": {
            return <GLTexture1 key={nodeState.id} {...props} />
        }
        case "glTexture2": {
            return <GLTexture2 key={nodeState.id} {...props} />
        }
        case "glTexture3": {
            return <GLTexture3 key={nodeState.id} {...props} />
        }
        case "gl_FragColor": {
            return <GlFragColor key={nodeState.id} {...props} />
        }
        case "gl_FragCoord": {
            return <GlFragCoord key={nodeState.id} {...props} />
        }
        case "gl_FragDepth": {
            return <GlFragDepth key={nodeState.id} {...props} />
        }
        case "iResolution": {
            return <GlResolution key={nodeState.id} {...props} />
        }
        case "iTime": {
            return <GlTime key={nodeState.id} {...props} />
        }
        case "iMouseCoords": {
            return <GlMouseCoords key={nodeState.id} {...props} />
        }
        case "texture": {
            return <GLComp.GlTexture key={nodeState.id} {...props} />
        }
        case "textureProj": {
            return <GLComp.GlTextureProj key={nodeState.id} {...props} />
        }
        case "texelFetch": {
            return <GLComp.GlTexelFetch key={nodeState.id} {...props} />
        }
        case "textureGather": {
            return <GLComp.GlTextureGather key={nodeState.id} {...props} />
        }
        case "textureSize": {
            return <GLComp.GlTextureSize key={nodeState.id} {...props} />
        }
        case "add": {
            return <GLComp.GlAdd key={nodeState.id} {...props} />
        }
        case "multiply": {
            return <GLComp.GlMultiply key={nodeState.id} {...props} />
        }
        case "divide": {
            return < GLComp.GlDivide key={nodeState.id} {...props} />
        }
        case "substract": {
            return < GLComp.GlSubstract key={nodeState.id} {...props} />
        }
        case "abs": {
            return < GLComp.GlAbs key={nodeState.id} {...props} />
        }
        case "ceil": {
            return < GLComp.GlCeil key={nodeState.id} {...props} />
        }
        case "clamp": {
            return < GLComp.GlClamp key={nodeState.id} {...props} />
        }
        case "exp": {
            return < GLComp.GlExp key={nodeState.id} {...props} />
        }
        case "exp2": {
            return < GLComp.GlExp2 key={nodeState.id} {...props} />
        }
        case "floor": {
            return < GLComp.GlFloor key={nodeState.id} {...props} />
        }
        case "fract": {
            return < GLComp.GlFract key={nodeState.id} {...props} />
        }

        case "inversesqrt": {
            return < GLComp.GlInvSqrt key={nodeState.id} {...props} />
        }
        case "isinf": {
            return < GLComp.GlInf key={nodeState.id} {...props} />
        }
        case "isnan": {
            return < GLComp.GlNan key={nodeState.id} {...props} />
        }
        case "log": {
            return < GLComp.GlLog key={nodeState.id} {...props} />
        }
        case "log2": {
            return < GLComp.GlLog2 key={nodeState.id} {...props} />
        }
        case "max": {
            return < GLComp.GlMax key={nodeState.id} {...props} />
        }
        case "min": {
            return < GLComp.GlMin key={nodeState.id} {...props} />
        }
        case "mod": {
            return < GLComp.GlMod key={nodeState.id} {...props} />
        }
        case "noise": {
            return < GLComp.GlNoise key={nodeState.id} {...props} />
        }
        case "pow": {
            return < GLComp.GlPow key={nodeState.id} {...props} />
        }
        case "round": {
            return < GLComp.GlRound key={nodeState.id} {...props} />
        }
        case "roundEven": {
            return < GLComp.GlRoundEven key={nodeState.id} {...props} />
        }
        case "sign": {
            return < GLComp.GlSign key={nodeState.id} {...props} />
        }
        case "smoothstep": {
            return < GLComp.GlSmoothstep key={nodeState.id} {...props} />
        }
        case "sqrt": {
            return < GLComp.GlSqrt key={nodeState.id} {...props} />
        }
        case "step": {
            return < GLComp.GlStep key={nodeState.id} {...props} />
        }
        case "trunc": {
            return < GLComp.GlTrunc key={nodeState.id} {...props} />
        }
        case "acos": {
            return < GLComp.GlAcos key={nodeState.id} {...props} />
        }
        case "acosh": {
            return < GLComp.GlAcosH key={nodeState.id} {...props} />
        }
        case "asin": {
            return < GLComp.GlASin key={nodeState.id} {...props} />
        }
        case "asinh": {
            return < GLComp.GlASinH key={nodeState.id} {...props} />
        }
        case "atan": {
            return < GLComp.GlAtan key={nodeState.id} {...props} />
        }
        case "atanh": {
            return < GLComp.GlAtanH key={nodeState.id} {...props} />
        }
        case "cos": {
            return < GLComp.GlCos key={nodeState.id} {...props} />
        }
        case "cosh": {
            return < GLComp.GlCosH key={nodeState.id} {...props} />
        }
        case "degrees": {
            return < GLComp.GlDegrees key={nodeState.id} {...props} />
        }
        case "radians": {
            return < GLComp.GlRadians key={nodeState.id} {...props} />
        }
        case "sin": {
            return < GLComp.GlSin key={nodeState.id} {...props} />
        }
        case "sinh": {
            return < GLComp.GlSinH key={nodeState.id} {...props} />
        }
        case "tan": {
            return < GLComp.GlTan key={nodeState.id} {...props} />
        }
        case "tanh": {
            return < GLComp.GlTanH key={nodeState.id} {...props} />
        }
        case "cross": {
            return < GLComp.GlCross key={nodeState.id} {...props} />
        }
        case "distance": {
            return < GLComp.GlDistance key={nodeState.id} {...props} />
        }
        case "dot": {
            return < GLComp.GlDot key={nodeState.id} {...props} />
        }
        case "equal": {
            return < GLComp.GlEqual key={nodeState.id} {...props} />
        }
        case "faceforward": {
            return < GLComp.GlFaceForward key={nodeState.id} {...props} />
        }
        case "length": {
            return < GLComp.GlLength key={nodeState.id} {...props} />
        }
        case "normalize": {
            return < GLComp.GlNormalize key={nodeState.id} {...props} />
        }
        case "notEqual": {
            return < GLComp.GlNotEqual key={nodeState.id} {...props} />
        }
        case "reflect": {
            return < GLComp.GlReflect key={nodeState.id} {...props} />
        }
        case "refract": {
            return < GLComp.GlRefract key={nodeState.id} {...props} />
        }
        case "determinant": {
            return < GLComp.GlDeterminant key={nodeState.id} {...props} />
        }
        case "inverse": {
            return < GLComp.GlInverse key={nodeState.id} {...props} />
        }
        case "matrixCompMult": {
            return < GLComp.GlMatCompMult key={nodeState.id} {...props} />
        }
        case "outerProduct": {
            return < GLComp.GlOuterProduct key={nodeState.id} {...props} />
        }
        case "transpose": {
            return < GLComp.GlTranspose key={nodeState.id} {...props} />
        }
        case "Integer": {
            return <GlType.Integer key={nodeState.id} {...props} />
        }
        case "Boolean": {
            return <GlType.Boolean key={nodeState.id} {...props} />
        }
        case "Float": {
            return <GlType.Float key={nodeState.id} {...props} />
        }
        case "Vector2": {
            return <GlType.Vector2 key={nodeState.id} {...props} />
        }
        case "Vector3": {
            return <GlType.Vector3 key={nodeState.id} {...props} />
        }
        case "Vector4": {
            return <GlType.Vector4 key={nodeState.id} {...props} />
        }
        case "Matrix3": {
            return <GlType.Matrix3 key={nodeState.id} {...props} />
        }
        case "Matrix4": {
            return <GlType.Matrix4 key={nodeState.id} {...props} />
        }
        case "select": {
            return <GLComp.GlSelect key={nodeState.id} {...props} />
        }
    }
}
