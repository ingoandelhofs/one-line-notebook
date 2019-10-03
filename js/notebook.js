class Notebook {
    noteBook;
    firstLineNote;
    
    constructor(noteBookId) {
        try {
            this.noteBook = document.getElementById(noteBookId);
            this.firstLineNote = this.noteBook.getElementsByTagName('span')[0];
            this.firstLineNote.addEventListener('keydown', this.actionEvent.bind(this));
            this.firstLineNote.focus(); 
            console.log(`Notebook created.`);
        }
        catch(error) {
            console.log(`Error: No notebook found.`, error);
        }
    }

    createNewLineNote() {
        const newNoteItem = document.createElement('span');
        newNoteItem.setAttribute('contenteditable', 'true');
        newNoteItem.dataset.enterType = 'new-line';
        newNoteItem.dataset.type = '';
        return newNoteItem;
    }

    actionEvent(event) {
        // Get event type (enter or ctrl-enter)
        const enterType = event.target.dataset.enterType;
        // New Line Note
        if ((enterType === 'new-line' && !event.ctrlKey && !event.shiftKey && event.code === 'Enter') || 
            (enterType === 'expand-line' && event.ctrlKey && event.code === 'Enter')) 
        {
            this.newLineNoteEvent(event);
            console.log('Create new LineNote');
        }
        // Expand Line Note
        if ((enterType === 'expand-line' && !event.ctrlKey && event.code === 'Enter') ||
            (enterType === 'new-line' && event.shiftKey && event.code === 'Enter')) 
        { 
            console.log('Expand new LineNote');
        }


        if (event.code === 'Backspace' && event.target.innerHTML === '') {
            // Clean Line Note type
            if (event.target.dataset.type !== '') {
                event.target.dataset.type = '';
            }

            // Remove note
            else {
                try {
                    // TODO: move cursor to the back
                    event.target.previousSibling.focus();
                    event.target.style.display = 'none';
                }
                catch(error) {
                    console.log(`You can not delete the first element.`);
                }
            }
        }

        // Special elements
        if (event.code === 'Space') {
            this.setLineNoteTypeEvent(event, '#', 'header1');
            this.setLineNoteTypeEvent(event, '##', 'header2');
            this.setLineNoteTypeEvent(event, '###', 'header3');
            
            this.setLineNoteTypeEvent(event, '-', 'bullet-list', 'expand-line', `<ul><li></li></ul>`);
            this.setLineNoteTypeEvent(event, '1.', 'number-list', 'expand-line', `<ol><li></li></ol>`);
            this.setLineNoteTypeEvent(event, '-[]', 'selection-list', 'expand-line', `<ul><li><input type="checkbox">Select list not yet implemented</li></ul>`);
            
            this.setLineNoteTypeEvent(event, 'img', 'image', 'new-line', `<img src="https://via.placeholder.com/350x200" alt="test">`);
            
            
            this.setLineNoteTypeEvent(event, '&gt;', 'quote', `Quote not yet implemented`); // >
            this.setLineNoteTypeEvent(event, '&gt;&gt;&gt;', 'code', `Code not yet implemented`); // >>>
            this.setLineNoteTypeEvent(event, '$$', 'math', `Math not yet implemented`);
        }


        // Moving
        if (event.code === 'ArrowDown') {
            try {
                event.target.nextSibling.focus();
            }
            catch(error) {
                console.log(`No element to move down to.`);
            }
        }
        if (event.code === 'ArrowUp') {
            try {
                event.target.previousSibling.focus();
            }
            catch(error) {
                console.log(`No element to move up to.`);
            }
        }
    }

    newLineNoteEvent(event) {
        event.preventDefault();
        const lineNote = this.createNewLineNote();
        
        event.target.after(lineNote);
        lineNote.focus();
        lineNote.addEventListener('keydown', this.actionEvent.bind(this));
    }

    setLineNoteTypeEvent(event, typeId, type, enterType='new-line', content='') {
        const lineNote = event.target;
        if (lineNote.innerHTML === typeId) {
            event.preventDefault();
            lineNote.dataset.type = type;
            lineNote.dataset.enterType = enterType;
            lineNote.innerHTML = content;
        }
    }
};