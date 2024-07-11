import { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { Slider, Typography, CssBaseline, Button, Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Wrapper = styled((props) => (
  <Box {...props} />
))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  height: '100%',
}));

const ToolbarWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '20px',
  flexWrap: 'wrap',
});

const ColorPicker = styled('input')({
  WebkitAppearance: 'none',
  width: '40px',
  height: '40px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  '&::-webkit-color-swatch': {
    borderRadius: '50%',
    border: '2px solid #ffffff',
  },
  '&::-moz-color-swatch': {
    borderRadius: '50%',
    border: '2px solid #ffffff',
  },
});

const DarkButton = styled(Button)({
  backgroundColor: '#212121',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#424242',
  },
});

const CanvasContainer = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlowchartEditor = () => {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushRadius, setBrushRadius] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const canvasRef = useRef(null);

  const handleColorChange = (event) => {
    setBrushColor(event.target.value);
    setIsEraser(false);
  };

  const handleBrushRadiusChange = (event, newValue) => {
    setBrushRadius(newValue);
  };

  const handleEraser = () => {
    setIsEraser(!isEraser);
    setBrushColor(isEraser ? '#000000' : '#FFFFFF');
  };

  const handleUndo = () => {
    canvasRef.current.undo();
  };

  const handleClear = () => {
    canvasRef.current.clear();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Wrapper>
        <ToolbarWrapper>
          <ColorPicker
            type="color"
            value={brushColor}
            onChange={handleColorChange}
          />
          <DarkButton variant="contained" onClick={handleEraser}>
            {isEraser ? 'Brush' : 'Eraser'}
          </DarkButton>
          <DarkButton variant="contained" onClick={handleUndo}>
            Undo
          </DarkButton>
          <DarkButton variant="contained" onClick={handleClear}>
            Clear
          </DarkButton>
          <Typography id="brush-size-slider" gutterBottom>
            
          </Typography>
          <Slider
            value={brushRadius}
            onChange={handleBrushRadiusChange}
            aria-labelledby="brush-size-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={20}
          />
        </ToolbarWrapper>
        <CanvasContainer>
          <CanvasDraw
            ref={canvasRef}
            brushColor={isEraser ? '#FFFFFF' : brushColor}
            brushRadius={brushRadius}
            canvasWidth={800}
            canvasHeight={600}
            lazyRadius={0}
            backgroundColor="#121212"
          />
        </CanvasContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default FlowchartEditor;
