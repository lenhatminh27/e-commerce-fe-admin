import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const subcriptions: string[] = []
const subcriptionSlice = createSlice({
  name: "subcription",
  initialState: subcriptions,
  reducers: {
    addSubscription: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
    },
  },
})

export const { addSubscription } = subcriptionSlice.actions
export default subcriptionSlice.reducer
