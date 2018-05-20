# enumerator
 enumerate javascript object

 ```javascript
const status = {
  ready: 'READY',
  doing: 'DOING',
  done: 'DONE'
}

const STATUS = enumerate(status)
 ```

convert from value

```javascript

const myStatus = STATUS.from('DOING')

myStatus.isDoing
// -> true

myStatus.isDone
// -> false

myStatus.any(STATUS.READY, STATUS.DOING)
// -> true
```