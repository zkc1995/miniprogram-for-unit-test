const simulate = require('miniprogram-simulate');
const path = require('path')

test('i am demo test', () => {
  // 加载组件
  const id = simulate.load(path.join(__dirname, '../../demo/index'))
  // 创建组件实例
  const comp = simulate.render(id)
  // 创建一个父节点
  const parent = document.createElement('parent-wrapper')
  // 将组件依附在父节点上
  comp.attach(parent);
  // 获取子组件view
  const view = comp.querySelector('.index')
  // 预期渲染结果与结果是否一致
  // 情况1: 一致，则通过test、
  expect(view.dom.innerHTML).toMatchSnapshot()
  expect(view.dom.innerHTML).toBe('first-demo-for-unit-test')
  // 情况2: 不一致，则报错
  // expect(view.dom.innerHTML).toBe('first-demo-for')
  
  // 将组件从容器节点中移除
  comp.detach()
})