import { GLContext, GLTexture } from "./GLContext";
import { Renderer } from "./GLRenderer";

export class GLTexture2D {
    static texture0: GLTexture | null = null;
    static texture1: GLTexture | null = null;
    static texture2: GLTexture | null = null;
    static texture3: GLTexture | null = null;


    static Init() {
        GLTexture2D.texture0 = GLContext.CreateTexture();
        GLTexture2D.texture1 = GLContext.CreateTexture();
        GLTexture2D.texture2 = GLContext.CreateTexture();
        GLTexture2D.texture3 = GLContext.CreateTexture();
        GLContext.SetTextureIndex(Renderer.shader.program, "glTexture0", 0);
        GLContext.SetTextureIndex(Renderer.shader.program, "glTexture1", 1);
        GLContext.SetTextureIndex(Renderer.shader.program, "glTexture2", 2);
        GLContext.SetTextureIndex(Renderer.shader.program, "glTexture3", 3);


    }

    static BindTexture(index: number) {
        switch (index) {
            case (0): {
                GLContext.ActivateTexture(0);
                GLContext.BindTexture(GLTexture2D.texture0 as GLTexture);
                break;
            }

            case (1): {
                GLContext.ActivateTexture(1);
                GLContext.BindTexture(GLTexture2D.texture1 as GLTexture);
                break;
            }

            case (2): {
                GLContext.ActivateTexture(2);
                GLContext.BindTexture(GLTexture2D.texture2 as GLTexture);
                break;
            }
            case (3): {
                GLContext.ActivateTexture(3);
                GLContext.BindTexture(GLTexture2D.texture3 as GLTexture);
            }
        }
    }

    static UpdateTexture(index: number, img: TexImageSource) {
        GLTexture2D.BindTexture(index);
        GLContext.SetTexture(img.width, img.height, img);
        GLContext.SetTextureParams();
    }
}