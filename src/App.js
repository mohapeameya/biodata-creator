import { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import CropPhoto from './components/cropphoto/CropPhoto'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { PDFViewer, BlobProvider } from '@react-pdf/renderer';
import PDFDoc from "./components/PDFDoc";

import { rashiValues, complexionValues, heightValues, weightValues } from "./data";

const defaultHeightIndex = 25;
const defaultWeightIndex = 20;

export default function App() {

  const [biodata, setBiodata] = useState({
    name: { checked: true, value: '' },
    dob: { checked: true, value: '' },
    tob: { checked: true, value: '' },
    pob: { checked: true, value: '' },
    rashi: { checked: true, value: 0 },
    complexion: { checked: true, value: 0 },
    height: { checked: true, value: defaultHeightIndex },
    weight: { checked: true, value: defaultWeightIndex },
    education: { checked: true, value: '' },
    job: { checked: true, value: '' },
    religionCaste: { checked: true, value: '' },
    father: { checked: true, value: '' },
    fatherJob: { checked: true, value: '' },
    mother: { checked: true, value: '' },
    motherJob: { checked: true, value: '' },
    contact: { checked: true, value: '' },
    address: { checked: true, value: '' },
    image: { checked: true, value: '' },
    filename: { checked: true, value: '' }
  });

  const [morePersonalFields, setMorePersonalFields] = useState([]);
  const [moreFamilyFields, setMoreFamilyFields] = useState([]);
  const [moreContactFields, setMoreContactFields] = useState([]);

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

  const [showModal, setShowModal] = useState(false);

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

  const getCopyright = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const companyName = "Ameya Mohape";
    const cp = `© Copyright ${currentYear}, ${companyName}`;
    return cp;
  }

  const [preview, setPreview] = useState(false);

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
        <h1 className="text-white"><i className="bi bi-hearts text-danger"></i>Quick Marriage Biodata Maker</h1>
      </header>

      {preview ?
        <section className="fluid-container text-center">
          <PDFViewer width="380" height="540" showToolbar={false}>
            <PDFDoc />
          </PDFViewer>
          <div className="container p-3 mb-3">
            <div className="row">
              <div className="col">
                <button className="btn btn-secondary mx-3" onClick={handlePreview}><i class="bi bi-pencil pe-1"></i>Edit biodata</button>
                <BlobProvider document={<PDFDoc />}>
                  {({ blob, url, loading, error }) =>
                  (loading ? <button className="btn btn-primary mx-3" disabled><i class="bi bi-download pe-1"></i>Download</button> :
                    <button className="btn btn-primary mx-3" onClick={() => handleDownload(blob)}><i class="bi bi-download pe-1"></i>Download</button>)
                  }
                </BlobProvider>
              </div>
            </div>
          </div>
        </section> :

        <>
          <section className="fluid-container text-center">
            <div className="container shadow p-3 mb-3 bg-white rounded">
              <h3><i className="bi bi-person"></i>Personal Details</h3>
              <div className="row">
                <div className="col"></div>
                <div className="col-lg-8">
                  <div className="row align-items-center p-1">
                    <div className="col-auto form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked disabled />
                    </div>
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Full Name</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter full name" onChange={e => setBiodata({ ...biodata, name: { checked: biodata.name.checked, value: e.target.value } })} />
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
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked disabled />
                    </div>
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Date of Birth</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" aria-label="Date" type="date" onChange={e => setBiodata({ ...biodata, dob: { checked: biodata.dob.checked, value: e.target.value } })} />
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
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked disabled />
                    </div>
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Time of Birth</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" aria-label="Time" type="time" onChange={e => setBiodata({ ...biodata, tob: { checked: biodata.tob.checked, value: e.target.value } })} />
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Place of Birth</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter place of birth"
                        onChange={e => setBiodata({ ...biodata, pob: { checked: biodata.pob.checked, value: e.target.value } })} />
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Rashi</label>
                    </div>
                    <div className="col text-start">
                      <select name="rashi" id="rashi" className="form-select"
                        onChange={e => setBiodata({ ...biodata, rashi: { checked: biodata.rashi.checked, value: Number(e.target.value) } })}>
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
                        checked={biodata.complexion.checked}
                        onChange={e => setBiodata({ ...biodata, complexion: { checked: e.target.checked, value: biodata.complexion.value } })} />
                    </div>
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Complexion</label>
                    </div>
                    <div className="col text-start">
                      <select name="rashi" id="complexion" className="form-select"
                        onChange={e => setBiodata({ ...biodata, complexion: { checked: biodata.complexion.checked, value: Number(e.target.value) } })}>
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Height</label>
                    </div>
                    <div className="col text-start">
                      <select name="rashi" id="height" className="form-select" defaultValue={defaultHeightIndex}
                        onChange={e => setBiodata({ ...biodata, height: { checked: biodata.height.checked, value: Number(e.target.value) } })}>
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Weight</label>
                    </div>
                    <div className="col text-start">
                      <select name="rashi" id="weight" className="form-select" defaultValue={defaultWeightIndex}
                        onChange={e => setBiodata({ ...biodata, weight: { checked: biodata.weight.checked, value: Number(e.target.value) } })}>
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
                        checked={biodata.education.checked}
                        onChange={e => setBiodata({ ...biodata, education: { checked: e.target.checked, value: biodata.education.value } })} />
                    </div>
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Education</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter highest education"
                        onChange={e => setBiodata({ ...biodata, education: { checked: biodata.education.checked, value: e.target.value } })} />
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Job/Occupation</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter job details"
                        onChange={e => setBiodata({ ...biodata, job: { checked: biodata.job.checked, value: e.target.value } })} />
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Religion/Caste</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter religion and caste"
                        onChange={e => setBiodata({ ...biodata, religionCaste: { checked: biodata.religionCaste.checked, value: e.target.value } })} />
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
                        <button type="button" className="btn btn-danger" onClick={() => removeField(index, morePersonalFields, setMorePersonalFields)}><i className="bi bi-trash3-fill"></i></button>
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Father's Name</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter father's full name"
                        onChange={e => setBiodata({ ...biodata, father: { checked: biodata.father.checked, value: e.target.value } })} />
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Father's Occupation</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter father's occupation"
                        onChange={e => setBiodata({ ...biodata, fatherJob: { checked: biodata.fatherJob.checked, value: e.target.value } })} />
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Mother's Name</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter mother's full name"
                        onChange={e => setBiodata({ ...biodata, mother: { checked: biodata.mother.checked, value: e.target.value } })} />
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Mother's Occupation</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter mother's occupation"
                        onChange={e => setBiodata({ ...biodata, motherJob: { checked: biodata.motherJob.checked, value: e.target.value } })} />
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
                        <button type="button" className="btn btn-danger" onClick={() => removeField(index, moreFamilyFields, setMoreFamilyFields)}><i className="bi bi-trash3-fill"></i></button>
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Contact</label>
                    </div>
                    <div className="col text-start">
                      <input className="form-control" placeholder="Enter contact number"
                        onChange={e => setBiodata({ ...biodata, contact: { checked: biodata.contact.checked, value: e.target.value } })} />
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
                    <div className="col text-start">
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Address</label>
                    </div>
                    <div className="col text-start">
                      <textarea className="form-control" rows="3" placeholder="Enter current address"
                        onChange={e => setBiodata({ ...biodata, address: { checked: biodata.address.checked, value: e.target.value } })} />
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
                        <button type="button" className="btn btn-danger" onClick={() => removeField(index, moreContactFields, setMoreContactFields)}><i className="bi bi-trash3-fill"></i></button>
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
                      {biodata.filename.value && (<div className="text-white"><span>{biodata.filename.value}</span></div>)}
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
