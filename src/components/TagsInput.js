import { useState } from 'react'

const TagsInput = (props) =>{

    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        props.setTags([...props.tags, value])
        e.target.value = ''
    }

    function removeTag(index){
        props.setTags(props.tags.filter((el, i) => i !== index))
    }

    return (
        <div className="tags-input-container">
            { props.tags.map((tag, index) => ( tag !== "" ?
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
                :
                ""
            )) }
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Add tags" />
        </div>
    )
}

export default TagsInput