import React from 'react'
import Form from './QuoteForm'

let idx = 0
const getIdx = () => ++idx

const quotes = [
  { id: getIdx(), author: 'Gabe', text: 'have fun with this' },
  { id: getIdx(), author: 'Paul', text: 'use Postman' },
  { id: getIdx(), author: 'Anne', text: 'test your endpoints' },
]

const initialState = {
  // other slices of state
  errorMessage: '',
  quotes,
  form: {
    textInput: '',
    authorInput: '',
  }
}

export default class Quotes extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = initialState
  // }
  state = initialState

  destroy = id => { // arrow syntax for "custom" functions that we build
    console.log('clicking to destroy the following id!', id)
    this.setState({
      ...this.state, quotes: this.state.quotes.filter(quote => quote.id !== id)
    }) // drop a new state right in there
  }

  capitalizeAuthor = id => {
    // state changing machinery lives where state lives
    this.setState({
      ...this.state, quotes: this.state.quotes.map(quote => {
        return quote.id === id
          ? { ...quote, author: quote.author.toUpperCase() }
          : quote
      })
    })
  }

  changeInput = (key, value) => {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [key]: value },
    })
  }

  addQuote = () => {
    const { quotes } = this.state
    this.setState({ ...this.state, quotes: [...quotes, {
      id: getIdx(),
      text: 
      author:
    } ] })
  }

  render() { // traditional method syntax for functions that come with React
    console.log('props are', this.props)
    console.log('state is', this.state)
    // const quotes = this.state.quotes
    // const foo = this.props.foo
    const { quotes, form } = this.state
    const { foo } = this.props
    return (
      <div>
        <h2>Quotes: {foo}</h2>
        <ul>
          {
            quotes.map((quote) => {
              const { id, text, author } = quote
              return (
                <li className='qt' key={id}>
                  {author} says {text}
                  <button onClick={evt => this.destroy(id)}>del</button>
                  <button onClick={evt => this.capitalizeAuthor(id)}>capitalize!</button>
                </li>
              )
            })
          }
        </ul>
        <Form onChange={this.changeInput} values={form} onSubmit={this.addQuote} />
      </div>
    )
  }
}
