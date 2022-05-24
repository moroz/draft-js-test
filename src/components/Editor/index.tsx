import React, { useCallback, useState } from "react";
import "draft-js/dist/Draft.css";
import { DraftEditorCommand, Editor, EditorState, RichUtils } from "draft-js";
import styles from "./Editor.module.sass";

interface Props {}

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

  return (
    <div className={styles.editor}>
      <div className={styles.controls}>Test</div>
      <div className={styles.editorContainer}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default EditorComponent;
