import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBlockchainData } from "../../thunk";

interface IInitailState {
    balance: number | null,
    tokenList: ITokenListObject[],
    loading: boolean,
    error: null | unknown,
}

const initialState : IInitailState= {
    balance: null,
    tokenList: [{
        name: '',
        symbol:'',
        image: '',
        amount: '',
        decimals: 0,
        uiAmount: 0,
        uiAmountString: ''
    }],
    loading: false,
    error: null as string | unknown,
}
interface BlockchainData {
    balance: number;
    tokenList: ITokenListObject[];
  }

const blockchainSlice = createSlice({
    name: "blockchain",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBlockchainData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBlockchainData.fulfilled, (state, action: PayloadAction<BlockchainData>) => {
          state.loading = false;
          state.balance = action.payload.balance;
          state.tokenList = action.payload.tokenList;
        })
        .addCase(fetchBlockchainData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string || "An error occurred"
        });
    },
  });
  
 // features/blockchainSelectors.js
export const selectBalance = (state: { blockchain: { balance: number; }; } ) => state.blockchain.balance;
export const selectTokenList = (state: { blockchain: { tokenList: []; }; }) => state.blockchain.tokenList;
export const selectLoading = (state: { blockchain: { loading: boolean; }; }) => state.blockchain.loading;
export const selectError = (state: { blockchain: { error: any; }; }) => state.blockchain.error;
  
  export default blockchainSlice.reducer