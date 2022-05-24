import { EditorState } from "draft-js";
import React from "react";
import { BLOCK_TYPES } from "./constants";
import styles from "../Editor.module.sass";
import ToolbarButton from "../ToolbarButton";

interface Props {
  editorState: EditorState;
  onToggle: (type: string) => () => void;
}

const BlockStyles: React.FC<Props> = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles.toolbar}>
      {BLOCK_TYPES.map(({ label, style }) => (
        <ToolbarButton
          onToggle={onToggle(style)}
          key={style}
          label={label}
          active={blockType === style}
        />
      ))}
    </div>
  );
};

export default BlockStyles;
