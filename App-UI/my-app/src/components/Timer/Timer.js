import React from "react";
import Sketch from "react-p5";

export default function Timer() {
  function Timer() {
    let a = 300;
    let b = 300;
    let setup = (p5, canvasParentRef) => {
      //Canvas of size 1000x800
      let xyz = p5.createCanvas(1000, 800).parent(canvasParentRef);
    };
    let draw = p5 => {
      p5.background("rgb(100%,0%,10%)");
    };
    return (
      <div className='App'>
        <Sketch setup={setup} draw={draw} className='App' />
      </div>
    );
  }
}
