import { EditorState } from "draft-js";
import React from "react";
import { BLOCK_TYPES } from "../constants";

interface Props {
  editorState: EditorState;
  onToggle: (type: string) => void;
}

const BlockStyles: React.FC<Props> = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const onClick = (blockType: string) => () => {
    onToggle(blockType);
  };

  return (
    <div>
      {BLOCK_TYPES.map(({ label, style }) => (
        <button type="button" onClick={onClick(style)} key={style}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default BlockStyles;
