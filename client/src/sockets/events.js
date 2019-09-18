import { socket } from './index'

export const socketEvents = ({ setValue }) => {
  socket.on('queueLength', ({ queueLength }) => {
    setValue(state => { return { ...state, queueLength } });
  });
  socket.on('positionInLine', ({ positionInLine }) => {
    setValue(state => { return { ...state, positionInLine } });
  });
};

export const connect = () => {
  socket.on('connect', ()=>{
    console.log('je me connecte du front')
  })
}