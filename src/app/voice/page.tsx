import React from "react";
import VoiceSearch from "../components/voiceSearch";
import Datatable from "../datatable/Datatable";

// type data = {
//   first_name: string;
//   last_name: string;
//   email: string;
//   gender: string;
//   ip_address: string;
// };

const DUMMY_DATA = [
  {
    first_name: "Mill",
    last_name: "Gummory",
    email: "mgummory0@adobe.com",
    gender: "Male",
    ip_address: "23.5.102.18",
  },
  {
    first_name: "Elliott",
    last_name: "Sutterby",
    email: "esutterby1@fc2.com",
    gender: "Male",
    ip_address: "116.51.28.43",
  },
  {
    first_name: "Raimund",
    last_name: "Sadry",
    email: "rsadry2@economist.com",
    gender: "Male",
    ip_address: "126.60.61.143",
  },
  {
    first_name: "Giffard",
    last_name: "Trigwell",
    email: "gtrigwell3@symantec.com",
    gender: "Male",
    ip_address: "229.90.29.138",
  },
  {
    first_name: "Herman",
    last_name: "Nipper",
    email: "hnipper4@people.com.cn",
    gender: "Male",
    ip_address: "26.50.29.141",
  },
  {
    first_name: "Astrix",
    last_name: "Skipsey",
    email: "askipsey5@last.fm",
    gender: "Female",
    ip_address: "6.174.212.233",
  },
  {
    first_name: "Roanna",
    last_name: "Petzolt",
    email: "rpetzolt6@homestead.com",
    gender: "Female",
    ip_address: "208.74.145.250",
  },
  {
    first_name: "Isadora",
    last_name: "Paulsen",
    email: "ipaulsen7@discuz.net",
    gender: "Female",
    ip_address: "138.128.4.107",
  },
  {
    first_name: "Gertrudis",
    last_name: "Youdell",
    email: "gyoudell8@gov.uk",
    gender: "Female",
    ip_address: "219.37.63.2",
  },
  {
    first_name: "Florida",
    last_name: "Grennan",
    email: "fgrennan9@51.la",
    gender: "Female",
    ip_address: "168.126.52.153",
  },
];

function page() {
  return (
    <div>
      <h3>Search by name</h3>

      {/* <Datatable data={DUMMY_DATA} /> */}
      <VoiceSearch data={DUMMY_DATA} />
    </div>
  );
}

export default page;
