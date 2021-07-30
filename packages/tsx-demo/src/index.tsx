import React from 'react';
import { Button } from 'antd';
import { useState } from 'react';

import './style.less';

const TsxDemo: React.FC<any> = () => {

  const [count, setCount] = useState(1);

  const onClickButton = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <div className="box"></div>
      <Button type="primary" onClick={onClickButton} >{count}</Button>
    </div>
  )
}

export default TsxDemo;