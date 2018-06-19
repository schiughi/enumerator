import enumerate from './index'

const enumerable = {
  READY: 'ready',
  DOING: 'doing',
  DONE: 'done'
}

describe('enumerate', () => {

  describe('#values', () => {
    it('enumerates enumerable values', () => {
      const status = enumerate(enumerable)
      expect(status.values()).toHaveLength(3)
      expect(status.values()).toContain(status.READY)
      expect(status.values()).toContain(status.DOING)
      expect(status.values()).toContain(status.DONE)
    })
  })

  describe('#valueOf', () => {
    it('converts string into enum', () => {
      const status = enumerate(enumerable)
      expect(status.valueOf('doing')).toBe(status.DOING)
    })
  })

  describe('#equals', () => {
    it('compares enum object', () => {
      const status = enumerate(enumerable)
      expect(status.DOING.equals(status.DONE)).toBeFalsy()
      expect(status.READY.equals(status.READY)).toBeTruthy()
    })
  })

  describe('#any', () => {
    it('tests whether at least one enum in argument matches', () => {
      const status = enumerate(enumerable)
      expect(status.DONE.any(status.READY, status.DOING)).toBeFalsy()
      expect(status.DONE.any(status.READY, status.DONE)).toBeTruthy()
    })
  })

  describe('#isXxx', () => {
    it('compares by #equals', () => {
      const status = enumerate(enumerable)
      expect(status.DONE.isDone).toBeTruthy()
      expect(status.READY.isDone).toBeFalsy()
    })
  })
})
