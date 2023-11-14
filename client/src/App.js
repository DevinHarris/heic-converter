import React, { useState, useEffect } from 'react';
import heic2any from 'heic2any';
import { GrCloudUpload } from 'react-icons/gr';
import Loading from './components/Loading';
import './App.css';


function App() {
  const [imageToConvert, setImageToConvert] = useState('');
  const [imageType, setImageType] = useState('image/jpeg');
  const [loadingState, setLoadingState] = useState(false);
  const [convertedImage, setConvertedImage] = useState('');


  const handleSubmit = async (event) => {
      event.preventDefault();
      setConvertedImage('');
      setLoadingState(true)

      const blobURL = URL.createObjectURL(imageToConvert);
      const res = await fetch(blobURL);
      let blob = await res.blob();

      let conversionResult = await heic2any({
        blob,
        toType: imageType,
        quality: 1
      })

      let url = URL.createObjectURL(conversionResult);
      setConvertedImage(url);
      setLoadingState(false)
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
      <div className="app-container">
          
        <div  className="image-upload__form">
              <h2>Welcome to the Proficient HEIC converter.</h2>
              <p>This tool converts <a className="link" href="https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format" 
                target='_blank' 
                referrerPolicy="no-referrer">
                  HEIC image files</a>, a format Apple uses for their products that is not currently supported by many platforms or web browsers.
                </p>
              <p>Currently, only one HEIC image is supported at a time and is held in Random-Access Memory (RAM) so you'll need to click the thumbnail to save to disk.</p>
              <p className="cta-bold">Click the upload button to add an image</p>
                {
                  imageToConvert ? <div className='image-upload__info'>
                    <span>{`${imageToConvert.name} was last modified: ${imageToConvert.lastModifiedDate} `}</span>
                  </div>: null
                }

                <form onSubmit={handleSubmit}>
                  <div className="image-upload__cta">
                    <label className="image-upload__label dropshadow" htmlFor='image-upload'>
                        <GrCloudUpload color="#fff" />
                        
                    </label>
                    <button type="submit" className="convert__btn dropshadow">Convert</button>
                    <select defaultValue={imageType} onChange={(e) => setImageType(e.target.value)}>
                      <option disabled></option>
                      <option value="image/jpeg">JPEG</option>
                      <option value="image/png">PNG</option>
                    </select>
                  </div>
                  <input id="image-upload" type="file" accept=".heic,.heif" onChange={(e) => setImageToConvert(e.target.files[0])} multiple name="files[]" />
                
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
                        <p>👋 Your converted image will appear here 👋</p>
                        <p>😁 Then click the thumbnail to download 😁</p>

                    </div>
                    )
                }

                {

                    loadingState ? (
                        <Loading />
                    ) : null
                }
                </div>
      </div>
    </>
  )
}

export default App;