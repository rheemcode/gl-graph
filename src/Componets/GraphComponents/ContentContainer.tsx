import { CSSProperties } from "react";

interface ContentContainerProps {
    flex: boolean;
}

export const ContentContainer: React.FC<ContentContainerProps> = (props) => {
    const style: CSSProperties = {
        display: "flex",
        justifyContent: "space-between"
    }

    if (props.flex) {

        return (

            <div style={style} className="ContentContainer">
                {
                    props.children
                }
            </div>
        );
    }
    else {
        return (

            <div className="ContentContainer">
                {
                    props.children
                }
            </div>
        );
    }

}
