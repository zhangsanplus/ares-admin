enum ConnectionStatus {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

interface MergedWebSocketOptions {
  autoConnect: boolean
  autoReconnect: boolean
  heartbeatInterval: number
  reconnectInterval: number
  maxReconnectAttempts: number
  heartbeatMessage: Record<string, any>
  serialize: (data: any) => string
  deserialize: (message: string) => any
}

export type WebSocketOptions = Partial<MergedWebSocketOptions>

export class WebSocketClient {
  private readonly url: string
  private readonly options: MergedWebSocketOptions
  private socket: WebSocket | null = null
  private status: ConnectionStatus = ConnectionStatus.DISCONNECTED
  private autoReconnect: boolean = true
  private reconnectAttempts: number = 0
  private messageQueue: any[] = []
  private heartbeatTimer: NodeJS.Timeout | null = null
  private reconnectTimer: NodeJS.Timeout | null = null

  // Event handlers
  onmessage?: (message: any) => void
  onopen?: (event: Event) => void
  onclose?: (event: CloseEvent) => void
  onerror?: (event: Event) => void

  constructor(url: string, options: WebSocketOptions = {}) {
    this.options = {
      autoConnect: true,
      autoReconnect: true,
      heartbeatInterval: 30000,
      reconnectInterval: 5000,
      maxReconnectAttempts: 5,
      heartbeatMessage: { service: 'ping' },
      serialize: data => JSON.stringify(data),
      deserialize: message => JSON.parse(message),
      ...options,
    }

    this.url = url
    this.autoReconnect = this.options.autoReconnect

    if (this.options.autoConnect) {
      this.connect()
    }
  }

  get ws(): WebSocket | null {
    return this.socket
  }

  get connectionStatus(): ConnectionStatus {
    return this.status
  }

  connect() {
    if ([ConnectionStatus.CONNECTING, ConnectionStatus.CONNECTED].includes(this.status)) {
      console.warn('[WebSocket Client]: WebSocket is already connecting or connected.')
      return
    }

    this.autoReconnect = this.options.autoReconnect
    this.status = ConnectionStatus.CONNECTING
    this.socket = new WebSocket(this.url)

    this.socket.onopen = this.handleOpen.bind(this)
    this.socket.onmessage = this.handleMessage.bind(this)
    this.socket.onclose = this.handleClose.bind(this)
    this.socket.onerror = this.handleError.bind(this)
  }

  private handleOpen(event: Event) {
    this.status = ConnectionStatus.CONNECTED
    this.reconnectAttempts = 0
    this.startHeartbeat()
    this.sendQueuedMessages()
    this.onopen?.(event)
    console.log('[WebSocket Client]: WebSocket connected successfully.')
  }

  private handleMessage(event: MessageEvent) {
    const message = this.options.deserialize(event.data)
    if (event.data === this.options.heartbeatMessage) {
      console.info('[WebSocket Client]: Received pong from server.')
    } else {
      this.onmessage?.(message)
    }
  }

  private handleClose(event: CloseEvent) {
    this.status = ConnectionStatus.DISCONNECTED
    this.stopHeartbeat()
    if (this.autoReconnect && this.reconnectAttempts < this.options.maxReconnectAttempts) {
      this.reconnectTimer = setTimeout(() => {
        this.reconnectAttempts++
        this.reconnect()
        console.log(`[WebSocket Client]: Reconnecting attempt ${this.reconnectAttempts}...`)
      }, this.options.reconnectInterval)
    } else {
      console.error('[WebSocket Client]: WebSocket closed and reconnection attempts exhausted.')
    }
    this.onclose?.(event)
  }

  private handleError(event: Event) {
    console.error('[WebSocket Client]: ', event)
    this.onerror?.(event)
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
    this.status = ConnectionStatus.DISCONNECTED
    this.autoReconnect = false
    this.messageQueue = []
    this.stopHeartbeat()
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    console.log('[WebSocket Client]: WebSocket disconnected.')
  }

  reconnect() {
    this.connect()
  }

  send(data: string) {
    if (this.status === ConnectionStatus.CONNECTED && this.socket) {
      this.socket.send(data)
    } else {
      this.messageQueue.push(data)
    }
  }

  destroy() {
    this.disconnect()
    this.messageQueue = []
    this.onmessage = undefined
    this.onopen = undefined
    this.onclose = undefined
    this.onerror = undefined
    console.log('[WebSocket Client]: WebSocket client destroyed.')
  }

  private sendQueuedMessages() {
    while (this.messageQueue.length > 0 && this.socket) {
      const data = this.messageQueue.shift()
      this.socket.send(data)
    }
  }

  private startHeartbeat() {
    if (this.options.heartbeatInterval > 0) {
      const heartbeat = () => {
        if (this.socket && this.status === ConnectionStatus.CONNECTED) {
          const serializedData = this.options.serialize(this.options.heartbeatMessage)
          this.send(serializedData)
          console.log('[WebSocket Client]: Sent heartbeat message.')
          this.heartbeatTimer = setTimeout(heartbeat, this.options.heartbeatInterval)
        }
      }
      heartbeat()
    }
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }
}
