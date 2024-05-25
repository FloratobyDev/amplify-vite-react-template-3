import { Button } from "@aws-amplify/ui-react";
import CustomSelect from "../components/CustomSelect";
import Dropdown from "../components/Dropdown";
import ImageUploadWCustomDropdown from "../components/ImageUploadWCustomDropdown";
import InputWithLabel from "../components/InputWithLabel";
import Paragraph from "../components/Paragraph";
import SubTitle from "../components/SubTitle";
import TextArea from "../components/TextArea";
import Title from "../components/Title";
import Cancel01Icon from "../logos/Cancel01Icon";
import { useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuth } from "../context/AuthProvider";
import { uploadData } from "aws-amplify/storage";

const client = generateClient<Schema>();

type Props = {
  closeProfile: boolean;
  setCloseProfile: (value: boolean) => void;
};

type NewUserType = {
  fullName: string;
  age: string;
  gender: string;
  race: string;
  language: string;
  interest: string;
  aboutMe: string;
  file: File | null;
};

function AppProfileSetup({ closeProfile, setCloseProfile }: Props) {
  const { userInformation } = useAuth();

  const [newUserInformation, setNewUserInformation] = useState<NewUserType>({
    fullName: "",
    age: "",
    gender: "",
    race: "",
    language: "",
    interest: "",
    aboutMe: "",
    file: null,
  });

  function handleInformation(key: string) {
    return (newValue: string) => {
      setNewUserInformation({ ...newUserInformation, [key]: newValue });
    };
  }

  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Genderqueer",
    "Genderfluid",
    "Agender",
    "Bigender",
    "Two-Spirit",
    "Transgender Male",
    "Transgender Female",
    "Cisgender Male",
    "Cisgender Female",
    "Demiboy",
    "Demigirl",
    "Androgynous",
    "Intersex",
    "Neutrois",
    "Pangender",
    "Questioning",
    "Prefer not to say",
    "Other",
  ];
  const raceOptions = [
    "Caucasian",
    "African",
    "Asian",
    "Native American",
    "Pacific Islander",
    "Hispanic or Latino",
    "Middle Eastern",
    "Indigenous Australian",
    "Mestizo",
    "Mulatto",
    "Other",
  ];
  const languageOptions = [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Corsican",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hawaiian",
    "Hebrew",
    "Hindi",
    "Hmong",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Korean",
    "Kurdish",
    "Kyrgyz",
    "Lao",
    "Latin",
    "Latvian",
    "Lithuanian",
    "Luxembourgish",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Mongolian",
    "Myanmar (Burmese)",
    "Nepali",
    "Norwegian",
    "Nyanja (Chichewa)",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Samoan",
    "Scots Gaelic",
    "Serbian",
    "Sesotho",
    "Shona",
    "Sindhi",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tagalog (Filipino)",
    "Tajik",
    "Tamil",
    "Telugu",
    "Thai",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu",
  ];

  const raceEthnicityInterests = [
    "Cultural Heritage",
    "Ethnic Foods",
    "Traditional Music",
    "Folklore and Myths",
    "Ancestry and Genealogy",
    "Historical Events and Movements",
    "Ethnic Festivals and Celebrations",
    "Traditional Clothing and Fashion",
    "Indigenous Languages",
    "Ethnic Art and Craft",
    "Migration and Diaspora Studies",
    "Racial Justice and Equity",
    "Intercultural Communication",
    "Ethnic Literature",
    "Cultural Rituals and Practices",
    "Multiculturalism",
    "Ethnic Film and Cinema",
    "Race and Ethnicity in Media",
    "Sociocultural Dynamics",
    "Ethnic and Racial Identity",
    "Interracial Relationships",
    "Cultural Anthropology",
    "Ethnic and Racial Politics",
    "Civil Rights Movements",
    "Indigenous Rights",
    "Postcolonial Studies",
    "Ethnic and Racial Health Disparities",
    "Cultural Preservation",
    "Anti-Racism Education",
    "Diversity and Inclusion",
    "Ethnic Cuisine",
    "Global Cultures",
    "Racial and Ethnic Demographics",
    "Cultural Exchange Programs",
    "Ethnographic Research",
    "Heritage Sites and Museums",
    "Cultural Festivals",
    "Race and Ethnicity in Literature",
    "Cross-Cultural Psychology",
    "Minority Rights",
    "Immigration Studies",
    "Indigenous Knowledge Systems",
    "Cultural Tourism",
    "Race and Ethnicity in Education",
    "Cultural Competency",
    "Ethnic Conflict and Resolution",
    "Diaspora Communities",
  ];

  function stopSeeingThis() {
    setCloseProfile(true);
    localStorage.setItem("closeProfile", "true");
  }

  function closeProfileSetup() {
    setCloseProfile(true);
    console.log("Close Profile Setup");
  }

  const closeButtons = [
    {
      label: "Close",
      onClick: closeProfileSetup,
    },
    {
      label: "Stop seeing this",
      onClick: stopSeeingThis,
    },
  ];

  async function handleSubmit() {
    if (userInformation?.id === undefined) return;

    let profilePicturePath = "";
    if (newUserInformation.file !== null) {
      const { result } = await uploadData({
        path: `profile-pictures/${userInformation?.id}/${newUserInformation.file?.name}`,
        data: newUserInformation?.file,
      });

      try {
        const results = await result;
        console.log("results", results);
        profilePicturePath = results.path;
      } catch (error) {
        console.log("error", error);
      }
    }

    client.models.User.update(
      {
        id: userInformation.id,
        fullName: newUserInformation.fullName,
        age: parseInt(newUserInformation.age) || -1,
        spokenLanguage: newUserInformation.language,
        interests: [newUserInformation.interest],
        aboutMe: newUserInformation.aboutMe,
        profilePictureUrl: profilePicturePath,
      },
      {
        authMode: "userPool",
      }
    )
      .then((response) => {
        console.log("User updated successfully", response);
        // localStorage.setItem("closeProfile", "true");
      })
      .catch((error) => {
        console.log("Error updating user", error);
      });
  }

  function handleFileUpload(file: File) {
    setNewUserInformation({ ...newUserInformation, file: file });
  }

  return (
    <>
      {!closeProfile && (
        <div className="w-[25%] flex flex-col gap-y-4">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <Title>Profile Setup</Title>
              <Dropdown jsxComponent={<Cancel01Icon />} values={closeButtons} />
            </div>
            <Paragraph>
              Having detailed profile information enables more accurate and
              relevant communication, ensuring that responses are personalized
              and contextually appropriate.
            </Paragraph>
          </div>
          <div className="flex flex-col gap-y-4">
            <div>
              <SubTitle>Profile Picture</SubTitle>
              <Paragraph>We only support PNGs and JPEGs.</Paragraph>
            </div>
            <ImageUploadWCustomDropdown onUpload={handleFileUpload} />
          </div>
          <div className="flex flex-col gap-y-4">
            <div>
              <SubTitle>Basic Information</SubTitle>
              <Paragraph>
                This provides the essential context needed to understand and
                address a user's needs and preferences effectively
              </Paragraph>
            </div>
            <div className="flex flex-col gap-y-2">
              <InputWithLabel
                label="Full Name"
                onChange={handleInformation("fullName")}
                value={newUserInformation.fullName}
              />
              <div className="flex gap-x-4">
                <InputWithLabel
                  label="Age"
                  onChange={handleInformation("age")}
                  value={newUserInformation.age}
                />
                <CustomSelect
                  label="Gender"
                  options={genderOptions}
                  onSelect={handleInformation("gender")}
                  selectedValue={newUserInformation.gender}
                />
              </div>
              <CustomSelect
                label="Race"
                options={raceOptions}
                onSelect={handleInformation("race")}
                selectedValue={newUserInformation.race}
              />
              <CustomSelect
                label="Spoken Language"
                options={languageOptions}
                onSelect={handleInformation("language")}
                selectedValue={newUserInformation.language}
              />
              <CustomSelect
                label="Interest/s"
                options={raceEthnicityInterests}
                onSelect={handleInformation("interest")}
                selectedValue={newUserInformation.interest}
              />
              <TextArea
                value={newUserInformation.aboutMe}
                label="About Me"
                onChange={handleInformation("aboutMe")}
              />
            </div>
          </div>
          <Button onClick={handleSubmit}>
            <div className="px-4 py-1 bg-secondary rounded-4 hover:scale-[101%] transition-all">
              <Paragraph>Submit Profile</Paragraph>
            </div>
          </Button>
        </div>
      )}
    </>
  );
}

export default AppProfileSetup;
