import { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import CropPhoto from './components/cropphoto/CropPhoto'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { PDFViewer, BlobProvider } from '@react-pdf/renderer';
import PDFDoc from "./components/PDFDoc";

import bappa from './ganpati1.png';
import './App.css';

import { testState } from "./constants";
import { rashiValues, complexionValues, heightValues, weightValues, bloodGroupValues } from "./constants";
import { defaultRashiIndex, defaultComplexionIndex, defaultHeightIndex, defaultWeightIndex, defaultBloodGroupIndex } from "./constants";
import PreviewCarousel from "./components/PreviewCarousel";
import PreviewBiodata from "./components/PreviewBiodata";

export default function App() {

  const [biodata, setBiodata] = useState(
    testState ||
    {
      headerIcon: { checked: true },
      headerText: { checked: true, value: '|| Shree Ganesh ||' },
      name: { checked: true, value: '' },
      dob: { checked: true, value: '2000-01-01' },
      tob: { checked: true, value: '07:45' },
      pob: { checked: true, value: '' },
      religionCaste: { checked: true, value: '' },
      rashi: { checked: true, value: defaultRashiIndex },
      nakshatra: { checked: true, value: '' },
      complexion: { checked: true, value: defaultComplexionIndex },
      height: { checked: true, value: defaultHeightIndex },
      weight: { checked: true, value: defaultWeightIndex },
      bloodGroup: { checked: true, value: defaultBloodGroupIndex },
      education: { checked: true, value: '' },
      job: { checked: true, value: '' },
      father: { checked: true, value: '' },
      fatherJob: { checked: true, value: '' },
      mother: { checked: true, value: '' },
      motherJob: { checked: true, value: '' },
      contact: { checked: true, value: '' },
      address: { checked: true, value: '' },
      image: { checked: false, value: '' },
      filename: { checked: true, value: '' }
    });

  const [morePersonalFields, setMorePersonalFields] = useState([]);
  const [moreFamilyFields, setMoreFamilyFields] = useState([]);
  const [moreContactFields, setMoreContactFields] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [preview, setPreview] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);

  const showPDFPreview = false;

  const addField = (moreFields, setMoreFields) => {
    setMoreFields([...moreFields, { name: "", value: "" }]);
  }

  const removeField = (i, moreFields, setMoreFields) => {
    let updatedMoreFields = [...moreFields];
    updatedMoreFields.splice(i, 1);
    setMoreFields(updatedMoreFields);
  }

  const handleChange = (i, e, moreFields, setMoreFields) => {
    // Create a copy of the moreFields array
    const updatedMoreFields = [...moreFields];

    // Update the specific element in the copied array
    updatedMoreFields[i][e.target.name] = e.target.value // Update the specified property

    // Update the state with the new array
    setMoreFields(updatedMoreFields);
  }

  const handleToggleModal = () => {
    setShowModal((prevState) => !prevState);
  }

  const setImage = (imageObject) => {
    setBiodata({
      ...biodata,
      image: { checked: true, value: imageObject.image },
      filename: { checked: true, value: imageObject.filename }
    })
  }

  const removeImage = () => {
    setBiodata({
      ...biodata,
      image: { checked: false, value: '' },
      filename: { checked: true, value: '' }
    })
  }

  const getCopyright = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const companyName = "Ameya Mohape";
    const cp = `© Copyright ${currentYear}, ${companyName}`;
    return cp;
  }

  const handlePreview = () => {
    setPreview((prevState) => !prevState);
  }

  const saveBlob = (blob, fileName) => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownload = (blob) => {
    saveBlob(blob, 'biodata.pdf');
  }

  useEffect(() => {
    console.log('App component loaded');
  }, []);

  return (
    <>
      <header className="fluid-container text-center p-3">
        <h1 className="text-white">Quick Marriage Biodata Maker</h1>
      </header>

      {preview ?
        <section className="fluid-container text-center">
          {/* {showPDFPreview && (
            <div className="row justify-content-center mb-3">
              <div className="col">
                <PDFViewer width="380" height="540" showToolbar={false}>
                  <PDFDoc
                    {...biodata}
                    morePersonalFields={morePersonalFields}
                    moreFamilyFields={moreFamilyFields}
                    moreContactFields={moreContactFields}
                    index={activeSlide}
                  />
                </PDFViewer>
              </div>
              <div className="col d-flex justify-content-center">
                <div id="htmlPreview" style={{ width: 380, height: 540, backgroundColor: 'white' }}>
                  <PreviewBiodata
                    biodata={biodata}
                    morePersonalFields={morePersonalFields}
                    moreFamilyFields={moreFamilyFields}
                    moreContactFields={moreContactFields}
                    index={activeSlide} />
                </div>
              </div>
            </div>
          )} */}


          {!showPDFPreview && (
            <div className="row mb-3" style={{ overflow: 'hidden' }}>
              <div className="col d-flex justify-content-center">
                <div id="htmlPreview" style={{ width: 380, height: 540, backgroundColor: 'white' }}>
                  <PreviewBiodata
                    biodata={biodata}
                    morePersonalFields={morePersonalFields}
                    moreFamilyFields={moreFamilyFields}
                    moreContactFields={moreContactFields}
                    index={activeSlide} />
                </div>
              </div>
            </div>
          )}


          <PreviewCarousel activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
          <div className="container p-3 mb-3">
            <div className="row">
              <div className="col">
                <button className="btn btn-secondary mx-3" onClick={handlePreview}><i className="bi bi-pencil pe-1"></i>Edit biodata</button>
                <button className="btn btn-primary mx-3" onClick={() => { }}><i className="bi bi-download pe-1"></i>Download</button>
                {/* <BlobProvider document={<PDFDoc {...biodata}
                  morePersonalFields={morePersonalFields}
                  moreFamilyFields={moreFamilyFields}
                  moreContactFields={moreContactFields}
                />}>
                  {({ blob, url, loading, error }) =>
                  (loading ? <button className="btn btn-primary mx-3" disabled><i className="bi bi-download pe-1"></i>Download</button> :
                    <button className="btn btn-primary mx-3" onClick={() => handleDownload(blob)}><i className="bi bi-download pe-1"></i>Download</button>)
                  }
                </BlobProvider> */}
              </div>
            </div>
          </div>
        </section> :

        <>
          <section className="fluid-container text-center">
            <div className="container shadow p-3 mb-3 bg-white rounded">
              <h3>
                <i className="bi bi-card-heading pe-1"></i>
                Header Details</h3>
              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.headerIcon.checked}
                        onChange={e => setBiodata({ ...biodata, headerIcon: { checked: e.target.checked, value: biodata.headerIcon.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.headerIcon.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Icon</label>
                    </div>
                    <div className="col text-center">
                      <img
                        src={bappa}
                        className={`bappa-icon ${biodata.headerIcon.checked ? '' : 'gray-out'}`}
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked1"
                        checked={biodata.headerText.checked}
                        onChange={e => setBiodata({ ...biodata, headerText: { checked: e.target.checked, value: biodata.headerText.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.headerText.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked1">Text</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Document header"
                        value={biodata.headerText.value}
                        onChange={e => setBiodata({ ...biodata, headerText: { checked: biodata.headerText.checked, value: e.target.value } })}
                        disabled={!biodata.headerText.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </div>
          </section>

          <section className="fluid-container text-center">
            <div className="container shadow p-3 mb-3 bg-white rounded">
              <h3><i className="bi bi-person"></i>Personal Details</h3>
              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.name.checked} disabled />
                    </div>
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Full Name</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter full name"
                        value={biodata.name.value}
                        onChange={e => setBiodata({ ...biodata, name: { checked: biodata.name.checked, value: e.target.value } })} />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.dob.checked}
                        onChange={e => setBiodata({ ...biodata, dob: { checked: e.target.checked, value: biodata.dob.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.dob.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Date of Birth</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" aria-label="Date" type="date"
                        value={biodata.dob.value}
                        onChange={e => setBiodata({ ...biodata, dob: { checked: biodata.dob.checked, value: e.target.value } })}
                        disabled={!biodata.dob.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.tob.checked}
                        onChange={e => setBiodata({ ...biodata, tob: { checked: e.target.checked, value: biodata.tob.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.tob.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Time of Birth</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" aria-label="Time" type="time"
                        value={biodata.tob.value}
                        onChange={e => setBiodata({ ...biodata, tob: { checked: biodata.tob.checked, value: e.target.value } })}
                        disabled={!biodata.tob.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.pob.checked}
                        onChange={e => setBiodata({ ...biodata, pob: { checked: e.target.checked, value: biodata.pob.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.pob.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Place of Birth</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter place of birth"
                        value={biodata.pob.value}
                        onChange={e => setBiodata({ ...biodata, pob: { checked: biodata.pob.checked, value: e.target.value } })}
                        disabled={!biodata.pob.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.religionCaste.checked}
                        onChange={e => setBiodata({ ...biodata, religionCaste: { checked: e.target.checked, value: biodata.religionCaste.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.religionCaste.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Caste</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter caste"
                        value={biodata.religionCaste.value}
                        onChange={e => setBiodata({ ...biodata, religionCaste: { checked: biodata.religionCaste.checked, value: e.target.value } })}
                        disabled={!biodata.religionCaste.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.rashi.checked}
                        onChange={e => setBiodata({ ...biodata, rashi: { checked: e.target.checked, value: biodata.rashi.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.rashi.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Rashi</label>
                    </div>
                    <div className="col text-start">
                      <select name="rashi" id="rashi" className="form-select"
                        value={biodata.rashi.value}
                        onChange={e => setBiodata({ ...biodata, rashi: { checked: biodata.rashi.checked, value: Number(e.target.value) } })}
                        disabled={!biodata.rashi.checked}
                      >
                        {
                          rashiValues.map((item, index) => <option key={item} value={index}>{item}</option>)
                        }

                      </select>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.nakshatra.checked}
                        onChange={e => setBiodata({ ...biodata, nakshatra: { checked: e.target.checked, value: biodata.nakshatra.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.nakshatra.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Nakshatra</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter nakshatra"
                        value={biodata.nakshatra.value}
                        onChange={e => setBiodata({ ...biodata, nakshatra: { checked: biodata.nakshatra.checked, value: e.target.value } })}
                        disabled={!biodata.nakshatra.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.complexion.checked}
                        onChange={e => setBiodata({ ...biodata, complexion: { checked: e.target.checked, value: biodata.complexion.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.complexion.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Complexion</label>
                    </div>
                    <div className="col text-start">
                      <select name="complexion" id="complexion" className="form-select"
                        value={biodata.complexion.value}
                        onChange={e => setBiodata({ ...biodata, complexion: { checked: biodata.complexion.checked, value: Number(e.target.value) } })}
                        disabled={!biodata.complexion.checked}
                      >
                        {
                          complexionValues.map((item, index) => <option key={item} value={index}>{item}</option>)
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.height.checked}
                        onChange={e => setBiodata({ ...biodata, height: { checked: e.target.checked, value: biodata.height.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.height.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Height</label>
                    </div>
                    <div className="col text-start">
                      <select name="height" id="height" className="form-select"
                        value={biodata.height.value}
                        onChange={e => setBiodata({ ...biodata, height: { checked: biodata.height.checked, value: Number(e.target.value) } })}
                        disabled={!biodata.height.checked}
                      >
                        {
                          heightValues.map((item, index) => <option key={item} value={index}>{item}</option>)
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.weight.checked}
                        onChange={e => setBiodata({ ...biodata, weight: { checked: e.target.checked, value: biodata.weight.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.weight.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Weight</label>
                    </div>
                    <div className="col text-start">
                      <select name="weight" id="weight" className="form-select"
                        value={biodata.weight.value}
                        onChange={e => setBiodata({ ...biodata, weight: { checked: biodata.weight.checked, value: Number(e.target.value) } })}
                        disabled={!biodata.weight.checked}
                      >
                        {
                          weightValues.map((item, index) => <option key={item} value={index}>{item}</option>)
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.bloodGroup.checked}
                        onChange={e => setBiodata({ ...biodata, bloodGroup: { checked: e.target.checked, value: biodata.bloodGroup.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.bloodGroup.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Blood Group</label>
                    </div>
                    <div className="col text-start">
                      <select name="bloodGroup" id="bloodGroup" className="form-select"
                        value={biodata.bloodGroup.value}
                        onChange={e => setBiodata({ ...biodata, bloodGroup: { checked: biodata.bloodGroup.checked, value: Number(e.target.value) } })}
                        disabled={!biodata.bloodGroup.checked}
                      >
                        {
                          bloodGroupValues.map((item, index) => <option key={item} value={index}>{item}</option>)
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.education.checked}
                        onChange={e => setBiodata({ ...biodata, education: { checked: e.target.checked, value: biodata.education.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.education.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Education</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter highest education"
                        value={biodata.education.value}
                        onChange={e => setBiodata({ ...biodata, education: { checked: biodata.education.checked, value: e.target.value } })}
                        disabled={!biodata.education.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.job.checked}
                        onChange={e => setBiodata({ ...biodata, job: { checked: e.target.checked, value: biodata.job.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.job.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Occupation</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter occupation details"
                        value={biodata.job.value}
                        onChange={e => setBiodata({ ...biodata, job: { checked: biodata.job.checked, value: e.target.value } })}
                        disabled={!biodata.job.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              {
                morePersonalFields.map((field, index) =>
                (<div className="row" key={index}>
                  <div className="col"></div>
                  <div className="col-lg-8">
                    <div className="row align-items-center p-1">
                      <div className="col-auto px-0">
                        <button type="button" className="btn" onClick={() => removeField(index, morePersonalFields, setMorePersonalFields)}><i className="bi bi-trash3-fill text-danger"></i></button>
                      </div>
                      <div className="col text-start px-3">
                        <input className="form-control" name="name" placeholder="Enter custom field" value={field.name}
                          onChange={e => handleChange(index, e, morePersonalFields, setMorePersonalFields)}
                        />
                      </div>
                      <div className="col text-start">
                        <input className="form-control" name="value" placeholder="Enter custom description" value={field.value}
                          onChange={e => handleChange(index, e, morePersonalFields, setMorePersonalFields)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col"></div>
                </div>)
                )
              }

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col mt-2">
                      <button className="btn btn-secondary" onClick={() => addField(morePersonalFields, setMorePersonalFields)}>
                        <span><i className="bi bi-plus-circle pe-1"></i>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </div>
          </section >

          <section className="fluid-container text-center">
            <div className="container shadow p-3 mb-3 bg-white rounded">
              <h3><i className="bi bi-people p-1"></i>Family Details</h3>
              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.father.checked}
                        onChange={e => setBiodata({ ...biodata, father: { checked: e.target.checked, value: biodata.father.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.father.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Father's Name</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter father's full name"
                        value={biodata.father.value}
                        onChange={e => setBiodata({ ...biodata, father: { checked: biodata.father.checked, value: e.target.value } })}
                        disabled={!biodata.father.checked} />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.fatherJob.checked}
                        onChange={e => setBiodata({ ...biodata, fatherJob: { checked: e.target.checked, value: biodata.fatherJob.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.fatherJob.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Father's Occupation</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter father's occupation"
                        value={biodata.fatherJob.value}
                        onChange={e => setBiodata({ ...biodata, fatherJob: { checked: biodata.fatherJob.checked, value: e.target.value } })}
                        disabled={!biodata.fatherJob.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.mother.checked}
                        onChange={e => setBiodata({ ...biodata, mother: { checked: e.target.checked, value: biodata.mother.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.mother.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Mother's Name</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter mother's full name"
                        value={biodata.mother.value}
                        onChange={e => setBiodata({ ...biodata, mother: { checked: biodata.mother.checked, value: e.target.value } })}
                        disabled={!biodata.mother.checked} />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.motherJob.checked}
                        onChange={e => setBiodata({ ...biodata, motherJob: { checked: e.target.checked, value: biodata.motherJob.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.motherJob.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Mother's Occupation</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter mother's occupation"
                        value={biodata.motherJob.value}
                        onChange={e => setBiodata({ ...biodata, motherJob: { checked: biodata.motherJob.checked, value: e.target.value } })}
                        disabled={!biodata.motherJob.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              {
                moreFamilyFields.map((field, index) =>
                (<div className="row" key={index}>
                  <div className="col"></div>
                  <div className="col-lg-8">
                    <div className="row align-items-center p-1">
                      <div className="col-auto px-0">
                        <button type="button" className="btn" onClick={() => removeField(index, moreFamilyFields, setMoreFamilyFields)}><i className="bi bi-trash3-fill text-danger"></i></button>
                      </div>
                      <div className="col text-start px-3">
                        <input className="form-control" name="name" placeholder="Enter custom field" value={field.name}
                          onChange={e => handleChange(index, e, moreFamilyFields, setMoreFamilyFields)}
                        />
                      </div>
                      <div className="col text-start">
                        <input className="form-control" name="value" placeholder="Enter custom description" value={field.value}
                          onChange={e => handleChange(index, e, moreFamilyFields, setMoreFamilyFields)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col"></div>
                </div>)
                )
              }

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col mt-2">
                      <button className="btn btn-secondary" onClick={() => addField(moreFamilyFields, setMoreFamilyFields)}>
                        <span><i className="bi bi-plus-circle pe-1"></i>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

            </div>
          </section>

          <section className="fluid-container text-center">
            <div className="container shadow p-3 mb-3 bg-white rounded">
              <h3><i className="bi bi-telephone p-1"></i>Contact Details</h3>
              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.contact.checked}
                        onChange={e => setBiodata({ ...biodata, contact: { checked: e.target.checked, value: biodata.contact.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.contact.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Mobile</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter contact number"
                        value={biodata.contact.value}
                        onChange={e => setBiodata({ ...biodata, contact: { checked: biodata.contact.checked, value: e.target.value } })}
                        disabled={!biodata.contact.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                        checked={biodata.address.checked}
                        onChange={e => setBiodata({ ...biodata, address: { checked: e.target.checked, value: biodata.address.value } })} />
                    </div>
                    <div className={`col text-start ${biodata.address.checked ? '' : 'text-muted'}`}>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Address</label>
                    </div>
                    <div className="col text-start">
                      <textarea className="form-control" rows="3" placeholder="Enter current address"
                        value={biodata.address.value}
                        onChange={e => setBiodata({ ...biodata, address: { checked: biodata.address.checked, value: e.target.value } })}
                        disabled={!biodata.address.checked}
                      />
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

              {
                moreContactFields.map((field, index) =>
                (<div className="row" key={index}>
                  <div className="col"></div>
                  <div className="col-lg-8">
                    <div className="row align-items-center p-1">
                      <div className="col-auto px-0">
                        <button type="button" className="btn" onClick={() => removeField(index, moreContactFields, setMoreContactFields)}><i className="bi bi-trash3-fill text-danger"></i></button>
                      </div>
                      <div className="col text-start px-3">
                        <input className="form-control" name="name" placeholder="Enter custom field" value={field.name}
                          onChange={e => handleChange(index, e, moreContactFields, setMoreContactFields)}
                        />
                      </div>
                      <div className="col text-start">
                        <input className="form-control" name="value" placeholder="Enter custom description" value={field.value}
                          onChange={e => handleChange(index, e, moreContactFields, setMoreContactFields)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col"></div>
                </div>)
                )
              }

              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col mt-2">
                      <button className="btn btn-secondary" onClick={() => addField(moreContactFields, setMoreContactFields)}>
                        <span><i className="bi bi-plus-circle pe-1"></i>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>

            </div>
          </section>

          <ReactModal isOpen={showModal} ariaHideApp={false}>
            <CropPhoto closeModal={handleToggleModal} handleCroppedImage={setImage} />
          </ReactModal>

          <section className="fluid-container text-center">
            <div className="container p-3 mb-3">
              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col">
                      <button className="btn btn-secondary" onClick={handleToggleModal}>
                        {biodata.image.value ? (<span><i className="bi bi-image p-1"></i>Replace Photo</span>) : (<span><i className="bi bi-image p-1"></i>Add Photo</span>)}
                      </button>
                    </div>
                    <div className="col">
                      <button className="btn btn-primary" onClick={handlePreview}><i className="bi bi-file-earmark-richtext pe-1"></i>Preview</button>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col">
                      {biodata.filename.value && (<div className="text-white">
                        <span>
                          {biodata.filename.value}
                          <button type="button" className="btn" onClick={removeImage}><i className="bi bi-trash3-fill text-danger"></i></button>
                        </span>
                      </div>)}
                    </div>
                    <div className="col">
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </div>
          </section>
        </>
      }

      <footer className="fluid-container text-center p-3">
        <h6 className="text-white">{getCopyright()}</h6>
      </footer>
    </>
  );
}
