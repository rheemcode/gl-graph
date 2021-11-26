import { GLContext, BufferType, GLBuffer, BufferUsage, GLProgram, GLDataType } from "./GLContext";

export class VertexBuffer {
    buffer: GLBuffer = 0
    constructor() {
        this.buffer = GLContext.CreateBuffer();
    }

    BufferData(data: ArrayBuffer) {
        this.Bind();
        GLContext.BufferData(BufferType.ARRAY_BUFFER, data, BufferUsage.STATIC_DRAW);
    }

    Bind() {
        GLContext.BindBuffer(BufferType.ARRAY_BUFFER, this.buffer);
    }

    Delete() {
        GLContext.DeleteBuffer(this.buffer);
    }
}


export class IndexBuffer {
    buffer: GLBuffer = 0
    constructor() {
        this.buffer = GLContext.CreateBuffer();
    }

    BufferData(data: ArrayBuffer) {
        GLContext.BufferData(BufferType.ELEMENT_ARRAY_BUFFER, data, BufferUsage.STATIC_DRAW);
    }

    Bind() {
        GLContext.BindBuffer(BufferType.ELEMENT_ARRAY_BUFFER, this.buffer);
    }

    Delete() {
        GLContext.DeleteBuffer(this.buffer);
    }
}

export class QuadBuffer {
    static vertices = [
        1.0, 1.0, 0.0, 1.0, 1.0,
        -1.0, 1.0, 0.0, 0.0, 1.0,
        1.0, -1.0, 0.0, 1.0, 0.0,
        -1.0, -1.0, 0.0, 0.0, 0.0];
    static verticesBuffer = new Float32Array(QuadBuffer.vertices);
}

export class VertexArray {
    indexBuffer: IndexBuffer = IndexBuffer.prototype;
    vertexBuffer: VertexBuffer = VertexBuffer.prototype;

    AddVertexBuffer(vertexBuffer: VertexBuffer) {
        this.vertexBuffer = vertexBuffer;
    }

    Bind() {
        this.vertexBuffer.Bind();
    }

    SetUpAttribs(program: GLProgram) {
        // const vPosLocation = GLContext.GetAttribLocation(program, "aPos");
        // this.vertexBuffer.Bind();
        // GLContext.EnableVertexAtrribArray(vPosLocation);
        // GLContext.VertexAttribPointer(vPosLocation, 3, GLDataType.FLOAT, false, 0, 0);

        const aVertexPosLocation = GLContext.GetAttribLocation(program, "aVertexPos");
        const aTexCoordLocation = GLContext.GetAttribLocation(program, "aTexCoord");

        this.vertexBuffer.Bind();
        GLContext.EnableVertexAtrribArray(aVertexPosLocation);
        GLContext.EnableVertexAtrribArray(aTexCoordLocation);

        GLContext.VertexAttribPointer(aVertexPosLocation, 3, GLDataType.FLOAT, false, 20, 0);
        GLContext.VertexAttribPointer(aTexCoordLocation, 2, GLDataType.FLOAT, false, 20, 4 * 3);
    }

}