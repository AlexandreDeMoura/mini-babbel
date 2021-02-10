import React, { useState } from 'react'
import { Provider } from "react-redux"
import { makeStyles } from '@material-ui/core'
import SessionMenu from './components/SessionMenu'
import VocabularyContainer from './components/VocabularyContainer'
import VocabularyMenu from './components/VocabularyMenu'
import configureStore from './store/configureStore'

const useStyles = makeStyles(theme => ({
  main: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sessionMenuContainer: {
    marginBottom: 120,
    width: 'calc(100% - 40px)',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 20
  }
}))

const store = configureStore()

function App() {
  const classes = useStyles()
  const [sessionInfo, setSessionInfo] = useState(["French", "Korean"])

  return (
    <Provider store={store}>
      <main className={classes.main}>
        <div className={classes.sessionMenuContainer}>
          <SessionMenu sessionInfo={sessionInfo} />
        </div>
        <VocabularyMenu />
        <VocabularyContainer />
      </main>
    </Provider>
  )
}

export default App
