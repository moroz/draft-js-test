import { EditorState } from "draft-js";
import React from "react";
import { INLINE_STYLES } from "../constants";

interface Props {
  editorState: EditorState;
  onToggle: (style: string) => void;
}

const InlineStyles: React.FC<Props> = ({ editorState, onToggle }) => {
  return (
    <div>
      {INLINE_STYLES.map(({ label, style }) => (
        <button key={style}>{label}</button>
      ))}
    </div>
  );
};

export default InlineStyles;
