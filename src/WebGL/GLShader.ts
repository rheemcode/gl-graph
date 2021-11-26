import { Vec2 } from "Utils/helper";
import * as WEBGL from "./GLContext";

export class GLShader {
    program: WEBGL.GLProgram = 0;

    InitShader(vertexSource: string, fragmentSource: string) {
        let vertexShader = this.CompilerShader(WEBGL.ShaderType.VERTEX, vertexSource);
        let fragmentShader = this.CompilerShader(WEBGL.ShaderType.FRAGMENT, fragmentSource);

        this.program = WEBGL.GLContext.CreateProgram();
        WEBGL.GLContext.AttachShader(this.program, vertexShader);
        WEBGL.GLContext.AttachShader(this.program, fragmentShader);
        WEBGL.GLContext.LinkProgram(this.program);

        if (!WEBGL.GLContext.GetProgramParameter(this.program, WEBGL.ShaderParameter.LINK_STATUS)) {
            console.log("shader link error");

            WEBGL.g_glErrors.AddError("Shader Link Error");
        }
        WEBGL.GLContext.DetachShader(this.program, vertexShader);
        WEBGL.GLContext.DetachShader(this.program, fragmentShader);

        WEBGL.GLContext.DeleteShader(vertexShader);
        WEBGL.GLContext.DeleteShader(fragmentShader);

    }

    UploadUniformFloat(name: string, value: number) {
        WEBGL.GLContext.SetUniformFloat(this.program, name, value);
    }

    UploadUniformVec2(name: string, value: Vec2) {
        WEBGL.GLContext.SetUniformVec2(this.program, name, value);
    }

    Update(vertexSource: string, fragmentSource: string) {
        this.Bind();
        let vertexShader = this.CompilerShader(WEBGL.ShaderType.VERTEX, vertexSource);
        let fragmentShader = this.CompilerShader(WEBGL.ShaderType.FRAGMENT, fragmentSource);
        WEBGL.GLContext.AttachShader(this.program, vertexShader);
        WEBGL.GLContext.AttachShader(this.program, fragmentShader);
        WEBGL.GLContext.LinkProgram(this.program);

        if (!WEBGL.GLContext.GetProgramParameter(this.program, WEBGL.ShaderParameter.LINK_STATUS)) {
            console.log("shader link error");

            WEBGL.g_glErrors.AddError("Shader Link Error");
        }
        WEBGL.GLContext.DetachShader(this.program, vertexShader);
        WEBGL.GLContext.DetachShader(this.program, fragmentShader);

        WEBGL.GLContext.DeleteShader(vertexShader);
        WEBGL.GLContext.DeleteShader(fragmentShader);

    }

    Bind() {
        WEBGL.GLContext.UseProgram(this.program);
    }

    Delete() {
        WEBGL.GLContext.DeleteProgram(this.program);
    }

    private CompilerShader(shaderType: WEBGL.ShaderType, shaderSource: string) {
        let shader = WEBGL.GLContext.CreateShader(shaderType);
        WEBGL.GLContext.ShaderSource(shader, shaderSource);
        WEBGL.GLContext.CompileShader(shader);

        if (!WEBGL.GLContext.GetShaderParameter(shader, WEBGL.ShaderParameter.COMPILE_STATUS)) {
            console.log(WEBGL.GLContext.GetShaderInfoLog(shader));
            WEBGL.g_glErrors.AddError(WEBGL.GLContext.GetShaderInfoLog(shader));
        }

        return shader;
    }


}