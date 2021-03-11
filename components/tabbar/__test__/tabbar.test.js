const simulate = require('miniprogram-simulate');
const path = require('path')

test('test for tabbar click', async () => {
  const id = simulate.load(path.join(__dirname, '../../tabbar/index'))
  const tabbar = simulate.render(id)
  const parent = document.createElement('parent-wrapper')
  tabbar.attach(parent);
  // const tabbar = tabbar.querySelector('.tabbar')
  const tabbarItems = tabbar.querySelectorAll('.tabbar-item')
  const tabbarContent = tabbar.querySelector('.tabbar-content')

  tabbarItems[1].dispatchEvent('tap')
  await simulate.sleep(0)
  expect(tabbar.data.currentKey).toBe(1)
  expect(`当前点击第${tabbar.data.currentKey}个tab项，对应内容为${tabbarContent.dom.innerHTML}`).toMatchSnapshot()

  tabbarItems[2].dispatchEvent('tap')
  await simulate.sleep(0)
  expect(tabbar.data.currentKey).toBe(2)
  expect(`当前点击第${tabbar.data.currentKey}个tab项，对应内容为${tabbarContent.dom.innerHTML}`).toMatchSnapshot()

  tabbarItems[0].dispatchEvent('tap')
  await simulate.sleep(0)
  expect(tabbar.data.currentKey).toBe(0)
  expect(`当前点击第${tabbar.data.currentKey}个tab项，对应内容为${tabbarContent.dom.innerHTML}`).toMatchSnapshot()

  tabbar.detach()
})