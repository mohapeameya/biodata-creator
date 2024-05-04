import { useEffect, useState } from 'react';
import bappa from '../ganpati1.png';
import { convertDateFormat, convertTo12HourFormat } from '../utilities';
import { rashiValues, complexionValues, heightValues, weightValues, bloodGroupValues } from "../constants";

const previewDims = {
  width: 380,
  height: 540
};

const templates = [
  {
    name: 'Basic',
    border: false,
    image: false,
    header: false
  },
  {
    name: 'Standard',
    border: true,
    image: true,
    header: true
  }
];

const StandardPageBorder = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'black',
  borderRadius: '5px',
};

const BasicPageBorder = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderRadius: '5px',
};

const PageSizeAndMargin = {
  height: previewDims.height - 26,
  width: previewDims.width - 26,
  margin: '13px',
  backgroundColor: 'white'
}

const Preview = ({
  headerIcon, headerText,
  name, dob, tob, pob, rashi, nakshatra,
  complexion, bloodGroup, height, weight,
  education, job, salary,
  hobbies, religionCaste,
  morePersonalFields,
  father, fatherJob, fatherNative,
  mother, motherJob, motherNative,
  brotherElder, brotherElderJob, brotherYounger, brotherYoungerJob,
  sisterElder, sisterElderJob, sisterYounger, sisterYoungerJob,
  relatives,
  moreFamilyFields,
  contact, address,
  moreContactFields,
  image, style }) => {

  const row = { flexDirection: 'row', display: 'flex', paddingBottom: 1.5 };
  const common = { fontSize: 7, textAlign: 'left' };
  const label = { flex: '1', ...common };
  const valuePersonal = { flex: '1', ...common };

  const valueFamilyContact = image.checked && style.image ?
    { flex: '2', ...common } :
    { flex: '1', ...common };

  useEffect(() => {
    console.log('Preview component loaded');
  }, []);

  return (
    <div style={style.pageStyle}>
      {headerIcon.checked && style.header &&
        <img src={bappa} style={{ height: '35px', paddingTop: 5 }} alt="Header Icon" />}
      {headerText.checked && style.header &&
        <div style={{ paddingTop: 2, fontSize: 10 }}>
          {headerText.value}
        </div>}
      {!style.header &&
        <div style={{ paddingTop: 2, fontSize: 10 }}>
          BIO DATA
        </div>}
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 18, paddingRight: 18, paddingTop: 2 }}>
        <div style={{ textAlign: 'left', fontSize: 9, paddingTop: 7 }}>PERSONAL DETAILS</div>
        <div style={{ display: 'flex', flexDirection: 'row', fontSize: 12 }}>
          <div style={image.checked && style.image ? { flex: '2' } : { flex: '1' }}>
            {name.checked &&
              <div style={row}>
                <div style={label}>Name</div>
                <div style={valuePersonal}>: {name.value}</div>
              </div>}
            {dob.checked &&
              <div style={row}>
                <div style={label}>Date of birth</div>
                <div style={valuePersonal}>: {convertDateFormat(dob.value)}</div>
              </div>}
            {tob.checked &&
              <div style={row}>
                <div style={label}>Time of birth</div>
                <div style={valuePersonal}>: {convertTo12HourFormat(tob.value)}</div>
              </div>}
            {pob.checked &&
              <div style={row}>
                <div style={label}>Place of birth</div>
                <div style={valuePersonal}>: {pob.value}</div>
              </div>}
            {religionCaste.checked &&
              <div style={row}>
                <div style={label}>Caste</div>
                <div style={valuePersonal}>: {religionCaste.value}</div>
              </div>}
            {rashi.checked &&
              <div style={row}>
                <div style={label}>Rashi</div>
                <div style={valuePersonal}>: {rashiValues[rashi.value]}</div>
              </div>}
            {nakshatra.checked &&
              <div style={row}>
                <div style={label}>Nakshatra</div>
                <div style={valuePersonal}>: {nakshatra.value}</div>
              </div>}
            {complexion.checked &&
              <div style={row}>
                <div style={label}>Complexion</div>
                <div style={valuePersonal}>: {complexionValues[complexion.value]}</div>
              </div>}
            {height.checked &&
              <div style={row}>
                <div style={label}>Height</div>
                <div style={valuePersonal}>: {heightValues[height.value]}</div>
              </div>}
            {weight.checked &&
              <div style={row}>
                <div style={label}>Weight</div>
                <div style={valuePersonal}>: {weightValues[weight.value]}</div>
              </div>}
            {bloodGroup.checked &&
              <div style={row}>
                <div style={label}>Blood Group</div>
                <div style={valuePersonal}>: {bloodGroupValues[bloodGroup.value]}</div>
              </div>}
            {education.checked &&
              <div style={row}>
                <div style={label}>Education</div>
                <div style={valuePersonal}>: {education.value}</div>
              </div>}
            {job.checked &&
              <div style={row}>
                <div style={label}>Occupation</div>
                <div style={valuePersonal}>: {job.value}</div>
              </div>}
            {salary.checked &&
              <div style={row}>
                <div style={label}>Salary</div>
                <div style={valuePersonal}>: {salary.value}</div>
              </div>}
            {hobbies.checked &&
              <div style={row}>
                <div style={label}>Hobbies</div>
                <div style={valuePersonal}>: {hobbies.value}</div>
              </div>}
            {morePersonalFields.map((item, index) => (
              <div key={index} style={row}>
                <div style={label}>{item.name}</div>
                <div style={valuePersonal}>: {item.value}</div>
              </div>
            ))}
          </div>

          {image.checked && style.image &&
            <div style={{ flex: '1', justifyContent: 'center', alignItems: 'center' }}>
              <img src={image.value} style={{ width: '100%' }} alt="Preview Image" />
            </div>
          }
        </div>
        <div style={{ textAlign: 'left', fontSize: 9, paddingTop: 7 }}>FAMILY DETAILS</div>
        <div style={{ display: 'flex', flexDirection: 'row', fontSize: 12 }}>
          <div style={{ flex: '1' }}>
            {father.checked &&
              <div style={row}>
                <div style={label}>Father</div>
                <div style={valueFamilyContact}>: {father.value}</div>
              </div>}
            {fatherJob.checked &&
              <div style={row}>
                <div style={label}>Occupation</div>
                <div style={valueFamilyContact}>: {fatherJob.value}</div>
              </div>}
            {fatherNative.checked &&
              <div style={row}>
                <div style={label}>Native</div>
                <div style={valueFamilyContact}>: {fatherNative.value}</div>
              </div>}
            {mother.checked &&
              <div style={row}>
                <div style={label}>Mother</div>
                <div style={valueFamilyContact}>: {mother.value}</div>
              </div>}
            {motherJob.checked &&
              <div style={row}>
                <div style={label}>Occupation</div>
                <div style={valueFamilyContact}>: {motherJob.value}</div>
              </div>}
            {motherNative.checked &&
              <div style={row}>
                <div style={label}>Native</div>
                <div style={valueFamilyContact}>: {motherNative.value}</div>
              </div>}
            {brotherElder.checked &&
              <div style={row}>
                <div style={label}>Brother (Elder)</div>
                <div style={valueFamilyContact}>: {brotherElder.value}</div>
              </div>}
            {brotherElderJob.checked &&
              <div style={row}>
                <div style={label}>Occupation</div>
                <div style={valueFamilyContact}>: {brotherElderJob.value}</div>
              </div>}
            {brotherYounger.checked &&
              <div style={row}>
                <div style={label}>Brother (Younger)</div>
                <div style={valueFamilyContact}>: {brotherYounger.value}</div>
              </div>}
            {brotherYoungerJob.checked &&
              <div style={row}>
                <div style={label}>Occupation</div>
                <div style={valueFamilyContact}>: {brotherYoungerJob.value}</div>
              </div>}
            {sisterElder.checked &&
              <div style={row}>
                <div style={label}>Sister (Elder)</div>
                <div style={valueFamilyContact}>: {sisterElder.value}</div>
              </div>}
            {sisterElderJob.checked &&
              <div style={row}>
                <div style={label}>Occupation</div>
                <div style={valueFamilyContact}>: {sisterElderJob.value}</div>
              </div>}
            {sisterYounger.checked &&
              <div style={row}>
                <div style={label}>Sister (Younger)</div>
                <div style={valueFamilyContact}>: {sisterYounger.value}</div>
              </div>}
            {sisterYoungerJob.checked &&
              <div style={row}>
                <div style={label}>Occupation</div>
                <div style={valueFamilyContact}>: {sisterYoungerJob.value}</div>
              </div>}
            {relatives.checked &&
              <div style={row}>
                <div style={label}>Relatives</div>
                <div style={valueFamilyContact}>: {relatives.value}</div>
              </div>}
            {moreFamilyFields.map((item, index) => (
              <div key={index} style={row}>
                <div style={label}>{item.name}</div>
                <div style={valueFamilyContact}>: {item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'left', fontSize: 9, paddingTop: 7 }}>CONTACT DETAILS</div>
        <div style={{ display: 'flex', flexDirection: 'row', fontSize: 12 }}>
          <div style={{ flex: '1' }}>
            {contact.checked &&
              <div style={row}>
                <div style={label}>Mobile</div>
                <div style={valueFamilyContact}>: {contact.value}</div>
              </div>}
            {address.checked &&
              <div style={row}>
                <div style={label}>Address</div>
                <div style={valueFamilyContact}>: {address.value}</div>
              </div>}
            {moreContactFields.map((item, index) => (
              <div key={index} style={row}>
                <div style={label}>{item.name}</div>
                <div style={valueFamilyContact}>: {item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default function PreviewBiodata({ biodata, morePersonalFields,
  moreFamilyFields,
  moreContactFields, index }) {

  const template = templates[index];
  const style = {
    pageStyle: {
      ...PageSizeAndMargin, // Always apply PageSizeAndMargin
      ...(template.border ? StandardPageBorder : BasicPageBorder), // Conditionally apply PageBorder
    },
    image: template.image,
    header: template.header,
  };

  useEffect(() => {
    console.log('Biodata preview component loaded');
  }, []);

  return (
    <Preview {...biodata}
      morePersonalFields={morePersonalFields}
      moreFamilyFields={moreFamilyFields}
      moreContactFields={moreContactFields}
      style={style} />
  );
}


