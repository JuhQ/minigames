import "./box.css";

interface Props {
  onClick: () => void;
  color: string;
  disabled: boolean;
  active: boolean;
}

const Box = ({ onClick, color, disabled, active }: Props): JSX.Element => (
  <span
    role="none"
    className={`memory-box ${disabled ? "disabled" : ""} ${
      active ? "active" : ""
    }`}
    onClick={onClick}
  >
    <div className="content">
      <div className="front" />
      <div className="back" style={{ backgroundColor: color }} />
    </div>
  </span>
);

export default Box;
