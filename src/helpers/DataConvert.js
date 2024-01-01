export const fileToB64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

export const b64ToFile = (b64str, filename) => {
        const mime = "application/octet-stream";
        var n = b64str.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = b64str.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}