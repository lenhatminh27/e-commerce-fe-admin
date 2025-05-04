import { Client, IMessage } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { ACCESS_TOKEN } from "../constants/user"
import { store } from "../../redux/store"
import { addSubscription } from "../../redux/subscription/subscription.slice"

const sockerUrl = import.meta.env.VITE_SOCKET_URL

let stompClient: Client | null = null

export const connectStomp = (onConnect?: () => void) => {
  if (stompClient?.connected) return
  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(import.meta.env.VITE_SOCKET_URL || sockerUrl),
    connectHeaders: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
    debug: (str) => console.log("[STOMP]", str),
    reconnectDelay: 0,
    onConnect: () => {
      console.log("✅ STOMP connected")
      onConnect?.()
    },
    onDisconnect: () => {
      console.log("🔌 STOMP disconnected")
    },
    onStompError: (frame) => {
      console.error("STOMP error:", frame)
    },
  })

  stompClient.activate()
}

export const disconnectStomp = async () => {
  if (stompClient) {
    await stompClient.deactivate()
    stompClient = null
  }
}

export const subscribeTo = (
  destination: string,
  callback: (msg: IMessage) => void
) => {
  if (!stompClient?.connected) return
  const state = store.getState()
  const subcriptions = state.subcriptions
  if (!subcriptions.includes(destination)) {
    store.dispatch(addSubscription(destination))
    return stompClient.subscribe(destination, callback)
  }
  return null
}

export const sendMessage = (destination: string, body: string) => {
  if (!stompClient?.connected) return
  stompClient.publish({ destination, body })
}
