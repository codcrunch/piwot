import { Fcards } from "@/constants/page";
import FeatureCard from "../featureCard/page";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
const Features = () => {
  const [selected, setSelected] = useState("pneumonia");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  function base64ToFile(base64String: string, fileName: string): File {
    const base64WithoutPrefix = base64String.replace(/^data:[^;]+;base64,/, "");

    const binaryData = atob(base64WithoutPrefix);

    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: "image/webp" });

    const file = new File([blob], fileName, { type: "image/webp" });

    return file;
  }

  const handleCapture = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot();
      setImageSrc(capturedImage);
      setFile(base64ToFile(capturedImage || "", "image.jpeg"));
    }
  };

  async function uploadchest() {
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          "https://pneumonia-fmaprfvioa-de.a.run.app",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          setResult(result.prediction);
          setLoading(false);
        } else {
          console.error("Failed to upload file");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        setLoading(false);
      }
    }
  }

  async function uploadbrain() {
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          "https://braintumor-fmaprfvioa-de.a.run.app",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          setResult(result.prediction);
          setLoading(false);
        } else {
          console.error("Failed to upload file");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        setLoading(false);
      }
    }
  }
  console.log(imageSrc);

  async function uploadeye() {
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          "https://diabeticretnopathy-fmaprfvioa-de.a.run.app",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          setResult(result.prediction);
          setLoading(false);
        } else {
          console.error("Failed to upload file");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        setLoading(false);
      }
    }
  }

  async function uploadskin() {
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          "https://skindisease-fmaprfvioa-de.a.run.app",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          setResult(result.prediction);
          setLoading(false);
        } else {
          console.error("Failed to upload file");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        setLoading(false);
      }
    }
  }

  const [cameraOpen, setCameraOpen] = useState(false);

  return (
    <>
      <motion.div
        className="w-full flex justify-center bg-green1/30 py-16"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 mx-10">
          {Fcards.map((card, index) => {
            if (card.title === "SCAN IMAGES") {
              return (
                <>
                  <Dialog>
                    <DialogTrigger>
                      <FeatureCard
                        key={index}
                        img={card.img}
                        title={card.title}
                        width={150}
                        height={150}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{card.title}</DialogTitle>
                        <DialogDescription>
                          <Select
                            onValueChange={(e) => {
                              setSelected(e);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type of scan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select a type of scan</SelectLabel>
                                <SelectItem value="pneumonia">
                                  Chest Scan
                                </SelectItem>
                                <SelectItem value="braintumor">
                                  Brain Scan
                                </SelectItem>
                                <SelectItem value="diabeticretinopathy">
                                  Eye CT Scan
                                </SelectItem>
                                <SelectItem value="skindisease">
                                  Skin Photo
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          <div className="py-6 flex flex-col space-y-4">
                            <div className="flex">
                              <Input type="file" onChange={handleFileChange} />

                              <Dialog>
                                <DialogTrigger>
                                  <button onClick={() => setCameraOpen(true)}>
                                    Open Camera
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="flex flex-col">
                                  <Webcam
                                    ref={webcamRef}
                                    width={100}
                                    height={200}
                                  />
                                  <button onClick={handleCapture}>
                                    Capture
                                  </button>
                                </DialogContent>
                              </Dialog>
                            </div>

                            {imageSrc && <img src={imageSrc} alt="" />}
                            <button
                              onClick={() => {
                                if (selected === "pneumonia") {
                                  uploadchest();
                                } else if (selected === "braintumor") {
                                  uploadbrain();
                                } else if (selected === "diabeticretinopathy") {
                                  uploadeye();
                                } else if (selected === "skindisease") {
                                  uploadskin();
                                }
                              }}
                            >
                              Upload
                            </button>
                            {loading ? <p>Loading...</p> : <p>{result}</p>}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </>
              );
            } else {
              return (
                <>
                  <FeatureCard
                    key={index}
                    img={card.img}
                    title={card.title}
                    width={150}
                    height={150}
                  />
                </>
              );
            }
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Features;
