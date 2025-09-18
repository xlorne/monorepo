import React from "react";
import './App.scss';
import {squared} from '@xlorne/utils';
import {Button} from '@xlorne/ui';
import type {ButtonAction} from "@xlorne/ui-api";

const App = () => {

    const buttonRef = React.useRef<ButtonAction>(null);

    return (
        <div className="content">
            <h1>Rsbuild with React</h1>
            <p>Start building amazing things with Rsbuild.</p>
            <p>Squared: {squared(2)}</p>
            <Button label='Click me' onClick={() => alert('Button clicked!')} actionRef={buttonRef}/>
            <button onClick={()=>{
                alert(buttonRef.current?.getLabel());
            }}>get label</button>
        </div>
    );
};

export default App;
