import React, {useState} from 'react'
import './App.css';
import { Stage, Layer, Circle } from 'react-konva';

function App() {  
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const [ballPos, setBallPos] = useState([windowWidth / 2, windowHeight - 2 * (windowWidth / 30)])
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [timeStamp, setTimeStamp] = useState();

  const [bowlingPositions, setBowlingPositions] = useState([
    {x: windowWidth / 2 - 3 * (windowWidth / 40), y: 0 + 2 * (windowWidth / 40)},
    {x: windowWidth / 2 - 1 * (windowWidth / 40), y: 0 + 2 * (windowWidth / 40)},
    {x: windowWidth / 2 + 1 * (windowWidth / 40), y: 0 + 2 * (windowWidth / 40)},
    {x: windowWidth / 2 + 3 * (windowWidth / 40), y: 0 + 2 * (windowWidth / 40)},

    {x: windowWidth / 2 - 2 * (windowWidth / 40), y: 0 + 3.7 * (windowWidth / 40)},
    {x: windowWidth / 2 - 0 * (windowWidth / 40), y: 0 + 3.7 * (windowWidth / 40)},
    {x: windowWidth / 2 + 2 * (windowWidth / 40), y: 0 + 3.7 * (windowWidth / 40)},

    {x: windowWidth / 2 - 1 * (windowWidth / 40), y: 0 + 5.4 * (windowWidth / 40)},
    {x: windowWidth / 2 + 1 * (windowWidth / 40), y: 0 + 5.4 * (windowWidth / 40)},

    {x: windowWidth / 2 + 0 * (windowWidth / 40), y: 0 + 7.1 * (windowWidth / 40)},
  ])
  const colors = ["green", "Teal", "IndianRed", "violet", "gold", "orangered", "Salmon", "Olive", "Purple", "Maroon"]

  const checkCollision = (pos, dim) => {
    let x, y;

    bowlingPositions.forEach((element, index) => {
      if(element.x < pos[0] + windowWidth / 30 && element.x > pos[0] - windowWidth / 30 && element.y < pos[1] + windowWidth / 30 && element.y > pos[1] - windowWidth / 30) {
        setBowlingPositions((state, props) => {return state.filter((el, idx) => (idx != index))})
      }         
    })

    if (pos[0] < 0) x = 0;
    else if (pos[0] > windowWidth) x = windowWidth;
    else x =  pos[0]

    if (pos[1] < 0) y = 0;
    else if (pos[1] > windowHeight) y = windowHeight;
    else y = pos[1]

    return [x, y]
    
  }
  const handlePointerDown = (e) => {
    setX(e.evt.clientX)
    setY(e.evt.clientY)
    setTimeStamp(e.evt.timeStamp)
  }
  const handleDragMove = (e) => {
    let lambdaX = x - e.evt.clientX;
    let lambdaY = y - e.evt.clientY;
    let lambdaT = e.evt.timeStamp - timeStamp;
    setInMotion(lambdaX, lambdaY, lambdaT)
  }
  const setInMotion = (lambdaX, lambdaY, lambdaT) => {
    setBallPos((state, props) => {
      return checkCollision([state[0] - lambdaX, state[1] - lambdaY])
    })
    let timeLeft = lambdaT/10 * Math.abs(lambdaX) + Math.abs(lambdaY);
    while(timeLeft>0){
      setTimeout(() => {
        setBallPos((state, props) => {
          return checkCollision([state[0] - (lambdaX/100), state[1] - (lambdaY/100)])
        })
      }, 10);
      timeLeft -= 1;
    }
  }

  return (
    <>
      <button onClick={() => {return document.fullscreenElement ? document.exitFullscreen() : document.body.requestFullscreen()}} style={{zIndex: '10000', padding: "1rem 2rem", position: 'absolute', right: '1rem', top: '1rem'}}>Full screen</button>
      <button onClick={() => {return window.location.reload(false)}} style={{zIndex: '10000', padding: "1rem 2rem", position: 'absolute', right: '1rem', top: '5rem'}}>Reset</button>
      <Stage width={windowWidth} height={windowHeight} className='App'>
        <Layer>
          {bowlingPositions.map((el, index) => (
            <Circle x={el.x} y={el.y} radius={windowWidth / 40} fill={colors[index]}/>
            ))}

          <Circle 
            x={ballPos[0]} 
            y={ballPos[1]} 
            radius={windowWidth / 30} 
            fill="white" 
            draggable 
            onPointerDown={handlePointerDown} 
            onDragEnd={handleDragMove}
            />

        </Layer>
      </Stage>
    </>
  );
}

export default App;
