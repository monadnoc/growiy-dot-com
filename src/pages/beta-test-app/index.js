import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import Helmet from 'react-helmet'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Growiy—Beta Test App</title>
          <meta property="og:image" content="/img/og-beta.png" />
          <meta property="og:title" content="Growiy—Grow It Yourself" />
          <meta name="og:description" content="Beta test our app that assists you with your home grow"/>
        </Helmet>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Sign up to be the first to test our app!</h1>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'}>
                    Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'message'}>
                      We're adding core features to make it easy to keep track of your grow, to get help from our consultants, or (if you are already an expert cannabis gardener) to consult locally for others.<br></br>
                      <br></br>
                      If you want: What features are you looking for in our app, consulting, or automated hardware to help you grow cannabis?
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      required={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit"
                    style={{
                      backgroundColor: '#32C125',
                    }}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
