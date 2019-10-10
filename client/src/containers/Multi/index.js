import React, { useEffect } from 'react'
import { styles } from '../../styles/Menu-styles.js'
import { leaveRoom } from '../../sockets/emits.js'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { socket } from '../../sockets'
import { withStyles } from '@material-ui/styles';

const Multi = ({ classes, gameState, dispatch }) => {

    useEffect(()=> {
			socket.on('room update', dispatch)
			socket.emit('room infos')
			return () => socket.off('room update')
    }, [])

    return (
     <div className='fullWidth' style={{backgroundColor: 'pink'}}>
        <div
					className='navigationBar fullWidth flex center alignCenter'
					style={{height: '30px', backgroundColor: 'red'}}
					onClick={()=>{
            leaveRoom()
					}}
				>
            <p>RETURN MENU</p>
        </div>
        <div className="App" style={styles.container}>
        <p align="center">
					Waiting for player(s) to join your room
				</p>
				<Loader color="navy"/>
        <p>Room : {gameState.room}</p>
				<div>Players in this room : 
					{
            gameState.opponents && gameState.opponents.map((name, id)=>{
                return <p key={id}>{name}</p>
            })
        	}
				</div>
				{ gameState.isHost
						?	<div
								className={classes.startButton}
								onClick={()=>{console.log('START GAME')}}
							>
								START
							</div>
						: null
				}
        </div>
      </div>
    )
}

export default withStyles(styles)(Multi)