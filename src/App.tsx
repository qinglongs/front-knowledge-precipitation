import { useState } from 'react';
import { Button } from 'antd';
import TsxDemo from 'tsx-demo';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';


function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TsxDemo />
        <Button onClick={() => { setCount(count + 1) }}>按钮</Button>
      </header>
    </div>
  );
}

export default App;
