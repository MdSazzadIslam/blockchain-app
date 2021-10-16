import { IBlock } from "../models/blocks";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

type IProps = {
  blocks: IBlock[];
};
const ListRow: React.FC<IProps> = (props) => {
  const { blocks } = props;
  const absenceData = blocks.map((block, index) => {
    return (
      <tr key={index}>
        <td>
          <Link to={`/block/${block.hash}`}>
            <Button variant="light" className="btn-sm">
              Details
            </Button>
          </Link>
        </td>
        <td>{index + 1}</td>
        <td>
          <Link to={`/block/${block.hash}`}>{block.hash}</Link>
        </td>
        <td>
          <Link to={`/block/${block.hash}`}>{block.height}</Link>
        </td>
        <td>{block.time}</td>
      </tr>
    );
  });

  return <>{absenceData}</>;
};

export default ListRow;
