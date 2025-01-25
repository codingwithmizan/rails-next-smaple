import {
  createContext,
  use,
  FC,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from "react";

interface Props {
  children: ReactNode;
}

interface WebSocketContextValue {
  connection: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(
  undefined
);

const WebSocketProvider: FC<Props> = ({ children }) => {
  const [connection, setConnection] = useState<WebSocket | null>(null);
  const authToken = "abcddhfgjg12323343444";
  const wsUrl = process.env.NEXT_PUBLIC_API_WS_URL;

  useEffect(() => {
    if (!authToken) {
      console.error("Auth token is required for WebSocket connection.");
      return;
    }

    const socketConnection = new WebSocket(`${wsUrl}?auth_token=${authToken}`);
    setConnection(socketConnection);

    socketConnection.onclose = () => {
      console.warn("WebSocket connection closed.");
    };

    socketConnection.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socketConnection.close();
    };
  }, [authToken, wsUrl]);

  const value = useMemo(() => ({ connection }), [connection]);

  return <WebSocketContext value={value}>{children}</WebSocketContext>;
};

export const useWebSocket = (): WebSocketContextValue => {
  const context = use(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider.");
  }
  return context;
};

export default WebSocketProvider;
