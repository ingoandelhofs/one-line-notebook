const firstNoteItem = document.getElementById('first-note-item');
firstNoteItem.addEventListener('keydown', createNewNote);
firstNoteItem.focus();


function createNewNote(e) {
    if (e.keyCode === 13) { // Enter
        e.preventDefault();
        
        // Create new span
        const newNoteItem = document.createElement('span');
        newNoteItem.setAttribute('contenteditable', 'true');
        
        // Add span to dom
        e.target.after(newNoteItem);

        // Select new span
        newNoteItem.focus();
        

        // Listen for new span
        newNoteItem.addEventListener('keydown', createNewNote);
    }

 
    setKeyAction(e, '#', 'header1');
    setKeyAction(e, '##', 'header2');
    setKeyAction(e, '###', 'header3');
    
    setKeyAction(e, '-', 'bullet-list', `<ul><li></li></ul>`);
    setKeyAction(e, '1.', 'number-list', `<ol><li></li></ol>`);
    setKeyAction(e, '-[]', 'selection-list', `<ul><li><input type="checkbox">Select list not yet implemented</li></ul>`);
    
    setKeyAction(e, 'img', 'image', `<img src="https://via.placeholder.com/350x200" alt="test">`);
    
    
    setKeyAction(e, '&gt;', 'quote', `Quote not yet implemented`); // >
    setKeyAction(e, '&gt;&gt;&gt;', 'code', `Code not yet implemented`); // >>>
    setKeyAction(e, '$$', 'math', `Math not yet implemented`);



    if (e.keyCode === 8 && e.target.innerHTML === '') {
        e.target.setAttribute('class', '');
    }

    console.log(e.target.value);
}



function setKeyAction(event, currentVal, className, content = '') {
    if (event.keyCode === 32 && event.target.innerHTML === currentVal) { // Space
        event.preventDefault();
        event.target.innerHTML = content;
        event.target.setAttribute('class', className);
    }
}
