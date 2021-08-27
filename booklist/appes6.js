class Book{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

class UI{
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // create tr element 
        const row = document.createElement('tr');
        // insert columns
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class = "delete">X</a></td>
        
        `;
        
        list.appendChild(row);
    }


    showAlert(message, className) {
        const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    // insert into the DOM by using the parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // timeout after 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);

    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

// Event listener for addbook

document.getElementById('book-form').addEventListener('submit', function (e) {
   
    // get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    
    // instantiate book
    const book = new Book(title, author, isbn);
    
    // instantiate Ui

    const ui = new UI();

    // Validate
    if (title === '' || author === '' | isbn === '') {
        // error alert
        ui.showAlert('please fill all fields', 'error');
        
    } else {
        // Add book to List
        ui.addBookToList(book);
        // show success alert
        ui.showAlert('Book Added!', 'success');
        //  clear field
        ui.clearFields();
    }

    e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    
    const ui = new UI();
    ui.deleteBook(e.target)
        // show success alert
        ui.showAlert('Book deleted!', 'success');
    e.preventDefault();
})