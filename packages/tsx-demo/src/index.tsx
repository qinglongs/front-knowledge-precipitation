import React from 'react';
import { Button } from 'antd';
import { useState } from 'react';

const TsxDemo: React.FC<any> = () => {

  const [count, setCount] = useState(1);

  const onClickButton = () => {
    setCount(count + 1)
  }

  return <Button type="primary" onClick={onClickButton} >111222</Button>
}

export default TsxDemo;