import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/HomePageComponents/Navigation';
import SubBar from '../../components/DashboardComponents/SubBar/SubBar';
import { createFolder, uploadFile, listObjects, createFile, getFileContent, deleteFile } from '../../services/s3Service';
import styled from 'styled-components';
import MonacoEditorComponent from '../../components/EditorComponent/MonacoEditorComponent';
import FlowchartEditor from '../../components/FlowchartEditor/FlowchartEditor';
import { FaFolderOpen, FaUsers } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { randomID } from '../RoomPage/utils';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DashboardContainer = styled.div`
  display: flex;
  height: calc(100vh - 120px);
`;

const MiniSidebar = styled.div`
  width: 50px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

const SidebarIcon = styled.div`
  color: #000000;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const Sidebar = styled.div`
  width: ${(props) => (props.isOpen ? '300px' : '0px')};
  background-color: #f2f2f2;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: width 0.3s ease-in-out, padding 0.3s ease-in-out;

  /* Scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1e1e1e;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #3c3c3c;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #212529;
  }
`;

const ToggleBar = styled.div`
  width: 30px;
  background-color: #e2e2e2;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  justify-content: center;
  z-index: 1;
  left: ${(props) => (props.isOpen ? '300px' : '50px')};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #616161;
  }
`;

const FolderList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: #000000;
`;

const FolderItem = styled.li`
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  background-color: #f2f2f2;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ced4da;
  }
`;

const FolderArrow = styled.span`
  margin-right: 10px;
  cursor: pointer;
  color: #000000;
  transition: transform 0.3s ease-in-out;

  ${FolderItem}:hover & {
    transform: rotate(90deg);
  }
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: #000000;
`;

const FileItem = styled.li`
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  background-color: #f2f2f2;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ced4da;
  }
`;

const EditorContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const LoadingSpinner = styled(AiOutlineLoading3Quarters)`
  font-size: 48px;
  color: #ffffff;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const DashboardPage = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const loadFolderContents = useCallback(async () => {
    setIsLoading(true);
    try {
      const { folders, files } = await listObjects(currentPath);
      setFolders(folders);
      setFiles(files);
    } catch (error) {
      console.error('Error loading folder contents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPath]);

  useEffect(() => {
    loadFolderContents();
  }, [loadFolderContents]);

  const handleNavigate = (newPath) => {
    const formattedPath = newPath.endsWith('/') ? newPath : `${newPath}/`;
    setCurrentPath(formattedPath);
    setActiveItem(null);
  };

  const handleCreateFolder = async (folderName) => {
    setIsLoading(true);
    try {
      await createFolder(currentPath + folderName);
      loadFolderContents();
    } catch (error) {
      console.error('Error creating folder:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadFile = async (file) => {
    setIsLoading(true);
    try {
      await uploadFile(currentPath, file);
      loadFolderContents();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFile = async (fileName, content) => {
    setIsLoading(true);
    try {
      await createFile(currentPath, fileName, content);
      loadFolderContents();
    } catch (error) {
      console.error('Error creating file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileClick = async (file) => {
    setIsLoading(true);
    try {
      const content = await getFileContent(file.Key);
      setFileContent(content);
      setFileName(file.Key.replace(currentPath, ''));
      setShowEditor(true);
      setActiveItem(file.Key);
    } catch (error) {
      console.error('Error loading file content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = async () => {
    setIsLoading(true);
    try {
      await deleteFile(currentPath + fileName);
      setShowEditor(false);
      loadFolderContents();
    } catch (error) {
      console.error('Error deleting file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFile = async () => {
    setIsLoading(true);
    try {
      await createFile(currentPath, fileName, fileContent);
      setShowEditor(false);
      loadFolderContents();
    } catch (error) {
      console.error('Error saving file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFolderExpansion = (folderPath) => {
    setExpandedFolders((prevExpandedFolders) => {
      if (prevExpandedFolders.includes(folderPath)) {
        return prevExpandedFolders.filter((path) => path !== folderPath);
      } else {
        return [...prevExpandedFolders, folderPath];
      }
    });
  };

  const navigateToTeam = () => {
    const roomId = randomID(5);
    window.open(`/room/${roomId}`, '_blank');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const renderFolderTree = (path, folders = [], files = []) => {
    const isExpanded = expandedFolders.includes(path);

    return (
      <>
        <FolderList>
          {folders.length > 0 &&
            folders.map((folder) => {
              const folderName = folder.replace(/^\//, ''); // Remove leading slash from folder name
              return (
                <FolderItem
                  key={folder}
                  isActive={currentPath.startsWith(`${path}${folderName}/`)}
                  onClick={() => handleNavigate(`${path}${folderName}/`)}
                >
                  <FolderArrow onClick={() => toggleFolderExpansion(`${path}${folderName}/`)}>
                    {isExpanded ? '⟱' : '⭆'}
                  </FolderArrow>
                  {isSidebarOpen ? `📁 ${folderName}` : '📁'}
                  {isExpanded && renderFolderTree(`${path}${folderName}/`, folder.folders, folder.files)}
                </FolderItem>
              );
            })}
        </FolderList>
        <FileList>
          {files.length > 0 &&
            files.map((file) => (
              <FileItem
                key={file.Key}
                isActive={activeItem === file.Key}
                onClick={() => handleFileClick(file)}
              >
                {isSidebarOpen ? `📄 ${file.Key.replace(currentPath, '')}` : '📄'}
              </FileItem>
            ))}
        </FileList>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <SubBar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onCreateFolder={handleCreateFolder}
        onUploadFile={handleUploadFile}
        onCreateFile={handleCreateFile}
      />
      <DashboardContainer>
        <MiniSidebar>
          <SidebarIcon onClick={toggleSidebar}>
            <FaFolderOpen />
          </SidebarIcon>
          <SidebarIcon onClick={navigateToTeam}>
            <FaUsers />
          </SidebarIcon>
          <SidebarIcon>
            <BsThreeDotsVertical />
          </SidebarIcon>
        </MiniSidebar>
        <Sidebar isOpen={isSidebarOpen}>
          {renderFolderTree(currentPath, folders, files)}
        </Sidebar>
        <ToggleBar onClick={toggleSidebar} isOpen={isSidebarOpen}>
          <ArrowForwardIosIcon
            sx={{
              color: 'black',
            }
            
          }
          />
        </ToggleBar>
        <EditorContainer>
          {isLoading && (
            <LoadingContainer>
              <LoadingSpinner />
            </LoadingContainer>
          )}
          {showEditor ? (
            <MonacoEditorComponent
              value={fileContent}
              onChange={setFileContent}
              language={fileName.split('.').pop() || 'plaintext'}
              fileName={fileName}
              onSave={handleSaveFile}
              onDelete={handleDeleteFile}
              onClose={() => setShowEditor(false)}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                automaticLayout: true,
                theme: 'vs-dark',
              }}
            />
          ) : (
            <FlowchartEditor />
          )}
        </EditorContainer>
      </DashboardContainer>
    </>
  );
};

export default DashboardPage;







