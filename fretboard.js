const root = document.documentElement;

const fretboard = document.querySelector(".fretboard");
const selectedInstrumentSelector = document.querySelector("#instrument-selector");
const accidentalSelector = document.querySelector(".accidental-selector");
const numberOfFretsSelector = document.querySelector('#number-of-frets');
const showAllNotesSelector = document.querySelector('#show-all-notes');
const showMultipleNotesSelector = document.querySelector('#show-multiple-notes');
const noteNameSection = document.querySelector('.note-name-section');


let allNotes;
let showMultipleNotes = false;
let numberOfFrets = 20;


const singleFretmarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretmarkPositions = [12, 24];

const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const tuning = [4, 11, 7, 2, 9, 4];
let accidentals = "sharps";

const instrumentPresets = {
    'Guitar': [4, 11, 7, 2, 9, 4],
    'Bass': [7, 2, 9, 4],
    'Ukulele': [7, 0, 4, 9],
    'Violin': [4, 9, 2, 7]
}
var selectedInstrument = 'Guitar';
var numberOfStrings = instrumentPresets[selectedInstrument].length;



const app = {
    init() {
        this.setupFretboard();
        this.setupSelectedInstrumentSelector();
        this.setupNoteNameSection();
        this.setupEventListeners();
    },
    setupFretboard() {
        fretboard.innerHTML = '';
        root.style.setProperty('--number-of-strings', numberOfStrings)
        for (let string = 0; string < numberOfStrings; string++) {
            let stringDiv = tools.createElement('div');
            stringDiv.classList.add('string');
            fretboard.appendChild(stringDiv);
            for (let fret = 0; fret <= numberOfFrets; fret++) {
                let fretDiv = tools.createElement('div');
                let noteName = this.generateNoteNames(fret + instrumentPresets[selectedInstrument][string])
                fretDiv.setAttribute('data-note', noteName)
                fretDiv.classList.add('fret')
                stringDiv.appendChild(fretDiv)
                if (string === 0 && singleFretmarkPositions.indexOf(fret) !== -1) {
                    fretDiv.classList.add("single-fretmark");
                }
                if (string === 0 && doubleFretmarkPositions.indexOf(fret) !== -1) {
                    let doubleFretmarkDiv = tools.createElement('div');
                    doubleFretmarkDiv.classList.add("double-fretmark")
                    fretDiv.appendChild(doubleFretmarkDiv);
                }
            }
        }
        allNotes = document.querySelectorAll('.fret');
    },
    generateNoteNames(noteIndex) {
        noteIndex = noteIndex % 12;
        let noteName;
        if (accidentals === 'flats') {
            noteName = notesFlat[noteIndex];
        } else if (accidentals === 'sharps') {
            noteName = notesSharp[noteIndex];
        }
        return noteName;
    },
    setupSelectedInstrumentSelector(){
      for (instrument in instrumentPresets) {
        let instrumentOption = tools.createElement('option', instrument);
        selectedInstrumentSelector.appendChild(instrumentOption);
      }
    },
    setupNoteNameSection() {
        noteNameSection.innerHTML = ''
        let noteNames;
        if (accidentals == 'flats') {
            noteNames = notesFlat;
        } else {
            noteNames = notesSharp;
        }
        noteNames.forEach((noteName) => {
            let noteNameElement = tools.createElement('span', noteName);
            noteNameSection.appendChild(noteNameElement)
        })
    },
    showNoteDot(event){
        if (event.target.classList.contains('fret')) {
            if (showMultipleNotes) {
                app.toggleMultipleNotes(event.target.dataset.note, 1)
            } else {
                event.target.style.setProperty('--noteOpacity', 1);
            }
        }
    },
    hideNoteDot(event){
        if (showMultipleNotes) {
            app.toggleMultipleNotes(event.target.dataset.note, 0)
        } else {
            event.target.style.setProperty('--noteOpacity', 0);
        }
    },
    setupEventListeners() {
        fretboard.addEventListener('mouseover', this.showNoteDot);
        fretboard.addEventListener('mouseout', this.hideNoteDot);
        selectedInstrumentSelector.addEventListener('change', (event) => {
            selectedInstrument = event.target.value;
            numberOfStrings = instrumentPresets[selectedInstrument].length;
            this.setupFretboard();
        });
        accidentalSelector.addEventListener('click', (event) => {
            if (event.target.classList.contains('acc-select')) {
                accidentals = event.target.value;
                this.setupFretboard();
                this.setupNoteNameSection();
            } else {
                return;
            }
        });
        numberOfFretsSelector.addEventListener('change', () => {
            numberOfFrets = numberOfFretsSelector.value;
            this.setupFretboard();
        });
        showAllNotesSelector.addEventListener('change', () => {
            if (showAllNotesSelector.checked) {
                root.style.setProperty('--noteOpacity', 1);
                fretboard.removeEventListener('mouseover', this.showNoteDot);
                fretboard.removeEventListener('mouseout', this.hideNoteDot);
                this.setupFretboard();
            } else {
                root.style.setProperty('--noteOpacity', 0);
                fretboard.addEventListener('mouseover', this.showNoteDot);
                fretboard.addEventListener('mouseout', this.hideNoteDot);
                this.setupFretboard();
            }
        });
        showMultipleNotesSelector.addEventListener('change', () => {
            showMultipleNotes = !showMultipleNotes;
        });
        noteNameSection.addEventListener('mouseover', (event) => {
            let noteToShow = event.target.innerText;
            app.toggleMultipleNotes(noteToShow, 1)
        });
        noteNameSection.addEventListener('mouseout', (event) => {
            if (!showAllNotesSelector.checked) {
                let noteToShow = event.target.innerText;
                app.toggleMultipleNotes(noteToShow, 0)
            } else {
                return;
            }
        });
    },
    toggleMultipleNotes(noteName, opacity) {
        for (let i = 0; i < allNotes.length; i++) {
            if (allNotes[i].dataset.note === noteName) {
                allNotes[i].style.setProperty('--noteOpacity', opacity);
            }
        }
    }
}

const tools = {
    createElement(element, content){
        element = document.createElement(element);
        if (arguments.length > 1) {
            element.innerHTML = content;
        }
        return element;
    }
}

app.init();