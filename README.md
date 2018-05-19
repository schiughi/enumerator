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

myStatus.equals(STATUS.doing)
// -> true

myStatus.any(STATUS.ready, STATUS.done)
// -> false
```