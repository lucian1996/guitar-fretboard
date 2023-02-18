const root = document.documentElement;

const fretboard = document.querySelector(".fretboard")
const numberOfStrings = 6;
const numberOfFrets = 12;

const singleFretmarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretmarkPositions = [12, 24];

const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let accidentals = "flats";

const app = {
    init() {
        this.setupFretboard();
    },
    setupFretboard() {
        root.style.setProperty('--number-of-strings', numberOfStrings)
        for (let string = 0; string < numberOfStrings; string++) {
            let stringDiv = tools.createElement('div');
            stringDiv.classList.add('string');
            fretboard.appendChild(stringDiv);

            for (let fret = 0; fret <= numberOfFrets; fret++) {
                let fretDiv = tools.createElement('div');
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
}
console.log(app.generateNoteNames(13))



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