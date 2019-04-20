import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import Helmet from 'react-helmet'

function encode(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAttachment = e => {
    this.setState({ [e.target.name]: e.target.files[0] })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
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
          <title>Growiy—Free Consulting for Cannabis</title>
          <meta property="og:image" content="/img/og-consult.png" />
        </Helmet>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>We want to help you grow!</h1>
              <p>Please provide as much information as possible regarding a problem you are having with a single plant, a grow room, or just getting started.</p>
              <form
                name="file-upload"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="file-upload" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'}>
                    Email (this is how we will contact you)
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
                  <label className="label" htmlFor={'pain'}>
                    Describe the problem you're having growing cannabis.
                  </label>
                  <p> Include details like: the age/stage of a plant that is sick, relevant measurements about your grow, or how long you've been having this problem. </p>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'pain'}
                      onChange={this.handleChange}
                      id={'pain'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'strain'}>
                    If this problem is for a specific cannabis strain, which strain is it (and from where did you get it)?
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'strain'}
                      onChange={this.handleChange}
                      id={'strain'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="file">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        name="attachment"
                        onChange={this.handleAttachment}
                      />
                      <span className="file-cta">
                        <span className="file-label">Upload photo, if relevant...</span>
                      </span>
                    </label>
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
