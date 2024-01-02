import React, { useState, useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Modal,
  ClickAwayListener,
  Container as MuiContainer,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArchiveOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";
import "./index.css";

const NoteCard = styled(Card)`
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 1px 3px 1px rgba(60, 64, 67, 0.149);
  }
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  padding: 10px 15px;
  border-radius: 8px;
  margin: auto;
  border: 1px solid #acacac;
  min-height: 30px;
  position: relative;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "8px",
};

// ... (imports)

const Note = ({ note }) => {
    const [showActions, setShowActions] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [modifiedNote, setModifiedNote] = useState({ ...note }); 
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      const index = notes.findIndex((n) => n.id === modifiedNote.id);
      if (index !== -1) {
          const updatedNote = [...notes];
          updatedNote[index] = modifiedNote;
          setNotes(updatedNote);
      }
      setOpen(false);
    };
  
    const { notes, setNotes, setArchivedNotes, setDeletedNotes } =
      useContext(DataContext);
  
    const archiveNote = (note) => {
      const updatedNotes = notes.filter((data) => data.id !== note.id);
      setNotes(updatedNotes);
      setArchivedNotes((prevArr) => [...prevArr, note]);
    };
  
    const deleteNote = (note) => {
      const updatedNotes = notes.filter((data) => data.id !== note.id);
      setNotes(updatedNotes);
      setDeletedNotes((prevArr) => [...prevArr, note]);
    };
  
    const onTextChange = (e) => {
      const { name, value } = e.target;
      setModifiedNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    };
  
    return (
      <>
        <NoteCard
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <CardContent sx={{ wordWrap: "break-word" }} onClick={handleOpen}>
            <Typography>{note.title}</Typography>
            <Typography>{note.text}</Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "end", marginLeft: "auto" }}
          >
            <Tooltip title="Archive">
              <IconButton
                sx={{ visibility: showActions ? "visible" : "hidden" }}
                onClick={() => archiveNote(note)}
              >
                <ArchiveOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                sx={{ visibility: showActions ? "visible" : "hidden" }}
                onClick={() => deleteNote(note)}
              >
                <DeleteOutlineOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          </CardActions>
        </NoteCard>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Container>
              <TextField
                size="small"
                placeholder="Title"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{ marginBottom: 10, fontWeight: 700, fontSize: 16 }}
                onChange={(e) => onTextChange(e)}
                name="title"
                className="title"
                value={modifiedNote.title}
              />
              <TextField
                multiline
                placeholder="Take a note..."
                variant="standard"
                InputProps={{ disableUnderline: true }}
                onChange={(e) => onTextChange(e)}
                name="text"
                value={modifiedNote.text}
                className="text"
              />
             <Box sx={{ display: "flex", justifyContent: "end", marginLeft: "auto" }}> 
             <Tooltip title="Archive">
              <IconButton
                onClick={() => archiveNote(note)}
              >
                <ArchiveOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => deleteNote(note)}
              >
                <DeleteOutlineOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
             </Box>
            </Container>
          </Box>
        </Modal>
      </>
    );
  };
  
  export default Note;
  
