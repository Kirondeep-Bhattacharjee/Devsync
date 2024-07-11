import PropTypes from 'prop-types';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import { useState } from 'react';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: -1;
  
  
  background-color: #1e1e1e;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  background-color: #5e5e5e;
  color: #d4d4d4;
`;

const FileName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SaveButton = styled(Button)`
  background-color: #5e5e5e;
  color: #ffffff;
  
  
`;

const DeleteButton = styled(Button)`
  background-color: #5e5e5e;
  color: #ffffff;
`;

const CloseButton = styled(Button)`
  background-color: #5e5e5e;
  color: #ffffff;
`;

const StyledEditor = styled(Editor)`
  flex-grow: 1;
  z-index: 1;
  font-family: 'Consolas', 'Courier New', monospace;
`;

const MonacoEditorComponent = ({ value, onChange, language, fileName, onSave, onDelete, onClose }) => {
  const [isEdited, setIsEdited] = useState(false);

  const handleEditorDidMount = (editor) => {
    console.log('Editor mounted');
    editor.focus();
  };

  const handleChange = (newValue) => {
    onChange(newValue);
    setIsEdited(true);
  };

  const handleSave = () => {
    onSave();
    setIsEdited(false);
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <FileName>{fileName}</FileName>
        <ButtonGroup>
          <SaveButton onClick={handleSave} disabled={!isEdited}>
            {isEdited ? 'Save' : 'Save'}
          </SaveButton>
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ButtonGroup>
      </EditorHeader>
      <StyledEditor
        height="calc(100% - 50px)"
        defaultLanguage={language || 'javascript'} // Set default language to JavaScript
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          automaticLayout: true,
          theme: 'vs-dark', // Set the theme to VS Code's dark theme
        }}
      />
    </EditorContainer>
  );
};

MonacoEditorComponent.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  language: PropTypes.string,
  fileName: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

MonacoEditorComponent.defaultProps = {
  value: '',
  language: 'javascript', // Default language set to JavaScript
};

export default MonacoEditorComponent;