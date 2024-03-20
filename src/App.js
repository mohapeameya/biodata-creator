import { useEffect, useState } from "react";

import { rashiValues, complexionValues, heightValues, weightValues } from "./data";

export default function App() {

  const [biodata, setBiodata] = useState({});

  useEffect(() => {
    console.log('App component loaded');
  }, []);

  return (
    <>
      <header className="fluid-container text-center p-3">
        <h1>Quick Marriage Biodata Maker</h1>
      </header>

      <section className="fluid-container text-center">
        <div className="container shadow p-3 mb-3 bg-white rounded">
          <h3>Personal Details</h3>
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
                  <input className="form-control" placeholder="Enter full name" />
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
                  <input className="form-control" aria-label="Date" type="date" />
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
                  <input className="form-control" aria-label="Time" type="time" />
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Place of Birth</label>
                </div>
                <div className="col text-start">
                  <input className="form-control" placeholder="Enter place of birth" />
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Rashi</label>
                </div>
                <div className="col text-start">
                  <select name="rashi" id="rashi" className="form-select">
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Complexion</label>
                </div>
                <div className="col text-start">
                  <select name="rashi" id="complexion" className="form-select">
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Height</label>
                </div>
                <div className="col text-start">
                  <select name="rashi" id="height" className="form-select">
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Weight</label>
                </div>
                <div className="col text-start">
                  <select name="rashi" id="weight" className="form-select">
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Education</label>
                </div>
                <div className="col text-start">
                  <input className="form-control" placeholder="Enter highest education" />
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Job/Occupation</label>
                </div>
                <div className="col text-start">
                  <input className="form-control" placeholder="Enter job details" />
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Religion/Caste</label>
                </div>
                <div className="col text-start">
                  <input className="form-control" placeholder="Enter religion and caste" />
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>

      </section >

      <section className="fluid-container text-center">
        <div className="container shadow p-3 mb-3 bg-white rounded">
          <h3>Family Details</h3>
          <div className="row">
            <div className="col"></div>
            <div className="col-lg-8">
              <div className="row align-items-center p-1">
                <div className="col-auto form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Father's Name</label>
                </div>
                <div className="col text-start">
                  <input className="form-control" placeholder="Enter father's full name" />
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Father's Occupation</label>
                </div>
                <div className="col text-start">
                  <input className="form-control" placeholder="Enter father's occupation" />
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Mother's Name</label>
                </div>
                <div className="col text-start">
                  <input className="form-control" placeholder="Enter mother's full name" />
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Mother's Occupation</label>
                </div>
                <div className="col text-start">
                  <input className="form-control" placeholder="Enter mother's occupation" />
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>

        </div>
      </section>

      <section className="fluid-container text-center">
        <div className="container shadow p-3 mb-3 bg-white rounded">
          <h3>Contact Details</h3>
          <div className="row">
            <div className="col"></div>
            <div className="col-lg-8">
              <div className="row align-items-center p-1">
                <div className="col-auto form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Contact</label>
                </div>
                <div className="col text-start">
                  <input className="form-control" placeholder="Enter contact number" />
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
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                <div className="col text-start">
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Address</label>
                </div>
                <div className="col text-start">
                  <textarea className="form-control" rows="3" placeholder="Enter current address" />
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>

        </div>
      </section>
    </>
  );
}
