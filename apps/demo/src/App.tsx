import './App.scss';
import { squared } from '@xlorne/utils';
import { Button } from '@xlorne/ui';

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <p>Squared: {squared(2)}</p>
      <Button label='Click me' onClick={() => alert('Button clicked!')} />
    </div>
  );
};

export default App;
