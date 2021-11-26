
interface TitleBarProps {
    title: string;
}

export const TitleBar: React.FC<TitleBarProps> = (props) => {
    return (
        <div className="TitleBar">
            <p>{props.title}</p>
        </div>
    );
};