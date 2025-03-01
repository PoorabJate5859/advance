import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadPosts = createAsyncThunk(
  "blogData/loadPosts",
  async ({ page = 1, limit = 10, userId = null }) => {
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}${
      userId ? `&userId=${userId}` : ""
    }`;
    
    const response = await axios.get(url);
    const total = parseInt(response.headers["x-total-count"] || "100");
    
    return {
      entries: response.data,
      total,
    };
  }
);

export const loadPostData = createAsyncThunk(
  "blogData/loadPostData",
  async (entryId) => {
    const [postResponse, commentsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/posts/${entryId}`),
      axios.get(`https://jsonplaceholder.typicode.com/posts/${entryId}/comments`),
    ]);
    return {
      ...postResponse.data,
      comments: commentsResponse.data,
    };
  }
);

const blogSlice = createSlice({
  name: "blogData",
  initialState: {
    entriesList: [],
    selectedEntry: null,
    loadingStatus: "idle",
    errorMessage: null,
    searchQuery: "",
    currentPage: 1,
    totalEntries: 0,
    entriesPerPage: 10,
    activeFilters: {
      userId: null,
    },
  },
  reducers: {
    updateSearchFilter: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    applyFilter: (state, action) => {
      state.activeFilters = { ...state.activeFilters, ...action.payload };
      state.currentPage = 1;
    },
    resetFilters: (state) => {
      state.activeFilters = { userId: null };
      state.searchQuery = "";
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadingStatus = "succeeded";
        state.entriesList = action.payload.entries;
        state.totalEntries = action.payload.total;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.errorMessage = action.error.message;
      })
      .addCase(loadPostData.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(loadPostData.fulfilled, (state, action) => {
        state.loadingStatus = "succeeded";
        state.selectedEntry = action.payload;
      })
      .addCase(loadPostData.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export const { updateSearchFilter, changePage, applyFilter, resetFilters } =
  blogSlice.actions;
export default blogSlice.reducer;