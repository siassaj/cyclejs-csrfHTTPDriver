import { makeHTTPDriver } from '@cycle/http'

function makeCsrfHTTPDriver( options ) {
  const HTTPDriver = makeHTTPDriver( options )
  let token = document.querySelector('meta[name=csrf-token]').getAttribute('content')

  return function CsrfHTTPDriver( sink$, streamAdapter ) {
    const csrf_request$ = sink$.map(request => ({
      ...request,
      headers: { 'X-CSRF-Token' : token },
      ok: response => true
    }))

    const source = HTTPDriver( csrf_request$, streamAdapter )

    source.select().addListener({next: responses$ => {
      responses$.addListener({
        next: response => {

          const newToken = response.headers["x-csrf-token"]
          if (newToken) {
            // SET CSRF TOKEN
            token = newToken
          }
        },
        error: error => {
          const newToken = error.response.headers["x-csrf-token"]
          if (newToken) {
            // SET CSRF TOKEN
            token = newToken
          }
        },
        complete: () => {}
      })
    }})

    return source
  }
}

export default makeCsrfHTTPDriver
