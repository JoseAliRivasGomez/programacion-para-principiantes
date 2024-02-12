import { useEffect, useState } from 'react';
import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';

import './App.css';

function App() {

  const [ word, setWord ] = useState( getRandomWord() );
  const [ hiddenWord, setHiddenWord ] = useState( '_ '.repeat( word.length ) );
  const [ fails, setFails ] = useState(0);
  const [ lost, setLost ] = useState( false );
  const [ won, setWon ] = useState( false );
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);

  // Determinar si la persona perdió
  useEffect( () => {
    if ( fails >= 9 ) {
      setLost( true );
    }
  }, [ fails ] );

  // Determinar si la persona ganó
  useEffect(()=> {
    // console.log(hiddenWord); // _ _ _ _ _ _ _ _
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if ( currentHiddenWord === word ) {
      setWon( true );
    }

  }, [ hiddenWord ])


  const checkLetter = ( letter: string ) => {
    if ( lost || won ) return;

    setDisabledLetters([...disabledLetters, letter]);
    
    if ( !word.includes(letter) ) {
      setFails( Math.min( fails + 1, 9 )  );
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for( let i = 0; i < word.length; i++ ) {
      if ( word[i] === letter ) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord( hiddenWordArray.join(' ') );
  }


  const newGame = () => {
    setDisabledLetters([]);
    const newWord = getRandomWord();

    setWord( newWord );
    setHiddenWord( '_ '.repeat( newWord.length ) );

    setFails( 0 );
    setLost( false );
    setWon( false );
  }

  
  return (
    <div className="App">
      
          {/* Imágenes */}
          <HangImage imageNumber={ fails } />

          {/* Palabra oculta */}
          <h3>{ hiddenWord }</h3>

          {/* Contador de intentos */}
          <h3>Fallos: { fails } de 9 </h3>

          {/* Mensaje si peridó */}
          {
            ( lost ) 
              ? <h2>Perdió, la palabra era: { word }</h2>
              : ''
          }

          {/* Mensaje si ganó */}
          {
            ( won ) 
              ? <h2>Felicidades, usted ganó!</h2>
              : ''
          }


          {/* Botones de letras */}
          {
            letters.map( (letter) => (
              <button
                onClick={ () => checkLetter(letter) } 
                key={ letter }
                disabled={disabledLetters.includes(letter)}>
                  { letter }
              </button>
            ))
          }


          <br /><br />
          <button onClick={ newGame } >¿Nuevo juego?</button>
          
          


      
    </div>
  );
  
};

export default App;
