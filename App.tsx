import React, { useEffect, useState } from 'react';
import { SHE_TECH_LOGO } from './const';
import { buildGameBoard } from './utils';
import './reset.css';
import './style.css';

/**
 * Step 3:
 * In questo step abbiamo apportato alcune migliorie al layout ed allo stile dell'applicazione:
 * - abbiamo aggiunto il logo SheTech sul dorso di ciascuna carta
 * - abbiamo centrato la board di gioco rispetto alla pagina
 * - abbiamo wrappato l'elemnto div che rappresenta una singola carta (play-card) in un ulteriore elemento div (game-board-cell) che ci permetterà in combinazione con del codice CSS di avere una animazioni che simuli il voltare la carta
 *
 * Per proseguire con l'implementazione del Memory Game è ora necessario gestire l'evento click del cursore sulla carta, per simulare l'azione di voltare la stessa e scoprire il colore associato.
 * Per fare ciò utilizziamo una funzione da associare alla proprietà onClick di React definita sull'elemento per il quale vogliamo intercettare l'avvenuto click da parte del giocatore, e quindi la carta.
 * La funzione è stata già definita, priva però di qualsiasi logica operativa, e la troverete più in basso con il nome di onCardClick; starà a voi scrivere il codice necessario per:
 * - girare la carta
 * - limitare a 2 il numero di carte girate per volta
 * - girare nuovamente le carte nel caso in cui non si sia verificato un match
 * L'elemento sul quale definire e gestire l'evento click è l'elemento HTML "div" con classe game-board-cell
 * */
const Board = () => {
  const [board, setBoard] = useState(buildGameBoard());

  /**
   * selections è la variabile di stato dove salveremo le carte momentaneamente girate dall'utente (per le regole del gioco possono essere massimo 2 per volta).
   * Quindi consigliamo di fare un controllo sulla lunghezza di questo array e non permettere di girare più di due carte per volta
   *  */
  const [selections, setSelections] = useState([]);

  /**
   * questa funzione accetterà 3 parametri, il primo è il classico parametro "evento" che racchiude tutte le info riguardo l'evento appena innescato nel DOM, nel nostro caso un click event.
   * Gli altri due invece ci serviranno per identificare all'interno della board di gioco (e quindi della matrice che la rappresenta) quale carta è stata cliccata (infatti row index e cell index sono le "coordinate" all'interno della board della carta scelta)
   */
  const onCardClick = (evt, rowIdx, cellIdx) => {
    if (selections.length < 2) {
      setBoard((prevBoard) => {  
        prevBoard[rowIdx][cellIdx].selected = true;
        //setSelections((prevSelections) => {prevSelections.push()}};
        console.log(prevBoard[rowIdx][cellIdx])
        selections.push(prevBoard[rowIdx][cellIdx])
        return [...prevBoard];
      });
    }
    


    
   

  };

  return (
    <div className="game-board">
      {board.map((row, rowIdx) => (

        <div key={rowIdx} className="game-board-row">
          {row.map((cell, cellIdx) => (

            <div
              key={cellIdx}
              className={`game-board-cell ${
                cell.selected ? 'game-board-cell-flipped' : ''
              }`}
              onClick={(evt) => onCardClick(evt, rowIdx, cellIdx)}
            >
              <div className="play-card" >
                <div  className="play-card-front"  > 
                  <img src={SHE_TECH_LOGO} />
                </div>
                <div
                  className="play-card-back"
                  style={{ backgroundColor: `${cell.symbol?.color}` }}
                ></div>
              </div>
            </div>

          ))}
        </div>

      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="container">
      <Board />
    </div>
  );
}
