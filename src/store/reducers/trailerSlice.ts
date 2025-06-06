import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface TrailerState {
  isOpened: boolean
  videoKey: string | null
}

const initialState: TrailerState = {
  isOpened: false,
  videoKey: null,
}

export const trailerSlice = createSlice({
  name: "trailer",
  initialState,
  reducers: {
    openTrailerModal: (
      state,
      action: PayloadAction<TrailerState["videoKey"]>,
    ) => {
      state.isOpened = true
      state.videoKey = action.payload
    },
    closeTrailerModal: () => {
      return initialState
    },
  },
})

export default trailerSlice.reducer
