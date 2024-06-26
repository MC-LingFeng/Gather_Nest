import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import getMessageArticle from '../helper/openai/formatMessage';
import { chatForImg, chatForMsg4 } from '../OpenAI';
import { ImageGenerateParams } from 'openai/resources';

@WebSocketGateway(8080, {
  path: '/socket',
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  findAll(msg): Observable<WsResponse<number>> {
    console.log('我执行了');
    return msg;
  }

  @SubscribeMessage('openai')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async openai(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const createMessage = getMessageArticle(data);
    const values = await chatForMsg4(createMessage as any);
    console.log('start v4 stream');
    // 最后，全部完成
    const decoder = new TextDecoder('utf-8');
    const stream = values.toReadableStream();
    const reader = stream.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('end v4 stream');
        client.send('end');
        return;
      }
      const chunk = decoder.decode(value);
      const parsedLine = JSON.parse(chunk);
      const { choices } = parsedLine;
      if (choices && choices?.length > 0) {
        const { delta } = choices[0];
        const { content } = delta;
        if (content) {
          client.send(content);
        }
      }
    }
  }

  @SubscribeMessage('aipicture')
  async aipicture(
    @MessageBody() data: ImageGenerateParams,
    @ConnectedSocket() client: Socket,
  ): Promise<undefined> {
    console.log('接收aipicture的数据', data);
    const values = await chatForImg(data, {
      stream: false,
    });
    const sendData = JSON.stringify({
      code: 200,
      message: 'success',
      data: values,
    });
    client.send(sendData);
    client.send('end');
  }
  PublicMessage(message: string): void {
    setInterval(() => {
      this.server.emit('exception', `我是服务端发来的消息${message}`);
    }, 1000);
  }
}
