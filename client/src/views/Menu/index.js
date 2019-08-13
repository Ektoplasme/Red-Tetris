import React, { useState } from 'react'
import { withStyles }  from '@material-ui/styles'
import _ from 'lodash'
import './styles/Menu.css'
import './styles/animation/text-animations.css'
import './styles/animation/selectOption.css'
import './styles/animation/background.css'
import {styles, colorArray} from './styles/Menu-styles.js'
import Title from './Title.js'
import Option from './Option.js'

const _shuffleColor = (e) => {
  let randNum = _.random(0, 7)
  if (colorArray[randNum] === e.target.style.background){
    randNum = randNum === 7 ? 0 : randNum += 1
  }
  if (!e.target.className.includes('optionLabel')){
    e.target.style.background = colorArray[randNum]
  }
}

const App = (props) => {
  const { classes } = props
  const [selected, select] = useState(0)

  return (
    <div className="App" style={styles.container}>
      <div className={`${classes.centerSubContainer}`}>
        <Title/>
        <div
          className={`flex center alignCenter column ${classes.chosen}`}
          style={selected > 0 ? {display: 'flex'} : {display: 'none'}}
        >
          <div className={`flex center alignCenter column`} style={selected === 1 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Select your name
            </p>
            <input/>
            <p className={classes.optionLabel}>
              Start
            </p>
          </div>
          <div className={`flex center alignCenter column`} style={selected === 2 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Enter existing room name
            </p>
            <input/>
            <p className={classes.optionLabel}>
              Join
            </p>
          </div>
          <div className={`flex center alignCenter column`} style={selected === 3 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Enter a new room name
            </p>
            <input/>
            <p className={classes.optionLabel}>
              Create
            </p>
          </div>
          <div className={`flex center alignCenter column`} style={selected === 4 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Options
            </p>
            <p className={classes.optionLabel}>
              Change default name
            </p>
            <p className={classes.optionLabel}>
              Change mode
            </p>
          </div>
          <p onClick={()=>{select(0)}} className={classes.optionLabel}>
            Return
          </p>
        </div>
        <div
          className={`flex column center alignCenter`}
          style={selected > 0 ? {display: 'none', transition: '0.5s ease'} : null}
        >
          <div className={`${classes.optionsContainer}`}>
            <Option selected={selected} name='Solo' select={select} num={1} shuffle={_shuffleColor} />
            <Option selected={selected} name='Join' select={select} num={2} shuffle={_shuffleColor} />
            <Option selected={selected} name='Create' select={select} num={3} shuffle={_shuffleColor} />
          </div>
          <div className={`flex center ${classes.optionsContainer}`}>
            <Option selected={selected} name='Opt' select={select} num={4} shuffle={_shuffleColor} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(App)
