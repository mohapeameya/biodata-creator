import React, { useState, useRef, useEffect } from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import imageCompression from 'browser-image-compression';

import 'react-image-crop/dist/ReactCrop.css'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function CropPhoto({ closeModal = () => { }, handleCroppedImage = () => { } }) {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const hiddenAnchorRef = useRef(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState(8 / 10)
  const [filename, setFileName] = useState('');

  async function onSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const imageFile = event.target.files[0];
      const options = {
        maxSizeMB: 0.256,
        maxWidthOrHeight: 1920
      }
      try {
        const compressedFile = await imageCompression(imageFile, options);
        const reader = new FileReader()
        reader.addEventListener('load', () =>
          setImgSrc(reader.result?.toString() || ''),
        )
        reader.readAsDataURL(compressedFile)
        setFileName(event.target.files[0]?.name);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    })

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }
    blobUrlRef.current = URL.createObjectURL(blob)

    // dispatch(edit({ type: 'IMAGE', value: blobUrlRef.current }));
    // dispatch(edit({ type: 'FILENAME', value: filename }));
    const imageObject = {
      filename: filename,
      image: blobUrlRef.current
    }
    handleCroppedImage(imageObject);
    closeModal();
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  useEffect(() => {
    console.log('Crop component loaded')
  }, [])

  return (
    <div className='fluid-container text-center'>

      {!imgSrc && (
        <>
          <section className="fluid-container text-center">
            <div className="container p-3 mb-3 bg-white rounded">
              <div className="row">
                <div className="col">
                  <input className='form-control' type="file" accept="image/*" onChange={onSelectFile} />
                </div>
                <div className="col">
                  <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div> */}
      {/* <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div> */}
      {/* <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div> */}
      <div className='row'>
        <div className='col-md p-3'>
          {!!imgSrc && (
            <>
              <div className='col'><h5>Uploaded Photo</h5></div>
              <div className='col'>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  // minWidth={400}
                  minHeight={100}
                // circularCrop
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                    onLoad={onImageLoad}
                    width="300"
                  />
                </ReactCrop>
              </div>
            </>
          )}
        </div>
        <div className='col-md p-3'>
          {!!completedCrop && (
            <>
              <div className='col'><h5>Preview</h5></div>
              <div className='col'>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: 300,
                    // width: completedCrop.width,
                    // height: completedCrop.height,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {!!completedCrop && (
        <section className="fluid-container text-center">
          <div className="container bg-black rounded">
            <div className="row">
              <div className="col">
                <button className="btn btn-primary" onClick={onDownloadCropClick}>Done</button>
              </div>
              <div className="col">
                <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
          <div>
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: 'absolute',
                top: '-200vh',
                visibility: 'hidden',
              }}
            >
              Hidden download
            </a>
          </div>
        </section>

      )}
    </div>
  )
}
