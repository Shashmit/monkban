import { Box, ListItem, Typography, ListItemButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { setFavouriteList } from "../../redux/features/favouriteSlice";
import { useEffect, useState } from "react";
import boardApi from "../../api/boardApi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const FavouriteList = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.favourites.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getFavourites();
        dispatch(setFavouriteList(res));
      } catch (err) {
        alert(err);
      }
    };
    getBoards();
  }, []);

  useEffect(() => {
    const index = list.findIndex((e) => e.id === boardId);
    setActiveIndex(index);
  }, [list, boardId]);

  const onDragEnd = async ({ source, destination }) => {
    const newList = [...list];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e._id === boardId);
    setActiveIndex(activeItem);
    dispatch(setFavouriteList(newList)); // update store
    try {
      await boardApi.updateFavouritePosition({ boards: newList });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <ListItem>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" fontWeight="700">
            Favourite
          </Typography>
        </Box>
      </ListItem>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable-key"}
          droppableId={"list-board-droppable"}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <ListItemButton
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      selected={index === activeIndex}
                      component={Link}
                      to={`/boards/${item._id}`}
                      sx={{
                        pl: "20px",
                        cursor: snapshot.isDragging
                          ? "grab"
                          : "pointer!important",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="700"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.icon} {item.title}
                      </Typography>
                    </ListItemButton>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default FavouriteList;
