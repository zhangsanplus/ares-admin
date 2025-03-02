import type { WebSocketOptions } from '@/plugins/websocket'
import { WebSocketClient } from '@/plugins/websocket'
import { createEventHook, tryOnScopeDispose } from '@vueuse/core'

interface WebSocketParams {
  [key: string]: any
}

interface WebSocketMessage<T = any> {
  timestamp: number
  service: string
  code: number
  data: T
}

type ServiceCallback<T = any> = (data: T) => void

export function useWebSocket(url: string, options?: WebSocketOptions) {
  const wsClient = new WebSocketClient(url, options)
  const serviceEvents = new Map<string, ServiceCallback[]>()
  const isConnected = ref(false)

  // 创建核心事件钩子
  const openHook = createEventHook<Event>()
  const messageHook = createEventHook<MessageEvent>()
  const errorHook = createEventHook<Event>()
  const closeHook = createEventHook<CloseEvent>()

  // 统一消息处理
  const handleMessage = (event: MessageEvent) => {
    messageHook.trigger(event)

    try {
      const message = JSON.parse(event.data) as WebSocketMessage
      const handlers = serviceEvents.get(message.service)
      handlers?.forEach(cb => cb(message.data))
    } catch (error) {
      console.error('[use-websocket]: parseError', error)
      errorHook.trigger(new ErrorEvent('parseError', { error }))
    }
  }

  const handleOpen = (event: Event) => {
    isConnected.value = true
    openHook.trigger(event)
  }

  const handleClose = (event: CloseEvent) => {
    isConnected.value = false
    closeHook.trigger(event)
  }

  const handleError = (event: Event) => {
    errorHook.trigger(event)
  }

  // 绑定事件处理器
  wsClient.onmessage = handleMessage
  wsClient.onopen = handleOpen
  wsClient.onclose = handleClose
  wsClient.onerror = handleError

  // 单次请求
  const fetch = <T = any>(
    service: string,
    params: WebSocketParams = {},
  ): Promise<WebSocketMessage<T>> => {
    const timestamp = Date.now()
    const payload = JSON.stringify({ service, timestamp, ...params })

    wsClient.send(payload)

    return new Promise((resolve, reject) => {
      function onMessage(event: MessageEvent) {
        try {
          messageHook.off(onMessage)
          errorHook.off(onError)

          const message = JSON.parse(event.data) as WebSocketMessage<T>
          if (message.service === service && message.timestamp === timestamp) {
            message?.code === 0
              ? resolve(message)
              : reject(message.data || new Error(`Service ${service} error`))
          }
        } catch (error) {
          reject(error)
        }
      }

      function onError(event: Event) {
        messageHook.off(onMessage)
        errorHook.off(onError)
        reject(event)
      }

      messageHook.on(onMessage)
      errorHook.on(onError)
    })
  }

  // 移除监听服务
  const off = (service: string, callback: ServiceCallback) => {
    const handlers = serviceEvents.get(service)
    if (!handlers) return

    const updated = handlers.filter(cb => cb !== callback)
    updated.length > 0
      ? serviceEvents.set(service, updated)
      : serviceEvents.delete(service)
  }

  // 监听服务
  const on = <T = any>(service: string, callback: ServiceCallback<T>) => {
    const handlers = serviceEvents.get(service) || []
    serviceEvents.set(service, [...handlers, callback])

    return () => off(service, callback)
  }

  // 发送消息
  const send = (service: string, params: WebSocketParams = {}) => {
    wsClient.send(JSON.stringify({ service, ...params }))
  }

  tryOnScopeDispose(() => {
    wsClient.destroy()
    serviceEvents.clear()
  })

  return {
    isConnected,

    // 基础操作
    send,
    connect: wsClient.connect.bind(wsClient),
    disconnect: wsClient.disconnect.bind(wsClient),
    reconnect: wsClient.reconnect.bind(wsClient),

    // 事件监听
    on,
    off,
    fetch,
    onOpen: openHook.on,
    onMessage: messageHook.on,
    onError: errorHook.on,
    onClose: closeHook.on,
  }
}

// 使用示例
// const ws = useWebSocket('ws://localhost:8080')
// ws.on('message', (data) => {
//   console.log('Received message 1:', data)
// })

// ws.on('message', (data) => {
//   console.log('Received message 2:', data)
// })

// ws.send('echo', { message: 'Hello, world!' })

// ws.onOpen(() => {
//   console.log('[WebSocket connected]')
// })

// ws.fetch('test', { message: 'test fetch' }).then((data) => {
//   console.log('Received fetch message:', data)
// })
