import { EditorState } from "draft-js";
import React from "react";
import { INLINE_STYLES } from "./constants";
import ToolbarButton from "../ToolbarButton";
import styles from "../Editor.module.sass";

interface Props {
  editorState: EditorState;
  onToggle: (style: string) => (e: MouseEvent) => void;
}

const InlineStyles: React.FC<Props> = ({ editorState, onToggle }) => {
  return (
    <div className={styles.toolbar}>
      {INLINE_STYLES.map(({ label, style, icon }) => (
        <ToolbarButton
          key={style}
          label={label}
          icon={icon}
          onToggle={onToggle(style)}
        />
      ))}
    </div>
  );
};

export default InlineStyles;
