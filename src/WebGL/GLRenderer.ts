import { oldMousePos } from "Componets/Tabs/GraphTab";
import { glCanvasRef } from "Componets/Tabs/RenderTab";
import { QuadBuffer, VertexArray, VertexBuffer } from "./Buffer";
import { GLContext, PrimitiveMode } from "./GLContext";
import { GLShader } from "./GLShader";
import { GLTexture2D } from "./Texture";

const vertexShaderSource = `
        attribute vec3 aVertexPos;
        attribute vec2 aTexCoord;

        varying vec2 vTexCoord;
        void main(void)
        {
            gl_Position = vec4(aVertexPos, 1.0);
            vTexCoord = aTexCoord;
        }`;

const fragmentShaderSource = `
precision mediump float;
precision mediump int;
varying vec2 vTexCoord;
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouseCoords;
uniform sampler2D glTexture0;
uniform sampler2D glTexture1;
uniform sampler2D glTexture2;
uniform sampler2D glTexture3;
void main(void)
{
    vec2 uv = gl_FragCoord.xy / iResolution;
    vec3 col = 0.5 + 0.5 * cos((iTime * 0.001) + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(col, 1.0);
}
`

export class Renderer {
    static created = false;
    static shader: GLShader;
    static vertexArray: VertexArray;

    static Create() {
        if (Renderer.created)
            return;
        Renderer.created = true;

        Renderer.shader = new GLShader();
        Renderer.shader.InitShader(vertexShaderSource, fragmentShaderSource);
        const vertexBuffer = new VertexBuffer();
        vertexBuffer.BufferData(QuadBuffer.verticesBuffer);
        Renderer.vertexArray = new VertexArray();
        Renderer.vertexArray.AddVertexBuffer(vertexBuffer);
        Renderer.vertexArray.SetUpAttribs(Renderer.shader.program);
        Renderer.shader.Bind();
        GLTexture2D.Init();
    }

    static UpdateCompiledShader(shaderSource: string) {
        let _fragmentShaderSource = ` 
precision mediump float;
precision mediump int;
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouseCoords;
uniform sampler2D glTexture0;
uniform sampler2D glTexture1;
uniform sampler2D glTexture2;
uniform sampler2D glTexture3;
void main(void)
{
    ${shaderSource}
}
`
        Renderer.UpdateShaders(vertexShaderSource, _fragmentShaderSource);
        return _fragmentShaderSource;
    }

    static UpdateShaders(vertexSource: string, fragmentSource: string) {
        Renderer.shader.Update(vertexSource, fragmentSource);
    }

    static OnRender(time: number) {
        if (!Renderer.created)
            return;

        requestAnimationFrame(Renderer.OnRender);
        Renderer.shader.Bind();
        Renderer.shader.UploadUniformFloat("iTime", time);
        Renderer.shader.UploadUniformVec2("iResolution", { x: glCanvasRef.current?.getBoundingClientRect().width as number, y: glCanvasRef.current?.getBoundingClientRect().height as number });
        Renderer.shader.UploadUniformVec2("iMouse", { x: oldMousePos.x, y: oldMousePos.y });
        GLTexture2D.BindTexture(0);
        GLTexture2D.BindTexture(1);
        GLTexture2D.BindTexture(2);
        GLTexture2D.BindTexture(3);
        Renderer.vertexArray.Bind();

        GLContext.SetClearColor(0.0, 0.0, 0.0, 0.0);
        GLContext.ClearColorBuffer();

        Renderer.DrawQuad();
    }

    static DrawQuad() {
        GLContext.DrawArrays(PrimitiveMode.TRIANGLE_STRIP, 4);
    }
}