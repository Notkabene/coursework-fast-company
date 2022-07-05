import {
  createAction,
  createSlice
} from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter(com => com._id !== action.payload);
    }
  }
});

const commentsCreateRequested = createAction("comments/commentsCreateRequested");
const createCommentsFailed = createAction("comments/createCommentsFailed");
const commentsremoveRequested = createAction("comments/commentsremoveRequested");
const removeCommentsFailed = createAction("comments/removeCommentsFailed");

const {
  reducer: commentsReducer,
  actions
} = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const {
      content
    } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment = (data, userId, currentUserId) => async (dispatch) => {
  dispatch(commentsCreateRequested());
  const comment = {
    ...data,
    _id: nanoid(),
    pageId: userId,
    created_at: Date.now(),
    userId: currentUserId
  };
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(createCommentsFailed(error.message));
  }
};

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentsremoveRequested());
  try {
    const { content } = await commentService.removeComment(id);
    if (content === null) dispatch(commentRemoved(content));
  } catch (error) {
    dispatch(removeCommentsFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
