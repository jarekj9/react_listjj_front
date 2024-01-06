import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TagsInput = (props) =>{

    const [tagsInput, setTagsInput] = useState('');

    function onInputKeyDown(e) {
        if (e.key !== ' ' && e.key !== 'Spacebar') return;
        setTagsInput(e.target.value)
        const text = e.target.value;
        if(!text.trim()) return;
        props.setTags([...props.tags, text]);
        setTagsInput('');
    }
    function onInputChange(e) {
        setTagsInput(e.target.value);
    };

    function onButtonClick(e) {
        if(!tagsInput.trim()) return;
        props.setTags([...props.tags, tagsInput]);
        setTagsInput('');
    };

    function removeTag(index) {
        props.setTags(props.tags.filter((el, i) => i !== index));
    }

    function getColorFromString(word) {
        var letters = word.split('');
        var colorDec = ["0", "0", "0", "0", "0", "0"];
        for (var i = 0; i < colorDec.length; i++) {
          colorDec[i] = (word.charCodeAt(i % word.length) % 16).toString(16).toUpperCase();
        }
        var color = "#" + colorDec.join("");
        return color;
      }

    function getTextColorFromBgColor(color) {
        var hex = color.replace(/^#/, '');
        var bigint = parseInt(hex, 16);
        var rgbColor = {
            R: (bigint >> 16) & 255,
            G: (bigint >> 8) & 255,
            B: bigint & 255
        };    
        var luminance = rgbColor.R * 0.299 + rgbColor.G * 0.587 + rgbColor.B * 0.114;
        var textColor = luminance > 140 ? "#000000" : "#FFFFFF";
        return textColor;
    }

    const tagStyle = (tag) => {
        return {
          fontSize: '12px',
          backgroundColor: getColorFromString(tag),
          color: getTextColorFromBgColor(getColorFromString(tag)),
        };
      };

    const tagHrefStyle = (tag) => {
        return {
            color: getTextColorFromBgColor(getColorFromString(tag)),
        };
    };

    return (
        <div className="tags-input-container">
            { props.tags.map((tag, index) => ( tag !== "" ?
                <div className="tag-item" key={index}>
                    <span className="badge m-1" style={tagStyle(tag)}>
                        {tag}
                        { props.edit &&
                            <a href="#" style={tagHrefStyle(tag)} onClick={() => removeTag(index)}><FontAwesomeIcon className="ms-1" icon="trash" /></a>
                        }
                    </span>
                </div>
                :
                ""
            ))}
            { props.edit && 
                <>
                <input onKeyDown={onInputKeyDown} onChange={onInputChange} value={tagsInput} type="text" className="tags-input" placeholder="add tags" />
                <button className="btn btn-sm btn-outline-primary" onClick={onButtonClick}><FontAwesomeIcon icon="plus" /></button>
                </>
            }
        </div>
    )
}

export default TagsInput