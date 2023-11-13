import React, { useState, useEffect } from 'react';
import heic2any from 'heic2any';
import { GrCloudUpload } from 'react-icons/gr'
import './index.css'


function App() {
  const [imageToConvert, setImageToConvert] = useState('');
  const [convertedImage, setConvertedImage] = useState('')


  const handleSubmit = async (event) => {
      event.preventDefault();

      const blobURL = URL.createObjectURL(imageToConvert);
      const res = await fetch(blobURL);
      let blob = await res.blob();

      let conversionResult = await heic2any({
        blob,
        toType: 'image/jpeg',
        quality: 1
      })

      let url = URL.createObjectURL(conversionResult);
      setConvertedImage(url);




  }

  // useEffect(() => {

  //   fetch(`http://localhost:8080/api/image/${heicFile}`)
  //     .then((res) => res.blob())
  //     .then((blob) => heic2any({ 
  //       blob,
  //       toType: "image/jpeg",
  //       quality: 0.9
  //      }))
  //     .then((conversionResult) => {
  //         let url = URL.createObjectURL(conversionResult);
  //         setConvertedImage(url)
  //     })

  // }, [heicFile])
  
  

  return (
    <>
      <div className="form-container">
          
        <div  className="image-upload__form">
        <h2>Welcome to the HEIC to JPEG converter</h2>
        <p>Click the upload button to add an image</p>
          {
            imageToConvert ? <div>
              <span>{`${imageToConvert.name} was last modified: ${imageToConvert.lastModifiedDate} `}</span>
            </div>: null
          }

          <form onSubmit={handleSubmit}>
            <div>
            <label className="image-upload__label" htmlFor='image-upload'>
                <GrCloudUpload />
                
            </label>
            <button type="submit" className="convert__btn">Convert</button>
            </div>
            <input id="image-upload" type="file" accept="image/*,*.heic,*.heif" onChange={(e) => setImageToConvert(e.target.files[0])}  />
           
          </form>
          
          {
            convertedImage ? (
              <div className="image-result">
                <a href={convertedImage} target='_blank' download>
                  <img src={convertedImage} />
                </a>
              </div>
            ) : (
              <div className='image-result__placeholder'>
                  <p>👋 converted images will appear here</p>
                  <p>😁 Then click the link to download 😁</p>
              </div>
            )
          }
          </div>
      </div>
    </>
  )
}

export default App;