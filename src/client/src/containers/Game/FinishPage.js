import React from 'react'
import { withStyles } from '@material-ui/styles'
import {GameStyle} from '../../styles/Game-style.js'
import {Block, colorTab} from '../../components/Block.js'

export const FinishComponent = ({classes, chat, chatInput, setChatInput, level, score, rows, resetGame, gameState, solo, winHeight, returnLobby}) => {
	var shadowBlockSize = Math.trunc(winHeight / 80)
	return (
		<div className='flex column center alignCenter' style={{height: '100hw'}}>
			<div className={`flex column center alignCenter ${classes.gameOverContainer}`}>
				<div className={classes.finishGameTitle}>Game finished !</div>
				<div className={`flex column center alignCenter ${classes.scoreContainer}`}>
					<div className={classes.finishGameInfo}>Your Score: {score === 0 ? '-' : score}</div>
					<div className={classes.finishGameInfo}>Level: {level}</div>
					<div className={classes.finishGameInfo}>Rows: {rows === 0 ? '-' : rows}</div>
				</div>
				{gameState.winScore || solo
					? null
					: <div>
							<div className={classes.finishGameTitle}>still in game:</div>
							<div className={'flex row center'} style={{marginTop: '10px'}}>
								{gameState.playTab && gameState.playTab.map((player, index)=>{
									if (player && player.id !== gameState.playerId) return <div key={index} className={`relative`} style={{padding: '2px'}}>
										<div className={classes.finishGameInfo}>{player.username}</div>
										{player.shadow && player.shadow.map((line, index)=>{
												return <div style={{display: 'flex'}} key={index}>
															{
																line.map((col, index) => {
																	return <div key={index}>
																		{col > 0
																			? <Block  blockSize={shadowBlockSize} color={colorTab[col - 1]}/>
																			: <Block  blockSize={shadowBlockSize} empty/>
																		}
																	</div>
																})
															}
														</div>
													})
											}
											{player.playing
												? null
												:	<div
														className={'absolute flex center alignCenter'}
														style={player.win ? {top: '32px', width: (shadowBlockSize + 1) * 10, height: (shadowBlockSize + 1) * 20, backgroundColor: 'rgba(137, 226, 40, 0.57)'} : {top: '32px', width: (shadowBlockSize + 1) * 10, height: (shadowBlockSize + 1) * 20, backgroundColor: 'rgba(235, 26, 26, 0.48)'}}
													>
														{player.win
															? <p>Win</p>
															: <p>Over</p>
														}
												</div>
											}
											</div>
									else return null
								})}
						</div>
					</div>
				}
			{solo
				?	<div className={`flex column center alignCenter ${classes.restartButton}`}>
					<div className={classes.restartLabel} onClick={resetGame}>
						RESTART
					</div>
				</div>
				: null	
			}
			{gameState.winScore
				? <div>
						<div className={classes.winLabel}>
							{gameState.winScore.id === gameState.playerId ? 'You' : gameState.winScore.winner} win !
						</div>
						{gameState.winScore.id === gameState.playerId
							? null
							: <div>Score: {gameState.winScore.score}</div>
						}
					</div>
				: null
			}
			{gameState.endOfGame
				?	gameState.isHost
					?	<div className={classes.restartLabel} onClick={returnLobby}>
							RETURN LOBBY
						</div>
					: <div className={classes.finishGameRestart}>
						Waiting for host to restart...
					</div>
				: null
			}
			{solo
				? null
				: <div style={{width: '100%', marginTop: '10px'}}>
					<p className={classes.chatLabel}>
						Chat ↴
					</p>
					<input
						id='chatInput'
						className={`fullWidth ${classes.input}`}
						style={{width: '50%', borderColor: 'white', backgroundColor: 'pink'}}
						value={chatInput}
						onKeyDown={(e)=>{
							if (e.keyCode === 13){
								if (chatInput.length > 0){
									chat(chatInput)
									setChatInput('')
								}
							}
						}}
						onChange={(e)=>{setChatInput(e.target.value)}}
					/>
				</div>
			}
			</div>
		</div>
	)
}

export default withStyles(GameStyle)(FinishComponent)