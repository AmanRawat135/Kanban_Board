// ThHeading.js
import React from 'react';
import "./thheading.css";
import { CgDanger } from 'react-icons/cg';
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';
import { FaCircleHalfStroke, FaPlus } from 'react-icons/fa6';
import { MdOutlineDangerous, MdSignalCellular1Bar, MdSignalCellular3Bar, MdSignalCellular4Bar } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { TbAlertSquareFilled } from "react-icons/tb";

const priorityMapping = {
  0: (<><BsThreeDots color="grey" /> No Priority </>),
  1: (<><MdSignalCellular1Bar /> Low </>),
  2: (<><MdSignalCellular3Bar /> Medium</>),
  3: (<><MdSignalCellular4Bar /> High</>),
  4: (<><TbAlertSquareFilled color="red" /> Urgent</>),
};

const ThHeading = ({ keyName, groupBy, getUserName, cardsCount }) => (
  <>
  <div className="th">
    {keyName === 'Backlog' && <CgDanger color="red" />}
    {keyName === 'Todo' && <FaRegCircle size="18px" />}
    {keyName === 'In progress' && <FaCircleHalfStroke color="blue" />}
    {keyName === 'Done' && <FaCheckCircle color="green" />}
    {keyName === 'Completed' && <MdOutlineDangerous size="20px" />}

    {groupBy === 'userId' ? `${getUserName(keyName)}` : priorityMapping[keyName] || keyName}
    <span>({cardsCount})</span>
    <div className="three-dots">
  <FaPlus/>
  <BsThreeDots />
</div>
  </div>
</>
);

export default ThHeading;
