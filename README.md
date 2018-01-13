# event like socket for angular

- 引入
```ts
import { SocketRoom, SocketModule, SocketService } from 'meepo-event';
```
- 注册根room
```ts
SocketModule.forRoot(new SocketRoom('root'))
```
- 注册子room
```ts
SocketModule.forChild(new SocketRoom('index'))
```

```ts

constructor(
  public event: SocketService
){
  // 监听事件
  this.event.on('index',(data)=>{
    console.log('index',data);
  });
  this.event.on('root',(data)=>{
    console.log('root',data);
  });
}

emit(){
  // 触发事件
  this.event.emit('index','index test');
  this.event.emit('root','root test');
}
```