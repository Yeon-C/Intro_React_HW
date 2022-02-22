//NOTES FROM INTRO TO REACT APP

//SAMPLE DATA
const data = {
  books: [
    { id: "b1", title: "Coders at Work", price: 2434, authorId: "a2" },
    {
      id: "b2",
      title: "Essays on Software Engineering",
      price: 2399,
      authorId: "a3",
    },
    { id: "b3", title: "Web Usability", price: 2250, authorId: "a4" },
    { id: "b4", title: "Clean Code", price: 3224, authorId: "a1" },
  ],
  authors: [
    { id: "a1", firstName: "Robert", lastName: "Martin" },
    { id: "a2", firstName: "Peter", lastName: "Seibel" },
    { id: "a3", firstName: "Frederick", lastName: "Brooks" },
    { id: "a4", firstName: "Steve", lastName: "Krug" },
  ],
};


//CONVERTING THE ARRAY TO OBJECT FOR PROCESSING
function mapIntoObject(arr) {
  return arr.reduce(function (acc, curr) {
    acc[curr.id] = curr;
    return acc;
  }, {});
}

assert((mapIntoObject(data.books)["b2"].id = "b2"));
assert((mapIntoObject(data.authors)["a2"].id = "a2"));


class Book extends React.Component {
    //UTILIZE PROPS TO READ INFORMATION FROM THE BOOKLIST
    render() {
      const { book, author } = this.props;
      return (
        <div>
          <div>{book.title}</div>
          <div>By {author.firstName} {author.firstName}</div>
          <div>Price: {book.price}</div>
          <hr />
        </div>
      );
    }
  }
  
  class BookList extends React.Component {
    render() {
      return (
        <div>
        {/* VALUES FUNCTION LOOPS OVER THE OBJECT */}
          {Object.values(this.props.books).map(book =>
            <Book
              key={book.id}
              book={book}
              author={this.props.authors[book.authorId]}  
            />
          )}
        </div>
      );
    };
  }
  
//MAKING A NEW DATA OBJECT TO HOLD NEW STRUCTURES
  class App extends React.Component {
    state = {
    //PASSING MAPPED OBJECT
      books: mapIntoObject(data.books),
      authors: mapIntoObject(data.authors),
    };
    render() {
      return (
        <BookList
          books={this.state.books}
          authors={this.state.authors} 
        />
      );
    }
  }
  
  ReactDOM.render(<App />, mountNode);


  //USING A BRIDGE TO AVOID RESPONSIBILITY ISSUES



  class Book extends React.Component {
    render() {
      const { book } = this.props;
      const author = this.props.actions.lookupAuthor(book.authorId);
      return (
        <div>
          <div>{book.title}</div>
          <div>By {author.firstName} {author.firstName}</div>
          <div>Price: {book.price}</div>
          <hr />
        </div>
      );
    }
  }
  
  class BookList extends React.Component {
    render() {
      return (
        <div>
          {Object.values(this.props.books).map(book =>
            <Book key={book.id}
              book={book}
              actions={this.props.bookActions} 
            />
          )}
        </div>
      );
    };
  }
  
  class App extends React.Component {
    state = {
      books: mapIntoObject(data.books),
      authors: mapIntoObject(data.authors),
    };
    //THE BRIDGE
    bookActions = {
      lookupAuthor: authorId => this.state.authors[authorId],
    };
    render() {
      return (
        <BookList
          books={this.state.books}
          bookActions={this.bookActions} 
        />
      );
    }
  }
  
  ReactDOM.render(<App />, mountNode);