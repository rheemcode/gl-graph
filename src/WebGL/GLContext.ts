import { off } from "process";
import { Vec2 } from "Utils/helper";

declare interface GLShader extends WebGLShader { }

export declare interface GLProgram extends WebGLProgram { }
export declare interface GLBuffer extends WebGLBuffer { }
export declare interface GLTexture extends WebGLTexture { }

// sorry i thought i was writing c++

export enum BufferType {
    ELEMENT_ARRAY_BUFFER = WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER,
    ARRAY_BUFFER = WebGL2RenderingContext.ARRAY_BUFFER,
    UNIFORM_BUFFER = WebGL2RenderingContext.UNIFORM_BUFFER
}

export enum BufferUsage {
    STATIC_DRAW = WebGL2RenderingContext.STATIC_DRAW,
    DYNAMIC_DRAW = WebGL2RenderingContext.DYNAMIC_DRAW,
    STREAM_DRAW = WebGL2RenderingContext.STREAM_DRAW
}

export enum ShaderType {
    VERTEX = WebGL2RenderingContext.VERTEX_SHADER,
    FRAGMENT = WebGL2RenderingContext.FRAGMENT_SHADER
}

export enum ShaderParameter {
    COMPILE_STATUS = WebGL2RenderingContext.COMPILE_STATUS,
    LINK_STATUS = WebGL2RenderingContext.LINK_STATUS
}

export enum GLDataType {
    FLOAT = WebGL2RenderingContext.FLOAT,
    INT = WebGL2RenderingContext.INT
}

export enum PrimitiveMode {
    LINES = WebGL2RenderingContext.LINES,
    POINTS = WebGL2RenderingContext.POINTS,
    TRIANGLES = WebGL2RenderingContext.TRIANGLES,
    TRIANGLE_STRIP = WebGL2RenderingContext.TRIANGLE_STRIP,
    TRIANGLE_FAN = WebGL2RenderingContext.TRIANGLE_FAN
}


declare type Attribs = "aVertexPos" | "aTexCoord"

export class GLContext {
    private static glContext: WebGL2RenderingContext;

    Create(context: WebGL2RenderingContext) {
        GLContext.glContext = context;
    }

    static Viewport(x: number, y: number, width: number, height: number) {
        GLContext.glContext.viewport(x, y, width, height);
    }

    static CreateProgram(): GLProgram {
        return GLContext.glContext.createProgram() as GLProgram
    }

    static CreateShader(shaderType: ShaderType): GLShader {
        let shader = GLContext.glContext.createShader(shaderType);
        return shader as GLShader;
    }

    static ShaderSource(shader: GLShader, shaderSource: string) {
        GLContext.glContext.shaderSource(shader, shaderSource);
    }

    static CompileShader(shader: GLShader) {
        GLContext.glContext.compileShader(shader);
    }

    static AttachShader(program: GLProgram, shader: GLShader) {
        GLContext.glContext.attachShader(program, shader);
    }

    static DetachShader(program: GLProgram, shader: GLShader) {
        GLContext.glContext.detachShader(program, shader);
    }

    static DeleteShader(shader: GLShader) {
        GLContext.glContext.deleteShader(shader);
    }

    static LinkProgram(program: GLProgram) {
        GLContext.glContext.linkProgram(program);
    }

    static DeleteProgram(program: GLProgram) {
        GLContext.glContext.deleteProgram(program);
    }

    static GetShaderParameter(shader: GLShader, pname: number) {
        return GLContext.glContext.getShaderParameter(shader, pname);
    }

    static UseProgram(program: GLProgram) {
        GLContext.glContext.useProgram(program);
    }

    static GetProgramParameter(shader: GLProgram, pname: number) {
        return GLContext.glContext.getProgramParameter(shader, pname);
    }


    static GetShaderInfoLog(shader: GLShader) {
        return GLContext.glContext.getShaderInfoLog(shader);
    }

    static CreateBuffer() {
        return GLContext.glContext.createBuffer() as GLBuffer;
    }

    static BufferData(bufferType: BufferType, data: ArrayBuffer, usage: BufferUsage) {

        GLContext.glContext.bufferData(bufferType, data, usage);
    }

    static SetTextureParams() {
        GLContext.glContext.texParameteri(GLContext.glContext.TEXTURE_2D, this.glContext.TEXTURE_WRAP_S, GLContext.glContext.CLAMP_TO_EDGE);
        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_WRAP_T, this.glContext.CLAMP_TO_EDGE);
        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_MIN_FILTER, this.glContext.LINEAR);
    }

    static SetTexture(width: number, height: number, buffer: TexImageSource) {
        GLContext.glContext.texImage2D(WebGL2RenderingContext.TEXTURE_2D, 0, GLContext.glContext.RGBA, width, height, 0, GLContext.glContext.RGBA, GLContext.glContext.UNSIGNED_BYTE, buffer);
    }

    static CreateTexture(): GLTexture | null {
        return this.glContext.createTexture();
    }

    static ActivateTexture(index: number) {
        GLContext.glContext.activeTexture(GLContext.glContext.TEXTURE0 + index);
    }

    static BindTexture(texture: GLTexture) {
        GLContext.glContext.bindTexture(GLContext.glContext.TEXTURE_2D, texture);
    }

    static GetAttribLocation(program: GLProgram, name: Attribs) {
        return GLContext.glContext.getAttribLocation(program, name);
    }

    static SetTextureIndex(program: GLProgram, name: string, index: number) {
        const location = GLContext.glContext.getUniformLocation(program, name);
        GLContext.glContext.uniform1i(location, index);
    }

    static SetUniformFloat(program: GLProgram, name: string, value: number) {
        const location = GLContext.glContext.getUniformLocation(program, name);
        GLContext.glContext.uniform1f(location, value);
    }

    static SetUniformVec2(program: GLProgram, name: string, value: Vec2) {
        const location = GLContext.glContext.getUniformLocation(program, name);
        GLContext.glContext.uniform2f(location, value.x, value.y);
    }

    static VertexAttribPointer(attribPos: number, count: number, dataType: GLDataType, normalized: boolean, stride: number, offset: number) {
        GLContext.glContext.vertexAttribPointer(attribPos, count, dataType, normalized, stride, offset);
    }

    static EnableVertexAtrribArray(attrib: number) {
        GLContext.glContext.enableVertexAttribArray(attrib);
    }

    static BindBuffer(bufferType: BufferType, buffer: GLBuffer) {
        GLContext.glContext.bindBuffer(bufferType, buffer);
    }

    static DeleteBuffer(bufferType: GLBuffer) {
        GLContext.glContext.deleteBuffer(bufferType);
    }

    static SetClearColor(red: number, green: number, blue: number, alpha: number) {
        GLContext.glContext.clearColor(red, green, blue, alpha);
    }

    static ClearColorBuffer() {
        GLContext.glContext.clear(GLContext.glContext.COLOR_BUFFER_BIT);
    }

    static GetErrors() {
        return GLContext.glContext.getError();
    }

    static DrawArrays(mode: PrimitiveMode, count: number) {
        GLContext.glContext.drawArrays(this.glContext.TRIANGLE_STRIP, 0, 4);
    }
}

export class GLErrors {
    cache: any[] = []
    GetError(count = 1) {
        if (this.cache.length) {
            return this.cache.pop() as any;
        }
    }

    AddError(error: any) {
        this.cache.push(error)
    }
}

export let g_glErrors = new GLErrors();