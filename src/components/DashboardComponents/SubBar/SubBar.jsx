import  { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import MonacoEditorComponent from '../../EditorComponent/MonacoEditorComponent';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CheckIcon from '@mui/icons-material/Check';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const SubBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #000000;
  color: #ecf0f1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
`;

const PathDisplay = styled.div`
  flex-grow: 1;
  font-size: 16px;
  span {
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #a45eff;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
 display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
  
  
  &:hover {
    background-color: #612ba9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledSubstituteButtonOne = styled.button`
  background-color: #25212b;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  top: 25%;
  left: 78%;
  align-items: center;
  
  transition: all 0.3s;
  width: 115px;
  
  
  &:hover {
    background-color: #612ba9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;
const StyledSubstituteButtonTwo = styled.button`
  background-color: #25212b;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  top: 25%;
  left: 69%;
  align-items: center;
  
  transition: all 0.3s;
  width: 115px;
  
  
  &:hover {
    background-color: #612ba9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  height: 80%;
  display: flex;
  
  flex-direction: column;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const FolderInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  animation: ${slideIn} 0.3s ease-out;
`;

const FolderInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #35185A;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #612ba9;
    box-shadow: 0 0 5px rgba(97, 43, 169, 0.5);
  }
`;

const SubBar = ({ currentPath, onNavigate, onCreateFolder, onUploadFile, onCreateFile }) => {
  const [newFolderName, setNewFolderName] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [showFolderInput, setShowFolderInput] = useState(false);

  const fileInputRef = useRef(null);

  const handleCreateFolder = () => {
    if (showFolderInput && newFolderName) {
      onCreateFolder(newFolderName);
      setNewFolderName('');
      setShowFolderInput(false);
    } else {
      setShowFolderInput(true);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUploadFile(file);
    }
  };

  const handleCreateFile = () => {
    setShowEditor(true);
  };

  const handleSaveFile = () => {
    if (fileName && fileContent) {
      onCreateFile(fileName, fileContent);
      setShowEditor(false);
      setFileContent('');
      setFileName('');
    }
  };

  const segments = currentPath.split('/').filter(Boolean);

  return (
    <>
      <SubBarContainer>
        <PathDisplay>
          <span onClick={() => onNavigate('/')}>root</span>
          {segments.length > 0 && ' / '}
          {segments.map((segment, index) => (
            <span key={index}>
              <span onClick={() => onNavigate('/' + segments.slice(0, index + 1).join('/') + '/')}>
                {segment}
              </span>
              {index < segments.length - 1 && ' / '}
            </span>
          ))}
        </PathDisplay>
       
        <ActionButtons>
          {showFolderInput ? (
            <FolderInputContainer>
              <FolderInput
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="New folder name"
                autoFocus
              />
              <StyledButton onClick={handleCreateFolder}>
                <CheckIcon />
              </StyledButton>
            </FolderInputContainer>
          ) : (
            <StyledButton onClick={handleCreateFolder}>
              <CreateNewFolderIcon /> Create Folder
            </StyledButton>
          )}
          <StyledButton onClick={() => fileInputRef.current.click()}>
            <UploadFileIcon /> Upload File
          </StyledButton>
          <StyledButton onClick={handleCreateFile}>
            <NoteAddIcon /> Create File
          </StyledButton>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </ActionButtons>
      </SubBarContainer>
      {showEditor && (
        <Modal>
          <ModalContent>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="File Name"
              style={{ marginBottom: '10px', padding: '5px' }}
            />
            <MonacoEditorComponent
              value={fileContent}
              onChange={setFileContent}
              style={{ flexGrow: 1, marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <StyledSubstituteButtonOne onClick={handleSaveFile}>Save File</StyledSubstituteButtonOne>
              <StyledSubstituteButtonTwo onClick={() => setShowEditor(false)}>Cancel</StyledSubstituteButtonTwo>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

SubBar.propTypes = {
  currentPath: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onCreateFolder: PropTypes.func.isRequired,
  onUploadFile: PropTypes.func.isRequired,
  onCreateFile: PropTypes.func.isRequired,
};

export default SubBar;