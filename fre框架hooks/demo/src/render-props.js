import { h, render } from '../../src'
// const HelloBox = () => <Box render={value => <h1>{value}</h1>} />

const HelloBox = () => (
  <ul>
    <li class="foo2" />
    <li className="bar2" />
    <li data-something="baz2" tabIndex={99} />
  </ul>
)

render(<HelloBox />, document.getElementById('root'))
