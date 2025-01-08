import "./box.css";

interface Props {
  color: string;
}

const Reveal = ({ color }: Props): JSX.Element => (
  <span role="none" className="memory-box" style={{ backgroundColor: color }} />
);

export default Reveal;
