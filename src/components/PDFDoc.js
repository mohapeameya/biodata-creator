import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import { rashiValues, complexionValues, heightValues } from "../data";

export default function PDFDoc ({ name, dob, tob, pob, rashi, complexion,
  height, education, job, religionCaste, father, fatherJob,
  mother, motherJob, contact, address, image }) {
  const personalDetailsFlex = image === '' ? 
  { label: { flex: '1' }, value: { flex: '1' } } :
  { label: { flex: '2' }, value: { flex: '3' } }; 
  const familyContactFlex = image === '' ? 
  { label: { flex: '1' }, value: { flex: '1' } } :
  { label: { flex: '4' }, value: { flex: '11' } }; 
  
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
              <View style={image ? { flex: '2' } : { flex: '1' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Name:</Text>
                  <Text style={personalDetailsFlex.value}>{name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Date of birth:</Text>
                  <Text style={personalDetailsFlex.value}>{dob}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Time of birth:</Text>
                  <Text style={personalDetailsFlex.value}>{tob}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Place of birth:</Text>
                  <Text style={personalDetailsFlex.value}>{pob}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Rashi:</Text>
                  <Text style={personalDetailsFlex.value}>{rashiValues[rashi]}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Complexion:</Text>
                  <Text style={personalDetailsFlex.value}>{complexionValues[complexion]}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Height:</Text>
                  <Text style={personalDetailsFlex.value}>{heightValues[height]}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Education:</Text>
                  <Text style={personalDetailsFlex.value}>{education}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Job/occupation:</Text>
                  <Text style={personalDetailsFlex.value}>{job}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={personalDetailsFlex.label}>Religion/Caste:</Text>
                  <Text style={personalDetailsFlex.value}>{religionCaste}</Text>
                </View>
              </View>
              { image &&
                <View style={{ flex: '1' }}>
                  <Image src={image}></Image>
                </View>
              }
            </View>
            <Text style={{ paddingTop: 30, fontSize: 20, textDecoration: 'underline' }}>Family Details</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={familyContactFlex.label}>Father:</Text>
              <Text style={familyContactFlex.value}>{father}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={familyContactFlex.label}>Occupation:</Text>
              <Text style={familyContactFlex.value}>{fatherJob}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={familyContactFlex.label}>Mother:</Text>
              <Text style={familyContactFlex.value}>{mother}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={familyContactFlex.label}>Occupation:</Text>
              <Text style={familyContactFlex.value}>{motherJob}</Text>
            </View>
            <Text style={{ paddingTop: 30, fontSize: 20, textDecoration: 'underline' }}>Contact Details</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={familyContactFlex.label}>Contact:</Text>
              <Text style={familyContactFlex.value}>{contact}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={familyContactFlex.label}>Address:</Text>
              <Text style={familyContactFlex.value}>{address}</Text>
            </View>
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