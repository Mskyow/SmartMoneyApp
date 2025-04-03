import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, instanceJWT } from "../../utils/axios_instance";

export const fetchBlockchainData = createAsyncThunk(
    "blockchain/fetchData",
    async (account_address:string, { rejectWithValue }) => {
      try {
       
        const responseBalance = await instanceJWT.post(
          "/block-chain/get-balance",
          { account_address },
    
        );
        const responseTokenList = await instanceJWT.post(
          "/block-chain/get-tokens",
          { account_address },
        );
        const responseAnalytics = await instanceJWT.get(
          "/block-chain/get-analytics",
        );
        return {
          balance: responseBalance.data,
          tokenList: responseTokenList.data,
          analytics : responseAnalytics.data
        };
      } catch (err) {
        return rejectWithValue(err as string );
      }
    }
  );