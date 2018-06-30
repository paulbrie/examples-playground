import React from 'react'
import ReactDOM from 'react-dom'
import Teleport from '@teleporthq/teleport-lib-js'
import GeneratorReact from '@teleporthq/teleport-generator-react'
import './styles.css'
const teleport = new Teleport()

// a definition file or object describes the elements (or building blocks)
// with which you can describe a user interface in a JSON intermediary representation
const definitions = require('./teleport-elements-core/definitions.json')

// a mapping file or object proposes a code representation for a given element/target
const mappingHtml = require('./teleport-elements-core/mapping-html.json')
const mappingReact = require('./teleport-elements-core/mapping-react.json')

// project data
const jsonData = require('./sampleData/project.json')

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      output: ''
    }
  }

  async componentDidMount() {
    // teleport setup
    // load the definitions and mappings/target we'd like to work
    await teleport.use([
      definitions,
      mappingHtml,
      mappingReact,
      new GeneratorReact()
    ])

    const generated = teleport
      .target('react')
      .generator.generateComponent(jsonData, { prettier: { semi: false } })

    const firstFile = Object.keys(generated.filesByName)[0]

    this.setState({
      // output: teleport.map('react', 'teleport-elements-core', 'View')
      output: generated.filesByName[firstFile]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>teleportHQ Demo</h1>

        <div className="inOut">
          <div className="code">
            source json file
            <textarea defaultValue={JSON.stringify(jsonData, null, 2)} />
          </div>
          <div className="code">
            code generation
            <textarea value={this.state.output} />
          </div>
        </div>
        <div className="json">
          <div>
            definitions.json
            <textarea defaultValue={JSON.stringify(definitions, null, 2)} />
          </div>
          <div>
            mappingHtml.json
            <textarea defaultValue={JSON.stringify(mappingHtml, null, 2)} />
          </div>
          <div>
            mappingReact.json
            <textarea defaultValue={JSON.stringify(mappingReact, null, 2)} />
          </div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
