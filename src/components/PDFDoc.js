import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import { rashiValues, complexionValues, heightValues, weightValues } from "../constants";
import { useEffect } from 'react';

export default function PDFDoc({ name, dob, tob, pob, rashi, complexion,
  height, weight, education, job, religionCaste,
  morePersonalFields,
  father, fatherJob,
  mother, motherJob,
  moreFamilyFields,
  contact, address,
  moreContactFields,
  image }) {
  const personalDetailsFlex = image.checked ?
    { label: { flex: '2' }, value: { flex: '3' } } :
    { label: { flex: '1' }, value: { flex: '1' } };
  const familyContactFlex = image.checked ?
    { label: { flex: '4' }, value: { flex: '11' } } :
    { label: { flex: '1' }, value: { flex: '1' } };

  useEffect(() => {
    console.log('Doc component loaded')
  }, [])

  const convertTo12HourFormat = (time24) => {
    // Parse hours and minutes from the 24-hour time string
    const [hours, minutes] = time24.split(':').map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = (hours % 12) || 12;

    // Format the time in 12-hour format with AM/PM
    const time12 = `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;

    return time12;
  }

  const convertDateFormat = (dateString) => {
    // Split the date string into year, month, and day
    const [year, month, day] = dateString.split('-');

    // Rearrange the components in the desired format
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.border}>
          <View style={{ paddingTop: 10, alignSelf: 'center' }}>
            <Text style={{ fontSize: 26 }}>BIO DATA</Text>
          </View>
          <View style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ fontSize: 20, textDecoration: 'underline' }}>Personal Details</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={image.checked ? { flex: '2' } : { flex: '1' }}>
                {name.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Name:</Text>
                    <Text style={personalDetailsFlex.value}>{name.value}</Text>
                  </View>}
                {dob.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Date of birth:</Text>
                    <Text style={personalDetailsFlex.value}>{convertDateFormat(dob.value)}</Text>
                  </View>}
                {tob.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Time of birth:</Text>
                    <Text style={personalDetailsFlex.value}>{convertTo12HourFormat(tob.value)}</Text>
                  </View>}

                {pob.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Place of birth:</Text>
                    <Text style={personalDetailsFlex.value}>{pob.value}</Text>
                  </View>}
                {rashi.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Rashi:</Text>
                    <Text style={personalDetailsFlex.value}>{rashiValues[rashi.value]}</Text>
                  </View>}
                {complexion.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Complexion:</Text>
                    <Text style={personalDetailsFlex.value}>{complexionValues[complexion.value]}</Text>
                  </View>}
                {height.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Height:</Text>
                    <Text style={personalDetailsFlex.value}>{heightValues[height.value]}</Text>
                  </View>}
                {weight.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Weight:</Text>
                    <Text style={personalDetailsFlex.value}>{weightValues[weight.value]}</Text>
                  </View>}
                {education.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Education:</Text>
                    <Text style={personalDetailsFlex.value}>{education.value}</Text>
                  </View>}
                {job.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Job/occupation:</Text>
                    <Text style={personalDetailsFlex.value}>{job.value}</Text>
                  </View>}
                {religionCaste.checked &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>Religion/Caste:</Text>
                    <Text style={personalDetailsFlex.value}>{religionCaste.value}</Text>
                  </View>}
                {morePersonalFields.map((item, index) => (
                  <View key={index} style={{ flexDirection: 'row' }}>
                    <Text style={personalDetailsFlex.label}>{item.name}:</Text>
                    <Text style={personalDetailsFlex.value}>{item.value}</Text>
                  </View>
                ))}
              </View>
              {image.checked &&
                <View style={{ flex: '1' }}>
                  <Image src={image.value}></Image>
                </View>
              }
            </View>
            <Text style={{ paddingTop: 30, fontSize: 20, textDecoration: 'underline' }}>Family Details</Text>
            {father.checked &&
              <View style={{ flexDirection: 'row' }}>
                <Text style={familyContactFlex.label}>Father:</Text>
                <Text style={familyContactFlex.value}>{father.value}</Text>
              </View>}
            {fatherJob.checked &&
              <View style={{ flexDirection: 'row' }}>
                <Text style={familyContactFlex.label}>Occupation:</Text>
                <Text style={familyContactFlex.value}>{fatherJob.value}</Text>
              </View>}
            {mother.checked &&
              <View style={{ flexDirection: 'row' }}>
                <Text style={familyContactFlex.label}>Mother:</Text>
                <Text style={familyContactFlex.value}>{mother.value}</Text>
              </View>}
            {motherJob.checked &&
              <View style={{ flexDirection: 'row' }}>
                <Text style={familyContactFlex.label}>Occupation:</Text>
                <Text style={familyContactFlex.value}>{motherJob.value}</Text>
              </View>}
            {moreFamilyFields.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row' }}>
                <Text style={familyContactFlex.label}>{item.name}:</Text>
                <Text style={familyContactFlex.value}>{item.value}</Text>
              </View>
            ))}
            <Text style={{ paddingTop: 30, fontSize: 20, textDecoration: 'underline' }}>Contact Details</Text>
            {contact.checked &&
              <View style={{ flexDirection: 'row' }}>
                <Text style={familyContactFlex.label}>Mobile:</Text>
                <Text style={familyContactFlex.value}>{contact.value}</Text>
              </View>}
            {address.checked &&
              <View style={{ flexDirection: 'row' }}>
                <Text style={familyContactFlex.label}>Address:</Text>
                <Text style={familyContactFlex.value}>{address.value}</Text>
              </View>}
            {moreContactFields.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row' }}>
                <Text style={familyContactFlex.label}>{item.name}:</Text>
                <Text style={familyContactFlex.value}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', // Optional: Set background color for the page
    padding: 20, // Padding for the page content (white space)
  },
  border: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10
  },
});