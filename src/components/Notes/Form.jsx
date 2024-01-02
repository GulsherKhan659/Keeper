import React, { useState, useRef, useContext } from "react";
import {
  Box,
  Container as MuiContainer,
  ClickAwayListener,
  TextField,
  Fab,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
import { DataContext } from "../../Context/DataProvider";
import { Add } from "@mui/icons-material";
import "./index.css";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: "#e0e0e0";
  margin: auto;
  margin-bottom: 2rem;
  min-height: 30px;
  position: relative;
`;

const AddButton = styled(Fab)`
  position: absolute;
  right: 18px;
  bottom: -18px;
  background: #f5ba13;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
  &:hover {
    background: #f5ba13;
  }
`;

const note = {
  id: "",
  title: "",
  text: "",
  status: "started", // Default status
};

const Form = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [addNote, setAddNote] = useState({ ...note, id: uuid() });
  const [openStatusMenu, setOpenStatusMenu] = useState(false);
  const { setNotes } = useContext(DataContext);
  const containerRef = useRef();

  const onTextChange = (e) => {
    let changedNote = { ...addNote, [e.target.name]: e.target.value };
    setAddNote(changedNote);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleSelectClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onSaveClick = () => {
    setShowTextField(false);
    containerRef.current.style.minHeight = "30px";
    setAddNote({ ...note, id: uuid() });
    if (addNote.title || addNote.text) {
      setNotes((prevArr) => [addNote, ...prevArr]);
    }
  };

  console.log("showTextField",showTextField);
  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowTextField(false);
        containerRef.current.style.minHeight = "30px";
        setAddNote({ ...note, id: uuid() });
        if (addNote.title || addNote.text) {
          setNotes((prevArr) => [addNote, ...prevArr]);
        }
      }}
    >
      <MuiContainer maxWidth="sm">
        <Container ref={containerRef}>
        {showTextField && (
  <>
    <TextField
      size="small"
      placeholder="Title"
      variant="standard"
      InputProps={{ disableUnderline: true }}
      style={{ marginBottom: 10, width: "100%" }}
      onChange={(e) => onTextChange(e)}
      name="title"
      value={addNote.title}
    />
    <Select
      variant="outlined"
      className="statusSelect"
      sx={{
        width: 150,
        height: 40,
        marginRight: 15,
        border: "1px solid darkgrey",
        color: "#000",
        position: "absolute",
        right: "0",
        marginRight: "15px",
        "& .MuiSvgIcon-root": {
          display: "none",
          color: "white",
        },
      }}
    >
      <MenuItem value={"USD"}>USD America</MenuItem>
      <MenuItem value={"INR"}>INR</MenuItem>
    </Select>
  </>
)}


          <TextField
            multiline
            placeholder="Take a note..."
            variant="standard"
            InputProps={{ disableUnderline: true }}
            onClick={() => {
              setShowTextField(true);
              containerRef.current.style.minHeight = "70px";
            }}
            onChange={(e) => onTextChange(e)}
            name="text"
            value={addNote.text}
          />

          <AddButton onClick={onSaveClick}>
            <Add />
          </AddButton>
        </Container>
      </MuiContainer>
    </ClickAwayListener>
  );
};

export default Form;
