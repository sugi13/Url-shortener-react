import '../App.css';
import { useState} from 'react';
import { Copy, Backspace, DoubleCheck } from 'akar-icons';
import copy from "copy-to-clipboard";



export const Home = () =>{

    const [inputValue, setInputValue] = useState('');
    const [copyText, setCopyText] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [data, setData] = useState([]);

    async function getData(){
       await fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}/very/long/link.html`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            setData([data.result]);
            setCopyText(data.result.full_short_link);
        })
        setInputValue('');
    }

    const HandleCopyText = () =>{
        copy(copyText);
        setIsCopied(true);
    }

    return (
        <header>
            <div className="header-brand">
                <p>YOURL shortener</p>
            </div>
            <div className="header-banner">
                <h1>Shorten your <em>looooooong</em> URLs <br/></h1>
                <p>Copy your long url. Paste it below👇.</p>
            </div>
            <div className="header-input">
                <input type="url" placeholder='Enter long URL' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button onClick={() => getData()}>Shorten URL</button>
            </div>
            <div className="url-list">
            {data.map((item, index) =>{
                return (
                    <div key={index} className='url-container'>
                   <div className="url">
                    <p>{item.full_short_link}</p>
                   </div>
                   <div className="btn">
                    <button id = 'copy-btn' onClick={() => HandleCopyText()}>{isCopied ? <DoubleCheck/> : <Copy/>}</button>
                   </div>
                    </div>  
                )
            })}
            </div>
        </header>
    )
}