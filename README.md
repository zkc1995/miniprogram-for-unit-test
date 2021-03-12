### 安装小程序测试工具集及测试框架
`这里使用jest框架`
`npm install -D miniprogram-simulate jest`

### 对于jest的配置
可直接在package.json文件中配置，有代码洁癖也可另开一个jest.config.js文件写配置。这里就以前者为例
```json
// package.json
{
  ...,
  "jest": {
    "testMatch": ["<rootDir>/components/**/__test__/*.test.js"],
    "snapshotSerializers": ["miniprogram-simulate/jest-snapshot-plugin"]
  }
}
```

### 普通测试，运行结果是否与预期一致
```js
  // demo.test.js
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
    expect(view.dom.innerHTML).toBe('first-demo-for-unit-test')
    // 情况2: 不一致，则报错
    // expect(view.dom.innerHTML).toBe('first-demo-for')
  
    // 将组件从容器节点中移除
    comp.detach()
})
```

### 添加测试snapshot
作用：当组件更新之后，可以通过之前的快照查看更改内容
运行命令： `npm run test` 当组件有变化时，可查看组件的变化
运行命令： `npm run test -- -u` 可直接更新快照内容

```js
  test('i am demo test', () => {
    ...(代码省略)

    // 将运行结果生成快照，对组件更新时很有帮助
    expect(view.dom.innerHTML).toMatchSnapshot()
  
    comp.detach()
  })
```

### 添加触发事件
作用：用于校验组件中的一些事件，通过dispatchEvent去调度组件某个元素中的操作
如：tap、touchstart、touchend等等事件
```js
  test('i do tap', async () => {
    ...(代码省略)
    const tabbarItems = tabbar.querySelectorAll('.tabbar-item')
    // 触发事件点击
    tabbarItems[1].dispatchEvent('tap')
    // 校验点击的行为结果
    await simulate.sleep(0)
    expect(tabbar.data.currentKey).toBe(1)
  })

```

### 生命周期触发校验
如某组件的ready周期：xxx.triggerLifeTime('ready')
```js
  test('comp lifetime', () => {
    ...(代码省略)
    comp.triggerLifeTime('ready') // 触发组件的 ready 生命周期
    // 校验预想的结果
    ...
  })
```

...还有等等其他语法前往官网查看

### 参考连接
* https://github.com/wechat-miniprogram/miniprogram-simulate/blob/master/docs/tutorial.md
