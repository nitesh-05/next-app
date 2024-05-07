"use client";
// import { LevenshteinDistance } from "natural";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { levenshteinDistance } from "../utils/levenshteinDistance";

interface Props {
  data: any;
}
const VoiceSearch = ({ data }: Props) => {
  const router = useRouter();
  const [recognizedText, setRecognizedText] = useState("");

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    const startSpeechRecognition = () => {
      recognition = new (window.SpeechRecognition ||
        (window as any).webkitSpeechRecognition)();
      if (!recognition) {
        console.error("Speech recognition not supported");
        return;
      }

      recognition.lang = "en-US";
      // recognition.lang = "hi-IN";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setRecognizedText(transcript);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.start();
    };

    const stopSpeechRecognition = () => {
      if (recognition) {
        recognition.stop();
        setIsListening(false);
      }
    };

    if (isListening) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }

    return () => {
      stopSpeechRecognition();
    };
  }, [isListening]);

  const toggleSpeechRecognition = () => {
    setIsListening((prevState) => !prevState);
  };

  const fuzzySearch = (speechInput: string, data: any[]) => {
    let minDistance = Infinity;
    let closestMatch: any | null = null;

    for (const person of data) {
      const distance = levenshteinDistance(
        speechInput.toLowerCase(),
        person.first_name.toLowerCase()
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestMatch = person;
      }
    }

    return closestMatch;
  };

  const millData = data.find((person: any) => {
    // Convert both first names to lowercase and remove non-alphanumeric characters
    const normalizedFirstName = person.first_name
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "");
    const normalizedSearchTerm = recognizedText
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "");

    // Check if the normalized first name includes the normalized search term
    return normalizedFirstName.includes(normalizedSearchTerm);
  });

  const fuzzyData = fuzzySearch(recognizedText, data);

  // useEffect(() => {
  //   router.push(`${fuzzyData.first_name}`, { scroll: false });
  //   return () => {
  //     router.push("/", { scroll: false });
  //   };
  // }, [fuzzyData]);

  // {
  //   fuzzyData && router.push(`${fuzzyData.first_name}`, { scroll: false });
  // }

  return (
    <div>
      <h1>Speech Recognition Example</h1>

      {data?.map((item: any, i: number) => (
        <li key={i}>{item.first_name}</li>
      ))}
      <button
        type="submit"
        className="flex w-lg justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={toggleSpeechRecognition}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>

      <p>Recognized Text: {recognizedText}</p>
      {console.log("mill", millData)}
      {console.log("fuzzyData", fuzzyData)}

      {/* <>
        <li>{millData?.first_name}</li>
        <li>{millData?.last_name}</li>
        <li>{millData?.email}</li>
        <li>{millData?.gender}</li>
        <li>{millData?.ip_address}</li>
      </> */}

      <>
        <li>{fuzzyData?.first_name}</li>
        <li>{fuzzyData?.last_name}</li>
        <li>{fuzzyData?.email}</li>
        <li>{fuzzyData?.gender}</li>
        <li>{fuzzyData?.ip_address}</li>
      </>
    </div>
  );
};

export default VoiceSearch;
