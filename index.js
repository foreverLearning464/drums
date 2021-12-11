
// todays pick list

 

// 4 make power on/off functional with power switch turning red to green
// setup files for calculator app
// 5 style toggle switches for power and bank




// -------------------------------------------------------------------------------

//  global variables / bank arays 


const drumPadsBankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const drumPadsBankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

// ------------------------------------------------------------------------------------------------

// components




// Display component



const Display = (props) => {

  const { bankSwitchText, setBankSwitchText, currentBank, setCurrentBank, text } = props
  
  const handleBankSwitch = () => {
    if (currentBank === drumPadsBankOne) {
    setCurrentBank(drumPadsBankTwo)
    setBankSwitchText('bank 2')
  } else {
    setCurrentBank(drumPadsBankOne)
    setBankSwitchText('bank 1')
  }
}

    return (
        <div id="display-container">
        <div id='wrapper'>
          <div id="power-switch">           
          </div>
          <div id="display">{text}</div>
          <div id="volume-control">
            <input
                max='1'
                min='0'           
                step='0.01'
                type='range' 
              />
          </div>
          <div onClick={handleBankSwitch} id="bank-switch"> 
            {bankSwitchText} 
          </div>
          </div>
        </div>
    )
}



// DrumPad component



const DrumPad = (props) => {
    const { setCurrentDrumPad, drumPad } = props
   
    const playAudio = () => {
        const audioTag = document.getElementById(drumPad.keyTrigger)
        audioTag.currentTime = 0
        audioTag.play()
    }

    const handleClick = () => {
      setCurrentDrumPad(drumPad)
      playAudio()
    }

    React.useEffect(() => {
            document.addEventListener('keydown', handleKeyDown)
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
            }
        }, [])

    const handleKeyDown = (e) => {
        if (e.keyCode  == drumPad.keyCode) {
            setCurrentDrumPad(drumPad)
            
            playAudio()
        }
    }

    return (
        <div onKeyDown={handleKeyDown} onClick={handleClick} className="drum-pad" id={drumPad.id}>
            {drumPad.keyTrigger}
            <audio className="clip" id={drumPad.keyTrigger} src={drumPad.url}></audio>
        </div>
    )
}



// DrumArea component



const DrumArea = (props) => {

  const {currentBank, setCurrentDrumPad} = props

    return (
      <div id="drum-area">
        {currentBank.map((drumPad) => (
          <DrumPad key={drumPad.id} drumPad={drumPad} setCurrentDrumPad={drumPad => setCurrentDrumPad(drumPad)} />
        ))}           
      </div> 
    )

}



// App component



const App = () => {

    const [ currentDrumPad, setCurrentDrumPad ] = React.useState({id: ''})
    const [ currentBank, setCurrentBank ] = React.useState(drumPadsBankOne)
    const [ bankSwitchText, setBankSwitchText ] = React.useState('bank 1')
    

    return (
        <div className="App" id="drum-machine">
            <div className="app-container">
              <DrumArea currentBank={currentBank} setCurrentDrumPad={setCurrentDrumPad} />
              <Display setBankSwitchText={bankSwitchText => setBankSwitchText(bankSwitchText)} bankSwitchText={bankSwitchText} text={currentDrumPad.id} currentBank={currentBank} setCurrentBank={currentBank => setCurrentBank(currentBank)}/>
            </div>
        </div>
    )
}




ReactDOM.render(
    <App />, 
    document.getElementById('root'))
    