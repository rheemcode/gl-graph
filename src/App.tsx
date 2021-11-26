import { AddNodeButton, CompileButton, TextureViewPanel, UploadTexture } from "Componets/Menus";
import React from "react";
import { ShaderGraphWindow } from "./ShaderGraphWindow";


const AppHeader = () => {
	return (
		<div className="AppHeader">
			<div className="AppName">
				GLGraph
			</div>
			<div style={{ display: "flex" }}>
				<AddNodeButton />
				<UploadTexture />
				<CompileButton />
			</div>

		</div>
	)
}

export const textureViewPanelRef = React.createRef<HTMLDivElement>();

const App = () => {
	return (
		<>
			<AppHeader />
			<ShaderGraphWindow />
			<TextureViewPanel ref={textureViewPanelRef} />
		</>
	);
};

export default App;
