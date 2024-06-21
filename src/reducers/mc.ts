import { useReducer } from "react";
import { MinecraftServersApiResponse } from "@/types/minecraft";

interface MinecraftServerStatusState {
  mcServerJavaResponse: MinecraftServersApiResponse;
  mcServerBedrockResponse: MinecraftServersApiResponse;
}

const initialState: MinecraftServerStatusState = {
  mcServerJavaResponse: {
    online: "CHECKING",
    host: "mc.irvanma.eu.org",
    port: 25565,
  },
  mcServerBedrockResponse: {
    online: "CHECKING",
    host: "mc.irvanma.eu.org",
    port: 19132,
  },
};

const SET_JAVA_RESPONSE = "SET_JAVA_RESPONSE";
const SET_BEDROCK_RESPONSE = "SET_BEDROCK_RESPONSE";
const RESET_RESPONSES = "RESET_RESPONSES";

type ActionType =
  | "SET_JAVA_RESPONSE"
  | "SET_BEDROCK_RESPONSE"
  | "RESET_RESPONSES";

const reducer = (
  state: MinecraftServerStatusState,
  action: { type: ActionType; payload: any },
) => {
  switch (action.type) {
    case SET_JAVA_RESPONSE:
      return {
        ...state,
        mcServerJavaResponse: action.payload,
      };
    case SET_BEDROCK_RESPONSE:
      return {
        ...state,
        mcServerBedrockResponse: action.payload,
      };
    case RESET_RESPONSES:
      return initialState;
    default:
      return state;
  }
};

export const useMinecraftServerStatus = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMcServerJavaResponse = (response: any) => {
    dispatch({ type: SET_JAVA_RESPONSE, payload: response });
  };

  const setMcServerBedrockResponse = (response: any) => {
    dispatch({ type: SET_BEDROCK_RESPONSE, payload: response });
  };

  const resetResponses = () => {
    dispatch({
      type: RESET_RESPONSES,
      payload: undefined,
    });
  };

  return {
    state,
    setMcServerJavaResponse,
    setMcServerBedrockResponse,
    resetResponses,
  };
};

export default useMinecraftServerStatus;
