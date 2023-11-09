import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setBoards } from "../redux/features/boardSlice";
import { useNavigate } from "react-router-dom";
import boardApi from "../api/boardApi";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const createBoard = async () => {
    try {
      const res = await boardApi.create();
      dispatch(setBoards(res));
      navigate(`/boards/${res._id}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Box>
        <LoadingButton
          variant="contained"
          color="success"
          onClick={createBoard}
          loading={loading}
        >
          Click here to create your first board
        </LoadingButton>
      </Box>
    </div>
  );
};

export default Home;
