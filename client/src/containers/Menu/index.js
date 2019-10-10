import React, { useState, useEffect } from 'react'
import { withStyles }  from '@material-ui/styles'
import Popup from '../../components/Popup'
import _ from 'lodash'
import './Menu.css'
import '../../styles/animation/text-animations.css'
import '../../styles/animation/selectOption.css'
import '../../styles/animation/background.css'
import {styles, colorArray} from '../../styles/Menu-styles.js'
import Title from '../../components/Title.js'
import {Option} from '../../components/Option.js'
import {Join, Solo, Create, Settings} from '../../components/MenuSubSection'
import { useStateValue } from '../../context/GlobalState.js'
import { socket } from '../../sockets'

const _shuffleColor = (e) => {
  let randNum = _.random(0, 7)
  if (colorArray[randNum] === e.target.style.background){
    randNum = randNum === 7 ? 0 : randNum += 1
  }
  if (!e.target.className.includes('optionLabel')){
    e.target.style.background = colorArray[randNum]
  }
}

const Menu = props => {
  const {
    classes,
    popupInfo,
    disablePopup
  } = props

  const [selected, select] = useState(0)
  const [onHover, setHover] = useState(false)
  const [gameState, dispatch] = useStateValue()
  const [usernameInput, changeUsernameInput] = useState('')

  useEffect(()=>{
    console.log(gameState)
  }, [gameState])

  return (
    <div className="App" style={styles.container}>
      {popupInfo !== null
        ? <Popup infos={popupInfo} closePopup={disablePopup}/>
        : null
      }
      <div className={`${classes.centerSubContainer}`}>
        <Title/>
        <div
          className={`flex center alignCenter column ${classes.chosen}`}
          style={selected > 0 ? {display: 'flex'} : {display: 'none'}}
        >
          <Join selected={selected}/>
          <Solo selected={selected}/>
          <Create selected={selected}/>
          <Settings selected={selected}/>
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
            <Option selected={selected} name='Score' select={select} num={4} shuffle={_shuffleColor} />
          </div>
        </div>
        <div
          className={`flex center alignCenter ${classes.changeUsernameContainer}`}
          onClick={(e)=>{
            setHover(true)
          }}
        >
          <p style={{margin: '5px'}}>
            {`Username:\n`}
          </p>
          <div>
            {onHover
              ? <div
                className={`flex row center alignCenter`}
                style={{height: '50px', width: '400px'}}
              >
              <input
                id='usernameInput'
                className={`fullWidth ${classes.input}`}
                value={usernameInput}
                autoFocus
                onKeyDown={(e)=>{
                  if (e.keyCode === 13){
                    if (usernameInput.length <= 10 && usernameInput.length > 0){
                      socket.emit('set username', usernameInput.toUpperCase())
                      setHover(false)
                    } else alert('Username should be 1 character minimum and 10 characters maximum')
                  }
                  if (e.keyCode === 27){
                    setHover(false)
                  }
                }}
                onChange={(e)=>{changeUsernameInput(e.target.value)}}
              />
            </div>
              : <div
                className={`flex center alignCenter`}
                style={{fontSize: '34px', height: '50px', width: '400px', fontFamily: 'Orbitron, sans-serif'}}
              >
                {gameState.player}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Menu)
