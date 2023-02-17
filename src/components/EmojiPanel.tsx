import React, { useEffect, useRef, useState } from 'react'
interface Emoji {
        character: string,
        unicodeName: string,
        codePoint: string,
        group: number;
        subGroup: number;
    }
const EmojiPanel = () => {
    const [emojis, setEmojis] = useState<Emoji[]>([])
    const [displayEmojisPanel, setDisplayEmojisPanel] = useState(false)
    const [search, setSearch] = useState("")
 
     
       
    
    
    const emojiPanelRef = useRef(null)
    useEffect(() => {
        const onClick = (e: any) => {
            if (e.target !== emojiPanelRef.current) {
                setDisplayEmojisPanel(false)
            }
        }
    
        async function fetchEmojis() {
            await fetch("https://emoji-api.com/emojis?access_key=52b74a2dd02e74464659c38b6fe86c12c5a8d74e")
                .then(res => res.json())
                .then(data => setEmojis(data.map((emoji: any) => emoji)))
        }
        fetchEmojis()
        document.addEventListener("click", onClick)
        return () => document.removeEventListener("click", onClick)
    
    }, [])
    function filterEmojisBySearch () {
        if (search === "") {
            return emojis
        }
        return emojis?.filter((emoji) => emoji.unicodeName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }
   
    const random = Math.floor(Math.random() * 2693)
    const randomEmoji = emojis[random]?.character
    return (
    <div ref={emojiPanelRef} onClick={(e) => e.stopPropagation()}>
        <div className='emoji-panel-container'>
            <input type="text"   onChange={e => setSearch(e.target.value)}/>
          
            <div className={`emoji-panel ${displayEmojisPanel ? "emoji-panel-active" : ""}`}>
                <button className=''
                onClick={() => setDisplayEmojisPanel(prevState => !prevState)}
                >
                    {randomEmoji}
                </button>
                <div className={`emojis ${displayEmojisPanel ? "emoji-panel-background" : ""}`}>
                    {displayEmojisPanel && filterEmojisBySearch().map(((emoji: any, idx) => 
                            <div 
                                key={emoji?.unicodeName} 
                                className='emoji-single'
                            >
                                        {emoji?.character}     
                            </div>
                        ))}
                </div>
            </div>

        </div>
    </div>
    )
  
}

export default EmojiPanel