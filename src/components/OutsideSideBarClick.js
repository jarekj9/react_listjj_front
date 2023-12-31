import {useEffect, useState} from "react";

export default function OutSideSidebarClick(ref, callback) {
    const[isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setIsClicked(true);
              callback();
            } else {
              setIsClicked(false);
            }
          }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);   
    return isClicked;
}