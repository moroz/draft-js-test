import React, { useCallback, useState } from "react";
import "draft-js/dist/Draft.css";
import {
  ContentBlock,
  DraftEditorCommand,
  Editor,
  EditorState,
  RichUtils
} from "draft-js";
import styles from "./Editor.module.sass";
import BlockStyles from "./BlockStyles";
import InlineStyles from "./InlineStyles";

interface Props {}

function getBlockStyle(block: ContentBlock) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const EditorComponent: React.FC<Props> = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleKeyCommand = useCallback(
    (command: DraftEditorCommand, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }

      return "not-handled";
    },
    [setEditorState]
  );

  const onToggleBlockType = useCallback(
    (blockType: string) => (e: MouseEvent) => {
      e.preventDefault();
      setEditorState((oldState) => {
        return RichUtils.toggleBlockType(oldState, blockType);
      });
    },
    [setEditorState]
  );

  const onToggleInlineStyle = useCallback(
    (style: string) => () => {
      setEditorState((oldState) => {
        return RichUtils.toggleInlineStyle(oldState, style);
      });
    },
    [setEditorState]
  );

  return (
    <div className={styles.editor}>
      <div className={styles.controls}>
        <BlockStyles editorState={editorState} onToggle={onToggleBlockType} />
        <InlineStyles
          editorState={editorState}
          onToggle={onToggleInlineStyle}
        />
      </div>
      <div className={styles.editorContainer}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          blockStyleFn={getBlockStyle}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default EditorComponent;
