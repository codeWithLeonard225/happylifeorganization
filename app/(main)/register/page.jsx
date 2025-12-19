"use client";

import { useState } from "react";
import Link from "next/link";
import { db } from "@/app/lib/firebase";
import { 
  collection, addDoc, serverTimestamp, 
  query, where, getDocs 
} from "firebase/firestore";
import imageCompression from 'browser-image-compression';
import { MdErrorOutline, MdInfoOutline } from "react-icons/md"; // Added icons
import { generateClientId } from "@/app/lib/generateClientId";
import { uploadToCloudinary } from "@/app/lib/cloudinaryUpload";
import IDCardModal from "../../components/IDCardModal";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registeredClient, setRegisteredClient] = useState(null);

  const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validation: Ensure it's an image
  if (!file.type.startsWith('image/')) {
    setError("Please upload an image file.");
    return;
  }

  const options = {
    maxSizeMB: 0.2,          // Max size 200KB (ideal for passport photos)
    maxWidthOrHeight: 600,  // Standard passport aspect ratio height
    useWebWorker: true,
  };

  try {
    setLoading(true); // Optional: show a small spinner
    const compressedFile = await imageCompression(file, options);
    
    setPhoto(compressedFile);
    setPhotoPreview(URL.createObjectURL(compressedFile));
    setError("");
  } catch (err) {
    setError("Failed to process image. Try a different photo.");
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    const form = e.target;
    const inputRegCode = form.regCode.value.trim();

    try {
      // ⭐ STEP 1: Verify Code Existence in 'reg_codes'
      const codeQuery = query(
        collection(db, "reg_codes"),
        where("code", "==", inputRegCode)
      );
      const codeSnap = await getDocs(codeQuery);

      if (codeSnap.empty) {
        setError("The Registration Code entered is not recognized. Please verify the code or contact the office.");
        setLoading(false);
        return;
      }

      // ⭐ STEP 2: Verify Uniqueness in 'clients'
      const duplicateQuery = query(
        collection(db, "clients"),
        where("regCode", "==", inputRegCode)
      );
      const duplicateSnap = await getDocs(duplicateQuery);

      if (!duplicateSnap.empty) {
        setError("This access key has already been used to create an account. Keys are for one-time use only.");
        setLoading(false);
        return;
      }

      // Proceed with file upload and registration
      const clientId = generateClientId();
      const photoURL = await uploadToCloudinary(photo);

      const clientData = {
        clientId,
        fullname: form.fullname.value,
        dob: form.dob.value,
        gender: form.gender.value,
        maritalStatus: form.maritalStatus.value,
        occupation: form.occupation.value,
        tel: form.tel.value,
        address: form.address.value,
        regCode: inputRegCode,
        photoURL,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "clients"), clientData);

      // Success cleanup
      setRegisteredClient(clientData);
      form.reset();
      setPhoto(null);
      setPhotoPreview(null);

    } catch (err) {
      console.error("Registration Error:", err);
      setError("We encountered a technical issue during registration. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 flex justify-center px-6 py-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 border-t-8 border-indigo-600">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-indigo-900 tracking-tighter uppercase">Join HLF</h1>
            <p className="text-gray-400 font-medium">Please provide your details and valid access key.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PHOTO UPLOAD */}
            <div className="md:col-span-2 flex flex-col items-center pb-4">
              <div className="w-36 h-36 rounded-2xl border-4 border-dashed border-indigo-100 overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
               {photoPreview && (
  <div className="mt-4 flex flex-col items-center">
    <div className="w-40 h-48 border-2 border-gray-300 overflow-hidden rounded-md bg-gray-100">
      <img 
        src={photoPreview} 
        alt="Preview" 
        className="w-full h-full object-cover" // object-cover acts like a crop
      />
    </div>
    <p className="text-xs text-gray-500 mt-2">Passport Preview</p>
  </div>
)}
              </div>
              <input id="photo" type="file" accept="image/*" required onChange={handlePhotoChange} className="hidden" />
              <label htmlFor="photo" className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 cursor-pointer shadow-md transition-all">
                Upload Photo
              </label>
            </div>

            {/* FORM FIELDS */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Full Name</label>
              <input name="fullname" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold placeholder:text-gray-300" placeholder="e.g. Musa Kamara" required />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Date of Birth</label>
              <input type="date" name="dob" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold" required />
            </div>

            <select name="gender" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-gray-700" required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <select name="maritalStatus" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-gray-700" required>
              <option value="">Marital Status</option>
              <option>Single</option>
              <option>Married</option>
            </select>

            <input name="occupation" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold placeholder:text-gray-300" placeholder="Occupation" required />
            <input name="tel" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold placeholder:text-gray-300" placeholder="Phone Number" required />
            
            <input name="address" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold md:col-span-2 placeholder:text-gray-300" placeholder="Full Residential Address" required />

            <div className="md:col-span-2 mt-4">
              <label className="text-[10px] font-black text-indigo-500 uppercase ml-1 flex items-center gap-1">
                Registration Access Key <MdInfoOutline className="text-xs" />
              </label>
              <input 
                name="regCode" 
                className={`w-full p-5 bg-indigo-50 border-2 rounded-2xl focus:ring-2 focus:ring-indigo-200 outline-none font-mono text-xl font-black uppercase tracking-widest transition-all ${
                  error ? "border-red-300 text-red-900" : "border-indigo-100 text-indigo-900 focus:border-indigo-500"
                }`} 
                placeholder="HL-XXXXXX" 
                required 
              />
              <p className="text-[10px] text-gray-400 mt-2 px-1 italic">
                * This security key is valid for a single registration only.
              </p>
            </div>

            {/* ⭐ PROFESSIONAL ERROR MESSAGE */}
            {error && (
              <div className="md:col-span-2 flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-2xl animate-shake">
                <MdErrorOutline className="text-red-500 text-2xl shrink-0" />
                <p className="text-red-700 text-sm font-bold leading-tight">{error}</p>
              </div>
            )}

            <button
              disabled={loading}
              className={`md:col-span-2 py-5 rounded-2xl font-black text-white uppercase tracking-widest transition-all shadow-lg ${
                loading ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
              }`}
            >
              {loading ? "Verifying Credentials..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-xs mt-8 font-bold text-gray-400">
            Already a member? <Link href="/login" className="text-indigo-600 hover:underline">Sign In</Link>
          </p>
        </div>
      </main>

      {registeredClient && (
        <IDCardModal
          client={registeredClient}
          onClose={() => setRegisteredClient(null)}
        />
      )}
    </>
  );
}