import { useState } from 'react';
import classNames from 'classnames';
import {ChatHeader} from './components/chat-header/chat-header';
import styles from './App.module.scss';
import  ChatBody  from "./components/chatBody/chatBody";
function App() {
    

    return (
        <div className={styles.App}>
            <ChatHeader></ChatHeader>
            <ChatBody></ChatBody>
        </div>
    );
}

export default App;
