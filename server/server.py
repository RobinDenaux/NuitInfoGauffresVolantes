from autobahn.asyncio.websocket import WebSocketServerProtocol, \
                                       WebSocketServerFactory


class Client(object):
    def __init__(self, name, socket):
        self.name = name
        self.socket = socket
        
class ClientsDuo(object):
    def __init__(self, c1):
        self.game = c1  
        
    def __cmp__(self, other):
        return cmp(self.c1.name, other.c1.name)
        
                                       
class MyServerProtocol(WebSocketServerProtocol):
    games = []

    def onConnect(self, request):
        print("Client connecting: {0}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")

    def onMessage(self, payload, isBinary):
        if isBinary:
            print("Binary message received: {0} bytes".format(len(payload)))
        else:
            msg = payload.decode('utf8').split(";")
            
            ## here we can start interpreting commands
            if msg[0]=='Connect':
                for cd in MyServerProtocol.games:
                    if cd.game.name == msg[1]:
                        cd.command = Client(cd.name, self)
                        
            elif msg[0]=='Orientation' or msg[0]=='Motion':
                for cd in MyServerProtocol.games:
                    if cd.game.name == msg[1]:
                        cd.game.socket.sendMessage(payload, false);
            
            elif msg[0]=='NewGame':
                MyServerProtocol.games.append(ClientsDuo(Client(msg[1], self)))
            
            print("Text message received: {0}".format(payload.decode('utf8')))


    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))



if __name__ == '__main__':

    try:
        import asyncio
    except ImportError:
        import trollius as asyncio

    from autobahn.asyncio.websocket import WebSocketServerFactory
    factory = WebSocketServerFactory()
    factory.protocol = MyServerProtocol

    loop = asyncio.get_event_loop()
    coro = loop.create_server(factory, '127.0.0.1', 9000)
    server = loop.run_until_complete(coro)

    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.close()
        loop.close()
